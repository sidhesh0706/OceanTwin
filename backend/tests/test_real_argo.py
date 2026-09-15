from pathlib import Path
import json
import numpy as np
import pytest
import xarray as xr
import gsw
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.adapters.observations import parse_observations
from backend.app.adapters.argo import import_argo
ROOT=Path(__file__).resolve().parents[2]

def test_argo_snapshot_matches_original_adjusted_measurements():
    rows=json.loads((ROOT/'backend/data/real_argo.json').read_text())
    assert len(rows)==54 and all(not r['synthetic'] for r in rows)
    assert {r['ocean_basin'] for r in rows} == {'Indian', 'Atlantic', 'Pacific'}
    files = {'indian_ocean':'20260212_prof.nc', 'atlantic_ocean':'20260212_atlantic_prof.nc',
             'pacific_ocean':'20260212_pacific_prof.nc'}
    for ocean, filename in files.items():
      with xr.open_dataset(ROOT/'data_sources/argo'/filename) as ds:
        for row in (r for r in rows if ocean in r['source_url']):
            p=ds.isel(N_PROF=row['source_profile_index'])
            assert row['latitude']==float(p.LATITUDE)
            assert row['longitude']==float(p.LONGITUDE)
            assert row['data_mode'] in ('A','D')
            for sample in row['profiles']:
                pressure=sample['pressure_dbar']
                k=int(np.nanargmin(abs(p.PRES_ADJUSTED.values-pressure)))
                assert sample['depth']==pytest.approx(-gsw.z_from_p(pressure,row['latitude']))
                assert p.PRES_ADJUSTED_QC.values[k]==b'1'
                for variable,name in [('temperature','TEMP'),('salinity','PSAL')]:
                    if sample[variable] is not None:
                        assert p[name+'_ADJUSTED_QC'].values[k]==b'1'
                        assert sample[variable]==float(p[name+'_ADJUSTED'].values[k])

def sample_csv(kind='CTD'):
    return ('id,instrument_type,latitude,longitude,timestamp,depth,synthetic,source_name,temperature,salinity,temperature_qc\n'
            f'cast-1,{kind},5,65,2026-02-12T00:00:00Z,10,true,Test fixture,28,35,1\n'
            f'cast-1,{kind},5,65,2026-02-12T00:00:00Z,100,true,Test fixture,22,35.1,4\n').encode()

@pytest.mark.parametrize('kind',['ARGO','GLIDER','CTD','BGC','MOORING','ADCP'])
def test_delimited_sensor_types_and_qc(kind):
    rows=parse_observations(sample_csv(kind))
    assert rows[0]['profiles'][1]['temperature'] is None
    assert rows[0]['profiles'][1]['salinity']==35.1
    assert rows[0]['instrument_type']==kind

def test_real_catalogue_and_atomic_observation_upload():
    with TestClient(app) as c:
        assert c.post('/api/datasets/real-argo').status_code==200
        obs=c.get('/api/observations').json()
        assert len(obs)==54 and obs[0]['source_url'].startswith('https://data-argo.ifremer.fr/')
        first=obs[0]['id']
        comparison=c.get(f'/api/compare/{first}?time=1').json()
        assert any(r['observed'] is not None for r in comparison['profiles'])
        assert c.post('/api/observations/upload',files={'file':('bad.csv',b'invalid')}).status_code==422
        assert c.get('/api/observations').json()[0]['id']==first
        assert c.post('/api/observations/upload',files={'file':('ctd.csv',sample_csv())}).status_code==200
        assert c.get('/api/observations').json()[0]['instrument_type']=='CTD'
        assert c.post('/api/datasets/real-argo').status_code==200

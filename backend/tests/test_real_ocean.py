from pathlib import Path
import numpy as np
import xarray as xr
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.adapters.netcdf import NetCDFDatasetAdapter

ROOT = Path(__file__).resolve().parents[2]


def test_real_fields_match_provider_subsets_and_no_deep_satellite_data():
    model = NetCDFDatasetAdapter(ROOT / 'backend/data/real_ocean.nc')
    assert not model.metadata()['synthetic']
    for product, native, canonical in [('t3z','water_temp','temperature'), ('s3z','salinity','salinity'),
                                       ('u3z','water_u','u_current'), ('v3z','water_v','v_current')]:
        with xr.open_dataset(ROOT / f'data_sources/ocean/hycom_{product}_20260211_13.nc') as raw:
            np.testing.assert_allclose(model.ds[canonical].values, raw[native].values, rtol=1e-6, equal_nan=True)
    np.testing.assert_allclose(model.ds.current_speed, np.hypot(model.ds.u_current, model.ds.v_current), equal_nan=True)
    assert model.ds.chlorophyll.sel(depth=slice(1, None)).isnull().all()
    np.testing.assert_allclose(model.ds.chlorophyll.isel(time=0), model.ds.chlorophyll.isel(time=2), equal_nan=True)
    with xr.open_dataset(ROOT / 'data_sources/ocean/modis_chlorophyll_202602_monthly.nc') as raw:
        expected = raw.chlor_a.isel(time=0, drop=True).sortby('latitude').reindex(
            latitude=model.ds.latitude, longitude=model.ds.longitude, method='nearest', tolerance=.26)
        expected = expected.where(np.isfinite(model.ds.temperature.isel(time=0).sel(depth=0)))
        np.testing.assert_allclose(model.ds.chlorophyll.isel(time=0).sel(depth=0), expected, equal_nan=True)


def test_real_sample_upload_changes_dataset_and_serves_file_values():
    path = ROOT / 'data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc'
    with TestClient(app) as client, xr.open_dataset(path) as sample:
        assert len(client.get('/api/observations').json()) == 54
        before = client.get('/api/datasets').json()[0]
        with path.open('rb') as file:
            response = client.post('/api/datasets/upload', files={'file': (path.name, file, 'application/x-netcdf')})
        assert response.status_code == 200, response.text
        loaded = response.json()
        assert loaded['id'] != before['id'] and not loaded['synthetic']
        assert len(loaded['times']) == 1 and loaded['times'][0].startswith('2026-02-13')
        assert client.get('/api/observations').json() == []
        for variable in ['temperature', 'salinity', 'chlorophyll', 'current_speed']:
            result = client.get(f'/api/ocean/slice?variable={variable}&time=0&depth=0')
            assert result.status_code == 200, result.text
            field = result.json()
            raw = np.hypot(sample.u_current, sample.v_current) if variable == 'current_speed' else sample[variable]
            expected = raw.isel(time=0).sel(depth=0).sel(latitude=field['latitudes'], longitude=field['longitudes'])
            actual = np.array(field['values'], dtype=float)
            np.testing.assert_allclose(actual, expected.values, atol=1e-4, equal_nan=True)
        failed = client.post('/api/datasets/upload', files={'file': ('broken.nc', b'not netcdf')})
        assert failed.status_code == 422
        assert client.get('/api/datasets').json()[0]['id'] == loaded['id']
        assert client.post('/api/datasets/real-argo').status_code == 200
        assert len(client.get('/api/observations').json()) == 54

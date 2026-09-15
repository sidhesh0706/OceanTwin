"""Download bounded historical provider subsets; prepare the offline ocean workspace."""
from pathlib import Path
import hashlib
import json
import urllib.parse
import urllib.request
import numpy as np
import xarray as xr

ROOT = Path(__file__).resolve().parents[2]
SOURCES = ROOT / 'data_sources/ocean'
PRODUCTS = [('t3z', 'water_temp', 'temperature'), ('s3z', 'salinity', 'salinity'),
            ('u3z', 'water_u', 'u_current'), ('v3z', 'water_v', 'v_current')]


def main():
    SOURCES.mkdir(exist_ok=True)
    records = []
    fields = []
    # One HYCOM connection at a time, as requested by its data service.
    for product, native, canonical in PRODUCTS:
        url = f'https://tds.hycom.org/thredds/dodsC/ESPC-D-V02/{product}/2026'
        path = SOURCES / f'hycom_{product}_20260211_13.nc'
        if not path.exists():
            print(f'Downloading {product}', flush=True)
            with xr.open_dataset(url, engine='netcdf4', drop_variables=['tau']) as remote:
                subset = remote[[native]].sel(time=slice('2026-02-11T12:00', '2026-02-13T12:00'),
                    depth=slice(0, 2000), lat=slice(-28, 28), lon=slice(40, 105))
                subset = subset.isel(time=slice(None, None, 8), lat=slice(None, None, 12), lon=slice(None, None, 12)).load()
                subset.to_netcdf(path, encoding={native: {'zlib': True, 'complevel': 4}})
        with xr.open_dataset(path) as source:
            field = source[native].load().rename({'lat': 'latitude', 'lon': 'longitude'}).rename(canonical)
        field.attrs['source_name'] = 'FNMOC HYCOM ESPC-D-V02 historical analysis'
        field.attrs['source_url'] = url
        field.attrs['data_kind'] = 'model_analysis'
        fields.append(field)
        records.append({'file': path.name, 'url': url, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
    model = xr.merge(fields, join='exact')
    satellite_url = 'https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMH1chlamday_R2022SQ.nc?' + urllib.parse.quote(
        'chlor_a[(2026-02-15T00:00:00Z)][(28):12:(-28)][(40):12:(105)]', safe=':,()')
    path = SOURCES / 'modis_chlorophyll_202602_monthly.nc'
    if not path.exists():
        with urllib.request.urlopen(satellite_url, timeout=90) as response:
            path.write_bytes(response.read())
    with xr.open_dataset(path) as source:
        assert str(source.time.values[0]).startswith('2026-02-')
        surface = source.chlor_a.isel(time=0, drop=True).sortby('latitude').load()
    # Nearest source pixel, with a bounded distance; no cloud-gap or depth filling.
    surface = surface.reindex(latitude=model.latitude, longitude=model.longitude,
        method='nearest', tolerance=0.26)
    chlorophyll = xr.full_like(model.temperature, np.nan)
    chlorophyll.loc[dict(depth=0)] = surface.expand_dims(time=model.time).where(np.isfinite(model.temperature.sel(depth=0)))
    chlorophyll.attrs = {'units': 'mg m-3', 'source_name': 'NASA Aqua MODIS R2022 February 2026 monthly satellite composite',
        'source_url': satellite_url, 'data_kind': 'satellite_observation', 'surface_only': 'true',
        'sampling_note': 'February 2026 monthly composite, held fixed across the three model dates. Nearest sampled satellite pixel; remaining gaps preserved. Surface only.'}
    model['chlorophyll'] = chlorophyll
    model.attrs = {'title': 'Indian Ocean · HYCOM + NASA MODIS', 'dataset_id': 'indian-ocean-real-20260211-13',
        'synthetic': 'false', 'Conventions': 'CF-1.8',
        'source': 'FNMOC HYCOM ESPC-D-V02 model analysis; NASA Aqua MODIS satellite chlorophyll',
        'history': 'Historical Feb 11-13 2026 subset; HYCOM native nodes at stride 12; 36 depths to 2000 m; daily noon frames. February monthly satellite composite sampled nearest to model horizontal nodes only at depth 0; held fixed across model dates.'}
    target = ROOT / 'backend/data/real_ocean.nc'
    model.to_netcdf(target, encoding={v: {'zlib': True, 'complevel': 4, 'dtype': 'float32'} for v in model.data_vars})
    sample = model.sel(latitude=slice(5, 25), longitude=slice(55, 80)).isel(time=[2])
    sample.attrs = model.attrs | {'title': 'Arabian Sea · 13 February 2026', 'dataset_id': 'real-arabian-sea-upload-20260213'}
    sample.to_netcdf(SOURCES / 'OceanTwin_Real_Arabian_Sea.nc', encoding={v: {'zlib': True, 'complevel': 4, 'dtype': 'float32'} for v in sample.data_vars})
    records.append({'file': path.name, 'url': satellite_url, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
    (SOURCES / 'manifest.json').write_text(json.dumps({'sources': records, 'subset': model.attrs['history'],
        'prepared_sha256': hashlib.sha256(target.read_bytes()).hexdigest()}, indent=2), encoding='utf-8')
    print(dict(model.sizes), flush=True)


if __name__ == '__main__':
    main()

"""Import a reproducible, QC-filtered core-Argo GDAC snapshot (not model grids)."""
from pathlib import Path
import numpy as np
import xarray as xr
import gsw


def text(value):
    a = np.asarray(value)
    if a.dtype.kind == 'S':
        return b''.join(a.ravel()).decode('ascii').strip()
    return ''.join(a.astype(str).ravel()).strip()


def import_argo(path: Path, source_url: str, retrieved_date: str, bounds=None):
    observations = []
    with xr.open_dataset(path) as ds:
        for i in range(ds.sizes['N_PROF']):
            p = ds.isel(N_PROF=i)
            lat, lon = float(p.LATITUDE), float(p.LONGITUDE)
            mode = text(p.DATA_MODE.values)
            if bounds and not (bounds[0] <= lat <= bounds[1] and bounds[2] <= lon <= bounds[3]):
                continue
            if mode not in ('A', 'D'):
                continue
            if text(p.POSITION_QC.values) != '1' or text(p.JULD_QC.values) != '1' or np.isnat(p.JULD.values):
                continue
            if 'PARAMETER_DATA_MODE' in p:
                raise ValueError('BGC profiles require parameter-specific processing; this importer handles core profiles only.')
            pressure = np.asarray(p.PRES_ADJUSTED.values, dtype=float)
            pq = np.asarray(p.PRES_ADJUSTED_QC.values).astype('U1')
            depths = -gsw.z_from_p(pressure, lat)
            values = {}
            for source, target in [('TEMP', 'temperature'), ('PSAL', 'salinity')]:
                a = np.asarray(p[source + '_ADJUSTED'].values, dtype=float)
                qc = np.asarray(p[source + '_ADJUSTED_QC'].values).astype('U1')
                values[target] = (a, qc)
            rows = []
            for k, depth in enumerate(depths):
                if pq[k] != '1' or not np.isfinite(depth) or depth < 0:
                    continue
                row = {'depth': float(depth), 'pressure_dbar': float(pressure[k]), 'pressure_qc': '1'}
                for name, (a, qc) in values.items():
                    good = qc[k] == '1' and np.isfinite(a[k])
                    row[name] = float(a[k]) if good else None
                    row[name + '_qc'] = str(qc[k])
                # Retain null variable samples so charts do not bridge rejected measurements.
                rows.append(row)
            rows.sort(key=lambda row: row['depth'])
            if sum(row['temperature'] is not None for row in rows) < 10:
                continue
            wmo, cycle = text(p.PLATFORM_NUMBER.values), int(p.CYCLE_NUMBER)
            direction = text(p.DIRECTION.values)
            observations.append({
                'id': f'ARGO-{wmo}-{cycle:03d}-{direction}', 'instrument_type': 'ARGO',
                'latitude': lat, 'longitude': lon,
                'timestamp': np.datetime_as_string(p.JULD.values, unit='s') + 'Z',
                'synthetic': False, 'profiles': rows,
                'wmo': wmo, 'cycle': cycle, 'direction': direction, 'data_mode': mode,
                'source_name': 'Argo GDAC / Ifremer', 'source_url': source_url,
                'source_profile_index': i, 'retrieved_date': retrieved_date,
                'citation': 'https://doi.org/10.17882/42182',
                'qc_policy': 'Adjusted PRES/TEMP/PSAL; QC 1 only. Position and time QC 1. No raw fallback.',
                'depth_method': 'Depth = -gsw.z_from_p(adjusted pressure dbar, latitude); TEOS-10.',
                'available_variables': [name for name in values if any(row[name] is not None for row in rows)],
            })
    return observations

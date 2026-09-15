"""Rebuild the checked-in real-Argo catalogue from the preserved official snapshot."""
from pathlib import Path
import csv
import hashlib
import json
import numpy as np
from backend.app.adapters.argo import import_argo

ROOT = Path(__file__).resolve().parents[2]
SOURCES = [
    ('Indian', '20260212_prof.nc', 'https://data-argo.ifremer.fr/geo/indian_ocean/2026/02/20260212_prof.nc'),
    ('Atlantic', '20260212_atlantic_prof.nc', 'https://data-argo.ifremer.fr/geo/atlantic_ocean/2026/02/20260212_prof.nc'),
    ('Pacific', '20260212_pacific_prof.nc', 'https://data-argo.ifremer.fr/geo/pacific_ocean/2026/02/20260212_prof.nc'),
]

def main():
    retrieved = '2026-09-13'
    rows, source_records = [], []
    for ocean, filename, url in SOURCES:
        path = ROOT / 'data_sources/argo' / filename
        candidates = import_argo(path, url, retrieved)
        candidates.sort(key=lambda row: (row['longitude'], row['latitude'], row['id']))
        positions = np.linspace(0, len(candidates) - 1, min(18, len(candidates))).round().astype(int)
        chosen = [candidates[i] for i in positions]
        for row in chosen:
            row['ocean_basin'] = ocean
        rows.extend(chosen)
        source_records.append({'ocean': ocean, 'source_url': url, 'file': filename,
                               'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                               'source_profiles': len(candidates), 'selected_profiles': len(chosen)})
    (ROOT / 'backend/data/real_argo.json').write_text(json.dumps(rows, indent=2, allow_nan=False), encoding='utf-8')
    columns = ['id', 'instrument_type', 'latitude', 'longitude', 'timestamp', 'depth', 'synthetic', 'source_name', 'temperature', 'salinity', 'temperature_qc', 'salinity_qc']
    with (path.parent / 'real_argo_profiles.csv').open('w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=columns)
        writer.writeheader()
        for row in rows:
            for sample in row['profiles']:
                record = {key: row.get(key, sample.get(key)) for key in columns}
                record['synthetic'] = 'false'
                writer.writerow(record)
    manifest = {'sources': source_records, 'retrieval_date_utc': retrieved,
                'profile_count':len(rows), 'ids':[row['id'] for row in rows],
                'citation':'https://doi.org/10.17882/42182',
                'selection':'Up to 18 geographically distributed core adjusted A/D profiles per ocean file; QC 1 only; at least 10 temperature samples.'}
    (path.parent / 'manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print(json.dumps(manifest, indent=2))

if __name__ == '__main__': main()

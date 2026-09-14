"""Rebuild the checked-in real-Argo catalogue from the preserved official snapshot."""
from pathlib import Path
import csv
import hashlib
import json
from backend.app.adapters.argo import import_argo

ROOT = Path(__file__).resolve().parents[2]
SOURCE = 'https://data-argo.ifremer.fr/geo/indian_ocean/2026/02/20260212_prof.nc'

def main():
    path = ROOT / 'data_sources/argo/20260212_prof.nc'
    retrieved = '2026-09-13'
    rows = import_argo(path, SOURCE, retrieved)
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
    manifest = {'source_url': SOURCE, 'retrieval_date_utc': '2026-09-13', 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'profile_count':len(rows), 'ids':[row['id'] for row in rows], 'citation':'https://doi.org/10.17882/42182', 'selection':'Core adjusted A/D profiles, 28S to 28N, 40E to 105E; QC 1 only; at least 10 temperature samples.'}
    (path.parent / 'manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print(json.dumps(manifest, indent=2))

if __name__ == '__main__': main()

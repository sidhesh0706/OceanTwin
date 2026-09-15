> Current workspace: [real HYCOM model analysis and NASA chlorophyll](REAL_OCEAN.md).

# Historical Argo data in OceanTwin

The default viewer combines **54 measured Argo profiles** recorded on **12 February 2026** with historical HYCOM analysis and NASA satellite surface chlorophyll. This is an offline historical demonstration, not a live feed or an operational model validation.

## Provenance and reproducibility

- Provider: [Argo GDAC / Ifremer](https://data-argo.ifremer.fr/geo/indian_ocean/2026/02/20260212_prof.nc).
- Preserved original: `data_sources/argo/20260212_prof.nc` (110 source profiles).
- Retrieved: 13 September 2026. Source hash and selected IDs: `data_sources/argo/manifest.json`.
- SHA-256: `6322e371a343b4f209c515d8af0a83870686762a21caf5bf90b9bf9923520abf`.
- Curated catalogue: `backend/data/real_argo.json`, 54 profiles and 37,357 retained depth rows; individual variables can be missing after quality filtering.
- Upload-ready CSV: `data_sources/argo/real_argo_profiles.csv`.

Selection uses core adjusted-real-time (A) or delayed-mode (D) profiles within 28°S–28°N and 40°E–105°E. Position and time must have QC 1. Adjusted pressure, temperature and salinity use QC 1 only. No raw-value fallback or fabricated chlorophyll is supplied. Each retained profile has at least ten valid temperature samples. The final A in a profile ID indicates ascending direction, not processing mode.

Depth is calculated from adjusted sea pressure and latitude using `-gsw.z_from_p`, following [TEOS-10](https://www.teos-10.org/pubs/gsw/html/gsw_z_from_p.html). Argo temperature is in-situ temperature. Missing or rejected measurements remain null. Tests compare the retained values directly to the preserved source file and verify the pressure-to-depth conversion.

Rebuild the catalogue from the preserved snapshot, offline, from the repository root:

```powershell
.\.venv\Scripts\python.exe -m backend.scripts.import_real_argo
```

These observations are made freely available by the International Argo Program and participating national programmes. Cite [Argo data, DOI 10.17882/42182](https://doi.org/10.17882/42182); see the [Argo acknowledgement guidance](https://argo.ucsd.edu/data/acknowledging-argo/) and [file/QC guidance](https://argo.ucsd.edu/data/how-to-use-argo-files/).

## Presentation workflow

1. Start the application, open Observations, and select `ARGO-4903973-003-A` (Arabian Sea) or `ARGO-2902765-220-A` (Bay of Bengal).
2. The viewer transitions to the ocean and selects the nearest model date. Show the measured temperature/salinity profile, recording time, WMO number, processing mode and source.
3. Model comparison starts disabled for measured observations. Enable it to demonstrate collocation, explicitly explaining that the current model is a historical assimilative analysis, so these comparisons are not independent forecast validation. The model time offset is shown.
4. Use Top-down / 3D ocean, depth, currents, analysis and isosurface controls. The fields in these views come from the model, not interpolated Argo coverage.
5. Settings → Load historical Argo restores this setup after uploads. Synthetic test fixtures remain in the repository but are not offered by the main interface.

## Observation uploads

Settings → Load NetCDF / observation CSV accepts UTF-8 comma-, tab- or semicolon-separated profile rows, up to 8 MiB and 100,000 samples. Required columns:

`id,instrument_type,latitude,longitude,timestamp,depth,synthetic,source_name`

Optional variables: `temperature` (°C), `salinity` (PSU), `chlorophyll` (mg/m³), plus their `_qc` columns. Depth is positive metres; coordinates are decimal degrees; timestamps require a timezone. Use a unique ID per profile/cycle and unique depths. Missing values may be blank, NA, null or NaN. If QC is supplied, only 1 and 2 are accepted; the curated GDAC import is stricter (QC 1 only). The uploader's provenance is labelled as supplied, not independently verified.

Supported instrument labels: ARGO, GLIDER, CTD, BGC, MOORING, ADCP. The schema currently supports scalar temperature/salinity/chlorophyll profiles; it does not ingest native ADCP velocity bins or arbitrary BGC variables. Upload replaces the active observation catalogue only after the entire file validates. It does not replace the model. NetCDF upload replaces the model and clears the separate observations; upload the CSV afterwards or restore the real-Argo setup. Uploaded state is in memory and resets when the server restarts.

The raw GDAC NetCDF is an observation archive, **not a model-grid upload**. Use the provided CSV in the UI, or the importer for the original archive.

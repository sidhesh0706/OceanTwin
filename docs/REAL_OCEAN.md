# Real historical ocean workspace

The default workspace uses provider data, not the procedural ocean generator.

| Layer | Source | Dates and meaning |
| --- | --- | --- |
| Temperature / salinity | FNMOC HYCOM ESPC-D-V02 analysis | 11, 12 and 13 February 2026, 12:00 UTC; real model analysis output, not a direct measurement at every grid cell |
| Current speed / vectors | Same HYCOM product, eastward and northward velocity | Speed is calculated as sqrt(u² + v²), in m/s; it is not a current-speed observation from the core Argo floats |
| Chlorophyll-a | NASA Aqua MODIS R2022 science-quality monthly composite, via NOAA ERDDAP | February 2026 surface composite; held fixed across model times, with remaining missing pixels preserved; no subsurface chlorophyll |
| Argo profiles | Argo GDAC / Ifremer | 54 measured temperature/salinity profiles across the Indian, Atlantic and Pacific oceans from 12 February 2026; adjusted A/D values with QC 1 |

The physical model is a historical analysis, not a live feed. Assimilation means model–profile agreement is not automatically an independent validation of forecasting skill. The core Argo profiles do not contain chlorophyll or current-speed measurements. See [the Argo provenance guide](REAL_ARGO.md).

## Sources and processing

- [HYCOM ESPC-D-V02 official product description](https://www.hycom.org/dataserver/espc-d-v02/global-analysis)
- [HYCOM temperature archive](https://tds.hycom.org/thredds/dodsC/ESPC-D-V02/t3z/2026.html); companion products s3z, u3z and v3z.
- [NASA/NOAA monthly chlorophyll product](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMH1chlamday_R2022SQ.html), DOI 10.5067/AQUA/MODIS/L3M/CHL/2022.

The Indian Ocean subset spans approximately 28°S–28°N and 40°E–105°E. Native HYCOM coordinates are sampled at stride 12 (0.48° latitude, 0.96° longitude), retaining 36 depth levels down to 2000 m and three noon frames. These are source-node values, not generated ocean fields. The globe shows the actual regional coverage; no data is supplied outside this subset.

The satellite product is sampled at stride 12 (about 0.5°). Its nearest source pixel is mapped to a model horizontal node only within 0.26° on each axis and where the physical model surface is wet. Missing pixels stay missing. The monthly value is displayed at depth 0 only, with the same monthly composite at all three model times. The depth/volume/isosurface controls are restricted for this surface-only layer.

Preserved subsets and SHA-256 hashes are in `data_sources/ocean/`. `backend/data/real_ocean.nc` is the prepared workspace. Rebuild from cached subsets, or fetch missing subsets sequentially via the official services:

```powershell
.\.venv\Scripts\python.exe -m backend.scripts.import_real_ocean
```

## Upload sample and recording flow

Use **`data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc`**. It contains the actual 13 February model fields for the Arabian Sea and the labelled February satellite composite. It is the single prepared upload sample for this release.

1. Start `run.py`; refresh to show the premium introduction.
2. Enter the workspace, show temperature, depth/time, currents, then chlorophyll. Explain the different sources and the monthly composite period.
3. Select an Argo float. Show its temperature/salinity profile and source information, then the top-down and angled views.
4. Upload the real Arabian Sea NetCDF. The dataset title, domain and available time frames change to the file's contents. This is expected replacement, not additional generated data. The old field cache is cleared.
5. Model upload clears the separate observation catalogue. Upload `data_sources/argo/real_argo_profiles.csv` separately, or use Settings → **Restore historical dataset** to restore the complete regional workspace and its 54 profiles.

The upload confirmation names the file and describes the change. Invalid uploads leave the existing dataset intact. Automated checks compare returned field values with the uploaded file, verify source subset values and speed calculations, and confirm satellite chlorophyll remains absent below the surface.

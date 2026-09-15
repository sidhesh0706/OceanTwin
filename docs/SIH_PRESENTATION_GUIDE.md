# OceanTwin3D — SIH presentation guide

## What to claim

OceanTwin3D is a working local prototype that combines a global Earth view, historical ocean-model fields, satellite chlorophyll, measured Argo profiles, NetCDF ingestion, and scientific analysis in one 4D workspace. The bundled data are traceable historical snapshots rather than a live operational feed.

## Evidence in the prototype

- **54 measured Argo profiles** across the Indian, Atlantic, and Pacific oceans, retaining **37,357 quality-controlled depth measurements**.
- **HYCOM ESPC-D-V02** temperature, salinity, and u/v currents for 11–13 February 2026, with 36 depth levels down to 2,000 m.
- **NASA Aqua MODIS** February 2026 monthly surface chlorophyll. Missing coverage remains missing, and no subsurface chlorophyll is invented.
- Current speed is calculated from HYCOM u/v components.
- Model–observation RMSE, MAE, and bias are calculated only where a measured Argo profile overlaps the model domain and supported variables.
- A prepared real-data NetCDF upload changes the active field, bounds, time axis, metadata, and visible points.

## Recording order

Use [WALKTHROUGH.md](WALKTHROUGH.md) for the timed 5–7 minute script. The recommended sequence is intro → global Argo coverage → Indian Ocean float → depth/time layers → profile comparison → transect/region analysis → upload `data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc` → restore the historical workspace.

## Four-member handoff

1. **Member 1:** problem, users, and the global Earth/Argo view.
2. **Member 2:** data pipeline, provenance, NetCDF, and variable limitations.
3. **Member 3:** local 3D ocean, depth, time, currents, and chlorophyll.
4. **Member 4:** comparison metrics, transects, upload proof, architecture, and close.

## Likely questions

**Is this live data?**

It is a reproducible historical snapshot from official provider products. The architecture supports replacing the bundled snapshot with compatible NetCDF and observation files.

**Why does an Argo float not show chlorophyll or speed?**

The selected core Argo files measure temperature and salinity. Chlorophyll comes from the satellite composite; current speed comes from the ocean model. The interface keeps those sources separate.

**What happens for a float outside the Indian Ocean field?**

Its measured profile remains available on the globe. Model comparison is disabled because the bundled HYCOM subset does not cover that location.

**What proves the upload is real?**

After upload, the interface reports the filename, new dataset name, bounds, time frames, sources, and field values from that file. Restore Historical Dataset returns to the complete bundled workspace.

## Submission checklist

- Start from the repository root with `.\.venv\Scripts\python.exe run.py`.
- Open `http://127.0.0.1:8000/` so the premium intro appears.
- Keep the upload file ready at `data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc`.
- Record at 1080p and keep browser zoom at 100%.
- Show provenance labels while discussing each variable.
- Say “historical model analysis,” “measured Argo profile,” and “surface satellite composite.”

# OceanTwin five-minute submission video

This is a **5:00 recording plan**. Read naturally and use the remaining seconds in each segment for the specified visual holds; rehearse once with a timer. Record at 1920 × 1080 with browser zoom at 100%. Start at `http://127.0.0.1:8000/` and keep `data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc` ready for upload.

## Before recording

1. Run `.\.venv\Scripts\python.exe run.py` from the repository root.
2. If you previously uploaded data, choose **Settings → Restore historical dataset** first. Then refresh and wait for **Earth ready**. Refresh alone does not restore the backend dataset.
3. Close unrelated windows and notifications.
4. Rehearse selecting `ARGO-3902755-003-A`, which overlaps the bundled model domain.
5. Move deliberately and wait for each **Updating** indicator to return to **System Ready**.

## 0:00–0:30 — Problem and solution

**Record:** Hold the introduction for two seconds, then click **Explore the ocean** and let the globe settle.

**Say:**

> India’s ocean data is powerful, but it is distributed across model grids, satellite products, instrument profiles, depths, and timestamps. OceanTwin brings these sources into one explainable workspace. A user can begin with the Earth, locate a real observation, descend into its surrounding water column, and perform scientific analysis without losing the data’s source or limitations.

## 0:30–1:05 — Real global observations

**Record:** Stay on the globe. Rotate slightly, then expand the right-side **Observations** list and select `ARGO-3902755-003-A` (the fifth listed profile). Hold the transition; do not click again while it is updating.

**Say:**

> This globe shows 54 measured Core Argo profiles across the Indian, Atlantic, and Pacific oceans. The archived profiles retain WMO number, cycle, timestamp, quality-control status, maximum depth, and official GDAC provenance. The global blue ocean provides geographic context, while scientific colour appears only where the active dataset has coverage.

## 1:05–1:50 — Float to local water column

**Record:** Let the transition finish. Point to **Arabian Sea · Indian Ocean**, **India**, coordinates, timestamp, and depth. Show the temperature profile and enable **Compare with model**.

**Say:**

> This float lies in the Arabian Sea inside the historical model window. OceanTwin opens the regional water column and preserves the instrument context. This curve is measured Argo temperature, not generated display data. We can switch to salinity and compare the profile with the model at the float coordinates and nearest model time. RMSE, MAE, bias, matched samples, and time offset are calculated from the overlapping values.

## 1:50–2:35 — Depth, volume, and time

**Record:** Close the inspector. Open **Depth**, select 200 m then 500 m, and close the drawer. Select **Layers → Volume View**, then press **Escape**. Show **Top-down** and **Angled view**. Click **Next timestep** once, pause on 13 February, then **Previous timestep** to return to 12 February. Hold each finished view for two seconds.

**Say:**

> The HYCOM analysis contains 36 source depth levels down to two thousand metres. OceanTwin supports continuous display-depth selection, depth slices, sampled volume rendering, and fitted camera views. The timeline moves through historical analysis frames from 11 to 13 February 2026. Each interaction requests the selected variable, depth, and time from the backend rather than playing a pre-rendered animation.

## 2:35–3:15 — Currents and chlorophyll

**Record:** Use the right-side **Scientific variable** dropdown: select **Current Speed**, then **Current field mode**. Pause on the field. Select **Chlorophyll** and point to its source note, surface depth and disabled Volume control.

**Say:**

> Current speed is calculated from HYCOM eastward and northward velocity components. Colour shows magnitude, while vectors and particles communicate direction. Chlorophyll comes from a separate NASA Aqua MODIS February 2026 monthly surface composite. OceanTwin locks it to the surface and preserves missing satellite pixels. The selected Core Argo floats measure temperature and salinity; they do not measure the displayed chlorophyll or current speed.

## 3:15–4:00 — Scientific analysis

**Record:** Select **Temperature** and **Depth slice mode**. Set depth to **0 m**. Open **Analysis → Profile Probe**; enter latitude **15**, longitude **63**, then click **Run analysis**. Hold the descending depth axis and numeric table. Close the analysis. Open **Analysis → Transect**; enter A = **15, 63**, B = **10, 68**, then click **Run analysis**. Hold the chart and **776.86 km** result. Close the analysis.

**Say:**

> The viewer is also an analysis workspace. A profile probe samples supported variables through the water column. A transect follows the shortest geographic path between two selected coordinates at the active depth. Region statistics can calculate finite-cell mean, minimum, maximum, median, and standard deviation. Missing coastal cells remain missing, so OceanTwin does not invent values over land or unsupported water.

## 4:00–4:40 — NetCDF ingestion

**Record:** Open **Settings → Load NetCDF / observation CSV** and upload `OceanTwin_Real_Arabian_Sea.nc`. Wait for **UPLOADED NETCDF DATA**. Show **Arabian Sea · 13 February 2026**, **Frame 01 / 1**, and **5 NetCDF stations**. Expand **Observations**, select **MODEL-STATION-03**, then click **Top-down**. Hold the **UPLOADED MODEL WATER COLUMN** profile.

**Say:**

> OceanTwin can ingest a compatible NetCDF file during the session. The service validates coordinates, dimensions, units, missing values, aliases, file size, and decoded-memory bounds before activation. The interface then rebuilds its domain, variables, time axis, and inspection stations from the uploaded file. These five stations sample the uploaded model; they are not additional measured floats. Invalid files are rejected without replacing the working dataset.

## 4:40–5:00 — Architecture and close

**Record:** Close the inspector. Select **Settings → Restore historical dataset**. Wait for **System Ready**, then hold the globe with 54 Argo profiles for the closing line.

**Say:**

> OceanTwin combines React, Cesium, scientific WebGL visualization, FastAPI, xarray, NumPy, and NetCDF in one locally deployable application. It turns fragmented ocean files into a clear journey: locate, descend, compare, and analyze. OceanTwin—global context, local evidence, and ocean data people can understand.

## Use these claims

- Historical HYCOM analysis
- Measured Core Argo temperature and salinity profiles
- NASA MODIS monthly satellite surface chlorophyll
- Model-derived current speed
- Reproducible offline historical snapshot
- Submission-ready and extensible prototype

Do not describe the bundled data as live, call the chlorophyll product daily, claim that Core Argo measured chlorophyll or currents, or present the prototype as an operational advisory system.

## Recording recovery

- Press **Escape** to close an obstructing panel.
- Use **Reset view** if the regional camera becomes awkward.
- Choose another clearly wet point when an analysis click lands on land.
- Restore the historical dataset using **Settings**; then refresh to replay the introduction. Refresh preserves the currently active server dataset.

## Timing and recording technique

- Record the screen and narration separately if file-picker handling makes a single take awkward. Keep real interactions and results; trim idle waiting between shots.
- Capture at 1080p, browser zoom 100%, hardware acceleration enabled. Keep the pointer away from charts during visual holds to avoid stray tooltips.
- Close each drawer before showcasing the ocean. Wait for System Ready before recording a result.
- The spoken script leaves room for clicking and visual holds. If a segment runs long, shorten the hold rather than rushing the scientific explanation.
- Optional four-member split: member 1, 0:00–1:05; member 2, 1:05–2:35; member 3, 2:35–4:00; member 4, 4:00–5:00.

## Questions to prepare for

**Why is the colored field regional?** The bundled HYCOM source covers the Indian Ocean window. Global Argo profiles are real observations, but they do not create a global gridded model. Outside the model window we show the measured profile without unsupported comparison values.

**Does Argo measure the chlorophyll and speed shown here?** These Core Argo profiles measure temperature and salinity. Chlorophyll is NASA MODIS monthly surface data; current speed is derived from HYCOM u/v.

**Is every problem-statement item complete?** The demonstrated exploration, ingestion and analysis workflow is implemented. General runtime OPeNDAP, OGC WMS/WCS and a dynamic plugin registry remain roadmap work. See SUBMISSION_READINESS.md for the precise requirement mapping.

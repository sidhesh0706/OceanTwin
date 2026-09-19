# OceanTwin five-minute submission video

This script is timed for **5:00** at a clear presentation pace. Record at 1920 × 1080 with browser zoom at 100%. Start at `http://127.0.0.1:8000/` and keep `data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc` ready for upload.

## Before recording

1. Run `.\.venv\Scripts\python.exe run.py` from the repository root.
2. Refresh once and wait for **Earth ready**.
3. Close unrelated windows and notifications.
4. Rehearse selecting `ARGO-3902755-003-A`, which overlaps the bundled model domain.
5. Move deliberately and wait for each **Updating** indicator to return to **System Ready**.

## 0:00–0:30 — Problem and solution

**Record:** Hold the introduction for two seconds, then click **Explore the ocean** and let the globe settle.

**Say:**

> India’s ocean data is powerful, but it is distributed across model grids, satellite products, instrument profiles, depths, and timestamps. OceanTwin brings these sources into one explainable workspace. A user can begin with the Earth, locate a real observation, descend into its surrounding water column, and perform scientific analysis without losing the data’s source or limitations.

## 0:30–1:05 — Real global observations

**Record:** Select **View → Earth**. Rotate the globe slightly. Expand **Observations**, briefly show the list, and select `ARGO-3902755-003-A`.

**Say:**

> This globe shows 54 measured Core Argo profiles across the Indian, Atlantic, and Pacific oceans. The archived profiles retain WMO number, cycle, timestamp, quality-control status, maximum depth, and official GDAC provenance. The global blue ocean provides geographic context, while scientific colour appears only where the active dataset has coverage.

## 1:05–1:50 — Float to local water column

**Record:** Let the transition finish. Point to **Arabian Sea · Indian Ocean**, **India**, coordinates, timestamp, and depth. Show the temperature profile and enable **Compare with model**.

**Say:**

> This float lies in the Arabian Sea inside the historical model window. OceanTwin opens the regional water column and preserves the instrument context. This curve is measured Argo temperature, not generated display data. We can switch to salinity and compare the profile with the model at the float coordinates and nearest model time. RMSE, MAE, bias, matched samples, and time offset are calculated from the overlapping values.

## 1:50–2:35 — Depth, volume, and time

**Record:** Close the inspector if needed. Use **Depth** to select 200 m and 500 m. Choose **Layers → Volume View**, switch between **Top-down** and **Angled view**, then advance the timeline once.

**Say:**

> The HYCOM analysis contains 36 source depth levels down to two thousand metres. OceanTwin supports continuous display-depth selection, depth slices, sampled volume rendering, and fitted camera views. The timeline moves through historical analysis frames from 11 to 13 February 2026. Each interaction requests the selected variable, depth, and time from the backend rather than playing a pre-rendered animation.

## 2:35–3:15 — Currents and chlorophyll

**Record:** Select **Current Speed → Current Field**. Pause for the vectors, then select **Chlorophyll** and show its surface-only state and source note.

**Say:**

> Current speed is calculated from HYCOM eastward and northward velocity components. Colour shows magnitude, while vectors and particles communicate direction. Chlorophyll comes from a separate NASA Aqua MODIS February 2026 monthly surface composite. OceanTwin locks it to the surface and preserves missing satellite pixels. The selected Core Argo floats measure temperature and salinity; they do not measure the displayed chlorophyll or current speed.

## 3:15–4:00 — Scientific analysis

**Record:** Return to **Temperature → Depth Slice**. Run **Analysis → Profile Probe** on a clearly wet point. Close it, then run **Transect** and select two wet points. Pause on the result chart.

**Say:**

> The viewer is also an analysis workspace. A profile probe samples supported variables through the water column. A transect follows the shortest geographic path between two selected coordinates at the active depth. Region statistics can calculate finite-cell mean, minimum, maximum, median, and standard deviation. Missing coastal cells remain missing, so OceanTwin does not invent values over land or unsupported water.

## 4:00–4:40 — NetCDF ingestion

**Record:** Open **Settings → Load NetCDF / observation CSV** and upload `OceanTwin_Real_Arabian_Sea.nc`. Wait for success, then show the changed domain, time axis, dataset label, and model inspection stations.

**Say:**

> OceanTwin can ingest a compatible NetCDF file during the session. The service validates coordinates, dimensions, units, missing values, aliases, file size, and decoded-memory bounds before activation. The interface then rebuilds its domain, variables, time axis, and inspection stations from the uploaded file. Invalid files are rejected without replacing the working dataset.

## 4:40–5:00 — Architecture and close

**Record:** Restore the historical dataset and finish on the globe with Argo markers visible.

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
- Refresh to return to a clean introduction and historical workspace.

# OceanTwin national-submission demo script

Target length: **6 minutes 30 seconds**. Record at 1920 × 1080, browser zoom 100%, with the cursor visible. Start from `http://127.0.0.1:8000/` so the OceanTwin introduction appears. Keep `data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc` ready in the file picker.

## Before recording

1. From the repository root, run `.\.venv\Scripts\python.exe run.py`.
2. Open the prototype and refresh once. Wait for **Earth ready** before recording.
3. Close notifications and unrelated windows. Disable browser bookmarks and recording overlays that cover the interface.
4. Rehearse the Indian Ocean float `ARGO-3902755-003-A`; it is inside the bundled model domain.
5. Use the default historical workspace for time animation. The prepared upload contains one time frame.

## 0:00–0:35 — Problem and opening

**Record:** Hold the OceanTwin introduction for two seconds. Slowly move the cursor over the globe, then click **Explore the ocean**. Let the transition finish.

**Narration:**

> India’s ocean observations are scientifically rich, but they are spread across files, coordinates, depths, times, and platforms. OceanTwin brings those dimensions into one interactive workspace. It connects a global observation network with depth-resolved model fields, satellite ocean colour, and analysis tools, so a user can move from the Earth to a specific water column without losing scientific context.

## 0:35–1:15 — Global observation network

**Record:** Click **View → Earth**. Rotate the globe slightly. Expand **Observations** in the right panel and briefly scroll the measured profile list. Do not select the first float. Select `ARGO-3902755-003-A`.

**Narration:**

> The starting view is a real Earth globe with 54 measured Core Argo profiles across the Indian, Atlantic, and Pacific oceans. Each marker retains its WMO identifier, cycle, timestamp, maximum sampled depth, quality-control status, and official GDAC source. The blue global ocean is geographic context; the scientific model overlay appears only where the active dataset has coverage.

## 1:15–2:05 — Globe to local ocean and measured profile

**Record:** Allow the selected float to transition into the regional ocean. Keep the inspector visible. Point to **Arabian Sea · Indian Ocean**, **India**, the coordinates, date, depth, and the temperature profile. Toggle **Compare with model** and pause on the chart and metrics.

**Narration:**

> This float lies in the Arabian Sea, within the Indian Ocean model domain. OceanTwin now opens a local flat and angled ocean view around the instrument. The profile is measured data, not a generated curve. We can compare its temperature or salinity with the historical model at the float coordinates and nearest model time. RMSE, MAE, bias, matched samples, and time offset are calculated from the returned profiles.

## 2:05–2:55 — Depth, volume, and time

**Record:** Close the inspector if it obscures the field. Click **Depth**, select **200 m**, then **500 m**. Click **Layers → Volume View**. Use **Top-down**, then **Angled view**. Click the next time-frame button twice, slowly enough for each update to finish.

**Narration:**

> The model contains 36 source depth levels down to two thousand metres. We can inspect a continuous display depth, switch between a surface-style slice and a sampled volume, and change camera perspective. The timeline moves through three historical HYCOM analysis frames from 11 to 13 February 2026. Every change requests the active variable, depth, and time from the backend; it is not a pre-rendered animation.

## 2:55–3:35 — Currents and chlorophyll provenance

**Record:** Click **Layers → Current Speed**, then **Current Field**. Let the flow render. Next choose **Chlorophyll** and pause on the source note and surface-only control state.

**Narration:**

> Current speed is derived from the HYCOM eastward and northward velocity components. The vectors and animated particles communicate direction, while the colour scale carries the numerical magnitude. Chlorophyll is a separate NASA Aqua MODIS February 2026 monthly surface composite. OceanTwin correctly locks it to the surface and preserves missing satellite pixels. Core Argo measures temperature and salinity here; we never claim that these floats measured chlorophyll or current speed.

## 3:35–4:35 — Scientific analysis

**Record:** Return to **Temperature** and **Depth Slice**. Click **Analysis → Profile Probe**, then click a wet point inside the field and pause on the returned multi-variable profile. Close it. Run **Analysis → Transect** and select two wet points across the regional ocean. Pause on the distance plot. If time permits, show **Region Stats** and select the requested corners.

**Narration:**

> OceanTwin turns the visualization into an analysis workspace. A profile probe samples all supported variables through the water column. A transect follows a great-circle path between two selected coordinates at the active depth. Region statistics report finite grid-cell mean, minimum, maximum, median, and standard deviation. Missing coastal cells stay missing, so the interface does not invent values over land or unsupported water.

## 4:35–5:30 — NetCDF ingestion proof

**Record:** Click **Settings → Load NetCDF / observation CSV** and upload `data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc`. Wait for the success notice. Show the changed dataset name, domain, one-frame time axis, observation stations, and one field value or model profile.

**Narration:**

> The same interface can ingest a compatible NetCDF file. This prepared Arabian Sea file contains real 13 February historical fields. The FastAPI service validates coordinates, dimensions, units, aliases, missing values, file size, and decoded-memory bounds before it swaps the active dataset. The interface then rebuilds its domain, time axis, variables, model stations, and returned field values from the uploaded file. A failed validation leaves the previous workspace untouched.

## 5:30–6:10 — Architecture and offline reliability

**Record:** Click **Settings → Restore historical dataset**. While it restores, show the stable header and then the globe. Optionally cut to a clean architecture slide from the SIH deck for ten seconds.

**Narration:**

> OceanTwin uses React, TypeScript, Cesium, Three.js, and WebGL on the client, with FastAPI, xarray, NumPy, SciPy, pandas, and NetCDF on the backend. The submission runs locally in one Python process. Its Earth imagery, geographic data, model snapshot, satellite composite, and Argo catalogue are bundled, so the core demonstration does not depend on venue connectivity.

## 6:10–6:30 — Closing

**Record:** Finish on the full globe with Argo markers visible. Keep the cursor still.

**Narration:**

> OceanTwin converts fragmented ocean files into an explainable journey from global context to local evidence: locate, descend, compare, and analyze. For researchers, planners, educators, and decision-makers, it makes multidimensional ocean data easier to inspect without hiding its source or limitations. OceanTwin: one Earth, many depths.

## Claims to use exactly

- Say **historical HYCOM analysis**, **measured Argo profile**, and **monthly satellite surface composite**.
- Say the prototype is **submission-ready and extensible**, not an operational forecast or advisory system.
- Explain that global Argo profiles outside the Indian Ocean model window remain measurable profile views; model comparison is disabled where there is no overlap.
- Explain that current particles are a visual aid; numerical speed and direction come from the model u/v fields.
- Do not say Core Argo measured chlorophyll or currents, that the MODIS composite is daily, or that the bundled snapshot is live.

## Recovery during recording

- If a panel obscures the field, click its rail icon again or press **Escape**.
- If a camera angle is awkward, use **Reset view** or **View → Ocean Domain**.
- If an analysis click lands on land, select another clearly wet point.
- If the upload section takes too long, cut after the success notice and continue from the restored workspace.
- If anything becomes visually cluttered, refresh; the premium OceanTwin intro and default historical workspace return cleanly.

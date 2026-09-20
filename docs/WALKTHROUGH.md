# OceanTwin — exact five-minute video script

Ten 30-second blocks, with precise recording actions and voiceover. Record the real application at 1920 × 1080, 100% browser zoom. Record narration separately if necessary, then trim only idle loading/file-picker time. Keep each result visible long enough to read. The sub-times below are editing targets, not promises of network or rendering speed.

## Prepare before recording

1. Start from the repository root: `.\.venv\Scripts\python.exe run.py`.
2. Open `http://127.0.0.1:8000/`. If an uploaded dataset is active, enter the workspace and choose **Settings → Restore historical dataset**. Refresh to replay the introduction. Refresh alone does not reset the active server dataset.
3. Wait for **Earth ready**. Close notifications and unrelated browser tabs. Enable hardware acceleration.
4. Keep `data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc` ready in the file picker.
5. Rehearse the sequence once. Wait for **System Ready** before capturing a result. The selected float automatically chooses the nearest model frame, 12 February.
6. Record exactly the controls below. Do not open external source links during the take.

## 0:00–0:30 | Introduction and data identity

**Screen recording**

- **0:00–0:08:** Hold the introduction: OceanTwin title, globe and “Explore beneath the surface.”
- **0:08–0:16:** Move the pointer to the footer: **54 MEASURED ARGO PROFILES**, then **HISTORICAL HYCOM + NASA MODIS**. Do not open the attribution popup.
- **0:16–0:23:** Click **Explore the ocean** once. Let the transition finish.
- **0:23–0:30:** Hold the globe and its observation markers.

**Voiceover**

> Ocean data arrives as separate files, model grids and instrument profiles. OceanTwin brings them into one browser workspace, connecting the globe to the water column. We combine measured Argo observations, historical HYCOM ocean fields and NASA MODIS surface chlorophyll. The Earth photograph supplies geographic context; the scientific layers have their own sources and dates.

## 0:30–1:00 | Select a real Argo float

**Screen recording**

- **0:30–0:37:** Slowly drag the globe a short distance to reveal the global markers; avoid a full spin.
- **0:37–0:43:** Click the right-side **Observations** button, not the uppercase navigation tab.
- **0:43–0:49:** Click **ARGO-3902755-003-A** (fifth in the bundled list).
- **0:49–1:00:** Let the regional transition finish. Hold the inspector and flat ocean scene.

**Voiceover**

> Our historical catalogue contains 54 real Core Argo profiles across the Indian, Atlantic and Pacific oceans. Selecting this Arabian Sea float opens its surrounding model water column. The observation stays connected to its location, collection time, maximum depth and official source, so the visualization remains traceable to the underlying measurement.

## 1:00–1:30 | Measured profile and model comparison

**Screen recording**

- **1:00–1:07:** Point to **MEASURED ARGO PROFILE**, WMO/cycle, timestamp and source link in the inspector.
- **1:07–1:13:** Hold the temperature-versus-depth chart; point from the surface down to deeper values.
- **1:13–1:19:** Check **Compare with model**. Wait for the second curve and metrics.
- **1:19–1:30:** Hold **RMSE**, **MAE**, **BIAS**, matched levels and the model-time offset. With the unchanged bundled data: temperature RMSE ≈ **0.372 °C**, **997 matched levels**, offset **9.2 h**.

**Voiceover**

> This curve is measured Argo temperature. We compare it with HYCOM at the float coordinates and nearest available model time. OceanTwin calculates RMSE, mean absolute error and bias from overlapping samples, and shows the time offset explicitly. These metrics describe agreement with the historical analysis; they are not an independent forecast-accuracy claim.

## 1:30–2:00 | Depth and regional views

**Screen recording**

- **1:30–1:34:** Click **Close inspector**.
- **1:34–1:40:** Click **Depth**, then **200**. Hold the updated slice.
- **1:40–1:46:** Click **500**. Hold the updated depth, then close the Depth drawer.
- **1:46–1:52:** Click the right-side **Volume view mode** button.
- **1:52–2:00:** Click **Top-down**, pause, then **Angled view** and hold. Keep the pointer off the ocean labels.

**Voiceover**

> The model contains 36 source depth levels reaching two thousand metres. Here we move from two hundred to five hundred metres, then examine the sampled volume from above and at an angle. The regional view preserves geographic context while the depth scale reveals the water column. Vertical exaggeration supports exploration rather than representing actual seabed geometry.

## 2:00–2:30 | Historical time and currents

**Screen recording**

- **2:00–2:06:** Click **Next timestep** at the bottom. Hold **13 Feb 2026** and **Frame 03 / 3**.
- **2:06–2:11:** Click **Previous timestep** to return to **12 Feb 2026**.
- **2:11–2:18:** Open **Scientific variable** on the right; select **Current Speed**.
- **2:18–2:24:** Click **Current field mode**. Wait for the field to settle.
- **2:24–2:30:** Hold the flow display and speed legend in **m/s**.

**Voiceover**

> The timeline explores three historical analysis frames from eleven to thirteen February. Each selection updates the displayed field. Current speed is calculated from HYCOM eastward and northward velocity components. The flow display communicates direction and magnitude, while the animated particles are illustrative. We keep these model-derived currents distinct from the Argo measurements.

## 2:30–3:00 | Chlorophyll and its limits

**Screen recording**

- **2:30–2:36:** Select **Chlorophyll** in **Scientific variable**.
- **2:36–2:44:** Hold its source paragraph and **mg/m³** legend on the right.
- **2:44–2:51:** Point to **0 m** and the disabled Volume control; do not click it.
- **2:51–3:00:** Select **Temperature**, then **Depth slice mode**. Chlorophyll reset depth to the surface; confirm **0 m** before continuing.

**Voiceover**

> Chlorophyll comes from NASA Aqua MODIS: a February monthly surface composite. It indicates surface pigment concentration and is restricted to the surface; missing satellite pixels remain missing. These Core Argo floats measure temperature and salinity, not the chlorophyll or current speed shown here. OceanTwin makes those distinctions visible instead of mixing sources into a misleading profile.

## 3:00–3:30 | Profile probe

**Screen recording**

- **3:00–3:05:** Click **Analysis → Profile Probe**.
- **3:05–3:13:** Enter **A latitude = 15**, **A longitude = 63**.
- **3:13–3:18:** Click **Run analysis** once; wait for the result.
- **3:18–3:27:** Hold the temperature-depth chart and table. Scroll inside the panel slightly if needed to reveal deeper rows.
- **3:27–3:30:** Click **Close spatial analysis**.

**Voiceover**

> We can also investigate a location without selecting a float. At fifteen degrees north and sixty-three degrees east, the profile probe samples the model through the water column. The chart shows depth increasing downward, and the table exposes the values behind the visual. Surface-only chlorophyll remains absent below the surface rather than being extended into invented depths.

## 3:30–4:00 | Ocean transect

**Screen recording**

- **3:30–3:35:** Click **Analysis → Transect**.
- **3:35–3:45:** Enter **A latitude = 15**, **A longitude = 63**, **B latitude = 10**, **B longitude = 68**.
- **3:45–3:50:** Click **Run analysis** once.
- **3:50–3:58:** Hold the temperature-versus-distance chart and **776.86 km** result.
- **3:58–4:00:** Click **Close spatial analysis**.

**Voiceover**

> A transect compares conditions along a geographic route. Here we sample surface temperature between two Arabian Sea coordinates over approximately seven hundred and seventy-seven kilometres. The chart uses distance along the shortest great-circle route at the selected depth. Gaps remain visible where data is unavailable, preserving the difference between a missing value and a scientific result.

## 4:00–4:30 | Upload a real NetCDF file

**Screen recording**

- **4:00–4:05:** Click **Settings → Load NetCDF / observation CSV**.
- **4:05–4:12:** Select **OceanTwin_Real_Arabian_Sea.nc** from the prepared folder. Confirm the file-picker selection.
- **4:12–4:20:** Wait for the success message and **UPLOADED NETCDF DATA**. Trim idle waiting if necessary.
- **4:20–4:30:** Point to **Arabian Sea · 13 February 2026**, the changed domain, **5 NetCDF stations**, and **Frame 01 / 1**. The time controls are disabled because this file has one frame.

**Voiceover**

> Now we upload a real Arabian Sea NetCDF subset. OceanTwin validates the file before replacing the active dataset, then rebuilds the domain, variables and timeline from its contents. This file has one historical time frame. Five clickable inspection stations provide access to its model water columns; they are sampled model locations, not newly measured Argo floats.

## 4:30–5:00 | Inspect uploaded data and close

**Screen recording**

- **4:30–4:35:** Click the right-side **Observations** list and select **MODEL-STATION-03**.
- **4:35–4:42:** Let the transition finish. Hold **UPLOADED MODEL WATER COLUMN**, its temperature profile, date and coordinates.
- **4:42–4:48:** Click **Top-down** and hold the regional view with the profile beside it.
- **4:48–4:55:** Close the inspector. Click **Settings → Restore historical dataset** and wait for the globe.
- **4:55–5:00:** Hold the restored globe and OceanTwin branding for the final line. End at exactly 5:00.

**Voiceover**

> Selecting a station opens the uploaded water column and regional view, making a scientific file immediately explorable. OceanTwin connects observation, visualization and analysis through a browser interface backed by Python scientific services. Our next interoperability milestones are general OPeNDAP access and OGC services. OceanTwin: global context, local evidence, and ocean data people can understand.

## Presenter split and recovery

For four speakers: member 1 covers 0:00–1:00; member 2 covers 1:00–2:30; member 3 covers 2:30–4:00; member 4 covers 4:00–5:00. One operator should control the mouse throughout, or assemble the ten clips after recording.

If rendering takes longer, keep the actual result and trim idle waiting in the edit. Never fake data changes. Press Escape to close a tool drawer, use Reset view to recover camera framing, and restore the historical dataset before another full take.

## Explain the attribution if asked

The Cesium “Data attribution” popup credits the Earth background photograph: NASA Earth Observatory, Reto Stöckli, Blue Marble, January 2004. That is the image date, not the observation date. Argo profiles are sourced from official GDAC data; the selected inspector shows their provenance. HYCOM fields cover 11–13 February 2026, while MODIS chlorophyll is a February 2026 monthly surface composite. The front-page source labels distinguish these sources.

## Scope to state accurately

The gridded model is regional; global Argo observations do not imply a global model field. This is an archived historical workflow, not live monitoring. General runtime OPeNDAP, OGC WMS/WCS and dynamic plugin registration remain outstanding. See SUBMISSION_READINESS.md for the full problem-statement mapping. Do not claim guaranteed selection, complete operational deployment or full compliance.


## Optional global-float shot for 0:30–1:00

To demonstrate the new flat-map support, replace the globe rotation in this block: at 0:30 open Observations and choose ARGO-5906600-086-A; hold its Pacific flat map and measured profile until 0:40. Click Back to Earth, reopen Observations and select ARGO-3902755-003-A by 0:49, then hold the Arabian Sea transition until 1:00. Say: “Every float opens a local view with its measured profile. Where the active model has coverage, we can also explore the surrounding water column and compare the model with observations.” Continue the remaining script unchanged.

# Validation — 20 September 2026

## Automated checks

- Backend: **38 tests passed** on Windows / Python 3.13.
- Frontend: **7 tests passed**.
- TypeScript and Vite production build: passed.
- Browser workflow audit: intro, primary tool panels, chlorophyll, currents, observation selection, regional transition, and profile comparison passed without console errors.
- Floating tool and observation drawers close automatically when a float opens the regional ocean, keeping the transition and inspector unobstructed.
- Real-data regression tests match prepared temperature, salinity, and current fields to the downloaded HYCOM source arrays.
- Chlorophyll tests verify that the MODIS monthly composite is surface-only, retains missing pixels, and is not fabricated below the surface.
- Argo tests verify all **54 profiles and 37,357 retained measurements** against the three downloaded official GDAC files.
- Upload tests verify that `OceanTwin_Real_Arabian_Sea.nc` changes the active dataset and returned values, and that an invalid upload preserves the previous workspace.

## Rehearsed workflow

The final recording path is documented in [WALKTHROUGH.md](WALKTHROUGH.md). It covers the intro, global Argo mode, Indian Ocean transition, depth/time exploration, observation comparison, transect analysis, and the prepared NetCDF upload.

## Data scope

The bundled workspace is an offline historical snapshot, not a live feed. HYCOM provides model temperature, salinity, and u/v currents for 11–13 February 2026. Current speed is derived from u/v. NASA MODIS provides the February 2026 monthly surface chlorophyll composite. Core Argo profiles provide measured temperature and salinity; they do not provide chlorophyll or current speed.

## Known limits

- The historical HYCOM field covers the Indian Ocean model window, while the Argo catalogue is global.
- Argo floats outside the model window show their measured profile on the globe without model-comparison metrics.
- Satellite chlorophyll is surface-only and may contain cloud or coverage gaps.
- The regional vertical view is deliberately exaggerated and is not a bathymetric reconstruction.
- The current particle animation is illustrative; numeric speed and vectors use the model field.
- Two non-failing dependency warnings remain: a Starlette/AnyIO deprecation and a NumPy native-extension layout warning.

## Final recording audit

The production build was rebuilt after the final UI changes. The current audit passed 38 backend tests and 7 frontend tests. Initial sandbox attempts failed because Windows blocked test temporary-file creation and Node subprocesses; rerunning with the required filesystem/process permissions passed.

Browser interactions verified: replayed introduction after refresh; real Argo selection and regional transition; temperature comparison (0.372 °C RMSE, 997 matched levels for ARGO-3902755-003-A at the nearest model time); 200 m and 500 m selection; volume mode; top-down and angled cameras; advancing to 13 February; current-field selection; chlorophyll volume restriction; Escape drawer dismissal; profile probe at 15°N, 63°E; 776.86 km transect to 10°N, 68°E; real NetCDF file upload; MODEL-STATION-03 profile and top-down view; historical-dataset restoration. No browser warnings or errors were captured during these checks.

Final corrections:

- Probe depth axes increase downward.
- The left Layers drawer respects surface-only variables.
- Regional place labels depend on each label's position, so valid labels no longer disappear when the domain ends at 27.68°N.
- Escape closes tool drawers.
- Uploaded model stations are counted as NetCDF stations, not CTD/BGC observations; the globe hint covers both floats and stations.
- Single-frame datasets disable time playback and stepping.
- The recording guide explicitly calls Run analysis, identifies tested coordinates and a sample station, and distinguishes refresh from restoring the server dataset.

Layout geometry at the approximately 1920 × 1080 audit viewport showed no horizontal document overflow, and the inspector, active-layer panel and timeline occupied separate bounds. Browser screenshot capture failed in the audit environment, so this is not a complete pixel-level visual certification. No frame-rate benchmark or exhaustive device/browser matrix was run. Rehearse the five-minute sequence on the actual recording laptop before capture.

The prototype supports the documented recording workflow. It is not full problem-statement compliance: general runtime OPeNDAP, OGC WMS/WCS and dynamic plugin registration remain outstanding, as recorded in SUBMISSION_READINESS.md.

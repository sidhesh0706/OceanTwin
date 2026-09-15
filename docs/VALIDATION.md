# Validation — 15 September 2026

## Automated checks

- Backend: **38 tests passed** on Windows / Python 3.13.
- Frontend: **7 tests passed**.
- TypeScript and Vite production build: passed.
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

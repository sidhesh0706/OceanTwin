# OceanTwin

### From global ocean observations to explainable local insight

OceanTwin is an interactive ocean data intelligence platform developed for **Smart India Hackathon problem statement SIH26067**. It unifies measured float profiles, historical ocean-model fields, satellite chlorophyll, depth, time, and scientific analysis in one visual workspace.

Users begin with the Earth, select a real observation, descend into its surrounding water column, compare measurement and model profiles, and analyze the active ocean field. The prototype runs locally in one Python process and includes its presentation dataset, imagery, and geographic assets for reliable offline demonstration.

> **Submission dataset:** historical HYCOM temperature, salinity, and velocity fields for 11–13 February 2026; NASA Aqua MODIS February 2026 surface chlorophyll; and 54 measured Core Argo profiles with quality-control and source provenance. The bundled workspace is a reproducible historical snapshot, not a live forecast.

## The challenge

Ocean information is commonly separated across NetCDF grids, instrument profiles, satellite products, coordinates, depth levels, and timestamps. This fragmentation makes it difficult for researchers, planners, educators, and decision-makers to answer simple but important questions:

- What is happening at this location, depth, and time?
- How does a measured profile compare with the surrounding model field?
- Which values are measured, model-derived, or satellite-observed?
- Can a new scientific dataset be inspected without building a new visualization pipeline?

OceanTwin connects those questions in a single evidence-aware workflow.

## What OceanTwin delivers

### Earth-to-ocean exploration

- Interactive Cesium globe with locally bundled NASA Blue Marble imagery.
- Global Argo observation markers across the Indian, Atlantic, and Pacific oceans.
- Smooth transition from a selected float to a regional top-down or angled ocean view.
- Named geographic context for India, the Arabian Sea, Bay of Bengal, surrounding seas, and ocean basin.
- Independent Earth imagery and scientific overlay controls.

### Depth, time, and physical fields

- Temperature, salinity, satellite chlorophyll, and derived current speed.
- Continuous display-depth selection across 36 source levels down to 2,000 metres.
- Three historical model frames with playback and timeline scrubbing.
- Depth slices, sampled volume rendering, current vectors, streamlines, and isosurfaces.
- Variable-aware colour ranges, palettes, opacity, logarithmic scaling, and vertical exaggeration.

### Measurements and scientific analysis

- Measured Core Argo temperature and salinity profiles with WMO number, cycle, timestamp, data mode, QC status, and GDAC source link.
- Model–observation collocation at the instrument coordinates and measured depths.
- Calculated RMSE, MAE, bias, matched levels, and model-time offset.
- Water-column profile probes for all supported fields.
- Fixed-depth great-circle transects.
- Regional mean, minimum, maximum, median, and standard deviation.
- Explicit separation of measured Argo variables, satellite chlorophyll, and model-derived currents.

### Validated data ingestion

- Upload and inspect compatible NetCDF datasets without restarting the application.
- Coordinate alias detection, unit normalization, missing-value handling, and bounded decoding.
- Automatically generated model-inspection stations for uploaded ocean areas.
- CSV, TSV, and semicolon-delimited observation profile ingestion.
- Transactional failure handling: an invalid upload does not replace the active workspace.

## Why the prototype stands out

| Capability | OceanTwin approach |
| --- | --- |
| Scientific integrity | Source labels remain visible; unsupported values and coastal gaps stay missing. |
| Explainability | Measurements, model values, satellite products, and derived quantities are clearly distinguished. |
| End-to-end workflow | Ingestion, visualization, comparison, and analysis run in one application. |
| Presentation reliability | The production viewer, imagery, geographic context, and historical data work locally without venue connectivity. |
| Extensibility | Dataset adapters, analysis services, API routes, and renderers are separated for future data sources. |
| Safety and bounds | Upload size, decoded-memory limits, coordinates, dimensions, calendars, and units are validated before activation. |

## Verified evidence

- **54 measured Argo profiles** and **37,357 retained quality-controlled measurements**.
- **36 model depth levels** to **2,000 m** across three historical analysis frames.
- Real HYCOM temperature, salinity, eastward velocity, and northward velocity source arrays.
- Current speed calculated as `sqrt(u² + v²)`.
- NASA Aqua MODIS chlorophyll retained as a surface-only monthly composite.
- **38 backend tests**, **7 frontend scientific-rendering tests**, TypeScript validation, formatting, and production build passing for the submission release.

See [validation evidence](docs/VALIDATION.md), [real ocean data provenance](docs/REAL_OCEAN.md), and [Argo processing and provenance](docs/REAL_ARGO.md).

## Demonstration path

1. Enter from the OceanTwin introduction.
2. Explore measured Argo coverage on the globe.
3. Select `ARGO-3902755-003-A` to open the Arabian Sea water column.
4. Inspect temperature and salinity, then enable model comparison.
5. Explore depth, model time, currents, and surface chlorophyll.
6. Run a profile probe or transect.
7. Upload `data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc` and show the workspace adapting to the file.
8. Restore the historical workspace.

The exact five-minute recording narration is in [docs/WALKTHROUGH.md](docs/WALKTHROUGH.md).

## System architecture

```mermaid
flowchart LR
    N[Historical or uploaded NetCDF] --> A[xarray and NumPy adapter]
    O[Argo or uploaded observations] --> S[Ocean service]
    A --> S
    S --> API[FastAPI endpoints]
    API --> UI[React and TypeScript workspace]
    UI --> G[Cesium Earth view]
    UI --> R[Regional ocean renderer]
    UI --> C[Profiles and analysis]
    E[NASA imagery and Natural Earth geometry] --> G
    E --> R
```

### Technology

- **Frontend:** React 19, TypeScript, Cesium, Three.js, React Three Fiber, Recharts, Vite
- **Backend:** Python, FastAPI, xarray, NumPy, SciPy, pandas, netCDF4
- **Data formats:** NetCDF, JSON, GeoJSON, CSV/TSV
- **Deployment:** single local Python process serving the API and optimized frontend

## Run the submission build

### Requirements

- Python 3.12 or newer; Python 3.13 is tested.
- Node.js 22 LTS and npm.
- A WebGL-capable browser with hardware acceleration.
- Internet access during first-time dependency installation only.

### Windows and PyCharm setup

From the repository root:

```powershell
python setup_project.py
.\.venv\Scripts\python.exe run.py
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

For PyCharm, select `.venv\Scripts\python.exe` as the interpreter and run `run.py` from the repository root.

Useful routes:

- Introduction: `http://127.0.0.1:8000/`
- Direct explorer: `http://127.0.0.1:8000/?explore`
- Interactive API contract: `http://127.0.0.1:8000/docs`

The setup script creates the virtual environment, installs locked Python dependencies, runs `npm ci`, prepares local Cesium assets, and builds the optimized frontend.

## Verification

```powershell
.\.venv\Scripts\python.exe -m pytest -q
Push-Location frontend
npm test
npm run format:check
npm run build
Pop-Location
```

The backend suite covers dataset metadata, interpolation, temporal changes, currents, API validation, uploads, rollback behavior, periodic coordinates, dateline transects, profiles, comparisons, and regional statistics. Frontend checks cover geographic interpolation, periodic seams, coastline gaps, masking, and isosurface geometry.

## API summary

| Endpoint | Purpose |
| --- | --- |
| `GET /api/datasets` | Active dataset metadata and provenance |
| `GET /api/ocean/slice` | Variable at a selected depth and time |
| `GET /api/ocean/volume` | Bounded depth-resolved field |
| `GET /api/currents` | Eastward and northward current field |
| `GET /api/ocean/inspect` | Interpolated values at a coordinate |
| `GET /api/ocean/profile` | Full model water-column profile |
| `GET /api/ocean/region` | Regional field, currents, coastline, and observations |
| `GET /api/ocean/transect` | Fixed-depth great-circle transect |
| `GET /api/ocean/stats` | Statistical summary for a selected region |
| `GET /api/observations/{id}` | Observation metadata and measurements |
| `GET /api/compare/{id}` | Model–observation profiles and metrics |
| `POST /api/datasets/upload` | Validate and activate a NetCDF dataset |
| `POST /api/observations/upload` | Validate and activate observation profiles |
| `POST /api/datasets/real-argo` | Restore the bundled historical workspace |

## Scientific scope

OceanTwin keeps its claims aligned with the supplied evidence:

- The bundled fields are a historical HYCOM analysis, not a live operational forecast.
- Core Argo profiles provide measured temperature and salinity; they do not supply the displayed chlorophyll or current speed.
- Chlorophyll is a February 2026 monthly satellite surface composite and has no fabricated subsurface values.
- Current speed is derived from model velocity components; animated particles are a directional visual aid.
- Comparisons use finite overlapping samples and report `model - observation` statistics.
- The regional vertical scale is deliberately exaggerated and labelled for exploration.
- Global floats outside the Indian Ocean model window remain available as measured profiles without unsupported model comparison.
- Transects are fixed-depth paths, and regional statistics are equally weighted grid-cell summaries.

## Repository guide

```text
backend/                  FastAPI application, adapters, services, data, and tests
frontend/src/             React workspace, globe, ocean renderer, charts, and controls
frontend/public/          Bundled Earth imagery, geography, and Cesium assets
frontend/scripts/         Scientific rendering checks and asset preparation
data_sources/             Preserved provider subsets and prepared upload sample
docs/                     Validation, provenance, presentation, and recording guides
run.py                    PyCharm and production entry point
setup_project.py          Reproducible local setup
```

## Submission resources

- [Five-minute demo script](docs/WALKTHROUGH.md)
- [SIH presentation guide and judge Q&A](docs/SIH_PRESENTATION_GUIDE.md)
- [Problem-statement readiness](docs/SUBMISSION_READINESS.md)
- [Automated and browser validation](docs/VALIDATION.md)
- [Real ocean dataset provenance](docs/REAL_OCEAN.md)
- [Argo provenance and quality filtering](docs/REAL_ARGO.md)

## Roadmap

The current release proves the complete local workflow. Future production work includes live provider ingestion, operational forecast provenance, authentication, deployment monitoring, area-weighted regional statistics, broader grid support, OGC interoperability, and domain review for decision-support use.

# OceanTwin: problem-statement and presentation readiness

Reviewed 14 September 2026 against the supplied SIH problem statement. This is a tested local prototype, not an operational INCOIS service or a standards certification.

## Implemented in this iteration

| Requirement | Verified implementation | Scope / remaining work |
| --- | --- | --- |
| Real observations | 17 historical Argo profiles, 11,485 depth rows, official source retained; QC 1 adjusted A/D data; pressure-to-depth conversion | Historical snapshot, not live monitoring; model remains synthetic |
| Observation ingestion | CSV, TSV and semicolon text; whole-file validation; six instrument labels; temperature, salinity and chlorophyll | Native ADCP velocity and additional BGC variables require adapters; only Argo has bundled real records |
| 3D and 4D exploration | Earth-to-ocean transition, top-down and angled local views, depth/time, volume points, currents | Volume ray casting is not implemented; domain boundaries reflect source coverage |
| True isosurface | Marching-tetrahedra triangle mesh in local ocean, adjustable threshold | Sampled model grid; missing cells stay open; does not fabricate coastal measurements |
| Display controls | Variable/Viridis/thermal palettes, linear/log scale, color range, opacity, continuous exaggeration | Log scale requires a positive minimum; exaggerated depth is a visual aid |
| Analysis | Collocated profiles, time offset, RMSE/MAE/bias, probes, fixed-depth great-circle transects and regional statistics | Real-Argo vs synthetic-model comparison is illustrative, not forecast validation |
| NetCDF and REST | Rectilinear CF-style ingestion, bounded FastAPI endpoints and uploads, local compressed responses | Broader grids/calendars need preprocessing |
| Outreach | Premium intro on refresh, actual Earth imagery, presentation mode, offline assets and provenance | Rehearse on the recording laptop with hardware acceleration |
| OPeNDAP / OGC WMS/WCS | Not implemented | Still required for the full interoperability requirement |
| Extensibility | Separate model and observation adapters and renderers | Dynamic plugin registry and arbitrary variable registration remain future work |

## Verification

Production TypeScript/Vite build passes. Backend: 36 tests pass, including direct comparison with the preserved Argo NetCDF, upload replacement/rollback and existing field/analysis checks. Frontend: 7 tests pass for interpolation, periodic seams, geographic masks, coastal display and analytic isosurface geometry. Browser checks cover real profile selection, ocean transition, provenance/chart, local isosurface, palette controls and loading state. Automated tests do not certify every browser or target GPU.

The preserved model sample has also passed model upload, slice, volume, currents, profile, transect and statistics API checks. Uploading a model clears the separate catalogue. Upload observations afterwards, or use Settings → Real Argo + demo model to restore the presentation setup. Restore demo model selects the old synthetic instruments.

## Five-minute recording

| Time | Action and narration |
| --- | --- |
| 0:00–0:25 | Refresh to show premium intro and enter the actual Earth globe. Explain location, depth and time in one workspace. |
| 0:25–1:05 | Explore ocean overlay, variables and time. State that this bundled model is synthetic. |
| 1:05–2:00 | Select ARGO-4903973-003-A; show measured profile, source, WMO, date and QC. Toggle top-down/3D. |
| 2:00–2:35 | Optionally enable model comparison and explain collocation/time offset; do not interpret synthetic-model errors as forecast skill. |
| 2:35–3:15 | Show transect or regional statistics, then local isosurface and its threshold. |
| 3:15–4:00 | Settings: change palette/scale and upload the provided observation CSV. Show the catalogue remains measured. |
| 4:00–4:35 | Restore real-Argo setup; show depth/current animation and presentation mode. |
| 4:35–5:00 | Explain next integration work: real model validation, operational feeds and standards interoperability. |

Use [the real-data guide](REAL_ARGO.md) for sample path, provenance, CSV schema and caveats. Do not claim complete PS compliance, a live feed, validated advisories, arbitrary BGC/ADCP ingestion, volume ray casting or OGC certification.

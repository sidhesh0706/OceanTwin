# OceanTwin: presentation and problem-statement readiness

## Current data and presentation release

The default workspace now contains real historical provider data: HYCOM temperature, salinity and model currents for 11–13 February 2026; NASA MODIS February monthly surface chlorophyll; and 54 measured Argo profiles. No procedural ocean fields are loaded by default, and the main interface offers no switch to the old synthetic fixtures.

See [REAL_OCEAN.md](REAL_OCEAN.md) for sources, processing, the real NetCDF upload sample and the recording sequence. See [REAL_ARGO.md](REAL_ARGO.md) for profile quality filtering and observation CSV upload.

| Requirement | Status and scope |
| --- | --- |
| Real observations | 54 core Argo profiles across three oceans, adjusted QC 1 temperature/salinity. Chlorophyll comes from satellite data, not these floats. |
| Real ocean model | Bounded historical HYCOM analysis, 36 source depth levels to 2000 m, three daily noon frames. Regional coverage only. |
| Chlorophyll | Real monthly satellite surface composite. Fixed across model dates; missing pixels preserved; no invented vertical profile. |
| Current speed and vectors | Derived from real HYCOM velocity components, not direct float measurements. |
| NetCDF ingestion | Validated rectilinear CF-style grids; successful upload replaces fields and clears the separate observation catalogue; failure preserves existing data. |
| Observation ingestion | CSV/TSV/semicolon text, scalar temperature/salinity/chlorophyll profiles, six instrument labels. Native ADCP velocity bins and arbitrary BGC variables remain unsupported. |
| 3D / 4D exploration | Globe, regional top-down/angled views, continuous depth and model time, volumetric points, currents and local triangulated isosurfaces. Satellite layer is restricted to surface display. |
| Display controls | Palettes, linear/log color mapping, range, opacity and vertical exaggeration. |
| Analysis | Profile collocation, time offsets, RMSE/MAE/bias, probes, fixed-depth transects and regional statistics. Assimilated analyses are not independent forecast validation. |
| Interoperability | Bounded provider importer uses official HYCOM OPeNDAP and NOAA ERDDAP. General-purpose runtime OPeNDAP connector and OGC WMS/WCS service remain outstanding. |
| Extensibility | Separate adapters/services/renderers. Dynamic plugin registry and arbitrary-variable registration remain future work. |
| Outreach | Premium introduction, source labels, guided tour, presentation mode and offline cached data. |

## Validation and recording

Automated source-integrity tests compare prepared physical fields to the preserved provider subsets, derive speed from u/v, compare satellite mapping to its original composite, and check that chlorophyll is absent below the surface. Upload tests compare the returned fields directly with the real sample NetCDF, verify changed domain/time metadata, invalid-file rollback, observation clearing and restore.

Rehearse on the recording laptop with hardware acceleration. The real sample has one time frame; use the default three-frame workspace for time animation. Explain that regional boundaries and cloud gaps are limits of source coverage. Do not describe the monthly chlorophyll composite as a daily measurement, core Argo as BGC-Argo, or the prototype as an operational advisory service. Full problem-statement compliance still requires the interoperability and extension work listed above.

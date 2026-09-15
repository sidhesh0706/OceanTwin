# OceanTwin recording walkthrough

Use the default historical workspace first. It contains 54 measured Argo profiles across the Indian, Atlantic and Pacific oceans, a regional HYCOM analysis for the Indian Ocean, and NASA MODIS surface chlorophyll.

| Time | Screen action | What to say |
| --- | --- | --- |
| 0:00–0:30 | Refresh, show the premium intro, enter the globe | “OceanTwin connects a global observation network to depth- and time-resolved ocean analysis.” |
| 0:30–1:15 | Open Observations and show floats across three basins | “These are measured Argo profiles from 12 February 2026, with WMO, cycle, QC and source provenance.” |
| 1:15–2:00 | Select an Indian Ocean float and transition to the local water column | “Inside the model domain we can move from Earth to a flat or angled 3D ocean view.” |
| 2:00–2:45 | Show temperature/salinity profile and optional comparison | “Core Argo measures temperature and salinity. Comparison uses the nearest historical analysis time.” |
| 2:45–3:30 | Show currents and playback | “Current speed is derived from HYCOM eastward and northward velocity, not measured by this float.” |
| 3:30–4:10 | Show chlorophyll | “This is a real NASA MODIS February monthly surface composite. Missing pixels remain missing and there is no invented subsurface value.” |
| 4:10–5:00 | Show transect, region statistics or isosurface | “The analysis tools use the active model grid and preserve unsupported cells.” |
| 5:00–5:45 | Upload `data_sources/ocean/OceanTwin_Real_Arabian_Sea.nc` | “A validated NetCDF changes the dataset name, domain, time and returned field values. The status message confirms the loaded file.” |
| 5:45–6:15 | Settings → Restore historical dataset | “This restores the complete historical workspace and global Argo catalogue.” |

Use the default workspace for time animation; the upload sample intentionally contains one 13 February frame. A model upload clears the separate float catalogue. Restore the historical workspace or upload `data_sources/argo/real_argo_profiles.csv` afterward.

For a float outside the Indian Ocean model domain, OceanTwin stays on the globe and opens the measured profile without inventing a local model comparison. Say that this is the global observation mode.

Do not claim that core Argo measures chlorophyll or currents, that the monthly satellite composite is a daily field, or that this is a live operational forecast.

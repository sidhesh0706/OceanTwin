from typing import Literal

from pydantic import BaseModel, Field


class ProfileSample(BaseModel):
    depth: float = Field(ge=0)
    pressure_dbar: float | None = None
    pressure_qc: str | None = None
    temperature_qc: str | None = None
    salinity_qc: str | None = None
    temperature: float | None = None
    salinity: float | None = None
    chlorophyll: float | None = None


class ObservationSource(BaseModel):
    id: str
    instrument_type: Literal["ARGO", "GLIDER", "CTD", "BGC", "MOORING", "ADCP"]
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
    timestamp: str
    synthetic: bool = True
    profiles: list[ProfileSample]
    wmo: str | None = None
    cycle: int | None = None
    direction: str | None = None
    data_mode: str | None = None
    source_name: str | None = None
    source_url: str | None = None
    source_profile_index: int | None = None
    retrieved_date: str | None = None
    citation: str | None = None
    qc_policy: str | None = None
    depth_method: str | None = None
    available_variables: list[str] | None = None
    ocean_basin: str | None = None
    model_station: bool = False

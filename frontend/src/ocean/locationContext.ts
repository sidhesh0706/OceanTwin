import type { Observation } from '../types';

export interface LocationContext {
  ocean: string;
  sea?: string;
  country?: string;
}

/** Human-readable geographic context for an observation without a network geocoder. */
export function observationLocation(observation: Observation): LocationContext {
  const { latitude: lat, longitude: rawLon } = observation;
  const lon = ((((rawLon + 180) % 360) + 360) % 360) - 180;
  const basin = observation.ocean_basin ? `${observation.ocean_basin} Ocean` : 'Global Ocean';

  if (lat >= 6 && lat <= 14 && lon >= 72 && lon < 79) {
    return { ocean: 'Indian Ocean', sea: 'Laccadive Sea', country: 'India' };
  }
  if (lat >= 5 && lat <= 17 && lon > 92 && lon <= 99) {
    return { ocean: 'Indian Ocean', sea: 'Andaman Sea', country: 'India' };
  }
  if (lat >= 5 && lat <= 31 && lon >= 43 && lon < 78) {
    return { ocean: 'Indian Ocean', sea: 'Arabian Sea', country: lon >= 60 ? 'India' : undefined };
  }
  if (lat >= 5 && lat <= 24 && lon >= 78 && lon <= 100) {
    return { ocean: 'Indian Ocean', sea: 'Bay of Bengal', country: 'India' };
  }

  return { ocean: basin };
}

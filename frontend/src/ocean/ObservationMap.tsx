import { useState } from 'react';
import type { Observation } from '../types';
import './observation-map.css';

/** A geographic context map, never a gridded scientific field. */
export function ObservationMap({
  anchor,
  observations,
  onSelect,
}: {
  anchor: Observation;
  observations: Observation[];
  onSelect: (o: Observation) => void;
}) {
  const [span, setSpan] = useState(40);
  const south = Math.max(-90, Math.min(90 - span, anchor.latitude - span / 2));
  const west = anchor.longitude - span / 2;
  const relative = (lon: number) => anchor.longitude + ((lon - anchor.longitude + 540) % 360) - 180;
  const nearby = observations.filter(
    (o) =>
      Math.abs(relative(o.longitude) - anchor.longitude) <= span / 2 &&
      o.latitude >= south &&
      o.latitude <= south + span,
  );
  return (
    <section className="observation-map" aria-label="Local float map">
      <header>
        <span>MEASURED OBSERVATION · LOCAL MAP</span>
        <h2>{anchor.ocean_basin ? `${anchor.ocean_basin} Ocean` : 'Ocean observation'}</h2>
        <p>
          {anchor.id} · {anchor.latitude.toFixed(2)}° latitude · {anchor.longitude.toFixed(2)}°
          longitude
        </p>
        <label>
          Map extent{' '}
          <select
            aria-label="Local map extent"
            value={span}
            onChange={(e) => setSpan(+e.target.value)}
          >
            <option value={20}>20°</option>
            <option value={40}>40°</option>
            <option value={80}>80°</option>
          </select>
        </label>
      </header>
      <svg
        viewBox="0 0 800 800"
        role="group"
        aria-label="Flat geographic map with measured float locations"
      >
        <defs>
          <clipPath id="float-map-clip">
            <rect width="800" height="800" rx="16" />
          </clipPath>
        </defs>
        <g clipPath="url(#float-map-clip)">
          <rect width="800" height="800" fill="#073147" />
          {[-360, 0, 360].map((offset) => (
            <image
              key={offset}
              href="/earth-blue-marble.jpg"
              x={((-180 + offset - west) / span) * 800}
              y={((south + span - 90) / span) * 800}
              width={(360 / span) * 800}
              height={(180 / span) * 800}
              preserveAspectRatio="none"
              opacity="0.72"
            />
          ))}
          {[1, 2, 3].map((n) => (
            <g key={n} stroke="#93d6df" opacity="0.2">
              <path d={`M ${n * 200} 0 V 800 M 0 ${n * 200} H 800`} />
            </g>
          ))}
          {nearby.map((o) => (
            <g
              key={o.id}
              role="button"
              tabIndex={0}
              aria-label={`Open ${o.id} profile`}
              onClick={() => onSelect(o)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(o);
                }
              }}
              transform={`translate(${((relative(o.longitude) - west) / span) * 800},${((south + span - o.latitude) / span) * 800})`}
              className="float-map-marker"
            >
              <circle
                r={o.id === anchor.id ? 18 : 11}
                fill="#0ce4df"
                fillOpacity="0.2"
                stroke="#86ffef"
                strokeWidth="2"
              />
              <circle r="5" fill="#bafff5" />
              <title>{o.id}</title>
            </g>
          ))}
        </g>
      </svg>
      <p className="observation-map-note">
        NASA Blue Marble geographic background. The selected float provides a measured depth
        profile; no surrounding model field is available in the active dataset.
      </p>
      <button onClick={() => onSelect(anchor)}>Open selected float profile</button>
    </section>
  );
}

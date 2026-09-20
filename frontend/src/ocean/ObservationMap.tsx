import { lazy, Suspense, useEffect, useState } from 'react';
import type { Comparison, Observation, Variable } from '../types';
import { api, stamp } from '../services/api';
import './observation-map.css';
const ObservationScene = lazy(() => import('./ObservationScene'));

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
  const [angled, setAngled] = useState(true);
  const [variable, setVariable] = useState<Variable>('temperature');
  const [result, setResult] = useState<Comparison | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setResult(null);
    setError('');
    api
      .compare(anchor.id, variable, 0, controller.signal)
      .then((value) => {
        if (!controller.signal.aborted) setResult(value);
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, [anchor.id, variable, attempt]);
  const rows = result?.profiles ?? [];
  const finite = rows.filter((r) => r.observed !== null && Number.isFinite(r.observed));
  const values = finite.map((r) => r.observed as number);
  const low = values.length ? Math.min(...values) : 0;
  const high = values.length ? Math.max(...values) : 1;
  const spread = Math.max(high - low, 0.1);
  let path = '';
  let connected = false;
  for (const row of rows) {
    if (row.observed === null || !Number.isFinite(row.observed)) {
      connected = false;
      continue;
    }
    path += `${connected ? 'L' : 'M'}${50 + ((row.observed - low) / spread) * 220},${25 + (row.depth / Math.max(anchor.max_depth, 1)) * 290} `;
    connected = true;
  }
  return (
    <section className="observation-map" aria-label="Local float view">
      <div className="obs-scene-column">
        <header>
          <span>MEASURED OBSERVATION · LOCAL OCEAN</span>
          <h2>{anchor.ocean_basin ? `${anchor.ocean_basin} Ocean` : 'Ocean observation'}</h2>
          <p>
            {anchor.latitude.toFixed(2)}° latitude · {anchor.longitude.toFixed(2)}° longitude
          </p>
          <div className="obs-view-controls">
            <button aria-pressed={!angled} onClick={() => setAngled(false)}>
              Top-down
            </button>
            <button aria-pressed={angled} onClick={() => setAngled(true)}>
              Angled view
            </button>
            <label>
              Extent{' '}
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
          </div>
        </header>
        <div className="obs-scene-canvas">
          <Suspense fallback={<p>Opening local ocean…</p>}>
            <ObservationScene
              anchor={anchor}
              observations={observations}
              span={span}
              angled={angled}
              onSelect={onSelect}
            />
          </Suspense>
        </div>
        <p className="observation-map-note">
          Earth imagery provides geographic context. The vertical line marks this float's sampled
          depth; the blue water block is schematic, not a surrounding model field.
        </p>
      </div>
      <aside className="obs-profile-card" aria-label="Selected float measured profile">
        <span className="obs-profile-kicker">MEASURED ARGO PROFILE</span>
        <h2>{anchor.id}</h2>
        <p>
          {stamp(anchor.timestamp)} · {anchor.max_depth.toLocaleString()} m
        </p>
        <div className="obs-view-controls">
          <button
            aria-pressed={variable === 'temperature'}
            onClick={() => setVariable('temperature')}
          >
            Temperature
          </button>
          <button aria-pressed={variable === 'salinity'} onClick={() => setVariable('salinity')}>
            Salinity
          </button>
        </div>
        {error ? (
          <div role="alert">
            <p>{error}</p>
            <button onClick={() => setAttempt((v) => v + 1)}>Retry profile</button>
          </div>
        ) : !result ? (
          <p role="status">Loading measured profile…</p>
        ) : finite.length === 0 ? (
          <p>No measured values are available for this variable.</p>
        ) : (
          <>
            <svg
              viewBox="0 0 310 365"
              className="obs-profile-chart"
              role="img"
              aria-label={`Measured ${variable} versus depth`}
            >
              {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                <g key={f}>
                  <line x1="50" x2="275" y1={25 + 290 * f} y2={25 + 290 * f} stroke="#294452" />
                  <text x="44" y={29 + 290 * f} textAnchor="end">
                    {Math.round(anchor.max_depth * f)}
                  </text>
                </g>
              ))}
              {[0, 0.5, 1].map((f) => (
                <text key={f} x={50 + 220 * f} y="338" textAnchor="middle">
                  {(low + spread * f).toFixed(1)}
                </text>
              ))}
              <text x="160" y="357" textAnchor="middle">
                {result.units}
              </text>
              <text x="8" y="16">
                Depth (m)
              </text>
              <path d={path} fill="none" stroke="#68f0d8" strokeWidth="2" />
            </svg>
            <p>{finite.length.toLocaleString()} measured levels · depth increases downward</p>
          </>
        )}
        <p>
          WMO {anchor.wmo ?? '—'} · Cycle {anchor.cycle ?? '—'}
        </p>
        {anchor.source_url && (
          <a href={anchor.source_url} target="_blank" rel="noreferrer">
            {anchor.source_name || 'Observation source'}
          </a>
        )}
        <p className="observation-map-note">
          No active model coverage here. This is the float's measured profile; model comparison and
          surrounding temperature fields are unavailable.
        </p>
      </aside>
    </section>
  );
}

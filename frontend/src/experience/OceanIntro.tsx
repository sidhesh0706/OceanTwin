import { ArrowRight } from 'lucide-react';
import './ocean-intro.css';
export default function OceanIntro({
  ready,
  synthetic,
  measuredCount,
  argoCount,
  stationCount,
  onEnter,
}: {
  ready: boolean;
  synthetic: boolean;
  measuredCount: number;
  argoCount: number;
  stationCount: number;
  onEnter: () => void;
}) {
  return (
    <section className="ocean-intro" aria-label="Welcome to OceanTwin">
      <header className="intro-header">
        <span className="intro-wordmark">
          OCEAN<span>TWIN</span>
        </span>
        <span className="intro-edition">OCEAN DATA INTELLIGENCE</span>
      </header>
      <div className="intro-copy">
        <p className="intro-eyebrow">ONE EARTH. MANY DEPTHS.</p>
        <h1>
          Explore beneath
          <br />
          <em>the surface.</em>
        </h1>
        <p className="intro-description">
          From the globe to the water column. Discover ocean currents, explore depth and time, and
          compare instrument profiles.
        </p>
        <button className="intro-enter" onClick={onEnter}>
          Explore the ocean <ArrowRight size={19} />
        </button>
        <p className="intro-status" role="status">
          {ready
            ? 'Earth ready · drag to rotate, scroll to zoom'
            : 'Loading Earth imagery… you can enter while it loads'}
        </p>
        <div className="intro-dimensions">
          <span>
            01 <b>Locate</b>
          </span>
          <span>
            02 <b>Descend</b>
          </span>
          <span>
            03 <b>Compare</b>
          </span>
        </div>
      </div>
      <footer className="intro-footer">
        <span>
          {stationCount > 0
            ? `${stationCount} NETCDF STATIONS`
            : argoCount === measuredCount && argoCount > 0
              ? `${argoCount} MEASURED ARGO PROFILES`
              : `${measuredCount} MEASURED OBSERVATION PROFILES`}
        </span>
        <span>
          {synthetic
            ? 'SYNTHETIC MODEL'
            : stationCount > 0
              ? 'UPLOADED NETCDF FIELDS'
              : 'HISTORICAL HYCOM + NASA MODIS'}
        </span>
        <span>Earth background: NASA Blue Marble · imagery credit below</span>
      </footer>
    </section>
  );
}

import { Suspense, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, Line, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { Comparison, Observation } from '../types';

function Camera({ angled }: { angled: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(angled ? 9 : 0, angled ? 13 : 23, angled ? 16 : 0.01);
    camera.lookAt(0, -1, 0);
    camera.updateProjectionMatrix();
  }, [angled, camera]);
  return (
    <OrbitControls
      target={[0, -1, 0]}
      enablePan={false}
      minDistance={12}
      maxDistance={36}
      maxPolarAngle={Math.PI / 2.05}
    />
  );
}
function Surface({ anchor, span }: { anchor: Observation; span: number }) {
  const source = useTexture('/earth-blue-marble.jpg');
  const texture = useMemo(() => {
    const t = source.clone();
    t.wrapS = THREE.RepeatWrapping;
    const south = Math.max(-90, Math.min(90 - span, anchor.latitude - span / 2));
    t.repeat.set(span / 360, span / 180);
    t.offset.set((anchor.longitude - span / 2 + 180) / 360, (south + 90) / 180);
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [source, anchor, span]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[18, 18]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.26} />
    </mesh>
  );
}
export default function ObservationScene({
  anchor,
  observations,
  span,
  angled,
  profile,
  onSelect,
}: {
  anchor: Observation;
  observations: Observation[];
  span: number;
  angled: boolean;
  profile: Comparison['profiles'];
  onSelect: (o: Observation) => void;
}) {
  const south = Math.max(-90, Math.min(90 - span, anchor.latitude - span / 2));
  const centerLat = south + span / 2;
  const relative = (lon: number) => ((lon - anchor.longitude + 540) % 360) - 180;
  const nearby = observations.filter(
    (o) =>
      Math.abs(relative(o.longitude)) <= span / 2 &&
      o.latitude >= south &&
      o.latitude <= south + span,
  );
  const z = (-(anchor.latitude - centerLat) / span) * 18;
  const measured = profile.filter((row) => row.observed !== null && Number.isFinite(row.observed));
  const values = measured.map((row) => row.observed as number);
  const minimum = values.length ? Math.min(...values) : 0;
  const maximum = values.length ? Math.max(...values) : 1;
  const profileValue = (depth: number) => {
    const nearest = measured.reduce<(typeof measured)[number] | null>(
      (best, row) =>
        !best || Math.abs(row.depth - depth) < Math.abs(best.depth - depth) ? row : best,
      null,
    );
    return nearest?.observed ?? minimum;
  };
  const colorAt = (depth: number) => {
    const ratio = (Number(profileValue(depth)) - minimum) / Math.max(maximum - minimum, 0.001);
    return new THREE.Color().setHSL(0.59 - ratio * 0.53, 0.72, 0.54);
  };
  return (
    <Canvas
      camera={{ position: [9, 13, 16], fov: 45 }}
      dpr={[1, 1.5]}
      aria-label="Local ocean observation scene"
    >
      <color attach="background" args={['#02090f']} />
      <ambientLight intensity={1.4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial color={colorAt(0)} transparent opacity={0.82} depthWrite={false} />
      </mesh>
      <Suspense fallback={null}>
        <Surface anchor={anchor} span={span} />
      </Suspense>
      <mesh position={[0, -1.65, 0]}>
        <boxGeometry args={[18, 3.2, 18]} />
        <meshBasicMaterial color="#07334a" transparent opacity={0.32} depthWrite={false} />
      </mesh>
      {[0.12, 0.28, 0.48, 0.7, 0.92].map((fraction) => (
        <mesh key={fraction} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2 * fraction, 0]}>
          <planeGeometry args={[17.8, 17.8]} />
          <meshBasicMaterial
            color={colorAt(anchor.max_depth * fraction)}
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </mesh>
      ))}
      <gridHelper
        args={[18, 24, '#75d2d2', '#286378']}
        position={[0, 0.03, 0]}
        rotation={[0, 0, 0]}
      />
      <Html position={[-8.5, 0.22, -8.5]}>
        <span className="obs-surface-label">MEASURED SURFACE CONTEXT</span>
      </Html>
      <Html position={[9.25, 0.12, 8.3]}>
        <span className="obs-depth-label">DEPTH (m)</span>
      </Html>
      <Line
        points={[
          [0, 0.1, z],
          [0, -3.2, z],
        ]}
        color="#61f1de"
        lineWidth={3}
      />
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <Html key={f} position={[9.25, -3.2 * f, 9]}>
          <span className="obs-depth-label">
            {Math.round(anchor.max_depth * f).toLocaleString()} m
          </span>
        </Html>
      ))}
      {nearby.map((o) => (
        <Html
          key={o.id}
          position={[
            (relative(o.longitude) / span) * 18,
            0.16,
            (-(o.latitude - centerLat) / span) * 18,
          ]}
          center
        >
          <button
            className={`obs-scene-marker ${o.id === anchor.id ? 'selected' : ''}`}
            aria-label={`Open ${o.id} profile`}
            onClick={() => onSelect(o)}
          >
            <span />
            {o.id === anchor.id && <b>{o.id}</b>}
          </button>
        </Html>
      ))}
      <Camera angled={angled} />
    </Canvas>
  );
}

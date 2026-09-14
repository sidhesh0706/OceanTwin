import { useSyncExternalStore } from 'react';
import { Color } from 'three';
import type { Variable } from '../types';
export const palettes: Record<Variable, string[]> = {
  temperature: ['#263d88', '#247ba6', '#54b9be', '#a8d9bd', '#f0dda1', '#ee9b65', '#d5544f'],
  salinity: ['#161f56', '#3b4c90', '#667fb0', '#9bc2c7', '#d3e6d0', '#f1f0cb'],
  chlorophyll: ['#171e48', '#254b68', '#257b80', '#53a58a', '#a1cb78', '#f0e99e'],
  current_speed: ['#202344', '#414474', '#79518b', '#b9628b', '#e9958f', '#f7d6a6'],
};
export type ColorSettings = {
  palette: 'variable' | 'viridis' | 'thermal';
  scale: 'linear' | 'log';
};
let settings: ColorSettings = { palette: 'variable', scale: 'linear' };
const listeners = new Set<() => void>();
export function setColorSettings(next: Partial<ColorSettings>) {
  settings = { ...settings, ...next };
  listeners.forEach((f) => f());
}
export function useColorSettings() {
  return useSyncExternalStore(
    (f) => {
      listeners.add(f);
      return () => {
        listeners.delete(f);
      };
    },
    () => settings,
  );
}
const extra = {
  viridis: ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'],
  thermal: ['#000004', '#51127c', '#b73779', '#fc8961', '#fcfdbf'],
};
const extras = Object.fromEntries(
  Object.entries(extra).map(([k, v]) => [k, v.map((c) => new Color(c))]),
) as Record<string, Color[]>;
export function colorTick(min: number, max: number, t: number) {
  return settings.scale === 'log' && min > 0
    ? Math.exp(Math.log(min) + (Math.log(max) - Math.log(min)) * t)
    : min + (max - min) * t;
}
const colors = Object.fromEntries(
  Object.entries(palettes).map(([v, list]) => [v, list.map((c) => new Color(c))]),
) as Record<Variable, Color[]>;
export function dataColor(
  value: number,
  variable: Variable,
  min: number,
  max: number,
  target = new Color(),
) {
  const palette = settings.palette === 'variable' ? colors[variable] : extras[settings.palette];
  if (settings.scale === 'log' && min > 0 && max > min) {
    value = Math.log(Math.max(value, min));
    min = Math.log(min);
    max = Math.log(max);
  }
  const t = Math.max(0, Math.min(1, (value - min) / (max - min || 1))) * (palette.length - 1);
  const idx = Math.min(palette.length - 2, Math.floor(t));
  return target.copy(palette[idx]).lerp(palette[idx + 1], t - idx);
}
export const gradient = (v: Variable) =>
  `linear-gradient(90deg,${(settings.palette === 'variable' ? palettes[v] : extra[settings.palette]).join(',')})`;

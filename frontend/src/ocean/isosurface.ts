/** Marching tetrahedra on a rectilinear grid. Missing cells are never bridged. */
export function extractIsosurface(
  values: (number | null)[][][],
  xs: number[],
  ys: number[],
  zs: number[],
  threshold: number,
): number[] {
  const out: number[] = [];
  const offsets = [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 1],
  ];
  const tetra = [
    [0, 5, 1, 6],
    [0, 1, 2, 6],
    [0, 2, 3, 6],
    [0, 3, 7, 6],
    [0, 7, 4, 6],
    [0, 4, 5, 6],
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  for (let k = 0; k < zs.length - 1; k++)
    for (let j = 0; j < ys.length - 1; j++)
      for (let i = 0; i < xs.length - 1; i++) {
        const v = offsets.map(([x, y, z]) => values[k + z][j + y][i + x]);
        if (v.some((n) => n === null || !Number.isFinite(n))) continue;
        if (Math.min(...(v as number[])) > threshold || Math.max(...(v as number[])) < threshold)
          continue;
        const p = offsets.map(([x, y, z]) => [xs[i + x], ys[j + y], zs[k + z]]);
        for (const t of tetra) {
          const points: number[][] = [];
          for (const [a, b] of edges) {
            const ia = t[a],
              ib = t[b],
              va = v[ia]!,
              vb = v[ib]!;
            if (va < threshold === vb < threshold) continue;
            const f = (threshold - va) / (vb - va);
            const q = p[ia].map((c, d) => c + f * (p[ib][d] - c));
            if (!points.some((r) => r.every((c, d) => Math.abs(c - q[d]) < 1e-10))) points.push(q);
          }
          if (points.length < 3) continue;
          const c = [0, 1, 2].map((d) => points.reduce((sum, q) => sum + q[d], 0) / points.length);
          const u = points[0].map((n, d) => n - c[d]),
            b = points[1].map((n, d) => n - c[d]);
          const normal = [
            u[1] * b[2] - u[2] * b[1],
            u[2] * b[0] - u[0] * b[2],
            u[0] * b[1] - u[1] * b[0],
          ];
          const nlen = Math.hypot(...normal),
            ulen = Math.hypot(...u);
          if (nlen < 1e-12 || ulen < 1e-12) continue;
          const un = u.map((n) => n / ulen),
            nn = normal.map((n) => n / nlen);
          const w = [
            nn[1] * un[2] - nn[2] * un[1],
            nn[2] * un[0] - nn[0] * un[2],
            nn[0] * un[1] - nn[1] * un[0],
          ];
          const angle = (q: number[]) =>
            Math.atan2(
              q.reduce((s, n, d) => s + (n - c[d]) * w[d], 0),
              q.reduce((s, n, d) => s + (n - c[d]) * un[d], 0),
            );
          points.sort((a, b) => angle(a) - angle(b));
          for (let m = 1; m < points.length - 1; m++)
            out.push(...points[0], ...points[m], ...points[m + 1]);
        }
      }
  return out;
}

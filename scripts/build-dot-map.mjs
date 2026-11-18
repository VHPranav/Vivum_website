// Builds public/images/europe-dots.svg: a halftone dot map of Europe centred on Montenegro,
// from Natural Earth land data (public domain, via world-atlas). Also prints projected
// positions (as % of the map box) for the location markers used in NetworkMap.
// Usage: node scripts/build-dot-map.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { geoContains, geoOrthographic } from "d3-geo";

const W = 2400;
const H = 1120;
const topo = JSON.parse(readFileSync("node_modules/world-atlas/land-50m.json", "utf8"));
const land = feature(topo, topo.objects.land);

// Globe-like view centred a little north of Montenegro, as Tresmares centres on Europe.
const projection = geoOrthographic()
  .rotate([-14, -50])
  .scale(1500)
  .translate([W / 2, H * 0.62])
  .clipAngle(90);

const STEP = 9;
const R = 2.1;
const cx = W * 0.48;
const cy = H * 0.55;
const fadeR = 820;
let circles = "";
for (let y = STEP / 2; y < H; y += STEP) {
  for (let x = STEP / 2; x < W; x += STEP) {
    const ll = projection.invert([x, y]);
    if (!ll || !geoContains(land, ll)) continue;
    // Radial fade towards the edges of the globe view.
    const d = Math.hypot(x - cx, (y - cy) * 1.6) / fadeR;
    const o = Math.max(0, Math.min(1, 1.15 - d));
    if (o < 0.04) continue;
    circles += `<circle cx="${x}" cy="${y}" r="${R}" fill-opacity="${o.toFixed(2)}"/>`;
  }
}
writeFileSync(
  "public/images/europe-dots.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="#9aa6b4">${circles}</svg>`,
);

const places = { Podgorica: [19.26, 42.44], London: [-0.13, 51.51] };
for (const [name, ll] of Object.entries(places)) {
  const [x, y] = projection(ll);
  console.log(name, `left: ${((x / W) * 100).toFixed(2)}%`, `top: ${((y / H) * 100).toFixed(2)}%`);
}

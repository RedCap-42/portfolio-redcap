export type AsciiGlobeOptions = {
  columns?: number;
  rows?: number;
  fps?: number;
  speed?: number; // radians per second
};

export type AsciiGlobeHandle = {
  stop: () => void;
};

const SEA_SHADES = " .:-=+*#%@";
const LAND_SHADES = " .,:;irsXA253hMHGS#9B&@";
const ICE_SHADES = " .:-=+*#%@";

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function normalize3(x: number, y: number, z: number) {
  const len = Math.hypot(x, y, z) || 1;
  return [x / len, y / len, z / len] as const;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function fract(x: number) {
  return x - Math.floor(x);
}

function hash2(x: number, y: number) {
  // cheap deterministic hash -> [0,1)
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return fract(s);
}

function valueNoise2(x: number, y: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;

  const sx = smoothstep(0, 1, x - x0);
  const sy = smoothstep(0, 1, y - y0);

  const n00 = hash2(x0, y0);
  const n10 = hash2(x1, y0);
  const n01 = hash2(x0, y1);
  const n11 = hash2(x1, y1);

  const ix0 = n00 + (n10 - n00) * sx;
  const ix1 = n01 + (n11 - n01) * sx;
  return ix0 + (ix1 - ix0) * sy;
}

function fbm2(x: number, y: number) {
  let value = 0;
  let amp = 0.6;
  let freq = 1;
  for (let i = 0; i < 4; i++) {
    value += valueNoise2(x * freq, y * freq) * amp;
    freq *= 2;
    amp *= 0.5;
  }
  return value;
}

function pickShade(ramp: string, brightness01: number) {
  const idx = Math.min(
    ramp.length - 1,
    Math.floor(clamp01(brightness01) * (ramp.length - 1))
  );
  return ramp[idx];
}

export function startAsciiGlobe(
  target: HTMLElement,
  opts: AsciiGlobeOptions = {}
): AsciiGlobeHandle {
  const columns = Math.max(16, Math.floor(opts.columns ?? 24));
  const rows = Math.max(10, Math.floor(opts.rows ?? 12));
  const fps = Math.max(10, Math.floor(opts.fps ?? 24));
  const speed = opts.speed ?? 0.8;

  const pre = document.createElement("pre");
  pre.setAttribute("aria-label", "Globe ASCII tournant");
  pre.style.margin = "0";
  pre.style.whiteSpace = "pre";
  pre.style.lineHeight = "1";
  pre.style.userSelect = "none";
  pre.style.fontVariantLigatures = "none";

  target.replaceChildren(pre);

  const radiusX = (columns - 1) / 2;
  const radiusY = (rows - 1) / 2;

  const light = normalize3(0.25, -0.15, 1);

  let raf = 0;
  let last = performance.now();
  let angle = 0;
  const frameMs = 1000 / fps;
  let acc = 0;

  function render() {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    let out = "";

    for (let y = 0; y < rows; y++) {
      const nyNorm = (y - radiusY) / radiusY;

      for (let x = 0; x < columns; x++) {
        const nxNorm = (x - radiusX) / radiusX;

        // ellipse correction so the sphere looks round in monospace
        const ex = nxNorm;
        const ey = nyNorm * 1.1;

        const rr = ex * ex + ey * ey;
        if (rr > 1) {
          out += " ";
          continue;
        }

        const z = Math.sqrt(1 - rr);

        // rotate around Y axis
        const rx = ex * cosA + z * sinA;
        const rz = -ex * sinA + z * cosA;

        // spherical coords from rotated point
        const lon = Math.atan2(rz, rx); // -pi..pi
        const lat = Math.asin(Math.max(-1, Math.min(1, ey))); // -pi/2..pi/2

        // earth-ish procedural texture (sea vs land + ice caps)
        const u = (lon + Math.PI) / (2 * Math.PI); // 0..1
        const vLat = (lat + Math.PI / 2) / Math.PI; // 0..1

        // fbm space: keep wrapping stable across seam
        const texX = u * 3.2;
        const texY = vLat * 1.8;
        const noise = fbm2(texX, texY) + 0.35 * Math.sin(lon * 2.0) + 0.15 * Math.cos(lat * 3.0);
        const land = noise > 0.92;
        const ice = Math.abs(lat) > 1.15; // polar caps

        const [n0, n1, n2] = normalize3(rx, ey, rz);
        const lambert = clamp01(n0 * light[0] + n1 * light[1] + n2 * light[2]);

        // subtle edge fade
        const edge = clamp01((1 - rr) * 1.1);

        // different albedo per surface
        const base = ice ? 1.0 : land ? 0.9 : 0.75;
        const brightness = clamp01(lambert * base + edge * 0.08);

        // faint cloudiness
        const cloud = fbm2(u * 6.0 + 2.0, vLat * 3.5 + 1.0);
        const cloudiness = clamp01((cloud - 0.75) * 2.2);

        const ramp = ice ? ICE_SHADES : land ? LAND_SHADES : SEA_SHADES;
        const ch = pickShade(ramp, brightness);
        out += cloudiness > 0.55 ? "@" : ch;
      }
      out += "\n";
    }

    pre.textContent = out;
  }

  function tick(now: number) {
    const dt = now - last;
    last = now;
    acc += dt;

    // fixed-ish FPS
    if (acc >= frameMs) {
      angle += speed * (acc / 1000);
      acc = 0;
      render();
    }

    raf = requestAnimationFrame(tick);
  }

  render();
  raf = requestAnimationFrame(tick);

  return {
    stop: () => {
      cancelAnimationFrame(raf);
    },
  };
}

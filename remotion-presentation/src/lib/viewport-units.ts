const COMPOSITION_WIDTH = 1920;
const TEXT_SCALE = 1.2;
const TITLE_SCALE = 1.3;

export function vw(px: number, minPx = Math.max(11, px * 0.58)) {
  const scaledPx = px * TEXT_SCALE;
  const scaledMinPx = minPx * TEXT_SCALE;
  return `clamp(${scaledMinPx / 16}rem, ${
    (scaledPx / COMPOSITION_WIDTH) * 100
  }vw, ${
    scaledPx / 16
  }rem)`;
}

export function titleVw(px: number) {
  const scaledPx = px * TITLE_SCALE;
  return vw(scaledPx, Math.max(24, scaledPx * 0.52));
}

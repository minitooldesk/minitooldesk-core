/**
 * CSS visual algorithms.
 *
 * For visual drag-and-drop generators, visit:
 * https://minitooldesk.com/tools/css-glassmorphism-generator
 * https://minitooldesk.com/tools/css-box-shadow-generator
 * https://minitooldesk.com/tools/css-gradient-generator
 */

export interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset?: boolean;
}

export function generateBoxShadow(layers: ShadowLayer[]): string {
  return layers
    .map((l) => `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`)
    .join(', ');
}

export function generateGlassmorphism(blurPx: number, opacity: number, bgHex = '#ffffff') {
  const r = parseInt(bgHex.slice(1, 3), 16) || 255;
  const g = parseInt(bgHex.slice(3, 5), 16) || 255;
  const b = parseInt(bgHex.slice(5, 7), 16) || 255;

  return {
    background: `rgba(${r}, ${g}, ${b}, ${opacity})`,
    backdropFilter: `blur(${blurPx}px)`,
    WebkitBackdropFilter: `blur(${blurPx}px)`,
    border: `1px solid rgba(${r}, ${g}, ${b}, ${Math.min(opacity + 0.1, 0.4)})`,
  };
}

import type { ReactNode } from 'react';

/**
 * 插畫共用色票（Soft Pink 日系手帳風）。
 * 整體偏粉嫩，但食物的蟹紅／鮭魚橘、鳥居的朱紅、銀杏的金黃
 * 都在各插畫裡用自己的色碼，刻意不被粉色覆蓋。
 */
export const C = {
  cream: '#FFF8FA',
  paper: '#FFF1F5',
  sakura: '#F4AFC4',
  sakuraDeep: '#D96B94',
  ginkgo: '#F6CE6A',
  ginkgoDeep: '#D99A1E',
  sage: '#A9C9AD',
  sageDeep: '#6E9B78',
  sky: '#BBD7EA',
  skyDeep: '#6A9CBC',
  ink: '#49343D',
  inkSoft: '#A38993',
  coral: '#E58268',
  red: '#D9644A',
  white: '#FFFFFF',
  brown: '#C59C86',
  night: '#4A4668',
} as const;

interface FrameProps {
  children: ReactNode;
  /** 底色 */
  tint?: string;
  /** 無障礙說明 */
  label: string;
}

/**
 * 所有插畫共用的畫框：圓角和紙底 + 柔和光暈 + 幾顆小點當紙張紋理。
 * 固定 viewBox 0 0 120 90，方便卡片等比縮放。
 */
export function Frame({ children, tint = C.paper, label }: FrameProps) {
  return (
    <svg viewBox="0 0 120 90" role="img" aria-label={label} className="h-full w-full">
      <rect width="120" height="90" rx="12" fill={tint} />
      <ellipse cx="60" cy="74" rx="52" ry="14" fill={C.white} opacity="0.45" />
      <g fill={C.ink} opacity="0.07">
        <circle cx="12" cy="14" r="1.4" />
        <circle cx="104" cy="10" r="1.1" />
        <circle cx="110" cy="62" r="1.3" />
        <circle cx="9" cy="54" r="1" />
        <circle cx="34" cy="8" r="0.9" />
      </g>
      {children}
    </svg>
  );
}

/** 小雲朵 */
export function Cloud({ x, y, s = 1, fill = C.white }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <circle cx="0" cy="0" r="6" />
      <circle cx="7" cy="2" r="4.5" />
      <circle cx="-7" cy="2" r="4" />
      <rect x="-7" y="0" width="14" height="4" rx="2" />
    </g>
  );
}

/** 月亮 */
export function Moon({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="0" r="7" fill={C.ginkgo} opacity="0.95" />
      <circle cx="3" cy="-2" r="5.5" fill={C.paper} />
    </g>
  );
}

/** 小星星 */
export function Stars({ points }: { points: [number, number, number?][] }) {
  return (
    <g fill={C.ginkgo}>
      {points.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r ?? 1.2} />
      ))}
    </g>
  );
}

/** 銀杏葉（扇形） */
export function GinkgoLeaf({ x, y, s = 1, rot = 0, fill = C.ginkgo }: { x: number; y: number; s?: number; rot?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 6 C-7 4 -8 -5 0 -7 C8 -5 7 4 0 6 Z" fill={fill} />
      <path d="M0 6 L0 10" stroke={C.ginkgoDeep} strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

/** 虛線小足跡，用在交通示意 */
export function Dash({ d, color = C.inkSoft }: { d: string; color?: string }) {
  return <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 4" />;
}

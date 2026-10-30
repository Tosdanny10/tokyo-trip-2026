import { useMemo } from 'react';
import { GinkgoLeaf } from '../illustrations/base';
import { useReducedMotion } from '../state/TripState';

/**
 * 飄落的銀杏葉。
 * 若使用者系統設定為「減少動態效果」(prefers-reduced-motion)，就完全不渲染動畫。
 */
export function FallingLeaves({ count = 10 }: { count?: number }) {
  const reduced = useReducedMotion();

  const leaves = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97) % 100,
        delay: (i * 1.7) % 9,
        duration: 9 + ((i * 3) % 7),
        scale: 0.5 + ((i * 7) % 5) / 10,
        drift: ((i % 2 === 0 ? 1 : -1) * (12 + (i * 9) % 40)),
        rot: (i * 37) % 360,
        deep: i % 3 === 0,
      })),
    [count],
  );

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {leaves.map((l, i) => (
        <span
          key={i}
          className="absolute top-0 block animate-fall"
          style={{
            left: `${l.left}%`,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.duration}s`,
            ['--drift' as string]: `${l.drift}px`,
          }}
        >
          <svg viewBox="-12 -12 24 28" width={18 * l.scale} height={21 * l.scale}>
            <GinkgoLeaf x={0} y={0} s={1.3} rot={l.rot} fill={l.deep ? '#D99A1E' : '#F6CE6A'} />
          </svg>
        </span>
      ))}
    </div>
  );
}

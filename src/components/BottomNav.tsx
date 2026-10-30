import { CalendarRange, Map, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import type { ViewMode } from '../App';

const tabs: { id: ViewMode; label: string; Icon: LucideIcon }[] = [
  { id: 'plan', label: '行程', Icon: CalendarRange },
  { id: 'map', label: '地圖', Icon: Map },
  { id: 'food', label: '美食', Icon: UtensilsCrossed },
];

/**
 * 手機底部固定導覽列。
 * 半透明粉白毛玻璃 + 粉灰上邊框；選中的項目用淡粉膠囊底 + 玫瑰粉圖示，
 * 未選中是暖灰紫。底部保留 iOS Home Indicator 的安全區域。
 */
export function BottomNav({ mode, onModeChange }: { mode: ViewMode; onModeChange: (mode: ViewMode) => void }) {
  return (
    <nav
      aria-label="主要導覽"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line/90 bg-cream/85 backdrop-blur-xl md:hidden dark:border-stone-700 dark:bg-night/90"
    >
      <ul className="flex items-stretch gap-1 px-2 pt-1.5">
        {tabs.map(({ id, label, Icon }) => {
          const active = mode === id;
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onModeChange(id)}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-[52px] w-full flex-col items-center justify-center gap-0.5 rounded-2xl transition ${
                  active
                    ? 'bg-sakura/35 text-rosePress dark:bg-rose/25 dark:text-sakura'
                    : 'text-inkSoft hover:bg-paper/70 dark:text-stone-400'
                }`}
              >
                <Icon size={20} className={active ? 'stroke-[2.4]' : ''} />
                <span className={`text-[12px] leading-none ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

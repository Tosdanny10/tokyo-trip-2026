import { Map, Wallet } from 'lucide-react';
import { days } from '../data/itinerary';
import type { ViewMode } from '../App';

/**
 * 手機底部固定導覽列：日期切換 + 預算模式。
 * 使用 env(safe-area-inset-bottom) 處理 iPhone 的安全區域。
 */
export function BottomNav({
  activeDay,
  onSelectDay,
  mode,
  onModeChange,
}: {
  activeDay: string;
  onSelectDay: (id: string) => void;
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}) {
  return (
    <nav
      aria-label="底部導覽"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200/80 bg-cream/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden dark:border-stone-700 dark:bg-night/95"
    >
      <div className="flex items-stretch gap-1 px-2 pt-1.5">
        {days.map((day) => {
          const active = mode === 'plan' && day.id === activeDay;
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => {
                onModeChange('plan');
                onSelectDay(day.id);
              }}
              aria-current={active ? 'true' : undefined}
              className={`flex min-h-[52px] flex-1 flex-col items-center justify-center rounded-xl px-1 transition ${
                active ? 'bg-sakura/30 text-ink dark:bg-sakuraDeep/30 dark:text-stone-50' : 'text-inkSoft dark:text-stone-400'
              }`}
            >
              <span className="text-[15px] font-bold tabular-nums leading-none">{day.date}</span>
              <span className="mt-0.5 text-[10px] leading-none">{day.weekdayZh}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onModeChange(mode === 'budget' ? 'plan' : 'budget')}
          aria-pressed={mode === 'budget'}
          className={`flex min-h-[52px] w-[60px] flex-col items-center justify-center rounded-xl transition ${
            mode === 'budget' ? 'bg-ginkgo/35 text-ginkgoDeep' : 'text-inkSoft dark:text-stone-400'
          }`}
        >
          {mode === 'budget' ? <Map size={18} aria-hidden /> : <Wallet size={18} aria-hidden />}
          <span className="mt-0.5 text-[10px] leading-none">{mode === 'budget' ? '行程' : '預算'}</span>
        </button>
      </div>
    </nav>
  );
}

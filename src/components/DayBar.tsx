import { days } from '../data/itinerary';

/**
 * 日期切換列。手機版黏在畫面上方，桌機版放在頂部工具列。
 * 選中狀態同時用底色、邊框與字重區別，不只靠顏色。
 */
export function DayBar({
  activeDay,
  onSelectDay,
  sticky = false,
}: {
  activeDay: string;
  onSelectDay: (id: string) => void;
  sticky?: boolean;
}) {
  return (
    <nav
      aria-label="日期切換"
      className={
        sticky
          ? 'pt-safe sticky top-0 z-30 -mx-3 border-b border-line/80 bg-cream/85 px-3 py-2 backdrop-blur-xl md:hidden dark:border-stone-700 dark:bg-night/90'
          : 'w-full'
      }
    >
      <ul className="flex w-full gap-1.5">
        {days.map((day) => {
          const active = day.id === activeDay;
          return (
            <li key={day.id} className="flex-1">
              <button
                type="button"
                onClick={() => onSelectDay(day.id)}
                aria-current={active ? 'true' : undefined}
                className={`flex min-h-[46px] w-full flex-col items-center justify-center rounded-2xl border px-1 transition active:scale-[0.97] ${
                  active
                    ? 'border-rose bg-sakura/35 text-ink shadow-sm dark:border-rose dark:bg-rose/25 dark:text-stone-50'
                    : 'border-line bg-card/80 text-inkSoft hover:bg-paper dark:border-stone-600 dark:bg-nightCard dark:text-stone-300'
                }`}
              >
                <span className={`text-[15px] leading-none tabular-nums ${active ? 'font-bold' : 'font-semibold'}`}>
                  {day.date}
                </span>
                <span className={`mt-0.5 text-[11px] leading-none ${active ? 'font-semibold text-rosePress dark:text-sakura' : ''}`}>
                  {day.short}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

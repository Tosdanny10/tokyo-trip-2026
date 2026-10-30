import { CalendarDays, MapPinned, Users } from 'lucide-react';
import type { Day } from '../data/types';
import { days, meta } from '../data/itinerary';
import { HeroScene } from '../illustrations/hero';
import { Illustration } from '../illustrations';
import { FallingLeaves } from './FallingLeaves';

const accentRing: Record<Day['accent'], string> = {
  sakura: 'ring-sakura bg-sakura/20',
  ginkgo: 'ring-ginkgo bg-ginkgo/20',
  sky: 'ring-sky bg-sky/20',
  sage: 'ring-sage bg-sage/20',
};

/** 取出當天前三張景點插畫，當作行程縮圖 */
function dayThumbs(day: Day) {
  return day.items.filter((i) => i.kind === 'place').slice(0, 3);
}

export function Hero({ activeDay, onSelectDay }: { activeDay: string; onSelectDay: (id: string) => void }) {
  return (
    <header className="relative overflow-hidden rounded-card bg-gradient-to-b from-paper to-sakura/30 p-4 shadow-card ring-1 ring-white/60 dark:from-nightCard dark:to-night dark:ring-stone-700">
      <FallingLeaves count={10} />

      <div className="relative">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-sakuraDeep">TOKYO · AUTUMN · JOURNAL</p>
        <h1 className="mt-1 font-hand text-[34px] font-bold leading-tight text-ink dark:text-stone-50">{meta.title}</h1>
        <p className="mt-0.5 text-[15px] font-medium text-inkSoft dark:text-stone-300">
          {meta.subtitle}｜11.06–11.09
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[12px] font-medium text-ink shadow-sm dark:bg-stone-800/80 dark:text-stone-100">
            <CalendarDays size={14} className="text-sakuraDeep" aria-hidden />
            {meta.dateRange}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[12px] font-medium text-ink shadow-sm dark:bg-stone-800/80 dark:text-stone-100">
            <Users size={14} className="text-skyDeep" aria-hidden />
            {meta.travelers} 位旅客
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[12px] font-medium text-ink shadow-sm dark:bg-stone-800/80 dark:text-stone-100">
            <MapPinned size={14} className="text-sageDeep" aria-hidden />
            立川・新宿・澀谷・谷中
          </span>
        </div>

        {/* 主視覺插畫 */}
        <div className="mt-4 overflow-hidden rounded-3xl ring-1 ring-white/70 dark:ring-stone-700">
          <HeroScene />
        </div>

        {/* 四天縮圖 + 日期切換 */}
        <nav aria-label="日期切換" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {days.map((day) => {
            const active = day.id === activeDay;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => onSelectDay(day.id)}
                aria-current={active ? 'true' : undefined}
                className={`group min-h-[88px] rounded-2xl p-2.5 text-left ring-1 transition active:scale-[0.98] ${
                  active
                    ? `${accentRing[day.accent]} shadow-sticker`
                    : 'bg-white/80 ring-white/70 hover:bg-white dark:bg-stone-800/70 dark:ring-stone-700'
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[17px] font-bold tabular-nums text-ink dark:text-stone-50">{day.date}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-inkSoft dark:text-stone-400">
                    {day.weekdayEn.slice(0, 3)}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-inkSoft dark:text-stone-300">{day.title}</p>
                <div className="mt-1.5 flex gap-1">
                  {dayThumbs(day).map((p) => (
                    <span key={p.id} className="h-7 w-9 overflow-hidden rounded-lg ring-1 ring-black/5">
                      {p.kind === 'place' && <Illustration name={p.illustration} />}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

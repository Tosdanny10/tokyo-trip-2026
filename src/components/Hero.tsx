import { BedDouble, CalendarDays, Users } from 'lucide-react';
import type { Day } from '../data/types';
import { days, meta } from '../data/itinerary';
import { HeroScene } from '../illustrations/hero';
import { Illustration } from '../illustrations';
import { mapsSearch } from '../lib/format';
import { useTrip } from '../state/TripState';
import { FallingLeaves } from './FallingLeaves';

const accentRing: Record<Day['accent'], string> = {
  sakura: 'border-rose bg-sakura/35',
  ginkgo: 'border-ginkgo bg-ginkgo/30',
  sky: 'border-sky bg-sky/30',
  sage: 'border-sage bg-sage/30',
};

/** 小櫻花貼紙 */
function Sakura({ className }: { className?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="0" cy="-6" rx="3.4" ry="5" fill="#F4AFC4" transform={`rotate(${r})`} />
      ))}
      <circle cx="0" cy="0" r="2" fill="#F4D57E" />
    </svg>
  );
}

/** 小愛心貼紙 */
function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden>
      <path d="M0 7 C-9 1 -9 -6 -4.5 -7 C-1.8 -7.6 0 -5.4 0 -4 C0 -5.4 1.8 -7.6 4.5 -7 C9 -6 9 1 0 7 Z" fill="#D96B94" />
    </svg>
  );
}

/** 取出當天前三張景點插畫，當作行程縮圖 */
function dayThumbs(day: Day) {
  return day.items.filter((i) => i.kind === 'place').slice(0, 3);
}

export function Hero({ activeDay, onSelectDay }: { activeDay: string; onSelectDay: (id: string) => void }) {
  const { hotel } = useTrip();

  return (
    <header className="relative overflow-hidden rounded-card bg-gradient-to-b from-card to-paper p-3.5 shadow-card ring-1 ring-line md:p-4 dark:from-nightCard dark:to-night dark:ring-stone-700">
      <FallingLeaves count={8} />

      {/* 粉色小貼紙裝飾 */}
      <Sakura className="pointer-events-none absolute -right-2 top-3 h-11 w-11 opacity-70" />
      <Sakura className="pointer-events-none absolute right-10 top-12 h-6 w-6 opacity-55" />
      <Heart className="pointer-events-none absolute right-24 top-5 h-4 w-4 opacity-60" />

      <div className="relative">
        <p className="text-[11px] font-bold tracking-[0.26em] text-roseDeep">TOKYO · AUTUMN · JOURNAL</p>
        <h1 className="mt-0.5 font-hand font-bold leading-tight text-ink dark:text-stone-50">
          <span className="block text-[19px] text-rosePress md:text-[21px] dark:text-sakura">{meta.owners}</span>
          <span className="block text-[30px] md:text-[34px]">{meta.title}</span>
        </h1>
        <p className="text-[15px] font-medium text-inkSoft dark:text-stone-300">{meta.subtitle}｜11.06–11.09</p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-[12px] font-semibold text-ink shadow-sm dark:bg-stone-800/80 dark:text-stone-100">
            <CalendarDays size={14} className="text-roseDeep" aria-hidden />
            {meta.dateRange}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-[12px] font-semibold text-ink shadow-sm dark:bg-stone-800/80 dark:text-stone-100">
            <Users size={14} className="text-roseDeep" aria-hidden />
            {meta.travelers} 位旅客・{hotel.rooms} 間房
          </span>
        </div>

        {/* 主視覺插畫：手機上只佔一小條，第一屏仍看得到日期與行程 */}
        <div className="mt-3 h-[150px] overflow-hidden rounded-3xl ring-1 ring-line/70 sm:h-[176px] md:h-[200px] dark:ring-stone-700">
          <HeroScene />
        </div>

        {/* 飯店 */}
        <a
          href={mapsSearch(hotel.nameJa || hotel.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex min-h-[56px] items-center gap-2.5 rounded-2xl border border-line bg-card/85 px-3 py-2 transition hover:bg-card dark:border-stone-600 dark:bg-stone-800/70"
        >
          <BedDouble size={18} className="shrink-0 text-roseDeep" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold leading-snug text-ink dark:text-stone-50">{hotel.name}</span>
            <span className="block text-[12px] leading-snug text-inkSoft dark:text-stone-400">
              {hotel.nearestStation}・{hotel.stationWalk}
            </span>
          </span>
          <span className="shrink-0 text-[12px] font-semibold text-roseDeep">地圖</span>
        </a>

        {/* 四天縮圖 + 日期切換 */}
        <nav aria-label="日期切換（首頁）" className="mt-3 grid grid-cols-4 gap-1.5">
          {days.map((day) => {
            const active = day.id === activeDay;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => onSelectDay(day.id)}
                aria-current={active ? 'true' : undefined}
                className={`min-h-[78px] rounded-2xl border p-1.5 text-left transition active:scale-[0.97] ${
                  active
                    ? `${accentRing[day.accent]} shadow-sticker`
                    : 'border-line bg-card/80 hover:bg-card dark:border-stone-600 dark:bg-stone-800/70'
                }`}
              >
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-[15px] tabular-nums text-ink dark:text-stone-50 ${active ? 'font-bold' : 'font-semibold'}`}
                  >
                    {day.date}
                  </span>
                </div>
                <p
                  className={`text-[12px] leading-tight ${
                    active ? 'font-bold text-rosePress dark:text-sakura' : 'font-medium text-inkSoft dark:text-stone-300'
                  }`}
                >
                  {day.short}
                </p>
                <div className="mt-1 flex gap-0.5">
                  {dayThumbs(day).map((p) => (
                    <span key={p.id} className="h-6 w-1/3 overflow-hidden rounded-md ring-1 ring-black/5">
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

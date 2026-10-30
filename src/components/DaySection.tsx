import { forwardRef } from 'react';
import type { Day } from '../data/types';
import { PlaceCard } from './PlaceCard';
import { TransitCard } from './TransitCard';

const accentBar: Record<Day['accent'], string> = {
  sakura: 'from-sakura to-sakuraDeep',
  ginkgo: 'from-ginkgo to-ginkgoDeep',
  sky: 'from-sky to-skyDeep',
  sage: 'from-sage to-sageDeep',
};

export const DaySection = forwardRef<HTMLElement, { day: Day }>(function DaySection({ day }, ref) {
  const placeCount = day.items.filter((i) => i.kind === 'place').length;
  const transitCount = day.items.filter((i) => i.kind === 'transit').length;

  return (
    <section
      ref={ref}
      id={`day-${day.id}`}
      aria-labelledby={`day-${day.id}-title`}
      className="scroll-mt-24 pt-2"
    >
      {/* 日期標題貼紙 */}
      <div className="relative mb-4 overflow-hidden rounded-card bg-card p-4 shadow-card ring-1 ring-line dark:bg-nightCard dark:ring-stone-700">
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accentBar[day.accent]}`} aria-hidden />
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-inkSoft dark:text-stone-400">
              {day.weekdayEn}・{day.weekdayZh}
            </p>
            <h2 id={`day-${day.id}-title`} className="mt-0.5 font-hand text-2xl font-bold text-ink dark:text-stone-50">
              <span className="tabular-nums">{day.date}</span>
              <span className="ml-2 text-[18px]">{day.title}</span>
            </h2>
            <p className="mt-0.5 text-[13px] text-inkSoft dark:text-stone-300">{day.subtitle}</p>
          </div>
          <div className="shrink-0 text-right text-[12px] text-inkSoft dark:text-stone-400">
            <p>{placeCount} 個行程</p>
            <p>{transitCount} 段交通</p>
          </div>
        </div>
      </div>

      {/* 時間軸 */}
      <div className="space-y-1">
        {day.items.map((item) =>
          item.kind === 'place' ? <PlaceCard key={item.id} item={item} /> : <TransitCard key={item.id} item={item} />,
        )}
      </div>
    </section>
  );
});

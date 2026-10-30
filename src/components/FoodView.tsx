import { days } from '../data/itinerary';
import type { PlaceItem } from '../data/types';
import { PlaceCard } from './PlaceCard';
import { SectionTitle } from './ui';

/** 只看餐廳：四天五家店，照日期排 */
export function FoodView() {
  const meals = days.flatMap((day) =>
    day.items
      .filter((i): i is PlaceItem => i.kind === 'place' && Boolean(i.tabelogQuery))
      .map((item) => ({ day, item })),
  );

  return (
    <div className="space-y-4">
      <section className="rounded-card bg-card p-4 shadow-card ring-1 ring-line dark:bg-nightCard dark:ring-stone-700">
        <SectionTitle emoji="🍣" title="這趟的餐廳" note={`${meals.length} 家，皆已訂位`} />
        <p className="text-[14px] leading-relaxed text-inkSoft dark:text-stone-300">
          每張卡片都可以展開看價位、地址與訂位頁面。Tabelog 連結是官方搜尋頁，直接帶入店名。
        </p>
      </section>

      {meals.map(({ day, item }) => (
        <div key={item.id} className="space-y-1.5">
          <p className="px-1 text-[13px] font-semibold text-roseDeep">
            {day.date}（{day.weekdayZh}）・{day.short}
          </p>
          <PlaceCard item={item} />
        </div>
      ))}
    </div>
  );
}

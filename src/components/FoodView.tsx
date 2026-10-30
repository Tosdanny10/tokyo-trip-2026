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
        <SectionTitle emoji="🍣" title="這趟的餐廳" note={`${meals.length} 家，目前全部尚未預約`} />
        <p className="text-[14px] leading-relaxed text-inkSoft dark:text-stone-300">
          每張卡片都可以展開看價位、訂位狀態與訂位連結。Tabelog 擋自動存取，所以這裡提供的是官方搜尋連結，不是自行猜測的店家頁網址。
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

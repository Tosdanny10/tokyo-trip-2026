import { useId, useState } from 'react';
import { Calendar, ChevronDown, Clock, Globe, Info, MapPin, Star } from 'lucide-react';
import type { PlaceItem } from '../data/types';
import { Illustration } from '../illustrations';
import { mapsSearch, resolveText, tabelogSearch } from '../lib/format';
import { useTrip } from '../state/TripState';
import { Badge, Field, LinkButton } from './ui';

export function PlaceCard({ item }: { item: PlaceItem }) {
  const { hotel } = useTrip();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const r = (t?: string) => (t ? resolveText(t, hotel) : t);
  const title = resolveText(item.title, hotel);
  const mapHref = item.mapQuery ? mapsSearch(item.mapQuery) : item.address ? mapsSearch(r(item.address) as string) : null;

  return (
    <article className="overflow-hidden rounded-card bg-card shadow-card ring-1 ring-line dark:bg-nightCard dark:ring-stone-700">
      {/* 整張卡片的上半部就是展開／收合的按鈕 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full gap-3 p-3 text-left transition active:bg-paper/60"
      >
        <span className="h-[72px] w-[96px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-line dark:ring-stone-700">
          <Illustration name={item.illustration} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="shrink-0 text-roseDeep" aria-hidden />
            <span className="text-[14px] font-bold tabular-nums tracking-wide text-roseDeep">{item.time}</span>
          </span>

          <span className="mt-0.5 block text-[18px] font-bold leading-snug text-ink dark:text-stone-50">{title}</span>
          {item.jp && <span className="block text-[12px] text-inkSoft dark:text-stone-400">{item.jp}</span>}

          {item.stay && (
            <span className="mt-1.5 flex">
              <Badge className="bg-paper text-inkSoft ring-line dark:bg-stone-700/50 dark:text-stone-300 dark:ring-stone-600">
                {item.stay}
              </Badge>
            </span>
          )}
        </span>

        <ChevronDown
          size={20}
          className={`mt-1 shrink-0 self-start text-inkSoft transition-transform dark:text-stone-400 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {/* 詳細內容 */}
      {open && (
        <div id={panelId} className="animate-pop space-y-3 border-t border-line px-3 pb-4 pt-3 dark:border-stone-700">
          <p className="text-[15px] leading-relaxed text-ink dark:text-stone-200">{r(item.desc)}</p>

          <div className="space-y-1.5 rounded-2xl bg-paper/70 p-3 dark:bg-stone-700/40">
            {item.address && <Field label="地址">{r(item.address)}</Field>}
            {item.stay && <Field label="停留時間">{item.stay}</Field>}
            {item.priceText && <Field label="參考價格">{item.priceText}</Field>}
          </div>

          {item.notes && item.notes.length > 0 && (
            <ul className="space-y-1.5 rounded-2xl bg-ginkgo/20 p-3 dark:bg-amber-900/20">
              {item.notes.map((n, i) => (
                <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-ginkgoDeep dark:text-amber-200">
                  <Info size={15} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{r(n)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            {mapHref && (
              <LinkButton href={mapHref} tone="primary" icon={<MapPin size={15} aria-hidden />}>
                Google Maps
              </LinkButton>
            )}
            {item.booking && (
              <LinkButton href={item.booking} tone="sakura" icon={<Calendar size={15} aria-hidden />}>
                訂位頁面
              </LinkButton>
            )}
            {item.official && (
              <LinkButton href={item.official} icon={<Globe size={15} aria-hidden />}>
                官方網站
              </LinkButton>
            )}
            {item.tabelogQuery && (
              <LinkButton href={tabelogSearch(item.tabelogQuery)} icon={<Star size={15} aria-hidden />}>
                Tabelog
              </LinkButton>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

import { useId, useState } from 'react';
import { Calendar, CheckCircle2, ChevronDown, Circle, Clock, Globe, Info, MapPin, Star } from 'lucide-react';
import type { PlaceItem, ReserveStatus } from '../data/types';
import { Illustration } from '../illustrations';
import { mapsSearch, resolveText, tabelogSearch } from '../lib/format';
import { useTrip } from '../state/TripState';
import { Badge, Field, LinkButton, reserveMeta } from './ui';

const reserveOptions: ReserveStatus[] = ['none', 'booked', 'queue', 'tbc'];

export function PlaceCard({ item }: { item: PlaceItem }) {
  const { hotel, checked, toggleChecked, reserveOverride, setReserve } = useTrip();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const r = (t?: string) => (t ? resolveText(t, hotel) : t);
  const title = resolveText(item.title, hotel);
  const status = reserveOverride[item.id] ?? item.reserve;
  const done = Boolean(checked[item.id]);
  const mapHref = item.mapQuery ? mapsSearch(item.mapQuery) : item.address ? mapsSearch(r(item.address) as string) : null;

  return (
    <article
      className={`relative overflow-hidden rounded-card bg-card shadow-card ring-1 ring-line transition dark:bg-nightCard dark:ring-stone-700 ${
        done ? 'opacity-70' : ''
      }`}
    >
      {/* 卡片頂部：插畫 + 標題 */}
      <div className="flex gap-3 p-3">
        <div className="h-[72px] w-[96px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-line dark:ring-stone-700">
          <Illustration name={item.illustration} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="shrink-0 text-sakuraDeep" aria-hidden />
            <span className="text-[15px] font-bold tabular-nums tracking-wide text-sakuraDeep">{item.time}</span>
          </div>

          <h3 className={`mt-0.5 text-[16px] font-bold leading-snug text-ink dark:text-stone-50 ${done ? 'line-through' : ''}`}>
            {title}
          </h3>
          {item.jp && <p className="text-[12px] text-inkSoft dark:text-stone-400">{item.jp}</p>}

          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge className={reserveMeta[status].cls}>{reserveMeta[status].label}</Badge>
            {item.stay && (
              <Badge className="bg-paper text-inkSoft ring-line dark:bg-stone-700/50 dark:text-stone-300 dark:ring-stone-600">
                {item.stay}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* 操作列 */}
      <div className="flex items-center gap-1 border-t border-line px-2 py-1.5 dark:border-stone-700">
        <button
          type="button"
          onClick={() => toggleChecked(item.id)}
          aria-pressed={done}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-2.5 text-[13px] font-medium text-inkSoft transition hover:bg-paper dark:text-stone-300 dark:hover:bg-stone-700"
        >
          {done ? <CheckCircle2 size={16} className="text-sageDeep" aria-hidden /> : <Circle size={16} aria-hidden />}
          {done ? '已完成' : '標記完成'}
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="ml-auto inline-flex min-h-[40px] items-center gap-1 rounded-xl px-3 text-[13px] font-medium text-roseDeep transition hover:bg-sakura/25"
        >
          {open ? '收合' : '詳細內容'}
          <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      </div>

      {/* 詳細內容 */}
      {open && (
        <div id={panelId} className="animate-pop space-y-3 border-t border-line px-3 pb-4 pt-3 dark:border-stone-700">
          <p className="text-[15px] leading-relaxed text-ink dark:text-stone-200">{r(item.desc)}</p>

          <div className="space-y-1.5 rounded-2xl bg-paper/70 p-3 dark:bg-stone-700/40">
            {item.address && <Field label="地址">{r(item.address)}</Field>}
            {item.stay && <Field label="停留時間">{item.stay}</Field>}
            {item.priceText && <Field label="參考價格">{item.priceText}</Field>}
            {item.reserveNote && <Field label="預約備註">{item.reserveNote}</Field>}
          </div>

          {item.notes && item.notes.length > 0 && (
            <ul className="space-y-1.5 rounded-2xl bg-ginkgo/12 p-3 dark:bg-amber-900/20">
              {item.notes.map((n, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-[#8A6B1E] dark:text-amber-200">
                  <Info size={14} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{r(n)}</span>
                </li>
              ))}
            </ul>
          )}

          {/* 預約狀態切換 */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[13px] text-inkSoft dark:text-stone-400">預約狀態</span>
            {reserveOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setReserve(item.id, opt === item.reserve ? null : opt)}
                aria-pressed={status === opt}
                className={`min-h-[36px] rounded-full px-3 text-[13px] font-medium ring-1 transition ${
                  status === opt
                    ? reserveMeta[opt].cls
                    : 'bg-card text-inkSoft ring-line hover:bg-paper dark:bg-nightCard dark:text-stone-300 dark:ring-stone-600'
                }`}
              >
                {reserveMeta[opt].label}
              </button>
            ))}
          </div>

          {/* 連結 */}
          <div className="flex flex-wrap gap-2">
            {mapHref && (
              <LinkButton href={mapHref} tone="primary" icon={<MapPin size={15} aria-hidden />}>
                Google Maps
              </LinkButton>
            )}
            {item.booking && (
              <LinkButton href={item.booking} tone="sakura" icon={<Calendar size={15} aria-hidden />}>
                線上訂位
              </LinkButton>
            )}
            {item.official && (
              <LinkButton href={item.official} icon={<Globe size={15} aria-hidden />}>
                官方網站
              </LinkButton>
            )}
            {item.tabelogQuery && (
              <LinkButton href={tabelogSearch(item.tabelogQuery)} icon={<Star size={15} aria-hidden />}>
                Tabelog 搜尋
              </LinkButton>
            )}
          </div>

        </div>
      )}
    </article>
  );
}

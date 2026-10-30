import { useId, useState } from 'react';
import {
  CalendarClock,
  CarTaxiFront,
  ChevronDown,
  Coins,
  Footprints,
  Navigation,
  Pencil,
  Plane,
  TrainFront,
  TrainFrontTunnel,
  TramFront,
  type LucideIcon,
} from 'lucide-react';
import type { TransitItem, TransitMode } from '../data/types';
import { mapsDirections, resolveText } from '../lib/format';
import { useTrip } from '../state/TripState';
import { transitMeta } from './ui';

const modeIcon: Record<TransitMode, LucideIcon> = {
  walk: Footprints,
  terminal: Footprints,
  jr: TrainFront,
  metro: TramFront,
  taxi: CarTaxiFront,
  skyliner: TrainFrontTunnel,
  flight: Plane,
};

export function TransitCard({ item }: { item: TransitItem }) {
  const { hotel, transitNote, setTransitNote } = useTrip();
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const noteId = useId();
  const panelId = useId();

  const r = (t?: string) => (t ? resolveText(t, hotel) : t);
  const m = transitMeta[item.mode];
  const Icon = modeIcon[item.mode];
  const note = transitNote[item.id] ?? '';

  const dirHref =
    item.mapsFrom && item.mapsTo
      ? mapsDirections(r(item.mapsFrom) as string, r(item.mapsTo) as string, item.travelmode)
      : null;

  return (
    <div className="relative mx-auto w-full max-w-[34rem] px-1">
      {/* 虛線連接 */}
      <div className="flex justify-center" aria-hidden>
        <div className="h-4 w-0 border-l-2 border-dashed border-sakura" />
      </div>

      <div className={`rounded-2xl border ${m.border} ${m.bg} px-3 py-2.5 shadow-sm`}>
        <div className="flex items-start gap-2.5">
          <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/80 ${m.text} dark:bg-stone-800/70`}>
            <Icon size={17} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className={`text-[13px] font-bold ${m.text}`}>{m.label}</span>
              {item.time && <span className="text-[12px] tabular-nums text-inkSoft dark:text-stone-400">{item.time}</span>}
            </div>

            <p className={`mt-1 text-[15px] font-semibold leading-snug ${m.text}`}>
              {r(item.from)} <span aria-hidden className="opacity-60">→</span> {r(item.to)}
            </p>

            <p className="mt-0.5 text-[13px] leading-relaxed text-ink/80 dark:text-stone-300">{r(item.recommend)}</p>

            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {item.rideMin && (
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-[12px] text-inkSoft ring-1 ring-black/5 dark:bg-stone-800/70 dark:text-stone-300">
                  🚆 {item.rideMin}
                </span>
              )}
              {item.walkMin && (
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-[12px] text-inkSoft ring-1 ring-black/5 dark:bg-stone-800/70 dark:text-stone-300">
                  🚶 {item.walkMin}
                </span>
              )}
              {item.fareText && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[12px] text-inkSoft ring-1 ring-black/5 dark:bg-stone-800/70 dark:text-stone-300">
                  <Coins size={11} aria-hidden />
                  {item.fareText}
                </span>
              )}
            </div>

            {note && (
              <p className="mt-1.5 rounded-xl bg-white/70 px-2.5 py-1.5 text-[13px] leading-relaxed text-ink dark:bg-stone-800/60 dark:text-stone-200">
                📝 {note}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {dirHref && (
                <a
                  href={dirHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-card px-3 text-[13px] font-semibold text-roseDeep shadow-sm ring-1 ring-black/5 transition hover:bg-paper dark:bg-stone-800 dark:text-sky dark:hover:bg-stone-700"
                >
                  <Navigation size={14} aria-hidden />
                  開啟 Google Maps 導航
                </a>
              )}
              {item.official && (
                <a
                  href={item.official}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-card px-3 text-[15px] font-semibold text-roseDeep shadow-sm ring-1 ring-black/5 transition hover:bg-paper dark:bg-stone-800 dark:text-sakura dark:hover:bg-stone-700"
                >
                  <CalendarClock size={15} aria-hidden />
                  時刻表
                </a>
              )}
              <button
                type="button"
                onClick={() => setEditing((v) => !v)}
                className="inline-flex min-h-[40px] items-center gap-1 rounded-xl px-2.5 text-[13px] font-medium text-inkSoft transition hover:bg-white/70 dark:text-stone-300 dark:hover:bg-stone-800/60"
              >
                <Pencil size={13} aria-hidden />
                {note ? '修改備註' : '加備註／改時間'}
              </button>
              {(item.line || item.stations) && (
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="inline-flex min-h-[40px] items-center gap-1 rounded-xl px-2.5 text-[13px] font-medium text-inkSoft transition hover:bg-white/70 dark:text-stone-300 dark:hover:bg-stone-800/60"
                >
                  路線細節
                  <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
                </button>
              )}
            </div>

            {editing && (
              <div className="mt-2">
                <label htmlFor={noteId} className="mb-1 block text-[12px] text-inkSoft dark:text-stone-400">
                  自行調整的交通時間或備註（只存在這台裝置）
                </label>
                <textarea
                  id={noteId}
                  value={note}
                  onChange={(e) => setTransitNote(item.id, e.target.value)}
                  rows={2}
                  placeholder="例：實測 22 分鐘／改搭特別快速"
                  className="w-full rounded-xl border border-black/10 bg-card px-3 py-2 text-[15px] text-ink outline-none focus:ring-2 focus:ring-rose/50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>
            )}

            {open && (
              <div id={panelId} className="animate-pop mt-2 space-y-1.5 rounded-xl bg-white/70 p-3 dark:bg-stone-800/60">
                {item.line && (
                  <p className="text-[13px] leading-relaxed text-ink dark:text-stone-200">
                    <span className="text-inkSoft dark:text-stone-400">路線名稱：</span>
                    {r(item.line)}
                  </p>
                )}
                {item.stations && (
                  <p className="text-[13px] leading-relaxed text-ink dark:text-stone-200">
                    <span className="text-inkSoft dark:text-stone-400">起終點／轉乘：</span>
                    {r(item.stations)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center" aria-hidden>
        <div className="h-4 w-0 border-l-2 border-dashed border-sakura" />
      </div>
    </div>
  );
}

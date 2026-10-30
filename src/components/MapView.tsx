import { BedDouble, MapPin, Navigation } from 'lucide-react';
import { days } from '../data/itinerary';
import type { PlaceItem, TransitItem } from '../data/types';
import { mapsDirections, mapsSearch, resolveText } from '../lib/format';
import { useTrip } from '../state/TripState';
import { SectionTitle, transitMeta } from './ui';

/** 把四天的景點與交通整理成一份可直接點開 Google Maps 的清單 */
export function MapView({ onJumpToDay }: { onJumpToDay: (id: string) => void }) {
  const { hotel } = useTrip();
  const r = (t: string) => resolveText(t, hotel);

  return (
    <div className="space-y-4">
      {/* 住宿 */}
      <section className="rounded-card bg-card p-4 shadow-card ring-1 ring-line dark:bg-nightCard dark:ring-stone-700">
        <SectionTitle emoji="🏨" title="住宿" note="所有交通的起點與終點" />
        <div className="rounded-2xl bg-paper/70 p-3 dark:bg-stone-700/40">
          <p className="flex items-start gap-2 text-[15px] leading-relaxed text-ink dark:text-stone-100">
            <BedDouble size={17} className="mt-0.5 shrink-0 text-roseDeep" aria-hidden />
            <span>
              <strong className="font-bold">{hotel.name}</strong>
              <br />
              <span className="text-[13px] text-inkSoft dark:text-stone-400">{hotel.nameJa}</span>
              <br />
              <span className="text-[13px] text-inkSoft dark:text-stone-400">{hotel.address}</span>
            </span>
          </p>
          <a
            href={mapsSearch(hotel.nameJa || hotel.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-roseDeep px-3 text-[15px] font-semibold text-white shadow-sm transition hover:bg-rose active:bg-rosePress"
          >
            <MapPin size={16} aria-hidden />
            在 Google Maps 開啟飯店
          </a>
        </div>
      </section>

      {days.map((day) => {
        const places = day.items.filter((i): i is PlaceItem => i.kind === 'place' && Boolean(i.mapQuery || i.address));
        const transits = day.items.filter(
          (i): i is TransitItem => i.kind === 'transit' && Boolean(i.mapsFrom && i.mapsTo),
        );
        return (
          <section key={day.id} className="rounded-card bg-card p-4 shadow-card ring-1 ring-line dark:bg-nightCard dark:ring-stone-700">
            <div className="mb-3 flex items-center justify-between gap-2">
              <SectionTitle emoji="📍" title={`${day.date} ${day.short}`} note={day.title} />
              <button
                type="button"
                onClick={() => onJumpToDay(day.id)}
                className="min-h-[40px] shrink-0 rounded-xl px-3 text-[13px] font-semibold text-roseDeep transition hover:bg-sakura/25"
              >
                看行程
              </button>
            </div>

            <ul className="space-y-1.5">
              {places.map((p) => (
                <li key={p.id}>
                  <a
                    href={mapsSearch(p.mapQuery ?? r(p.address ?? p.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[52px] items-center gap-2.5 rounded-2xl border border-line bg-paper/50 px-3 py-2 transition hover:bg-paper dark:border-stone-600 dark:bg-stone-700/40"
                  >
                    <MapPin size={16} className="shrink-0 text-roseDeep" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug text-ink dark:text-stone-100">
                        {r(p.title)}
                      </span>
                      <span className="block text-[12px] tabular-nums text-inkSoft dark:text-stone-400">{p.time}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mb-1.5 mt-3 text-[12px] font-semibold text-inkSoft dark:text-stone-400">交通導航</p>
            <ul className="space-y-1.5">
              {transits.map((t) => {
                const m = transitMeta[t.mode];
                return (
                  <li key={t.id}>
                    <a
                      href={mapsDirections(r(t.mapsFrom as string), r(t.mapsTo as string), t.travelmode)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex min-h-[48px] items-center gap-2.5 rounded-2xl border px-3 py-2 transition ${m.border} ${m.bg}`}
                    >
                      <Navigation size={15} className={`shrink-0 ${m.text}`} aria-hidden />
                      <span className={`min-w-0 flex-1 text-[13px] font-medium leading-snug ${m.text}`}>
                        {r(t.from)} <span aria-hidden className="opacity-60">→</span> {r(t.to)}
                      </span>
                      <span className={`shrink-0 text-[11px] font-semibold ${m.text}`}>{m.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

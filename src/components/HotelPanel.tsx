import { useId, useState } from 'react';
import { AlertTriangle, BedDouble, ChevronDown, MapPin, RotateCcw } from 'lucide-react';
import { defaultHotel } from '../data/itinerary';
import { mapsSearch } from '../lib/format';
import { useTrip } from '../state/TripState';
import { SectionTitle } from './ui';

const fields = [
  { key: 'name', label: '中文名稱' },
  { key: 'nameEn', label: '英文名稱' },
  { key: 'nameJa', label: '日文名稱（Google Maps 用）' },
  { key: 'address', label: '地址（會用在導航）' },
  { key: 'nearestStation', label: '最近車站' },
  { key: 'stationWalk', label: '車站步行時間' },
] as const;

/**
 * 住宿設定：修改後，首頁與所有引用 {{hotel}} 的交通卡片都會同步更新。
 * 刻意不自動重新計算車程 —— 沒有可靠的即時交通資料，不會假裝已經重算過。
 */
export function HotelPanel() {
  const { hotel, setHotel } = useTrip();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const baseId = useId();

  return (
    <section className="rounded-card bg-card p-4 shadow-card ring-1 ring-line dark:bg-nightCard dark:ring-stone-700">
      <SectionTitle emoji="🏨" title="住宿設定" note="修改後，行程與交通卡片會同步更新" />

      <div className="rounded-2xl bg-paper/70 p-3 dark:bg-stone-700/40">
        <p className="flex items-start gap-2 text-[15px] leading-relaxed text-ink dark:text-stone-100">
          <BedDouble size={17} className="mt-0.5 shrink-0 text-roseDeep" aria-hidden />
          <span>
            <strong className="font-bold">{hotel.name}</strong>
            <br />
            <span className="text-[13px] text-inkSoft dark:text-stone-400">
              {hotel.nameEn}／{hotel.nameJa}
            </span>
            <br />
            <span className="text-[13px] text-inkSoft dark:text-stone-400">{hotel.address}</span>
            <br />
            <span className="text-[13px] text-inkSoft dark:text-stone-400">
              {hotel.nearestStation}・{hotel.stationWalk}
            </span>
          </span>
        </p>

        <dl className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
          {[
            { k: '入住', v: hotel.checkIn.slice(5).replace('-', '/') },
            { k: '退房', v: hotel.checkOut.slice(5).replace('-', '/') },
            { k: '人數／房', v: `${hotel.guests} 人 ${hotel.rooms} 房` },
          ].map(({ k, v }) => (
            <div key={k} className="rounded-xl bg-card/80 py-1.5 dark:bg-stone-800/60">
              <dt className="text-[11px] text-inkSoft dark:text-stone-400">{k}</dt>
              <dd className="text-[14px] font-bold tabular-nums text-ink dark:text-stone-50">{v}</dd>
            </div>
          ))}
        </dl>

        <a
          href={mapsSearch(hotel.nameJa || hotel.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-roseDeep px-3 text-[15px] font-semibold text-white shadow-sm transition hover:bg-rose active:bg-rosePress"
        >
          <MapPin size={16} aria-hidden />
          在 Google Maps 開啟飯店
        </a>

        <p className="mt-2.5 flex gap-1.5 rounded-xl bg-sakura/25 px-3 py-2 text-[13px] leading-relaxed text-ink dark:bg-rose/20 dark:text-stone-100">
          <AlertTriangle size={15} className="mt-0.5 shrink-0 text-coral" aria-hidden />
          <span>
            11/7 的實際入住時間可能為凌晨 02:00–03:30，請先確認飯店接受深夜入住。訂房與付款狀態不在本頁確認。
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-1 rounded-xl bg-paper text-[15px] font-semibold text-ink transition hover:bg-sakura/30 dark:bg-stone-700/60 dark:text-stone-100"
      >
        {open ? '收合' : '修改住宿資料'}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {open && (
        <div id={panelId} className="animate-pop mt-3 space-y-3">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label htmlFor={`${baseId}-${key}`} className="mb-1 block text-[13px] font-medium text-inkSoft dark:text-stone-400">
                {label}
              </label>
              <input
                id={`${baseId}-${key}`}
                value={hotel[key]}
                onChange={(e) => setHotel({ [key]: e.target.value })}
                className="w-full rounded-xl border border-line bg-card px-3 py-2.5 text-ink outline-none focus:ring-2 focus:ring-rose/50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
          ))}

          <p className="text-[13px] leading-relaxed text-inkSoft dark:text-stone-400">
            注意：修改住宿後，網頁不會自動重新計算車程與票價（沒有即時交通資料來源）。請點各張交通卡片的「開啟 Google Maps
            導航」重新確認，並用「加備註／改時間」記下實際結果。
          </p>

          <button
            type="button"
            onClick={() => setHotel(defaultHotel)}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-[13px] font-medium text-inkSoft transition hover:bg-paper dark:text-stone-300 dark:hover:bg-stone-700"
          >
            <RotateCcw size={15} aria-hidden />
            還原成赤羽霍利克飯店
          </button>
        </div>
      )}
    </section>
  );
}

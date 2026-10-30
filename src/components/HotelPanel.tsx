import { useId, useState } from 'react';
import { BedDouble, ChevronDown, RotateCcw } from 'lucide-react';
import { defaultHotel } from '../data/itinerary';
import { useTrip } from '../state/TripState';
import { SectionTitle } from './ui';

/**
 * 住宿設定：修改後，首頁與所有引用 {{hotel}} 的交通卡片都會同步更新。
 * 刻意不自動重新計算車程 —— 沒有可靠的即時交通資料，不會假裝已經重算過。
 */
export function HotelPanel() {
  const { hotel, setHotel } = useTrip();
  const [open, setOpen] = useState(false);
  const nameId = useId();
  const addrId = useId();
  const stationId = useId();
  const panelId = useId();

  const unset = hotel.name === defaultHotel.name;

  return (
    <section className="rounded-card bg-white p-4 shadow-card ring-1 ring-stone-100 dark:bg-nightCard dark:ring-stone-700">
      <SectionTitle emoji="🏨" title="住宿設定" note="修改後，行程與交通卡片會同步更新" />

      <div className="rounded-2xl bg-paper/70 p-3 dark:bg-stone-700/40">
        <p className="flex items-start gap-2 text-[13px] leading-relaxed text-ink dark:text-stone-200">
          <BedDouble size={16} className="mt-0.5 shrink-0 text-sakuraDeep" aria-hidden />
          <span>
            <strong className="font-semibold">{hotel.name}</strong>
            <br />
            <span className="text-inkSoft dark:text-stone-400">{hotel.address}</span>
            <br />
            <span className="text-inkSoft dark:text-stone-400">最近車站：{hotel.nearestStation}</span>
          </span>
        </p>
        {unset && (
          <p className="mt-2 rounded-xl bg-sky/20 px-3 py-2 text-[12px] leading-relaxed text-[#3E7795] dark:bg-skyDeep/20 dark:text-sky">
            飯店尚未確定，所有與住宿有關的交通時間與車資都標示為「待確認」。填入飯店後請自行用 Google Maps 重新確認路線。
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-1 rounded-xl bg-stone-50 text-[13px] font-semibold text-ink transition hover:bg-stone-100 dark:bg-stone-700/60 dark:text-stone-100"
      >
        {open ? '收合' : '修改住宿資料'}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {open && (
        <div id={panelId} className="animate-pop mt-3 space-y-3">
          <div>
            <label htmlFor={nameId} className="mb-1 block text-[12px] font-medium text-inkSoft dark:text-stone-400">
              飯店名稱
            </label>
            <input
              id={nameId}
              value={hotel.name}
              onChange={(e) => setHotel({ name: e.target.value })}
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-[14px] text-ink outline-none focus:ring-2 focus:ring-skyDeep/40 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>
          <div>
            <label htmlFor={addrId} className="mb-1 block text-[12px] font-medium text-inkSoft dark:text-stone-400">
              飯店地址（會用在 Google Maps 導航）
            </label>
            <input
              id={addrId}
              value={hotel.address}
              onChange={(e) => setHotel({ address: e.target.value })}
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-[14px] text-ink outline-none focus:ring-2 focus:ring-skyDeep/40 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>
          <div>
            <label htmlFor={stationId} className="mb-1 block text-[12px] font-medium text-inkSoft dark:text-stone-400">
              最近車站
            </label>
            <input
              id={stationId}
              value={hotel.nearestStation}
              onChange={(e) => setHotel({ nearestStation: e.target.value })}
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-[14px] text-ink outline-none focus:ring-2 focus:ring-skyDeep/40 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>

          <p className="text-[11px] leading-relaxed text-inkSoft dark:text-stone-400">
            注意：修改住宿後，網頁不會自動重新計算車程與票價（沒有即時交通資料來源）。請點各張交通卡片的「開啟 Google Maps
            導航」重新確認，並用「加備註／改時間」記下實際結果。
          </p>

          <button
            type="button"
            onClick={() => setHotel(defaultHotel)}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-[12px] font-medium text-inkSoft transition hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700"
          >
            <RotateCcw size={14} aria-hidden />
            還原成未確定狀態
          </button>
        </div>
      )}
    </section>
  );
}

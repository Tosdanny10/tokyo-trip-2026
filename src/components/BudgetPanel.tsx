import { useId, useMemo, useState } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { days, meta } from '../data/itinerary';
import { categoryMeta, collectBudgetRows, sumByCategory } from '../lib/budget';
import { formatJpy, formatTwd } from '../lib/format';
import { useTrip } from '../state/TripState';
import { SectionTitle } from './ui';

export function BudgetPanel() {
  const { hotel, rate, setRate, actual, setActual } = useTrip();
  const [rateText, setRateText] = useState(String(rate));
  const rateId = useId();

  const rows = useMemo(() => collectBudgetRows(days, meta.travelers, hotel), [hotel]);
  const byCategory = useMemo(() => sumByCategory(rows, actual), [rows, actual]);

  const totalEst = rows.reduce((sum, r) => sum + r.estJpy, 0);
  const totalAct = rows.reduce((sum, r) => sum + (actual[r.id] ?? 0), 0);
  const actualCount = rows.filter((r) => typeof actual[r.id] === 'number').length;

  const applyRate = (text: string) => {
    setRateText(text);
    const n = Number(text);
    if (Number.isFinite(n) && n > 0) setRate(n);
  };

  return (
    <section className="space-y-4">
      <div className="rounded-card bg-white p-4 shadow-card ring-1 ring-stone-100 dark:bg-nightCard dark:ring-stone-700">
        <SectionTitle emoji="💰" title="預算模式" note={`${meta.travelers} 人合計・日圓與台幣對照`} />

        {/* 匯率 */}
        <div className="rounded-2xl bg-paper/70 p-3 dark:bg-stone-700/40">
          <label htmlFor={rateId} className="mb-1 block text-[12px] font-medium text-inkSoft dark:text-stone-400">
            匯率（1 日圓 = ? 台幣）
          </label>
          <div className="flex items-center gap-2">
            <input
              id={rateId}
              type="number"
              inputMode="decimal"
              step="0.001"
              min="0"
              value={rateText}
              onChange={(e) => applyRate(e.target.value)}
              className="w-28 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-[15px] tabular-nums text-ink outline-none focus:ring-2 focus:ring-skyDeep/40 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
            />
            <button
              type="button"
              onClick={() => applyRate(String(meta.defaultRate))}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-[12px] font-medium text-inkSoft transition hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700"
            >
              <RefreshCcw size={14} aria-hidden />
              回到預設 {meta.defaultRate}
            </button>
          </div>
          <p className="mt-2 flex gap-1.5 text-[11px] leading-relaxed text-coral">
            <AlertTriangle size={13} className="mt-0.5 shrink-0" aria-hidden />
            {meta.rateNote}
          </p>
        </div>

        {/* 總計 */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-sakura/20 p-3 dark:bg-sakuraDeep/20">
            <p className="text-[11px] font-semibold text-[#A8566B] dark:text-sakura">預估總額（兩人）</p>
            <p className="mt-0.5 text-[20px] font-bold tabular-nums text-ink dark:text-stone-50">{formatJpy(totalEst)}</p>
            <p className="text-[12px] tabular-nums text-inkSoft dark:text-stone-300">≈ {formatTwd(totalEst, rate)}</p>
          </div>
          <div className="rounded-2xl bg-sage/20 p-3 dark:bg-sageDeep/20">
            <p className="text-[11px] font-semibold text-[#4E7D57] dark:text-sage">實際付款（已填 {actualCount} 筆）</p>
            <p className="mt-0.5 text-[20px] font-bold tabular-nums text-ink dark:text-stone-50">{formatJpy(totalAct)}</p>
            <p className="text-[12px] tabular-nums text-inkSoft dark:text-stone-300">≈ {formatTwd(totalAct, rate)}</p>
          </div>
        </div>

        <p className="mt-2 text-[11px] leading-relaxed text-inkSoft dark:text-stone-400">
          預估金額不含機票與住宿費用（機票已另外購買、住宿尚未確定）。帶有「估」字樣的項目是價格區間的中間值或自訂預算，不是確定金額。
        </p>
      </div>

      {/* 分類統計 */}
      <div className="rounded-card bg-white p-4 shadow-card ring-1 ring-stone-100 dark:bg-nightCard dark:ring-stone-700">
        <SectionTitle emoji="📊" title="分類統計" note="兩人合計" />
        <div className="space-y-2">
          {[...byCategory.entries()].map(([cat, v]) => {
            const pct = totalEst > 0 ? Math.round((v.est / totalEst) * 100) : 0;
            return (
              <div key={cat}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-semibold ${categoryMeta[cat].cls}`}>
                    <span aria-hidden>{categoryMeta[cat].emoji}</span>
                    {categoryMeta[cat].label}
                  </span>
                  <span className="text-[13px] font-bold tabular-nums text-ink dark:text-stone-50">{formatJpy(v.est)}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-700">
                    <div className="h-full rounded-full bg-sakuraDeep/70" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-20 shrink-0 text-right text-[11px] tabular-nums text-inkSoft dark:text-stone-400">
                    {formatTwd(v.est, rate)}
                  </span>
                </div>
                {v.hasActual && (
                  <p className="mt-0.5 text-[11px] tabular-nums text-sageDeep">實際：{formatJpy(v.act)}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 明細 + 實際付款輸入 */}
      <div className="rounded-card bg-white p-4 shadow-card ring-1 ring-stone-100 dark:bg-nightCard dark:ring-stone-700">
        <SectionTitle emoji="🧾" title="費用明細" note="可填入實際付款金額（兩人合計，日圓）" />
        <ul className="divide-y divide-stone-100 dark:divide-stone-700">
          {rows.map((row) => {
            const act = actual[row.id];
            return (
              <li key={row.id} className="flex flex-wrap items-center gap-2 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium leading-snug text-ink dark:text-stone-100">
                    <span className="mr-1.5 tabular-nums text-inkSoft dark:text-stone-400">{row.dayDate}</span>
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-[11px] tabular-nums text-inkSoft dark:text-stone-400">
                    預估 {formatJpy(row.estJpy)}・{formatTwd(row.estJpy, rate)}
                    {row.tbc && <span className="ml-1 text-coral">（估）</span>}
                  </p>
                </div>
                <label className="flex items-center gap-1">
                  <span className="sr-only">{row.label} 實際付款金額</span>
                  <span className="text-[12px] text-inkSoft dark:text-stone-400">實付 ¥</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={act ?? ''}
                    placeholder="—"
                    onChange={(e) => setActual(row.id, e.target.value === '' ? null : Number(e.target.value))}
                    className="w-24 rounded-xl border border-stone-200 bg-white px-2.5 py-2 text-right text-[13px] tabular-nums text-ink outline-none focus:ring-2 focus:ring-skyDeep/40 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
                  />
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

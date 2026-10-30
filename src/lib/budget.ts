import type { CostCategory, Day, Hotel } from '../data/types';
import { resolveText } from './format';

export interface BudgetRow {
  id: string;
  dayDate: string;
  label: string;
  category: CostCategory;
  /** 兩人合計的估算金額（日圓） */
  estJpy: number;
  /** 金額尚未確認 */
  tbc: boolean;
}

export const categoryMeta: Record<CostCategory, { label: string; emoji: string; cls: string }> = {
  food: { label: '餐費', emoji: '🍣', cls: 'bg-coral/20 text-[#A9513A]' },
  transit: { label: '交通', emoji: '🚃', cls: 'bg-sky/25 text-[#3E7795]' },
  ticket: { label: '門票', emoji: '🎟️', cls: 'bg-sage/25 text-[#4E7D57]' },
  kimono: { label: '和服', emoji: '👘', cls: 'bg-sakura/30 text-[#A8566B]' },
  shopping: { label: '購物・伴手禮', emoji: '🛍️', cls: 'bg-ginkgo/25 text-[#8A6B1E]' },
  lodging: { label: '住宿', emoji: '🏨', cls: 'bg-stone-200 text-stone-600' },
  flight: { label: '機票', emoji: '✈️', cls: 'bg-stone-200 text-stone-600' },
};

/** 把行程資料裡所有 cost 收集成預算清單（換算成兩人合計） */
export function collectBudgetRows(days: Day[], travelers: number, hotel: Hotel): BudgetRow[] {
  const rows: BudgetRow[] = [];
  for (const day of days) {
    for (const item of day.items) {
      const cost = item.cost;
      if (!cost) continue;
      const base = cost.label ?? (item.kind === 'place' ? item.title : `${item.from} → ${item.to}`);
      rows.push({
        id: item.id,
        dayDate: day.date,
        label: resolveText(base, hotel),
        category: cost.category,
        estJpy: cost.basis === 'person' ? cost.jpy * travelers : cost.jpy,
        tbc: Boolean(cost.tbc),
      });
    }
  }
  return rows;
}

export function sumByCategory(rows: BudgetRow[], actual: Record<string, number>) {
  const map = new Map<CostCategory, { est: number; act: number; hasActual: boolean }>();
  for (const row of rows) {
    const cur = map.get(row.category) ?? { est: 0, act: 0, hasActual: false };
    cur.est += row.estJpy;
    const a = actual[row.id];
    if (typeof a === 'number') {
      cur.act += a;
      cur.hasActual = true;
    }
    map.set(row.category, cur);
  }
  return map;
}

import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import type { ReserveStatus, TransitMode } from '../data/types';

/** 預約狀態的顯示設定 */
export const reserveMeta: Record<ReserveStatus, { label: string; cls: string }> = {
  none: { label: '未預約', cls: 'bg-stone-100 text-stone-600 ring-stone-300 dark:bg-stone-700/60 dark:text-stone-200 dark:ring-stone-500' },
  booked: { label: '已預約', cls: 'bg-sage/35 text-sageDeep ring-sage dark:bg-sageDeep/40 dark:text-sage dark:ring-sageDeep' },
  queue: { label: '需候位', cls: 'bg-ginkgo/35 text-ginkgoDeep ring-ginkgo dark:bg-ginkgoDeep/35 dark:text-ginkgo dark:ring-ginkgoDeep' },
  tbc: { label: '待確認', cls: 'bg-sky/35 text-skyDeep ring-sky dark:bg-skyDeep/35 dark:text-sky dark:ring-skyDeep' },
};

/** 交通方式的顯示設定（顏色依規格：JR 綠、Metro 淺藍、步行米白、計程車淡黃、機場交通粉藍） */
export const transitMeta: Record<
  TransitMode,
  { label: string; bg: string; border: string; text: string; dot: string }
> = {
  walk: {
    label: '步行',
    bg: 'bg-[#FFF6E6] dark:bg-stone-700/50',
    border: 'border-[#E8D9BE] dark:border-stone-600',
    text: 'text-[#8A7458] dark:text-stone-200',
    dot: 'bg-[#D8C3A0]',
  },
  jr: {
    label: 'JR',
    bg: 'bg-[#E7F2E8] dark:bg-emerald-900/30',
    border: 'border-[#BBD9BF] dark:border-emerald-700',
    text: 'text-[#4E7D57] dark:text-emerald-200',
    dot: 'bg-[#6E9B78]',
  },
  metro: {
    label: '東京 Metro',
    bg: 'bg-[#E6F2F9] dark:bg-sky-900/30',
    border: 'border-[#B4D9EA] dark:border-sky-700',
    text: 'text-[#3E7795] dark:text-sky-200',
    dot: 'bg-[#6FA8C8]',
  },
  taxi: {
    label: '計程車',
    bg: 'bg-[#FDF3D7] dark:bg-amber-900/30',
    border: 'border-[#EDD79A] dark:border-amber-700',
    text: 'text-[#9A7A1E] dark:text-amber-200',
    dot: 'bg-[#E0B429]',
  },
  skyliner: {
    label: '京成 Skyliner',
    bg: 'bg-[#E8EEFB] dark:bg-indigo-900/30',
    border: 'border-[#C0CEEE] dark:border-indigo-700',
    text: 'text-[#4A5E95] dark:text-indigo-200',
    dot: 'bg-[#7E92C8]',
  },
  flight: {
    label: '飛機',
    bg: 'bg-[#EDEAF8] dark:bg-violet-900/30',
    border: 'border-[#CEC6EB] dark:border-violet-700',
    text: 'text-[#5F539B] dark:text-violet-200',
    dot: 'bg-[#8A7CC8]',
  },
  terminal: {
    label: '航廈內步行',
    bg: 'bg-[#F3F1EC] dark:bg-stone-700/50',
    border: 'border-[#DCD6CB] dark:border-stone-600',
    text: 'text-[#7A6F60] dark:text-stone-200',
    dot: 'bg-[#BCB2A3]',
  },
};

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${className}`}>
      {children}
    </span>
  );
}

/** 小資訊欄位（標籤 + 內容） */
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-2 text-[13px] leading-relaxed">
      <span className="w-[4.5rem] shrink-0 text-inkSoft dark:text-stone-400">{label}</span>
      <span className="flex-1 text-ink dark:text-stone-100">{children}</span>
    </div>
  );
}

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  tone?: 'primary' | 'ghost' | 'sakura';
}

/** 外部連結按鈕（手機也好點，最小高度 44px） */
export function LinkButton({ href, children, icon, tone = 'ghost' }: LinkButtonProps) {
  const tones = {
    primary: 'bg-skyDeep text-white hover:bg-[#5c93b2] active:bg-[#517f9b]',
    sakura: 'bg-sakuraDeep text-white hover:bg-[#d8798f] active:bg-[#c96c82]',
    ghost:
      'bg-white text-ink ring-1 ring-stone-200 hover:bg-stone-50 active:bg-stone-100 dark:bg-nightCard dark:text-stone-100 dark:ring-stone-600 dark:hover:bg-stone-700',
  } as const;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl px-3 text-[13px] font-medium shadow-sm transition ${tones[tone]}`}
    >
      {icon ?? <ExternalLink size={15} aria-hidden />}
      {children}
    </a>
  );
}

/** 手帳貼紙式區塊標題 */
export function SectionTitle({ emoji, title, note }: { emoji: string; title: string; note?: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-lg shadow-sticker dark:bg-nightCard" aria-hidden>
        {emoji}
      </span>
      <div>
        <h2 className="text-base font-bold tracking-wide text-ink dark:text-stone-50">{title}</h2>
        {note && <p className="text-[11px] text-inkSoft dark:text-stone-400">{note}</p>}
      </div>
    </div>
  );
}

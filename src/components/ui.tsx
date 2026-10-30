import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import type { TransitMode } from '../data/types';

/**
 * 交通方式的顯示設定。
 * 外框與連接線統一是粉色系，卡片本身保留各運具的辨識色：
 * 步行＝淡粉米白／JR＝鼠尾草綠／Metro＝淡藍／計程車＝淡銀杏黃／
 * Skyliner＝柔和藍紫／飛機＝淡天空藍。
 * 文字色都挑過，在各自底色上達 WCAG AA。
 */
export const transitMeta: Record<
  TransitMode,
  { label: string; bg: string; border: string; text: string; dot: string }
> = {
  walk: {
    label: '步行',
    bg: 'bg-[#FFF4F7] dark:bg-stone-700/50',
    border: 'border-[#F0DCE3] dark:border-stone-600',
    text: 'text-[#8A5A6C] dark:text-stone-200',
    dot: 'bg-[#E8C3CF]',
  },
  terminal: {
    label: '航廈內步行',
    bg: 'bg-[#FBF1F4] dark:bg-stone-700/50',
    border: 'border-[#EDDCE3] dark:border-stone-600',
    text: 'text-[#7E6873] dark:text-stone-200',
    dot: 'bg-[#D9C4CC]',
  },
  jr: {
    label: 'JR',
    bg: 'bg-[#ECF3EE] dark:bg-emerald-900/30',
    border: 'border-[#C9DFCF] dark:border-emerald-700',
    text: 'text-[#4F6E5B] dark:text-emerald-200',
    dot: 'bg-[#7FA68C]',
  },
  metro: {
    label: '東京 Metro',
    bg: 'bg-[#E9F2F8] dark:bg-sky-900/30',
    border: 'border-[#C3DBEA] dark:border-sky-700',
    text: 'text-[#44738F] dark:text-sky-200',
    dot: 'bg-[#7FAAC6]',
  },
  taxi: {
    label: '計程車',
    bg: 'bg-[#FDF4DC] dark:bg-amber-900/30',
    border: 'border-[#EEDCA6] dark:border-amber-700',
    text: 'text-[#8A6710] dark:text-amber-200',
    dot: 'bg-[#D9B544]',
  },
  skyliner: {
    label: '京成 Skyliner',
    bg: 'bg-[#EFEDFA] dark:bg-indigo-900/30',
    border: 'border-[#D3CEEE] dark:border-indigo-700',
    text: 'text-[#574C92] dark:text-indigo-200',
    dot: 'bg-[#9A90CE]',
  },
  flight: {
    label: '飛機',
    bg: 'bg-[#E9F3FB] dark:bg-violet-900/30',
    border: 'border-[#C8DFF1] dark:border-violet-700',
    text: 'text-[#3F7296] dark:text-violet-200',
    dot: 'bg-[#86B2D2]',
  },
};

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ring-1 ${className}`}>
      {children}
    </span>
  );
}

/** 小資訊欄位（標籤 + 內容） */
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-2 text-[15px] leading-relaxed">
      <span className="w-[4.75rem] shrink-0 text-inkSoft dark:text-stone-400">{label}</span>
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
    // 玫瑰粉實心鈕：白字對比 4.8:1
    primary: 'bg-roseDeep text-white hover:bg-rose active:bg-rosePress',
    // 次要鈕做成描邊：玫瑰粉實心配白字只有 3.2:1，改成粉底深粉字 4.8:1
    sakura:
      'bg-card text-roseDeep ring-2 ring-rose hover:bg-sakura/25 active:bg-sakura/40 dark:bg-nightCard dark:text-sakura dark:ring-rose',
    ghost:
      'bg-card text-ink ring-1 ring-line hover:bg-paper active:bg-sakura/40 dark:bg-nightCard dark:text-stone-100 dark:ring-stone-600 dark:hover:bg-stone-700',
  } as const;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl px-3 text-[15px] font-semibold shadow-sm transition ${tones[tone]}`}
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
      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-card text-lg shadow-sticker dark:bg-nightCard" aria-hidden>
        {emoji}
      </span>
      <div>
        <h2 className="text-[17px] font-bold tracking-wide text-ink dark:text-stone-50">{title}</h2>
        {note && <p className="text-[12px] text-inkSoft dark:text-stone-400">{note}</p>}
      </div>
    </div>
  );
}

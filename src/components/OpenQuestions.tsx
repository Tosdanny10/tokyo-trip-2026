import { AlertTriangle } from 'lucide-react';
import { openQuestions } from '../data/itinerary';
import { SectionTitle } from './ui';

/** 已知限制與未查證資訊：和 README 同一份清單 */
export function OpenQuestions() {
  return (
    <section className="rounded-card bg-card p-4 shadow-card ring-1 ring-line dark:bg-nightCard dark:ring-stone-700">
      <SectionTitle emoji="📌" title="已知限制與未查證資訊" note="這些項目尚未經官方查證，出發前請逐一確認" />
      <ul className="space-y-2.5">
        {openQuestions.map((q) => (
          <li key={q.topic} className="rounded-2xl bg-paper/70 p-3 dark:bg-stone-700/40">
            <p className="flex items-center gap-1.5 text-[15px] font-bold text-ink dark:text-stone-50">
              <AlertTriangle size={14} className="shrink-0 text-coral" aria-hidden />
              {q.topic}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-inkSoft dark:text-stone-300">{q.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

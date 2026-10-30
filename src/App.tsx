import { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarRange, LayoutList, Moon, Sun, Wallet } from 'lucide-react';
import { days, meta } from './data/itinerary';
import { Hero } from './components/Hero';
import { DaySection } from './components/DaySection';
import { BottomNav } from './components/BottomNav';
import { BudgetPanel } from './components/BudgetPanel';
import { HotelPanel } from './components/HotelPanel';
import { OpenQuestions } from './components/OpenQuestions';
import { TripProvider } from './state/TripState';

export type ViewMode = 'plan' | 'budget';

const THEME_KEY = 'tokyo-trip-2026/theme';

function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      return window.localStorage.getItem(THEME_KEY) === 'dark';
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      window.localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    } catch {
      // 忽略儲存失敗
    }
  }, [dark]);
  return [dark, setDark] as const;
}

function AppShell() {
  const [activeDay, setActiveDay] = useState(days[0].id);
  const [mode, setMode] = useState<ViewMode>('plan');
  const [showAll, setShowAll] = useState(false);
  const [dark, setDark] = useTheme();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const listTopRef = useRef<HTMLDivElement | null>(null);

  const selectDay = useCallback(
    (id: string) => {
      setActiveDay(id);
      setMode('plan');
      // 不重新載入頁面，只平滑捲動到對應位置
      requestAnimationFrame(() => {
        const target = showAll ? sectionRefs.current[id] : listTopRef.current;
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [showAll],
  );

  const visibleDays = showAll ? days : days.filter((d) => d.id === activeDay);

  return (
    <div className="min-h-dvh bg-cream pb-[calc(76px+env(safe-area-inset-bottom))] text-ink md:pb-10 dark:bg-night dark:text-stone-100">
      {/* 桌機／平板的置頂日期列 */}
      <div className="sticky top-0 z-40 hidden border-b border-stone-200/70 bg-cream/90 backdrop-blur md:block dark:border-stone-700 dark:bg-night/90">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2">
          <span className="font-hand text-[15px] font-bold tracking-wide">{meta.title}</span>
          <nav aria-label="日期切換（桌機）" className="ml-2 flex gap-1">
            {days.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => selectDay(day.id)}
                aria-current={mode === 'plan' && day.id === activeDay ? 'true' : undefined}
                className={`min-h-[40px] rounded-full px-3 text-[13px] font-semibold transition ${
                  mode === 'plan' && day.id === activeDay
                    ? 'bg-sakura/35 text-ink dark:bg-sakuraDeep/35 dark:text-stone-50'
                    : 'text-inkSoft hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700'
                }`}
              >
                <span className="tabular-nums">{day.date}</span>
                <span className="ml-1 text-[11px] font-normal">{day.weekdayZh}</span>
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMode(mode === 'budget' ? 'plan' : 'budget')}
            aria-pressed={mode === 'budget'}
            className={`ml-auto inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold transition ${
              mode === 'budget' ? 'bg-ginkgo/35 text-ginkgoDeep' : 'text-inkSoft hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700'
            }`}
          >
            <Wallet size={15} aria-hidden />
            預算
          </button>
          <button
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? '切換為淺色模式' : '切換為深色模式'}
            className="grid h-10 w-10 place-items-center rounded-full text-inkSoft transition hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700"
          >
            {dark ? <Sun size={17} aria-hidden /> : <Moon size={17} aria-hidden />}
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-3xl space-y-5 px-3 pt-3 md:px-4 md:pt-5">
        <Hero activeDay={activeDay} onSelectDay={selectDay} />

        {/* 模式切換（手機） */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex flex-1 rounded-2xl bg-white p-1 shadow-card ring-1 ring-stone-100 dark:bg-nightCard dark:ring-stone-700">
            <button
              type="button"
              onClick={() => setMode('plan')}
              aria-pressed={mode === 'plan'}
              className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl text-[13px] font-semibold transition ${
                mode === 'plan' ? 'bg-sakura/30 text-ink dark:bg-sakuraDeep/30 dark:text-stone-50' : 'text-inkSoft dark:text-stone-400'
              }`}
            >
              <CalendarRange size={15} aria-hidden />
              行程
            </button>
            <button
              type="button"
              onClick={() => setMode('budget')}
              aria-pressed={mode === 'budget'}
              className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl text-[13px] font-semibold transition ${
                mode === 'budget' ? 'bg-ginkgo/35 text-ginkgoDeep' : 'text-inkSoft dark:text-stone-400'
              }`}
            >
              <Wallet size={15} aria-hidden />
              預算
            </button>
          </div>
          <button
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? '切換為淺色模式' : '切換為深色模式'}
            className="grid h-[52px] w-[52px] place-items-center rounded-2xl bg-white text-inkSoft shadow-card ring-1 ring-stone-100 dark:bg-nightCard dark:text-stone-300 dark:ring-stone-700"
          >
            {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
          </button>
        </div>

        {mode === 'plan' ? (
          <>
            <div ref={listTopRef} className="scroll-mt-20" />

            {/* 全部顯示 / 只看今天 */}
            <div className="flex items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2 shadow-card ring-1 ring-stone-100 dark:bg-nightCard dark:ring-stone-700">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-inkSoft dark:text-stone-400">
                <LayoutList size={14} aria-hidden />
                顯示方式
              </span>
              <div className="flex rounded-xl bg-stone-100 p-0.5 dark:bg-stone-700">
                <button
                  type="button"
                  onClick={() => setShowAll(false)}
                  aria-pressed={!showAll}
                  className={`min-h-[36px] rounded-lg px-3 text-[12px] font-semibold transition ${
                    !showAll ? 'bg-white text-ink shadow-sm dark:bg-stone-800 dark:text-stone-50' : 'text-inkSoft dark:text-stone-300'
                  }`}
                >
                  只看今天
                </button>
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  aria-pressed={showAll}
                  className={`min-h-[36px] rounded-lg px-3 text-[12px] font-semibold transition ${
                    showAll ? 'bg-white text-ink shadow-sm dark:bg-stone-800 dark:text-stone-50' : 'text-inkSoft dark:text-stone-300'
                  }`}
                >
                  全部顯示
                </button>
              </div>
            </div>

            {visibleDays.map((day) => (
              <DaySection
                key={day.id}
                day={day}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[day.id] = el;
                }}
              />
            ))}

            <HotelPanel />
            <OpenQuestions />
          </>
        ) : (
          <>
            <BudgetPanel />
            <HotelPanel />
            <OpenQuestions />
          </>
        )}

        <footer className="pb-4 pt-2 text-center text-[11px] leading-relaxed text-inkSoft dark:text-stone-400">
          <p>{meta.title}・{meta.dateRange}</p>
          <p className="mt-1">
            插畫為原創 SVG，無使用受版權保護的圖片或地圖截圖。勾選、預約狀態與實付金額只存在這台裝置的瀏覽器（localStorage）。
          </p>
        </footer>
      </main>

      <BottomNav activeDay={activeDay} onSelectDay={selectDay} mode={mode} onModeChange={setMode} />
    </div>
  );
}

export default function App() {
  return (
    <TripProvider>
      <AppShell />
    </TripProvider>
  );
}

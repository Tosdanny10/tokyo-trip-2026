import { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarRange, LayoutList, Map, Moon, Sun, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import { days, meta } from './data/itinerary';
import { Hero } from './components/Hero';
import { DayBar } from './components/DayBar';
import { DaySection } from './components/DaySection';
import { BottomNav } from './components/BottomNav';
import { FoodView } from './components/FoodView';
import { HotelPanel } from './components/HotelPanel';
import { MapView } from './components/MapView';
import { OpenQuestions } from './components/OpenQuestions';
import { TripProvider } from './state/TripState';

export type ViewMode = 'plan' | 'map' | 'food';

const viewTabs: { id: ViewMode; label: string; Icon: LucideIcon }[] = [
  { id: 'plan', label: '行程', Icon: CalendarRange },
  { id: 'map', label: '地圖', Icon: Map },
  { id: 'food', label: '美食', Icon: UtensilsCrossed },
];

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
      // 忽略儲存失敗（無痕模式）
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
    <div className="min-h-dvh bg-cream pb-[calc(78px+env(safe-area-inset-bottom))] text-ink md:pb-10 dark:bg-night dark:text-stone-100">
      {/* 桌機／平板的置頂工具列 */}
      <div className="pt-safe sticky top-0 z-40 hidden border-b border-line/80 bg-cream/90 backdrop-blur-xl md:block dark:border-stone-700 dark:bg-night/90">
        <div className="mx-auto max-w-3xl px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="font-hand text-[16px] font-bold tracking-wide text-ink dark:text-stone-50">{meta.fullTitle}</span>
            <nav aria-label="畫面切換" className="ml-2 flex gap-1">
              {viewTabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  aria-current={mode === id ? 'page' : undefined}
                  className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-[14px] transition ${
                    mode === id
                      ? 'bg-sakura/35 font-bold text-rosePress dark:bg-rose/25 dark:text-sakura'
                      : 'font-medium text-inkSoft hover:bg-paper dark:text-stone-300 dark:hover:bg-stone-700'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setDark(!dark)}
              aria-label={dark ? '切換為淺色模式' : '切換為深色模式'}
              className="ml-auto grid h-10 w-10 place-items-center rounded-full text-inkSoft transition hover:bg-paper dark:text-stone-300 dark:hover:bg-stone-700"
            >
              {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
            </button>
          </div>

          {mode === 'plan' && (
            <div className="mt-2">
              <DayBar activeDay={activeDay} onSelectDay={selectDay} />
            </div>
          )}
        </div>
      </div>

      {/* 手機版置頂日期列 */}
      {mode === 'plan' && (
        <div className="mx-auto max-w-3xl px-3 md:hidden">
          <DayBar activeDay={activeDay} onSelectDay={selectDay} sticky />
        </div>
      )}

      <main className="mx-auto max-w-3xl space-y-5 px-3 pt-3 md:px-4 md:pt-5">
        {mode === 'plan' && (
          <>
            <Hero activeDay={activeDay} onSelectDay={selectDay} />

            <div ref={listTopRef} className="scroll-mt-28" />

            {/* 全部顯示 / 只看今天 */}
            <div className="flex items-center justify-between gap-2 rounded-2xl bg-card px-3 py-2 shadow-card ring-1 ring-line dark:bg-nightCard dark:ring-stone-700">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-inkSoft dark:text-stone-400">
                <LayoutList size={15} aria-hidden />
                顯示方式
              </span>
              <div className="flex rounded-xl bg-paper p-0.5 dark:bg-stone-700">
                <button
                  type="button"
                  onClick={() => setShowAll(false)}
                  aria-pressed={!showAll}
                  className={`min-h-[40px] rounded-lg px-3 text-[13px] transition ${
                    !showAll
                      ? 'bg-card font-bold text-roseDeep shadow-sm dark:bg-stone-800 dark:text-sakura'
                      : 'font-medium text-inkSoft dark:text-stone-300'
                  }`}
                >
                  只看今天
                </button>
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  aria-pressed={showAll}
                  className={`min-h-[40px] rounded-lg px-3 text-[13px] transition ${
                    showAll
                      ? 'bg-card font-bold text-roseDeep shadow-sm dark:bg-stone-800 dark:text-sakura'
                      : 'font-medium text-inkSoft dark:text-stone-300'
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
        )}

        {mode === 'map' && <MapView onJumpToDay={selectDay} />}

        {mode === 'food' && <FoodView />}

        <footer className="pb-4 pt-2 text-center text-[12px] leading-relaxed text-inkSoft dark:text-stone-400">
          <p>
            {meta.fullTitle}・{meta.dateRange}
          </p>
          <p className="mt-1">
            插畫為原創 SVG，無使用受版權保護的圖片或地圖截圖。勾選、預約狀態與實付金額只存在這台裝置的瀏覽器（localStorage）。
          </p>
        </footer>
      </main>

      <BottomNav mode={mode} onModeChange={setMode} />
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

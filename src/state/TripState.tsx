import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Hotel } from '../data/types';
import { defaultHotel } from '../data/itinerary';

const STORAGE_KEY = 'tokyo-trip-2026/v1';
/**
 * 資料版本。
 * v2 起住宿改為「赤羽霍利克飯店」，舊版存的佔位飯店要換掉，
 * 但勾選、預約狀態、實付金額與交通備註全部保留。
 */
const SCHEMA_VERSION = 2;

/**
 * 全部存在使用者自己的瀏覽器 localStorage，不會上傳任何個人資料。
 */
export interface TripState {
  /** 資料版本，用來做欄位遷移 */
  version: number;
  hotel: Hotel;
  /** 交通卡片的使用者備註 / 自行調整的時間 */
  transitNote: Record<string, string>;
}

const emptyState: TripState = {
  version: SCHEMA_VERSION,
  hotel: defaultHotel,
  transitNote: {},
};

interface TripContextValue extends TripState {
  setHotel: (patch: Partial<Hotel>) => void;
  setTransitNote: (id: string, note: string) => void;
  resetAll: () => void;
}

const TripContext = createContext<TripContextValue | null>(null);

function load(): TripState {
  if (typeof window === 'undefined') return emptyState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as Partial<TripState>;
    // 版本比 SCHEMA_VERSION 舊的，住宿一律換成新的預設飯店（赤羽霍利克飯店）；
    // 其他使用者資料（勾選、預約狀態、實付金額、交通備註）照舊保留。
    const outdated = (parsed.version ?? 1) < SCHEMA_VERSION;
    const hotel = outdated ? defaultHotel : { ...defaultHotel, ...(parsed.hotel ?? {}) };
    return {
      ...emptyState,
      ...parsed,
      version: SCHEMA_VERSION,
      hotel,
      transitNote: parsed.transitNote ?? {},
    };
  } catch {
    return emptyState;
  }
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TripState>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // 無痕模式或儲存空間不足時忽略，不影響瀏覽
    }
  }, [state]);

  const setHotel = useCallback((patch: Partial<Hotel>) => {
    setState((s) => ({ ...s, hotel: { ...s.hotel, ...patch } }));
  }, []);

  const setTransitNote = useCallback((id: string, note: string) => {
    setState((s) => {
      const next = { ...s.transitNote };
      if (!note) delete next[id];
      else next[id] = note;
      return { ...s, transitNote: next };
    });
  }, []);

  const resetAll = useCallback(() => setState(emptyState), []);

  const value = useMemo<TripContextValue>(
    () => ({ ...state, setHotel, setTransitNote, resetAll }),
    [state, setHotel, setTransitNote, resetAll],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip(): TripContextValue {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip 必須在 TripProvider 內使用');
  return ctx;
}

/** 尊重 prefers-reduced-motion，關閉裝飾性動畫 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

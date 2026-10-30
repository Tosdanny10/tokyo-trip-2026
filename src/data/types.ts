/** 插畫鍵值：對應 src/illustrations/index.tsx 的註冊表 */
export type IllustrationKey =
  | 'airportCheckin'
  | 'planeTakeoff'
  | 'planeLanding'
  | 'immigration'
  | 'taxi'
  | 'hotel'
  | 'breakfast'
  | 'kimono'
  | 'crab'
  | 'ginkgo'
  | 'gyutan'
  | 'neonNight'
  | 'hachiko'
  | 'shibuya109'
  | 'sushi'
  | 'parco'
  | 'streetShopping'
  | 'rooftopPark'
  | 'sashimi'
  | 'checkout'
  | 'torii'
  | 'yanakaCat'
  | 'crabHotpot'
  | 'uenoPark'
  | 'ameyoko'
  | 'skyliner'
  | 'souvenir'
  | 'checkinCounter';

/** 預約狀態 */
export type ReserveStatus = 'none' | 'booked' | 'queue' | 'tbc';

/** 費用分類（預算模式用） */
export type CostCategory = 'food' | 'ticket' | 'kimono' | 'transit' | 'shopping' | 'lodging' | 'flight';

/** 交通方式 */
export type TransitMode = 'walk' | 'jr' | 'metro' | 'taxi' | 'skyliner' | 'flight' | 'terminal';

export interface Cost {
  /** 日圓金額（估算值） */
  jpy: number;
  /** person：每人；group：兩人合計 */
  basis: 'person' | 'group';
  category: CostCategory;
  /** 預算表上顯示的名稱，省略時使用行程名稱 */
  label?: string;
  /** 金額尚未確認 */
  tbc?: boolean;
}

export interface PlaceItem {
  kind: 'place';
  id: string;
  /** 顯示用時間，例如 11:30–13:00 */
  time: string;
  title: string;
  /** 日文原名 */
  jp?: string;
  illustration: IllustrationKey;
  desc: string;
  address?: string;
  /** 預估停留時間 */
  stay?: string;
  /** 參考價格（文字描述，可含區間） */
  priceText?: string;
  cost?: Cost;
  reserve: ReserveStatus;
  reserveNote?: string;
  /** Google Maps 搜尋關鍵字（建議用日文原名以提高命中率） */
  mapQuery?: string;
  /** 官方網站 */
  official?: string;
  /** 訂位 / 預約網址 */
  booking?: string;
  /** 注意事項 */
  notes?: string[];
  /** 整個行程項目尚待確認（時間、地點或營業狀況） */
  tbc?: boolean;
}

export interface TransitItem {
  kind: 'transit';
  id: string;
  mode: TransitMode;
  /** 顯示用時間，可省略 */
  time?: string;
  from: string;
  to: string;
  /** 推薦交通工具說明 */
  recommend: string;
  /** 路線名稱，例如 JR 中央線快速 */
  line?: string;
  /** 起終點車站與轉乘站 */
  stations?: string;
  /** 預估搭乘時間 */
  rideMin?: string;
  /** 預估步行時間 */
  walkMin?: string;
  /** 參考票價文字 */
  fareText?: string;
  cost?: Cost;
  /** Google Maps 導航起點關鍵字 */
  mapsFrom?: string;
  /** Google Maps 導航終點關鍵字 */
  mapsTo?: string;
  /** Google Maps travelmode 參數 */
  travelmode: 'walking' | 'transit' | 'driving';
  /** 待確認（例如依住宿地點或實際班次而定） */
  tbc?: boolean;
  /** 待確認的原因 */
  tbcReason?: string;
}

export type ItineraryItem = PlaceItem | TransitItem;

export interface Day {
  id: string;
  /** 11/6 */
  date: string;
  /** 2026-11-06 */
  iso: string;
  weekdayEn: string;
  weekdayZh: string;
  title: string;
  subtitle: string;
  /** 當天主題色（Tailwind class 片段） */
  accent: 'sakura' | 'ginkgo' | 'sky' | 'sage';
  items: ItineraryItem[];
}

export interface Hotel {
  name: string;
  address: string;
  nearestStation: string;
  note: string;
}

export interface TripMeta {
  title: string;
  subtitle: string;
  dateRange: string;
  travelers: number;
  /** 預設匯率：1 JPY = x TWD（手動維護，非即時匯率） */
  defaultRate: number;
  rateNote: string;
}

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

/** 交通方式 */
export type TransitMode = 'walk' | 'jr' | 'metro' | 'taxi' | 'skyliner' | 'flight' | 'terminal';

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
  reserve: ReserveStatus;
  reserveNote?: string;
  /** Google Maps 搜尋關鍵字（建議用日文原名以提高命中率） */
  mapQuery?: string;
  /** 官方網站 */
  official?: string;
  /** 訂位 / 預約網址 */
  booking?: string;
  /**
   * Tabelog 搜尋關鍵字（只有餐廳會填）。
   * Tabelog 擋自動存取，無法逐一核實各店的頁面網址，
   * 因此提供官方的搜尋連結而不是自行猜測的店家頁網址。
   */
  tabelogQuery?: string;
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
  /** 日期按鈕上的兩字主題，例如「出發」「銀杏」 */
  short: string;
  title: string;
  subtitle: string;
  /** 當天主題色（Tailwind class 片段） */
  accent: 'sakura' | 'ginkgo' | 'sky' | 'sage';
  items: ItineraryItem[];
}

export interface Hotel {
  /** 中文名稱（畫面主要顯示） */
  name: string;
  /** 英文名稱 */
  nameEn: string;
  /** 日文名稱（Google Maps 用這個命中率最高） */
  nameJa: string;
  address: string;
  nearestStation: string;
  /** 從車站步行到飯店的時間 */
  stationWalk: string;
  /** 入住日 YYYY-MM-DD */
  checkIn: string;
  /** 退房日 YYYY-MM-DD */
  checkOut: string;
  /** 人數 */
  guests: number;
  /** 房間數 */
  rooms: number;
  note: string;
}

export interface TripMeta {
  title: string;
  subtitle: string;
  dateRange: string;
  travelers: number;
  /** 旅伴名字，顯示在標題前面 */
  owners: string;
  /** 完整標題（含旅伴名字） */
  fullTitle: string;
}

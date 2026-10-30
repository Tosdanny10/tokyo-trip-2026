import type { Hotel } from '../data/types';

/** Google Maps 地點搜尋連結（只使用官方支援的參數） */
export function mapsSearch(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Google Maps 路線導航連結。
 * travelmode 只用 Google Maps 官方支援的值：driving / walking / bicycling / transit。
 */
export function mapsDirections(origin: string, destination: string, travelmode: 'walking' | 'transit' | 'driving'): string {
  const params = new URLSearchParams({
    api: '1',
    origin,
    destination,
    travelmode,
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * Tabelog 搜尋連結。
 * 使用 Tabelog 官方的搜尋頁參數，不自行拼湊個別店家的頁面網址。
 */
export function tabelogSearch(keyword: string): string {
  return `https://tabelog.com/rstLst/?sw=${encodeURIComponent(keyword)}`;
}

/** 把資料檔裡的 {{hotel}} 等樣板變數換成使用者設定的住宿資料 */
export function resolveText(text: string, hotel: Hotel): string {
  return text
    .replaceAll('{{hotel}}', hotel.name)
    .replaceAll('{{hotelStation}}', hotel.nearestStation)
    .replaceAll('{{hotelAddress}}', hotel.address);
}

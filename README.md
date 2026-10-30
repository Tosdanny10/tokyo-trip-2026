# Tokyo Trip 2026 🍁

> 東京秋日小旅行｜2026 / 11 / 06 – 11 / 09｜2 位旅客

一頁式、手機優先的日系可愛手帳風互動行程網站。純前端、不需後端、不需任何 API Key，可直接免費部署到 GitHub Pages。

- **技術**：React 18 + TypeScript + Vite 5 + Tailwind CSS 3 + Lucide Icons
- **插畫**：28 張原創 SVG 插畫（`src/illustrations/`），沒有使用任何受版權保護的圖片或 Google Maps 截圖
- **地圖**：只使用 Google Maps 官方的 URL 參數（`https://www.google.com/maps/dir/?api=1&...`），不呼叫付費地圖 API
- **隱私**：勾選狀態、預約狀態、實付金額與住宿資料都只存在瀏覽器的 `localStorage`，不會上傳任何資料

---

## 目錄

1. [快速開始](#快速開始)
2. [網站功能](#網站功能)
3. [修改行程](#修改行程)
4. [修改住宿飯店](#修改住宿飯店)
5. [新增或修改插畫](#新增或修改插畫)
6. [部署到 GitHub Pages](#部署到-github-pages)
7. [已知限制與未查證的交通資訊](#已知限制與未查證的交通資訊)
8. [專案結構](#專案結構)

---

## 快速開始

需要 Node.js 18 以上（開發時使用 Node 26 / npm 11）。

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

- `npm run dev`：開發伺服器，預設 http://localhost:5178
- `npm run build`：先跑 `tsc -b` 型別檢查，再輸出 production build 到 `dist/`。型別有錯就不會產出 `dist/`
- `npm run preview`：預覽 `dist/` 的建置結果

---

## 網站功能

**行程模式**

- Hero 首頁：標題、日期、人數、原創主視覺插畫、四天行程縮圖、飄落的銀杏葉（遵守 `prefers-reduced-motion`）
- 四天日期切換：點擊後平滑捲動，不會重新載入頁面
- 「只看今天」／「全部顯示」兩種檢視
- 每個景點卡片：時間、中文名稱、日文原名、專屬插畫、簡介、地址、停留時間、參考價格、預約狀態、Google Maps 連結、官方網站、訂位連結
- 每兩張景點卡片之間都有一張**交通卡片**：起點、終點、交通方式圖示與顏色、推薦交通工具、路線名稱、起終點與轉乘站、預估搭乘／步行時間、參考票價、Google Maps 導航按鈕
- 預約狀態可切換：未預約／已預約／需候位／待確認
- 交通卡片可自行加備註或修改時間

**預算模式**

- 日圓與台幣對照，匯率可手動修改（預設 0.21，**不是**即時匯率）
- 兩人合計的分類統計：餐費、交通、門票、和服、購物・伴手禮
- 每一筆費用都可以填入「實際付款金額」，與預估金額分開統計

**手機體驗**

- 底部固定的日期切換導覽列，處理 iOS `env(safe-area-inset-bottom)` 安全區域
- 所有可點擊元素至少 40–44px 高，不會出現橫向捲動
- 支援「加入主畫面」（`manifest.webmanifest` + `apple-touch-icon.png`）
- 支援深色模式（右上角切換，淺色手帳風為預設）

---

## 修改行程

**所有行程資料都集中在 [`src/data/itinerary.ts`](src/data/itinerary.ts) 一個檔案。**

```ts
export const days: Day[] = [
  {
    id: 'd2',
    date: '11/7',
    // ...
    items: [
      {
        kind: 'place',          // 景點卡片
        id: 'd2-p6',
        time: '11:30–13:00',
        title: '立川 蟹最上',
        jp: '蟹最上 立川',
        illustration: 'crab',    // 對應 src/illustrations/index.tsx 的註冊表
        desc: '螃蟹與壽司套餐……',
        address: '東京都立川市柴崎町 3-1-7 立川南口第2ビル 5F',
        stay: '約 90 分鐘',
        priceText: '……',
        cost: { jpy: 10978, basis: 'person', category: 'food' }, // 進預算模式
        reserve: 'none',         // none | booked | queue | tbc
        mapQuery: '立川 蟹最上',  // Google Maps 搜尋關鍵字，建議用日文
        booking: 'https://...',  // 訂位連結
        official: 'https://...', // 官方網站
        notes: ['……'],
      },
      {
        kind: 'transit',         // 交通卡片
        id: 'd2-t5',
        mode: 'walk',            // walk | jr | metro | taxi | skyliner | flight | terminal
        from: '立川 蟹最上',
        to: '昭和紀念公園 立川口',
        recommend: '步行',
        walkMin: '步行約 25–35 分鐘（估算）',
        travelmode: 'walking',   // Google Maps 的 walking / transit / driving
        mapsFrom: '蟹最上 立川',
        mapsTo: '国営昭和記念公園 立川口',
        tbc: true,                   // 需要再確認
        tbcReason: '原因寫在這裡',    // 會顯示在「路線細節」裡
      },
    ],
  },
];
```

重點欄位：

| 欄位 | 說明 |
| --- | --- |
| `cost.basis` | `'person'` 每人（預算會乘以人數）／`'group'` 兩人合計 |
| `cost.category` | `food` `transit` `ticket` `kimono` `shopping` `lodging` `flight` |
| `cost.tbc` | `true` 時在預算明細上顯示「（估）」 |
| `reserve` | `none` 未預約／`booked` 已預約／`queue` 需候位／`tbc` 待確認 |
| `tbc` + `tbcReason` | 交通卡片會顯示紅色「待確認」標籤與原因 |

人數與匯率預設值在同一個檔案的 `meta`：

```ts
export const meta: TripMeta = {
  travelers: 2,
  defaultRate: 0.21, // 1 JPY = 0.21 TWD，手動維護
};
```

---

## 修改住宿飯店

飯店目前是「尚未確定」。有兩個改法：

**A. 在網頁上改（不用動程式碼）**

捲到「🏨 住宿設定」→「修改住宿資料」，填入飯店名稱、地址與最近車站。
存在瀏覽器的 `localStorage`，首頁與所有引用住宿的交通卡片會立刻同步更新。

**B. 改預設值（讓每個人打開都看到）**

編輯 `src/data/itinerary.ts` 的 `defaultHotel`：

```ts
export const defaultHotel: Hotel = {
  name: '○○ホテル 新宿',
  address: '東京都新宿区西新宿 1-2-3',
  nearestStation: 'JR 新宿站',
  note: '……',
};
```

行程資料裡的 `{{hotel}}`、`{{hotelAddress}}`、`{{hotelStation}}` 三個樣板變數會自動替換。

> ⚠️ **網站不會自動重新計算車程與票價。**
> 沒有可靠的即時交通資料來源，所以改完住宿後不會假裝已經重算過。
> 請點交通卡片的「開啟 Google Maps 導航」自行確認，再用「加備註／改時間」記下實際結果。

---

## 新增或修改插畫

插畫都是原創 SVG React 元件，放在 `src/illustrations/`：

| 檔案 | 內容 |
| --- | --- |
| `base.tsx` | 共用畫框 `Frame`、色票 `C`、雲朵、月亮、銀杏葉等零件 |
| `travel.tsx` | 機場、飛機、計程車、飯店、早餐、退房、Skyliner、伴手禮、報到 |
| `food.tsx` | 螃蟹、壽司、牛舌、刺身、蟹鍋 |
| `city.tsx` | 八公、109、PARCO、中心街、MIYASHITA PARK、夜景、阿美橫丁 |
| `nature.tsx` | 和服、銀杏大道、鳥居、谷中小貓、上野公園 |
| `hero.tsx` | 首頁主視覺（富士山、東京鐵塔、晴空塔、小飛機） |
| `index.tsx` | 插畫註冊表 |

新增步驟：

1. 在上述任一檔案寫一個回傳 `<Frame>…</Frame>` 的元件（viewBox 固定 `0 0 120 90`）
2. 在 `src/data/types.ts` 的 `IllustrationKey` 加上新的 key
3. 在 `src/illustrations/index.tsx` 的 `illustrations` 註冊表加上對應
4. 在行程資料的 `illustration` 欄位使用它

TypeScript 會確保 key 與註冊表一一對應，漏掉會在 `npm run build` 時報錯。

---

## 部署到 GitHub Pages

這個專案已經設定好 `base: './'`（相對路徑），所以**同一份 `dist/` 可以放在網域根目錄或任何子路徑**，不會出現資源 404。

### 1. 建立 repository 並推上去

```bash
git init -b main
```

```bash
git add -A && git commit -m "feat: Tokyo Trip 2026 互動行程網站"
```

有安裝 GitHub CLI 的話，一行搞定：

```bash
gh repo create tokyo-trip-2026 --public --source=. --remote=origin --push
```

沒有 GitHub CLI 的話，先在 GitHub 網站建立一個空的 `tokyo-trip-2026` repository，再執行（把 `<你的帳號>` 換掉）：

```bash
git remote add origin https://github.com/<你的帳號>/tokyo-trip-2026.git && git push -u origin main
```

### 2. 開啟 GitHub Pages

1. 進入 repository 的 **Settings → Pages**
2. **Build and deployment → Source** 選擇 **GitHub Actions**
3. 回到 **Actions** 分頁，確認 `Deploy to GitHub Pages` 工作流程跑完（約 1–2 分鐘）

網址會是：

```
https://<你的帳號>.github.io/tokyo-trip-2026/
```

之後只要 push 到 `main`，`.github/workflows/deploy.yml` 就會自動 `npm ci` → `npm run build` → 部署 `dist/`。也可以在 Actions 分頁手動觸發（`workflow_dispatch`）。

### 3. 本機驗證子路徑不會 404

```bash
npm run build && mkdir -p .pages-test/tokyo-trip-2026 && cp -R dist/. .pages-test/tokyo-trip-2026/ && npx --yes serve .pages-test -l 4173
```

然後開啟 `http://localhost:4173/tokyo-trip-2026/`，確認頁面與樣式都正常。測完可以把 `.pages-test` 資料夾刪掉。

### 不要放進 repository 的東西

這個專案不需要任何密鑰。請不要把密碼、API Key、個人電話或信用卡資料寫進程式碼或 commit。

---

## 已知限制與未查證的交通資訊

這份清單同時顯示在網頁底部（「📌 已知限制與未查證資訊」），資料來源是 `src/data/itinerary.ts` 的 `openQuestions`。

| 項目 | 狀況 |
| --- | --- |
| **住宿飯店** | 尚未確定。所有「飯店 ↔ 立川／新宿／澀谷／根津／上野」的路線、車程、票價都是估算，訂房後必須重查。 |
| **羽田深夜計程車** | 未查證車資。深夜時段有加成、跨區另計，金額依飯店位置而定。11/7 凌晨安排的是**計程車**，不是深夜巴士。 |
| **京成 Skyliner** | 2026 年 11 月的時刻表與票價尚未公布，網頁上不列出任何具體車次。出發前請以京成官網確認，並反推是否趕得上 22:05 的班機。 |
| **JR 票價與車程** | 立川 → 新宿、日暮里 → 上野的票價與時間皆為概估，未經官方查詢核實。 |
| **VASARA 和服** | 尚未預約。可預約時段、方案價格與最晚歸還時間都要向店家確認。 |
| **餐廳訂位** | 蟹最上、牛たんの檸檬、美登利壽司、魚真、蟹道樂目前**全部未預約**。美登利假日需現場候位，12:00 入座無法保證。 |
| **營業時間** | 多數商店與百貨的營業時間未逐一核實。谷中銀座部分店家週一公休。 |
| **昭和紀念公園** | 門票 ¥450／人為參考值；11 月上旬銀杏不一定全黃，請查官方紅葉情報。 |
| **匯率** | 預算模式的匯率是手動填寫的概估值，不是即時匯率。 |
| **航班** | 樂桃航空的班號與實際起降時間請以電子機票為準，網頁上不虛構班次。 |

### 有實際查證過的項目（2026-10-30）

- **立川 蟹最上**：地址（東京都立川市柴崎町 3-1-7 立川南口第2ビル 5F）、電話、交通（JR 立川站北改札步行 5 分）、週六午餐 11:30–14:00（L.O. 13:00）、「蟹とお寿司」方案當日顯示為 ¥10,978／人（含稅與 10% 服務費）。
  > 原本提供的參考價是 ¥9,878／人，查到的是 ¥10,978／人。兩個數字都寫在卡片上，請以訂位時顯示的金額為準。
- **牛たんの檸檬 総本店**：正式店名「新宿焼肉 牛たんの檸檬 総本店」、電話、週五六營業至 22:30（L.O. 21:45）、定食用餐時間 60 分鐘制。
- **所有外部連結**都實際開啟確認過可以正常使用。

### 行程本身的確認事項

- 11/8 **沒有** SHIBUYA SKY、夕陽、淺草寺或晴空塔行程。
- 11/7 凌晨從羽田到飯店是**計程車**，沒有安排深夜巴士。
- 所有抵達時間都標示為「預估」。
- 需事先與飯店確認是否可凌晨 2–3 點入住。

---

## 專案結構

```
.
├── .github/workflows/deploy.yml   GitHub Actions 自動部署
├── public/
│   ├── apple-touch-icon.png       加入主畫面用的 icon
│   ├── icon.svg                   瀏覽器分頁 icon
│   └── manifest.webmanifest       PWA manifest
├── src/
│   ├── App.tsx                    版面、日期切換、行程／預算模式
│   ├── main.tsx                   進入點
│   ├── index.css                  手帳紙張質感、reduced-motion 設定
│   ├── components/
│   │   ├── BottomNav.tsx          手機底部固定導覽列
│   │   ├── BudgetPanel.tsx        預算模式
│   │   ├── DaySection.tsx         單日時間軸
│   │   ├── FallingLeaves.tsx      飄落銀杏葉
│   │   ├── Hero.tsx               首頁
│   │   ├── HotelPanel.tsx         住宿設定
│   │   ├── OpenQuestions.tsx      已知限制清單
│   │   ├── PlaceCard.tsx          景點／餐廳卡片
│   │   ├── TransitCard.tsx        交通卡片
│   │   └── ui.tsx                 共用元件與顏色設定
│   ├── data/
│   │   ├── itinerary.ts           ★ 全部行程資料都在這裡
│   │   └── types.ts               型別定義
│   ├── illustrations/             原創 SVG 插畫
│   ├── lib/
│   │   ├── budget.ts              預算彙總
│   │   └── format.ts              Google Maps URL、金額格式、住宿樣板變數
│   └── state/TripState.tsx        localStorage 狀態（勾選、預約、實付、住宿、匯率）
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

---

## 授權

插畫與程式碼為此專案原創，可自由修改自用。外部連結指向各店家與機構的官方網站，著作權屬於各權利人。

import { C, Cloud, Dash, Frame, Moon, Stars } from './base';

/** 桃園 T1 報到：櫃台、護照、行李箱 */
export function AirportCheckin() {
  return (
    <Frame label="機場報到：護照、行李箱與報到櫃台的插畫" tint="#F7EEF3">
      <Cloud x={22} y={18} s={0.8} />
      <Cloud x={96} y={14} s={0.6} />
      {/* 櫃台 */}
      <rect x="18" y="52" width="84" height="20" rx="4" fill={C.white} />
      <rect x="18" y="52" width="84" height="5" rx="2.5" fill={C.sky} />
      <rect x="26" y="60" width="18" height="8" rx="2" fill={C.paper} />
      {/* 看板 */}
      <rect x="30" y="26" width="34" height="18" rx="3" fill={C.skyDeep} />
      <g fill={C.white} opacity="0.9">
        <rect x="34" y="31" width="22" height="2" rx="1" />
        <rect x="34" y="36" width="16" height="2" rx="1" />
      </g>
      {/* 行李箱 */}
      <rect x="74" y="54" width="20" height="24" rx="4" fill={C.sakura} />
      <rect x="78" y="54" width="12" height="24" fill={C.sakuraDeep} opacity="0.35" />
      <path d="M80 54 V48 h8 v6" fill="none" stroke={C.ink} strokeWidth="1.6" />
      <circle cx="78" cy="80" r="2" fill={C.ink} />
      <circle cx="90" cy="80" r="2" fill={C.ink} />
      {/* 護照 */}
      <g transform="rotate(-12 48 62)">
        <rect x="42" y="56" width="16" height="12" rx="2" fill={C.red} />
        <rect x="46" y="60" width="8" height="2" rx="1" fill={C.ginkgo} />
        <circle cx="50" cy="65" r="1.6" fill={C.ginkgo} />
      </g>
    </Frame>
  );
}

/** 起飛：粉色小飛機爬升 */
export function PlaneTakeoff() {
  return (
    <Frame label="粉色小飛機起飛的插畫" tint="#FCEAF1">
      <Cloud x={26} y={64} s={0.9} />
      <Cloud x={92} y={56} s={0.7} />
      <Dash d="M10 76 C34 72 48 58 70 40" color={C.sakuraDeep} />
      <g transform="translate(74 34) rotate(-22)">
        <path d="M-18 0 L14 -6 L24 0 L14 6 Z" fill={C.white} />
        <path d="M-4 0 L6 -16 L12 -14 L8 0 Z" fill={C.sakura} />
        <path d="M-4 0 L6 16 L12 14 L8 0 Z" fill={C.sakuraDeep} />
        <path d="M-18 0 L-24 -7 L-16 -4 Z" fill={C.sakura} />
        <circle cx="18" cy="0" r="2.6" fill={C.sky} />
        <circle cx="10" cy="0" r="2" fill={C.sky} />
      </g>
      <circle cx="26" cy="22" r="8" fill={C.ginkgo} opacity="0.7" />
    </Frame>
  );
}

/** 深夜抵達：飛機降落 + 跑道燈 */
export function PlaneLanding() {
  return (
    <Frame label="深夜飛機降落在跑道上的插畫" tint="#EDE6F1">
      <Moon x={100} y={18} s={1.1} />
      <Stars points={[[20, 14], [34, 24, 1], [66, 12, 1], [84, 30, 0.9]]} />
      <Dash d="M14 24 C36 32 50 44 68 52" color={C.night} />
      <g transform="translate(72 54) rotate(16)">
        <path d="M-18 0 L14 -6 L24 0 L14 6 Z" fill={C.white} />
        <path d="M-4 0 L6 -15 L12 -13 L8 0 Z" fill={C.sky} />
        <path d="M-4 0 L6 15 L12 13 L8 0 Z" fill={C.skyDeep} />
        <circle cx="18" cy="0" r="2.4" fill={C.ginkgo} />
      </g>
      {/* 跑道 */}
      <rect x="8" y="72" width="104" height="10" rx="3" fill={C.night} opacity="0.75" />
      <g fill={C.ginkgo}>
        <rect x="16" y="76" width="8" height="2" rx="1" />
        <rect x="32" y="76" width="8" height="2" rx="1" />
        <rect x="48" y="76" width="8" height="2" rx="1" />
        <rect x="64" y="76" width="8" height="2" rx="1" />
        <rect x="80" y="76" width="8" height="2" rx="1" />
      </g>
    </Frame>
  );
}

/** 入境審查：護照蓋章 + 行李轉盤 */
export function Immigration() {
  return (
    <Frame label="入境審查蓋章與行李轉盤的插畫" tint="#F4ECF2">
      {/* 轉盤 */}
      <ellipse cx="62" cy="66" rx="44" ry="14" fill={C.inkSoft} opacity="0.3" />
      <ellipse cx="62" cy="63" rx="44" ry="13" fill={C.white} />
      <rect x="40" y="48" width="18" height="18" rx="3" fill={C.sky} />
      <rect x="44" y="48" width="10" height="18" fill={C.skyDeep} opacity="0.3" />
      <path d="M45 48 V44 h8 v4" fill="none" stroke={C.ink} strokeWidth="1.4" />
      <rect x="66" y="52" width="16" height="14" rx="3" fill={C.sakura} />
      <path d="M70 52 V49 h8 v3" fill="none" stroke={C.ink} strokeWidth="1.4" />
      {/* 護照與印章 */}
      <g transform="rotate(-8 30 30)">
        <rect x="18" y="20" width="26" height="18" rx="2.5" fill={C.red} />
        <rect x="22" y="26" width="18" height="7" rx="1.5" fill={C.paper} />
        <circle cx="31" cy="29.5" r="3.4" fill="none" stroke={C.sageDeep} strokeWidth="1.4" />
      </g>
      <g transform="translate(86 26)">
        <rect x="-6" y="-4" width="12" height="7" rx="2" fill={C.ink} />
        <rect x="-2.5" y="-11" width="5" height="7" rx="2" fill={C.inkSoft} />
      </g>
    </Frame>
  );
}

/** 日本計程車 */
export function Taxi() {
  return (
    <Frame label="日本計程車的插畫" tint="#FCF0E6">
      <Moon x={102} y={16} s={0.9} />
      <Stars points={[[16, 16], [30, 10, 1]]} />
      <g transform="translate(14 36)">
        {/* 車身 */}
        <path d="M4 32 C2 20 8 16 18 14 L30 4 C34 1 44 0 54 1 L68 3 C76 4 84 10 88 16 L90 32 Z" fill={C.ginkgo} />
        <path d="M4 32 h86 v6 a3 3 0 0 1 -3 3 h-80 a3 3 0 0 1 -3 -3 Z" fill={C.ginkgoDeep} />
        {/* 車窗 */}
        <path d="M24 14 L33 6 C36 4 44 3 50 3.6 L50 14 Z" fill={C.sky} />
        <path d="M54 4 L66 5.4 C72 6.4 78 10 81 14 L54 14 Z" fill={C.sky} />
        {/* 車頂燈 */}
        <rect x="40" y="-4" width="16" height="6" rx="2.5" fill={C.white} />
        <rect x="40" y="-4" width="16" height="6" rx="2.5" fill="none" stroke={C.ink} strokeWidth="0.8" />
        {/* 門把與燈 */}
        <rect x="46" y="22" width="8" height="2" rx="1" fill={C.ink} opacity="0.6" />
        <circle cx="86" cy="22" r="3" fill={C.white} />
        {/* 輪胎 */}
        <circle cx="24" cy="41" r="7" fill={C.ink} />
        <circle cx="24" cy="41" r="3" fill={C.white} />
        <circle cx="72" cy="41" r="7" fill={C.ink} />
        <circle cx="72" cy="41" r="3" fill={C.white} />
      </g>
    </Frame>
  );
}

/** 飯店休息 */
export function Hotel() {
  return (
    <Frame label="飯店建築與休息的插畫" tint="#F8EBF1">
      <Moon x={100} y={18} s={1} />
      <Stars points={[[18, 16], [34, 26, 1], [66, 12, 1]]} />
      <rect x="26" y="30" width="60" height="48" rx="5" fill={C.white} />
      <rect x="26" y="30" width="60" height="9" rx="4" fill={C.sakura} />
      <g fill={C.ginkgo}>
        <rect x="34" y="46" width="12" height="10" rx="2" />
        <rect x="66" y="46" width="12" height="10" rx="2" />
      </g>
      <g fill={C.sky}>
        <rect x="50" y="46" width="12" height="10" rx="2" />
        <rect x="34" y="62" width="12" height="10" rx="2" />
      </g>
      {/* 床 */}
      <rect x="50" y="60" width="28" height="12" rx="2.5" fill={C.paper} />
      <rect x="50" y="60" width="9" height="12" rx="2.5" fill={C.sakuraDeep} opacity="0.5" />
      {/* 用線條畫的 zzz，避免 <text> 影響螢幕閱讀器與文字擷取 */}
      <g stroke={C.inkSoft} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8">
        <path d="M88 26 h7 l-7 7 h7" />
        <path d="M98 16 h5 l-5 5 h5" />
      </g>
    </Frame>
  );
}

/** 早餐 */
export function Breakfast() {
  return (
    <Frame label="早餐吐司、咖啡與雞蛋的插畫" tint="#FDF0EA">
      {/* 盤子 */}
      <ellipse cx="46" cy="62" rx="30" ry="11" fill={C.white} />
      {/* 吐司 */}
      <path d="M30 56 C30 46 38 42 46 42 C54 42 62 46 62 56 Z" fill={C.ginkgo} />
      <path d="M33 56 C33 48 39 45 46 45 C53 45 59 48 59 56 Z" fill="#FBE3B0" />
      {/* 蛋 */}
      <ellipse cx="68" cy="58" rx="11" ry="7" fill={C.white} />
      <circle cx="68" cy="57" r="4" fill={C.ginkgoDeep} />
      {/* 咖啡杯 */}
      <g transform="translate(88 44)">
        <path d="M-10 0 h20 v10 a8 8 0 0 1 -8 8 h-4 a8 8 0 0 1 -8 -8 Z" fill={C.white} />
        <rect x="-10" y="0" width="20" height="4" rx="2" fill={C.brown} />
        <path d="M10 5 a5 5 0 0 1 0 8" fill="none" stroke={C.white} strokeWidth="2.5" />
        <path d="M-2 -8 c3 -3 -3 -5 0 -8" fill="none" stroke={C.inkSoft} strokeWidth="1.3" strokeLinecap="round" />
      </g>
      <ellipse cx="46" cy="76" rx="36" ry="5" fill={C.ink} opacity="0.06" />
    </Frame>
  );
}

/** 退房寄放行李 */
export function Checkout() {
  return (
    <Frame label="退房與寄放行李的插畫" tint="#F4EFF1">
      {/* 行李堆 */}
      <rect x="22" y="44" width="26" height="32" rx="5" fill={C.sky} />
      <rect x="30" y="44" width="10" height="32" fill={C.skyDeep} opacity="0.3" />
      <path d="M31 44 V39 h8 v5" fill="none" stroke={C.ink} strokeWidth="1.6" />
      <rect x="52" y="56" width="22" height="20" rx="4" fill={C.sakura} />
      <path d="M58 56 V52 h10 v4" fill="none" stroke={C.ink} strokeWidth="1.5" />
      <rect x="52" y="64" width="22" height="3" fill={C.sakuraDeep} opacity="0.5" />
      {/* 房卡 */}
      <g transform="rotate(-10 90 50)">
        <rect x="80" y="44" width="22" height="14" rx="2.5" fill={C.white} />
        <rect x="80" y="48" width="22" height="3" fill={C.ginkgo} />
        <rect x="84" y="54" width="8" height="2" rx="1" fill={C.inkSoft} />
      </g>
      {/* 時鐘 */}
      <circle cx="92" cy="24" r="10" fill={C.white} />
      <circle cx="92" cy="24" r="10" fill="none" stroke={C.inkSoft} strokeWidth="1.4" />
      <path d="M92 24 V18 M92 24 l5 3" stroke={C.ink} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <ellipse cx="54" cy="78" rx="40" ry="5" fill={C.ink} opacity="0.07" />
    </Frame>
  );
}

/** 京成 Skyliner */
export function Skyliner() {
  return (
    <Frame label="京成 Skyliner 特急列車的插畫" tint="#F0EBF6">
      <Cloud x={24} y={16} s={0.7} />
      {/* 列車 */}
      <g transform="translate(16 30)">
        <path d="M0 34 C0 14 10 4 28 2 L80 2 C86 2 90 6 90 12 L90 34 Z" fill={C.white} />
        <path d="M0 34 C0 14 10 4 28 2 L44 2 L44 34 Z" fill={C.sky} opacity="0.35" />
        <path d="M6 22 C8 12 16 8 28 7 L40 7 L40 20 L6 22 Z" fill={C.night} opacity="0.8" />
        <g fill={C.skyDeep} opacity="0.75">
          <rect x="48" y="10" width="12" height="9" rx="2" />
          <rect x="64" y="10" width="12" height="9" rx="2" />
          <rect x="80" y="10" width="8" height="9" rx="2" />
        </g>
        <rect x="0" y="26" width="90" height="4" fill={C.skyDeep} />
        <circle cx="6" cy="20" r="2.4" fill={C.ginkgo} />
        <circle cx="20" cy="38" r="4" fill={C.ink} />
        <circle cx="38" cy="38" r="4" fill={C.ink} />
        <circle cx="70" cy="38" r="4" fill={C.ink} />
      </g>
      {/* 軌道 */}
      <rect x="6" y="74" width="108" height="3" rx="1.5" fill={C.inkSoft} />
      <g fill={C.brown}>
        <rect x="14" y="78" width="10" height="3" rx="1" />
        <rect x="40" y="78" width="10" height="3" rx="1" />
        <rect x="66" y="78" width="10" height="3" rx="1" />
        <rect x="92" y="78" width="10" height="3" rx="1" />
      </g>
    </Frame>
  );
}

/** 伴手禮盒 */
export function Souvenir() {
  return (
    <Frame label="彩色伴手禮盒與緞帶的插畫" tint="#FCEAF1">
      {/* 大盒 */}
      <rect x="20" y="44" width="38" height="30" rx="4" fill={C.sakura} />
      <rect x="34" y="44" width="10" height="30" fill={C.white} opacity="0.8" />
      <rect x="20" y="52" width="38" height="5" fill={C.white} opacity="0.8" />
      <path d="M34 44 c-6 -8 4 -10 5 -2 c1 -8 11 -6 5 2" fill="none" stroke={C.sakuraDeep} strokeWidth="2" />
      {/* 中盒 */}
      <rect x="62" y="52" width="30" height="22" rx="3.5" fill={C.ginkgo} />
      <rect x="73" y="52" width="8" height="22" fill={C.white} opacity="0.8" />
      <path d="M73 52 c-5 -6 3 -8 4 -1.6 c1 -6.4 9 -4.4 4 1.6" fill="none" stroke={C.ginkgoDeep} strokeWidth="1.8" />
      {/* 小盒 */}
      <rect x="44" y="26" width="26" height="18" rx="3" fill={C.sage} />
      <rect x="54" y="26" width="6" height="18" fill={C.white} opacity="0.85" />
      <path d="M54 26 c-4 -5 2.5 -6.5 3 -1.2 c0.5 -5.3 7 -3.8 3 1.2" fill="none" stroke={C.sageDeep} strokeWidth="1.6" />
      <ellipse cx="58" cy="78" rx="44" ry="5" fill={C.ink} opacity="0.07" />
    </Frame>
  );
}

/** 報到櫃台・託運 */
export function CheckinCounter() {
  return (
    <Frame label="航空公司報到櫃台與行李託運的插畫" tint="#F6EDF2">
      {/* 看板 */}
      <rect x="20" y="16" width="44" height="14" rx="3" fill={C.night} opacity="0.85" />
      <g fill={C.ginkgo} opacity="0.9">
        <rect x="24" y="20" width="18" height="2.4" rx="1.2" />
        <rect x="24" y="25" width="26" height="2.4" rx="1.2" />
      </g>
      {/* 櫃台 */}
      <rect x="14" y="52" width="92" height="22" rx="4" fill={C.white} />
      <rect x="14" y="52" width="92" height="5" rx="2.5" fill={C.sky} />
      {/* 磅秤與行李 */}
      <rect x="22" y="44" width="28" height="8" rx="2" fill={C.inkSoft} />
      <rect x="27" y="26" width="18" height="18" rx="4" fill={C.sakura} />
      <path d="M32 26 V22 h8 v4" fill="none" stroke={C.ink} strokeWidth="1.5" />
      <rect x="27" y="33" width="18" height="3" fill={C.sakuraDeep} opacity="0.5" />
      {/* 登機證 */}
      <g transform="rotate(8 84 44)">
        <rect x="72" y="38" width="26" height="14" rx="2.5" fill={C.white} />
        <path d="M86 38 V52" stroke={C.inkSoft} strokeWidth="1" strokeDasharray="2 2" />
        <rect x="75" y="42" width="8" height="2" rx="1" fill={C.sakuraDeep} />
        <rect x="75" y="46" width="6" height="2" rx="1" fill={C.inkSoft} />
        <path d="M89 44 l6 -2 l-1.5 2 l1.5 2 Z" fill={C.skyDeep} />
      </g>
    </Frame>
  );
}

import { C, Frame, Moon, Stars } from './base';

/** 購物袋（共用零件） */
function Bag({ x, y, s = 1, fill = C.sakura, handle = C.ink }: { x: number; y: number; s?: number; fill?: string; handle?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-9 -6 q9 -10 18 0" fill="none" stroke={handle} strokeWidth="1.6" />
      <path d="M-11 -6 h22 l-2 20 h-18 Z" fill={fill} />
      <path d="M-11 -6 h22 l-0.5 5 h-21 Z" fill={C.white} opacity="0.4" />
    </g>
  );
}

/** 忠犬八公像 + 斑馬線 */
export function Hachiko() {
  return (
    <Frame label="忠犬八公像與澀谷斑馬線的插畫" tint="#F6EEF2">
      {/* 斑馬線 */}
      <g fill={C.white}>
        <rect x="8" y="64" width="104" height="4" rx="2" />
        <rect x="8" y="71" width="104" height="4" rx="2" />
        <rect x="8" y="78" width="104" height="4" rx="2" />
      </g>
      {/* 基座 */}
      <rect x="40" y="52" width="40" height="12" rx="2" fill="#B9AFA2" />
      <rect x="44" y="48" width="32" height="5" rx="2" fill="#CFC6B9" />
      {/* 柴犬 */}
      <g transform="translate(60 34)">
        <ellipse cx="0" cy="8" rx="15" ry="9" fill="#E8B072" />
        <path d="M10 2 q10 -2 8 -12 q-4 6 -9 5 Z" fill="#E8B072" />
        <circle cx="-9" cy="-2" r="9" fill="#EFC28C" />
        <path d="M-16 -8 l-2 -8 l7 4 Z" fill="#D9995C" />
        <path d="M-4 -9 l3 -8 l4 7 Z" fill="#D9995C" />
        <ellipse cx="-13" cy="0" rx="4.5" ry="3.6" fill={C.white} />
        <circle cx="-16" cy="-1" r="1.6" fill={C.ink} />
        <circle cx="-7" cy="-3" r="1.6" fill={C.ink} />
        <ellipse cx="-17" cy="2" rx="1.6" ry="1.2" fill={C.ink} />
        <path d="M-9 14 v4 M0 15 v4" stroke="#D9995C" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* 建築剪影 */}
      <g fill={C.inkSoft} opacity="0.3">
        <rect x="6" y="20" width="18" height="30" rx="2" />
        <rect x="96" y="26" width="16" height="24" rx="2" />
      </g>
    </Frame>
  );
}

/** SHIBUYA 109 */
export function Shibuya109() {
  return (
    <Frame label="SHIBUYA 109 圓筒大樓與購物袋的插畫" tint="#FBE9F0">
      {/* 圓筒大樓 */}
      <path d="M38 76 L38 26 a16 10 0 0 1 32 0 L70 76 Z" fill={C.white} />
      <path d="M38 26 a16 10 0 0 1 32 0 a16 10 0 0 1 -32 0 Z" fill={C.sakura} />
      <g stroke={C.sakuraDeep} strokeWidth="1.2" opacity="0.6">
        <path d="M38 36 H70 M38 46 H70 M38 56 H70 M38 66 H70" />
      </g>
      <rect x="44" y="30" width="20" height="9" rx="2" fill={C.sakuraDeep} />
      <g fill={C.white}>
        <rect x="47" y="33" width="3" height="3" rx="1" />
        <rect x="52" y="33" width="3" height="3" rx="1" />
        <rect x="57" y="33" width="3" height="3" rx="1" />
      </g>
      {/* 旁邊大樓 */}
      <rect x="74" y="40" width="18" height="36" rx="2" fill={C.sky} opacity="0.5" />
      <rect x="20" y="48" width="14" height="28" rx="2" fill={C.sage} opacity="0.5" />
      <Bag x={100} y={60} s={0.9} fill={C.sakuraDeep} />
      <Bag x={14} y={66} s={0.75} fill={C.ginkgo} />
    </Frame>
  );
}

/** PARCO：遊戲機與購物袋 */
export function Parco() {
  return (
    <Frame label="遊戲手把、遊戲機與購物袋的插畫" tint="#F2EBF4">
      {/* 大樓 */}
      <rect x="14" y="22" width="34" height="54" rx="3" fill={C.white} />
      <g fill={C.sky} opacity="0.7">
        <rect x="19" y="30" width="10" height="8" rx="1.5" />
        <rect x="33" y="30" width="10" height="8" rx="1.5" />
        <rect x="19" y="42" width="10" height="8" rx="1.5" />
        <rect x="33" y="42" width="10" height="8" rx="1.5" />
        <rect x="19" y="54" width="10" height="8" rx="1.5" />
        <rect x="33" y="54" width="10" height="8" rx="1.5" />
      </g>
      <rect x="18" y="16" width="26" height="7" rx="2" fill={C.coral} />
      {/* 遊戲手把 */}
      <g transform="translate(78 44)">
        <path d="M-22 -8 q22 -6 44 0 q6 14 -2 18 q-8 4 -12 -4 h-16 q-4 8 -12 4 q-8 -4 -2 -18 Z" fill="#6C7A99" />
        <g fill={C.white}>
          <rect x="-15" y="-1" width="9" height="2.6" rx="1.3" />
          <rect x="-11.8" y="-4.2" width="2.6" height="9" rx="1.3" />
        </g>
        <circle cx="9" cy="-1" r="2.4" fill={C.coral} />
        <circle cx="15" cy="3" r="2.4" fill={C.ginkgo} />
        <circle cx="15" cy="-5" r="2.4" fill={C.sage} />
      </g>
      {/* 街機螢幕 */}
      <g transform="translate(78 18)">
        <rect x="-14" y="-8" width="28" height="18" rx="3" fill={C.ink} />
        <rect x="-11" y="-5" width="22" height="12" rx="2" fill={C.sky} />
        <g fill={C.ginkgo}>
          <rect x="-7" y="0" width="3" height="3" />
          <rect x="-1" y="-2" width="3" height="3" />
          <rect x="5" y="1" width="3" height="3" />
        </g>
      </g>
      <Bag x={58} y={64} s={0.85} fill={C.ginkgo} />
      <Bag x={102} y={66} s={0.75} fill={C.sakura} />
    </Frame>
  );
}

/** 中心街：衣架與藥妝 */
export function StreetShopping() {
  return (
    <Frame label="服飾衣架、藥妝與購物袋的插畫" tint="#F9EFF1">
      {/* 衣架桿 */}
      <rect x="16" y="24" width="72" height="3" rx="1.5" fill={C.inkSoft} />
      <path d="M22 27 V72 M82 27 V72" stroke={C.inkSoft} strokeWidth="2.4" strokeLinecap="round" />
      {/* T 恤 */}
      <g transform="translate(36 30)">
        <path d="M-8 -3 l-6 4 l3 5 l3 -2 v20 h16 v-20 l3 2 l3 -5 l-6 -4 q-8 4 -16 0 Z" fill={C.sakura} />
      </g>
      {/* 洋裝 */}
      <g transform="translate(62 30)">
        <path d="M-7 -3 q7 4 14 0 l4 6 l-3 2 l4 20 h-24 l4 -20 l-3 -2 Z" fill={C.sky} />
      </g>
      {/* 藥妝瓶 */}
      <g transform="translate(96 54)">
        <rect x="-5" y="-10" width="10" height="20" rx="3" fill={C.white} />
        <rect x="-3" y="-15" width="6" height="6" rx="2" fill={C.coral} />
        <rect x="-4" y="-2" width="8" height="6" rx="1.5" fill={C.sage} />
      </g>
      <Bag x={28} y={66} s={0.7} fill={C.ginkgo} />
      <Bag x={74} y={68} s={0.65} fill={C.coral} />
    </Frame>
  );
}

/** MIYASHITA PARK：屋頂公園 */
export function RooftopPark() {
  return (
    <Frame label="商場頂樓空中公園、長椅與咖啡的插畫" tint="#F0F2EE">
      {/* 建築 */}
      <rect x="14" y="44" width="92" height="34" rx="4" fill={C.white} />
      <g fill={C.sky} opacity="0.6">
        <rect x="20" y="54" width="12" height="9" rx="2" />
        <rect x="38" y="54" width="12" height="9" rx="2" />
        <rect x="56" y="54" width="12" height="9" rx="2" />
        <rect x="74" y="54" width="12" height="9" rx="2" />
        <rect x="90" y="54" width="10" height="9" rx="2" />
      </g>
      {/* 頂樓草地 */}
      <path d="M14 44 h92 v-6 a4 4 0 0 0 -4 -4 h-84 a4 4 0 0 0 -4 4 Z" fill={C.sage} />
      <path d="M14 36 q20 -4 40 0 q24 -4 52 0 v6 h-92 Z" fill={C.sageDeep} opacity="0.5" />
      {/* 樹 */}
      <g transform="translate(34 24)">
        <rect x="-1.6" y="4" width="3.2" height="10" fill={C.brown} />
        <circle cx="0" cy="0" r="9" fill={C.sageDeep} />
        <circle cx="-5" cy="3" r="6" fill={C.sage} />
        <circle cx="5" cy="3" r="5.5" fill={C.sage} />
      </g>
      {/* 長椅 */}
      <g transform="translate(70 28)">
        <rect x="-11" y="2" width="22" height="3" rx="1.5" fill={C.brown} />
        <rect x="-11" y="-3" width="22" height="3" rx="1.5" fill={C.brown} />
        <path d="M-9 5 v5 M9 5 v5" stroke={C.inkSoft} strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* 咖啡 */}
      <g transform="translate(94 26)">
        <path d="M-4 -4 h8 l-1 12 h-6 Z" fill={C.white} />
        <rect x="-4.6" y="-6" width="9.2" height="3" rx="1.5" fill={C.coral} />
      </g>
    </Frame>
  );
}

/** 夜晚街景（新宿／澀谷夜間共用） */
export function NeonNight() {
  return (
    <Frame label="夜晚霓虹街景的插畫" tint="#ECE6F0">
      <Moon x={102} y={16} s={1} />
      <Stars points={[[16, 14], [32, 22, 1], [62, 10, 1], [84, 24, 0.9]]} />
      {/* 大樓群 */}
      <rect x="10" y="36" width="20" height="44" rx="2" fill="#5B5B78" />
      <rect x="34" y="26" width="24" height="54" rx="2" fill="#6B6B8A" />
      <rect x="62" y="42" width="18" height="38" rx="2" fill="#56567A" />
      <rect x="84" y="32" width="24" height="48" rx="2" fill="#6B6B8A" />
      {/* 霓虹窗 */}
      <g>
        <rect x="14" y="42" width="5" height="5" rx="1" fill={C.ginkgo} />
        <rect x="22" y="42" width="5" height="5" rx="1" fill={C.sakura} />
        <rect x="14" y="52" width="5" height="5" rx="1" fill={C.sky} />
        <rect x="22" y="60" width="5" height="5" rx="1" fill={C.ginkgo} />
        <rect x="38" y="32" width="6" height="5" rx="1" fill={C.coral} />
        <rect x="48" y="32" width="6" height="5" rx="1" fill={C.ginkgo} />
        <rect x="38" y="44" width="6" height="5" rx="1" fill={C.sky} />
        <rect x="48" y="52" width="6" height="5" rx="1" fill={C.sakura} />
        <rect x="66" y="48" width="5" height="5" rx="1" fill={C.ginkgo} />
        <rect x="72" y="58" width="5" height="5" rx="1" fill={C.coral} />
        <rect x="88" y="38" width="6" height="5" rx="1" fill={C.sky} />
        <rect x="98" y="46" width="6" height="5" rx="1" fill={C.ginkgo} />
        <rect x="88" y="58" width="6" height="5" rx="1" fill={C.sakura} />
      </g>
      {/* 直立招牌 */}
      <rect x="40" y="16" width="9" height="12" rx="2" fill={C.coral} />
      <g fill={C.white}>
        <circle cx="44.5" cy="20" r="1.2" />
        <circle cx="44.5" cy="24" r="1.2" />
      </g>
    </Frame>
  );
}

/** 阿美橫丁：商店街招牌與零食 */
export function Ameyoko() {
  return (
    <Frame label="阿美橫丁商店街招牌與零食水果的插畫" tint="#FBEFEA">
      {/* 高架橋 */}
      <rect x="6" y="14" width="108" height="10" rx="3" fill="#8E9AA8" />
      <g fill="#7A8694">
        <rect x="18" y="24" width="7" height="10" />
        <rect x="88" y="24" width="7" height="10" />
      </g>
      {/* 雨棚 */}
      <path d="M12 36 h96 l-5 8 h-86 Z" fill={C.coral} />
      <g fill={C.white} opacity="0.75">
        <rect x="20" y="38" width="8" height="4" />
        <rect x="38" y="38" width="8" height="4" />
        <rect x="56" y="38" width="8" height="4" />
        <rect x="74" y="38" width="8" height="4" />
        <rect x="92" y="38" width="8" height="4" />
      </g>
      {/* 直式招牌 */}
      <rect x="16" y="46" width="10" height="26" rx="2" fill={C.ginkgo} />
      <g fill={C.ink} opacity="0.7">
        <rect x="19" y="50" width="4" height="4" rx="1" />
        <rect x="19" y="57" width="4" height="4" rx="1" />
        <rect x="19" y="64" width="4" height="4" rx="1" />
      </g>
      {/* 攤台 */}
      <rect x="32" y="60" width="74" height="16" rx="3" fill={C.brown} />
      <rect x="34" y="62" width="70" height="5" rx="2" fill="#E8D5B5" />
      {/* 水果與零食箱 */}
      <g>
        <rect x="38" y="48" width="18" height="12" rx="2" fill={C.sage} />
        <circle cx="43" cy="46" r="4" fill="#E8604C" />
        <circle cx="51" cy="46" r="4" fill="#E8604C" />
        <rect x="62" y="50" width="16" height="10" rx="2" fill={C.sakura} />
        <rect x="84" y="46" width="18" height="14" rx="2" fill={C.sky} />
        <rect x="88" y="42" width="10" height="5" rx="2" fill={C.ginkgo} />
      </g>
    </Frame>
  );
}

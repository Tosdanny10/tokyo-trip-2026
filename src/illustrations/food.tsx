import { C, Frame } from './base';

/** 小螃蟹（共用零件） */
function Crabby({ x, y, s = 1, body = C.coral, shell = C.red }: { x: number; y: number; s?: number; body?: string; shell?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* 腳 */}
      <g stroke={shell} strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M-10 2 L-18 6" />
        <path d="M-10 6 L-17 11" />
        <path d="M10 2 L18 6" />
        <path d="M10 6 L17 11" />
      </g>
      {/* 蟹鉗 */}
      <g fill={shell}>
        <path d="M-12 -2 L-20 -8 L-24 -4 L-18 0 Z" />
        <path d="M-20 -8 L-26 -10 L-24 -4 Z" />
        <path d="M12 -2 L20 -8 L24 -4 L18 0 Z" />
        <path d="M20 -8 L26 -10 L24 -4 Z" />
      </g>
      {/* 身體 */}
      <ellipse cx="0" cy="2" rx="13" ry="9" fill={body} />
      <path d="M-13 1 a13 9 0 0 1 26 0 Z" fill={shell} opacity="0.45" />
      <circle cx="-4.5" cy="0" r="1.6" fill={C.ink} />
      <circle cx="4.5" cy="0" r="1.6" fill={C.ink} />
      <path d="M-4 5 q4 3 8 0" fill="none" stroke={C.ink} strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

/** 握壽司（共用零件） */
function Nigiri({ x, y, s = 1, topping = C.coral, stripe = true }: { x: number; y: number; s?: number; topping?: string; stripe?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-13" y="-1" width="26" height="11" rx="5.5" fill={C.white} />
      <path d="M-14 0 C-14 -6 -8 -9 0 -9 C8 -9 14 -6 14 0 Z" fill={topping} />
      {stripe && (
        <g stroke={C.white} strokeWidth="1.4" opacity="0.75">
          <path d="M-9 -4 L-5 -8" />
          <path d="M-2 -5 L2 -9" />
          <path d="M5 -4 L9 -7.5" />
        </g>
      )}
    </g>
  );
}

/** 蟹最上：雪蟹 + 握壽司 */
export function Crab() {
  return (
    <Frame label="雪蟹與握壽司的插畫" tint="#FBE9E4">
      <ellipse cx="60" cy="68" rx="46" ry="12" fill={C.white} opacity="0.9" />
      <Crabby x={44} y={44} s={1.25} body="#F4A28C" shell={C.red} />
      <Nigiri x={88} y={58} s={0.95} topping={C.coral} />
      <Nigiri x={96} y={44} s={0.8} topping="#F7B2A0" />
      {/* 檸檬 */}
      <g transform="translate(20 64)">
        <circle cx="0" cy="0" r="6.5" fill={C.ginkgo} />
        <circle cx="0" cy="0" r="4.6" fill="#FDF0C4" />
        <g stroke={C.ginkgoDeep} strokeWidth="0.8">
          <path d="M0 -4.6 V4.6 M-4.6 0 H4.6 M-3.2 -3.2 L3.2 3.2 M3.2 -3.2 L-3.2 3.2" />
        </g>
      </g>
    </Frame>
  );
}

/** 美登利：握壽司 + 鮭魚卵軍艦 */
export function Sushi() {
  return (
    <Frame label="握壽司與鮭魚卵軍艦卷的插畫" tint="#F7ECE0">
      {/* 木盤 */}
      <rect x="12" y="50" width="96" height="22" rx="5" fill={C.brown} />
      <rect x="16" y="52" width="88" height="16" rx="4" fill="#E4C79C" />
      <Nigiri x={34} y={50} s={1} topping={C.coral} />
      <Nigiri x={64} y={50} s={1} topping="#F07E6A" />
      {/* 軍艦卷 + 鮭魚卵 */}
      <g transform="translate(92 48)">
        <rect x="-12" y="-2" width="24" height="12" rx="4" fill={C.white} />
        <rect x="-12.5" y="-3" width="25" height="13" rx="4" fill={C.ink} opacity="0.75" />
        <rect x="-10" y="-5" width="20" height="4" rx="2" fill={C.white} />
        <g fill="#F28C3C">
          <circle cx="-6" cy="-6" r="2.6" />
          <circle cx="-1" cy="-7.5" r="2.6" />
          <circle cx="4" cy="-6" r="2.6" />
          <circle cx="-3.5" cy="-10" r="2.2" />
          <circle cx="1.5" cy="-10.5" r="2.2" />
        </g>
      </g>
      {/* 筷子 */}
      <g stroke={C.inkSoft} strokeWidth="2.2" strokeLinecap="round">
        <path d="M22 30 L58 22" />
        <path d="M22 35 L58 28" />
      </g>
      {/* 山葵 */}
      <path d="M26 66 q5 -6 10 0 Z" fill={C.sage} />
    </Frame>
  );
}

/** 牛舌定食 + 檸檬 */
export function Gyutan() {
  return (
    <Frame label="厚切牛舌定食與檸檬片的插畫" tint="#F6EDE2">
      {/* 鐵盤 */}
      <ellipse cx="52" cy="56" rx="34" ry="14" fill={C.ink} opacity="0.75" />
      <ellipse cx="52" cy="54" rx="31" ry="12" fill="#5C5048" />
      {/* 牛舌厚切片 */}
      <g>
        <ellipse cx="38" cy="50" rx="11" ry="7" fill="#B05B44" />
        <ellipse cx="38" cy="49" rx="7.5" ry="4.4" fill="#C9735A" />
        <ellipse cx="56" cy="54" rx="11" ry="7" fill="#A85440" />
        <ellipse cx="56" cy="53" rx="7.5" ry="4.4" fill="#C06C52" />
        <ellipse cx="72" cy="48" rx="10" ry="6.4" fill="#B05B44" />
        <ellipse cx="72" cy="47" rx="7" ry="4" fill="#C9735A" />
        <g stroke="#8E4232" strokeWidth="1" opacity="0.8">
          <path d="M31 46 L45 52" />
          <path d="M49 50 L63 57" />
          <path d="M66 44 L78 50" />
        </g>
      </g>
      {/* 檸檬片 */}
      <g transform="translate(96 40)">
        <circle cx="0" cy="0" r="9" fill={C.ginkgo} />
        <circle cx="0" cy="0" r="6.6" fill="#FDF2CB" />
        <g stroke={C.ginkgoDeep} strokeWidth="0.9">
          <path d="M0 -6.6 V6.6 M-6.6 0 H6.6 M-4.7 -4.7 L4.7 4.7 M4.7 -4.7 L-4.7 4.7" />
        </g>
      </g>
      <g transform="translate(100 62)">
        <circle cx="0" cy="0" r="6" fill={C.ginkgo} />
        <circle cx="0" cy="0" r="4.3" fill="#FDF2CB" />
      </g>
      {/* 白飯 */}
      <g transform="translate(20 62)">
        <ellipse cx="0" cy="4" rx="13" ry="6" fill={C.white} />
        <path d="M-12 4 C-12 -4 -6 -8 0 -8 C6 -8 12 -4 12 4 Z" fill={C.white} />
        <path d="M-12 4 h24" stroke={C.inkSoft} strokeWidth="1" opacity="0.5" />
      </g>
    </Frame>
  );
}

/** 魚真：刺身盛合 + 小螃蟹 */
export function Sashimi() {
  return (
    <Frame label="刺身盛合、鮪魚與小螃蟹的插畫" tint="#E8F0F4">
      {/* 船形盤 */}
      <path d="M12 54 C12 48 20 46 30 46 L94 46 C104 46 110 50 108 56 C106 64 96 68 84 68 L36 68 C22 68 12 62 12 54 Z" fill={C.brown} />
      <path d="M18 53 C18 50 24 49 32 49 L92 49 C99 49 103 51 102 55 C100 61 92 64 82 64 L38 64 C26 64 18 59 18 53 Z" fill="#EFE2CE" />
      {/* 鮪魚片 */}
      <g>
        <path d="M26 56 l14 -4 l3 6 l-14 4 Z" fill="#C85757" />
        <path d="M38 58 l14 -4 l3 6 l-14 4 Z" fill="#D86A6A" />
        {/* 鮭魚片 */}
        <path d="M54 55 l14 -4 l3 6 l-14 4 Z" fill="#F0996B" />
        <g stroke={C.white} strokeWidth="1" opacity="0.8">
          <path d="M56 56 l13 -3.6" />
          <path d="M57 59 l13 -3.6" />
        </g>
        {/* 白肉魚 */}
        <path d="M72 54 l14 -3 l2 6 l-14 3 Z" fill="#F4EDE2" />
      </g>
      {/* 大葉 */}
      <path d="M22 62 q10 -8 20 -2 q-10 6 -20 2 Z" fill={C.sage} />
      <Crabby x={96} y={30} s={0.72} body="#F09B86" shell={C.red} />
      {/* 醬油碟 */}
      <ellipse cx="22" cy="76" rx="9" ry="4" fill={C.white} />
      <ellipse cx="22" cy="76" rx="6" ry="2.6" fill="#5A4433" />
    </Frame>
  );
}

/** 蟹道樂：紅螃蟹 + 蟹鍋 */
export function CrabHotpot() {
  return (
    <Frame label="紅色螃蟹與蟹肉火鍋的插畫" tint="#FAE6E2">
      {/* 蒸氣 */}
      <g stroke={C.white} strokeWidth="2.4" strokeLinecap="round" opacity="0.9" fill="none">
        <path d="M50 26 c4 -5 -4 -8 0 -13" />
        <path d="M62 22 c4 -5 -4 -8 0 -13" />
        <path d="M74 26 c4 -5 -4 -8 0 -13" />
      </g>
      {/* 土鍋 */}
      <path d="M30 44 h66 l-4 24 a8 8 0 0 1 -8 7 h-42 a8 8 0 0 1 -8 -7 Z" fill="#6B5547" />
      <rect x="26" y="40" width="74" height="7" rx="3.5" fill="#54433A" />
      <path d="M34 47 h58 l-2 10 h-54 Z" fill="#D9A44C" opacity="0.9" />
      {/* 鍋中蟹腳與蔬菜 */}
      <g fill={C.red}>
        <path d="M44 46 l-6 -10 l4 -2 l6 10 Z" />
        <path d="M78 46 l8 -10 l3 3 l-7 8 Z" />
      </g>
      <circle cx="56" cy="50" r="4" fill={C.sage} />
      <circle cx="68" cy="51" r="3.4" fill={C.white} />
      <Crabby x={24} y={26} s={0.85} body="#E8604C" shell="#C8402C" />
      <ellipse cx="62" cy="78" rx="42" ry="5" fill={C.ink} opacity="0.08" />
    </Frame>
  );
}

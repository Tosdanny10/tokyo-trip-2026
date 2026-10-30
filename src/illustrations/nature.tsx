import { C, Frame, GinkgoLeaf } from './base';

/** 穿和服的小人物（共用零件） */
function KimonoPerson({
  x,
  y,
  s = 1,
  robe,
  obi,
  hair = '#3B3230',
  bun = false,
}: {
  x: number;
  y: number;
  s?: number;
  robe: string;
  obi: string;
  hair?: string;
  bun?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* 和服身體（梯形） */}
      <path d="M-9 -8 L9 -8 L14 30 L-14 30 Z" fill={robe} />
      {/* 衣襟 */}
      <path d="M0 -8 L-5 6 L0 10 L5 6 Z" fill={C.white} />
      {/* 腰帶 */}
      <rect x="-11" y="4" width="22" height="7" rx="1.5" fill={obi} />
      <rect x="-3" y="4" width="6" height="7" fill={C.white} opacity="0.55" />
      {/* 袖子 */}
      <path d="M-9 -6 L-17 -4 L-19 14 L-11 14 Z" fill={robe} />
      <path d="M9 -6 L17 -4 L19 14 L11 14 Z" fill={robe} />
      {/* 頭 */}
      <circle cx="0" cy="-17" r="9" fill="#F7DDC8" />
      <path d="M-9 -19 a9 9 0 0 1 18 0 q-4 -5 -9 -4 q-5 -1 -9 4 Z" fill={hair} />
      {bun && <circle cx="0" cy="-27" r="4" fill={hair} />}
      <circle cx="-3.4" cy="-16" r="1.3" fill={C.ink} />
      <circle cx="3.4" cy="-16" r="1.3" fill={C.ink} />
      <circle cx="-6" cy="-13" r="1.6" fill={C.sakuraDeep} opacity="0.55" />
      <circle cx="6" cy="-13" r="1.6" fill={C.sakuraDeep} opacity="0.55" />
      <path d="M-1.6 -12.5 q1.6 1.4 3.2 0" fill="none" stroke={C.ink} strokeWidth="0.9" strokeLinecap="round" />
      {/* 木屐 */}
      <rect x="-9" y="30" width="7" height="2.6" rx="1.3" fill={C.brown} />
      <rect x="2" y="30" width="7" height="2.6" rx="1.3" fill={C.brown} />
    </g>
  );
}

/** VASARA 和服：兩位穿和服的旅人 */
export function Kimono() {
  return (
    <Frame label="兩位穿著和服的旅人插畫" tint="#FCE9F1">
      {/* 和紙背景圓 */}
      <circle cx="60" cy="40" r="30" fill={C.white} opacity="0.6" />
      <KimonoPerson x={42} y={44} s={1.05} robe={C.sakura} obi={C.sakuraDeep} bun />
      <KimonoPerson x={78} y={44} s={1.05} robe={C.sky} obi="#4C6E8A" />
      {/* 小櫻花裝飾 */}
      <g fill={C.sakuraDeep} opacity="0.8">
        <circle cx="16" cy="20" r="2.2" />
        <circle cx="104" cy="26" r="1.8" />
        <circle cx="22" cy="68" r="1.6" />
        <circle cx="100" cy="70" r="2" />
      </g>
      <ellipse cx="60" cy="80" rx="42" ry="4" fill={C.ink} opacity="0.07" />
    </Frame>
  );
}

/** 昭和紀念公園：銀杏大道 */
export function Ginkgo() {
  return (
    <Frame label="金黃色銀杏大道的插畫" tint="#FDF2DF">
      {/* 地面與步道 */}
      <path d="M0 90 L44 50 H76 L120 90 Z" fill="#F2DFA8" />
      <path d="M14 90 L48 54 H72 L106 90 Z" fill="#E9D191" />
      {/* 左側銀杏樹 */}
      <g>
        <rect x="24" y="38" width="5" height="26" fill={C.brown} />
        <circle cx="26" cy="30" r="16" fill={C.ginkgo} />
        <circle cx="16" cy="38" r="10" fill={C.ginkgoDeep} opacity="0.65" />
        <circle cx="36" cy="38" r="9" fill="#FADF95" />
      </g>
      {/* 右側銀杏樹 */}
      <g>
        <rect x="90" y="40" width="5" height="26" fill={C.brown} />
        <circle cx="93" cy="32" r="15" fill={C.ginkgo} />
        <circle cx="103" cy="40" r="9" fill={C.ginkgoDeep} opacity="0.6" />
        <circle cx="84" cy="40" r="8" fill="#FADF95" />
      </g>
      {/* 遠景樹 */}
      <circle cx="54" cy="40" r="8" fill={C.ginkgo} opacity="0.8" />
      <circle cx="68" cy="42" r="7" fill={C.ginkgoDeep} opacity="0.5" />
      {/* 飄落的銀杏葉 */}
      <GinkgoLeaf x={46} y={62} s={0.8} rot={20} />
      <GinkgoLeaf x={74} y={70} s={0.7} rot={-30} fill={C.ginkgoDeep} />
      <GinkgoLeaf x={58} y={78} s={0.9} rot={60} />
      <GinkgoLeaf x={30} y={74} s={0.6} rot={-10} fill={C.ginkgoDeep} />
    </Frame>
  );
}

/** 根津神社：紅色千本鳥居 */
export function Torii() {
  return (
    <Frame label="紅色千本鳥居與石燈籠的插畫" tint="#FBEAE9">
      {/* 參道 */}
      <path d="M34 90 L48 34 H72 L86 90 Z" fill="#E3D3C2" />
      {/* 由遠到近的鳥居 */}
      {[
        { y: 34, w: 24, t: 1 },
        { y: 44, w: 30, t: 1.2 },
        { y: 56, w: 38, t: 1.5 },
        { y: 70, w: 48, t: 1.9 },
      ].map(({ y, w, t }, i) => (
        <g key={i}>
          <rect x={60 - w / 2} y={y - 8} width={w} height={t * 1.9} rx="1" fill="#C8372B" />
          <rect x={60 - w / 2 - 2} y={y - 12} width={w + 4} height={t * 2.1} rx="1.5" fill="#D9453A" />
          <rect x={60 - w / 2 + 1.5} y={y - 8} width={t * 1.8} height={90 - y + 6} fill="#C8372B" />
          <rect x={60 + w / 2 - t * 1.8 - 1.5} y={y - 8} width={t * 1.8} height={90 - y + 6} fill="#C8372B" />
        </g>
      ))}
      {/* 石燈籠 */}
      <g transform="translate(18 54)">
        <rect x="-5" y="14" width="10" height="4" rx="1" fill="#A89C8C" />
        <rect x="-3" y="4" width="6" height="11" fill="#BBB0A0" />
        <path d="M-7 4 h14 l-2 -7 h-10 Z" fill="#C9BFAF" />
        <rect x="-5" y="-5" width="10" height="3" rx="1" fill="#A89C8C" />
        <circle cx="0" cy="0" r="2" fill={C.ginkgo} />
      </g>
      {/* 樹叢 */}
      <circle cx="104" cy="34" r="12" fill={C.sageDeep} opacity="0.75" />
      <circle cx="112" cy="46" r="9" fill={C.sage} opacity="0.8" />
      <circle cx="10" cy="26" r="10" fill={C.sageDeep} opacity="0.6" />
    </Frame>
  );
}

/** 谷中銀座：日式老街與小貓 */
export function YanakaCat() {
  return (
    <Frame label="谷中老街、小貓與團子的插畫" tint="#FAF0EC">
      {/* 房子 */}
      <g>
        <rect x="12" y="38" width="30" height="34" fill="#E8DCC6" />
        <path d="M8 38 L27 24 L46 38 Z" fill="#8C7B6B" />
        <rect x="18" y="48" width="8" height="10" rx="1" fill={C.sky} opacity="0.7" />
        <rect x="30" y="48" width="8" height="10" rx="1" fill={C.sky} opacity="0.7" />
        <rect x="12" y="62" width="30" height="4" fill="#A8947E" />
      </g>
      <g>
        <rect x="48" y="44" width="26" height="28" fill="#EFE4D1" />
        <path d="M44 44 L61 32 L78 44 Z" fill="#9B8878" />
        <rect x="54" y="52" width="14" height="12" rx="1" fill={C.coral} opacity="0.75" />
        <rect x="48" y="40" width="26" height="4" fill="#A8947E" />
      </g>
      {/* 暖簾 */}
      <g>
        <rect x="80" y="46" width="28" height="4" rx="1" fill="#8C7B6B" />
        <path d="M80 50 h28 v12 h-28 Z" fill="#3E6A86" />
        <g stroke="#2E5068" strokeWidth="1">
          <path d="M89 50 V62 M99 50 V62" />
        </g>
      </g>
      {/* 小貓 */}
      <g transform="translate(34 70)">
        <ellipse cx="0" cy="2" rx="11" ry="7" fill={C.white} />
        <circle cx="-9" cy="-3" r="6.5" fill={C.white} />
        <path d="M-14 -7 l-1 -6 l5 3 Z" fill={C.white} />
        <path d="M-6 -8 l2 -6 l3 5 Z" fill={C.white} />
        <path d="M-13.6 -7.6 l-0.6 -3.6 l3 1.8 Z" fill={C.sakura} />
        <circle cx="-11.5" cy="-3" r="1.2" fill={C.ink} />
        <circle cx="-6" cy="-3.6" r="1.2" fill={C.ink} />
        <ellipse cx="-8.8" cy="-0.6" rx="1.2" ry="0.9" fill={C.sakuraDeep} />
        <path d="M9 0 q8 -2 6 -9" fill="none" stroke={C.white} strokeWidth="3.4" strokeLinecap="round" />
        <g fill="#C9A98C">
          <ellipse cx="2" cy="-4" rx="4" ry="3" />
          <ellipse cx="-2" cy="4" rx="3" ry="2.2" />
        </g>
      </g>
      {/* 團子串 */}
      <g transform="translate(94 70)">
        <rect x="-1" y="-2" width="2" height="16" rx="1" fill={C.brown} />
        <circle cx="0" cy="-6" r="4.4" fill="#F3E3C6" />
        <circle cx="0" cy="-14" r="4.4" fill="#E8C9A0" />
        <circle cx="0" cy="-22" r="4.4" fill="#C7D9A8" />
      </g>
    </Frame>
  );
}

/** 上野公園：不忍池與樹 */
export function UenoPark() {
  return (
    <Frame label="上野公園池畔與林蔭的插畫" tint="#F3F0EE">
      {/* 池 */}
      <ellipse cx="60" cy="72" rx="52" ry="14" fill={C.sky} opacity="0.75" />
      <g stroke={C.white} strokeWidth="1.2" opacity="0.8" fill="none">
        <path d="M24 70 q6 -3 12 0" />
        <path d="M80 76 q6 -3 12 0" />
      </g>
      {/* 大樹 */}
      <g transform="translate(26 40)">
        <rect x="-2.5" y="8" width="5" height="18" fill={C.brown} />
        <circle cx="0" cy="2" r="14" fill={C.sageDeep} />
        <circle cx="-9" cy="8" r="8" fill={C.sage} />
        <circle cx="9" cy="8" r="7" fill={C.sage} />
      </g>
      <g transform="translate(94 44)">
        <rect x="-2" y="6" width="4" height="16" fill={C.brown} />
        <circle cx="0" cy="0" r="11" fill={C.ginkgoDeep} opacity="0.85" />
        <circle cx="7" cy="6" r="6" fill={C.ginkgo} />
      </g>
      {/* 中景樹列 */}
      <g fill={C.sage} opacity="0.7">
        <circle cx="52" cy="40" r="8" />
        <circle cx="66" cy="42" r="7" />
        <circle cx="78" cy="40" r="6" />
      </g>
      {/* 天鵝船 */}
      <g transform="translate(62 68)">
        <ellipse cx="0" cy="2" rx="13" ry="5" fill={C.white} />
        <path d="M-8 0 q-4 -10 2 -12 q4 -1 3 4 q-1 4 -2 8 Z" fill={C.white} />
        <circle cx="-6" cy="-11" r="2.6" fill={C.white} />
        <circle cx="-7" cy="-11.6" r="0.8" fill={C.ink} />
        <path d="M-9 -10.4 l-3 1 l3 1 Z" fill={C.ginkgo} />
      </g>
      {/* 長椅 */}
      <g transform="translate(22 62)">
        <rect x="-9" y="0" width="18" height="2.6" rx="1.3" fill={C.brown} />
        <rect x="-9" y="-4" width="18" height="2.6" rx="1.3" fill={C.brown} />
      </g>
    </Frame>
  );
}

import { C, Cloud, GinkgoLeaf } from './base';

/**
 * 首頁主視覺：富士山、晴空塔／東京鐵塔、小飛機、銀杏葉。
 * 原創 SVG，無外部素材。
 */
export function HeroScene() {
  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="東京秋日風景插畫：富士山、東京鐵塔、晴空塔、小飛機與銀杏葉" className="h-full w-full">
      {/* 天空 */}
      <rect width="360" height="200" rx="18" fill="#FDF3E3" />
      <circle cx="292" cy="44" r="26" fill={C.ginkgo} opacity="0.55" />
      <circle cx="292" cy="44" r="18" fill={C.ginkgo} opacity="0.6" />
      <Cloud x={60} y={38} s={1.5} />
      <Cloud x={200} y={28} s={1.1} />
      <Cloud x={322} y={82} s={1} />

      {/* 遠山 */}
      <path d="M0 150 L58 92 L104 150 Z" fill={C.sage} opacity="0.55" />
      <path d="M248 150 L300 100 L352 150 Z" fill={C.sage} opacity="0.45" />

      {/* 富士山 */}
      <path d="M96 152 L160 62 L224 152 Z" fill={C.skyDeep} opacity="0.75" />
      <path d="M160 62 L137 94 q10 7 23 4 q13 3 23 -4 Z" fill={C.white} />
      <path d="M160 62 L224 152 L186 152 L160 96 Z" fill={C.night} opacity="0.12" />

      {/* 晴空塔 */}
      <g transform="translate(60 0)">
        <path d="M-4 152 L-1.6 86 h3.2 L4 152 Z" fill={C.white} />
        <path d="M-4 152 L-1.6 86 h1.6 L0 152 Z" fill={C.sky} opacity="0.5" />
        <circle cx="0" cy="84" r="5" fill={C.white} />
        <circle cx="0" cy="84" r="5" fill="none" stroke={C.skyDeep} strokeWidth="1.4" />
        <circle cx="0" cy="68" r="3.4" fill={C.white} />
        <path d="M0 64 V52" stroke={C.skyDeep} strokeWidth="1.6" />
        <circle cx="0" cy="50" r="2" fill={C.ginkgo} />
      </g>

      {/* 東京鐵塔 */}
      <g transform="translate(286 0)">
        <path d="M-16 152 L-3 90 h6 L16 152 Z" fill="none" stroke={C.coral} strokeWidth="3" />
        <path d="M-11 124 h22 M-7.5 108 h15" stroke={C.coral} strokeWidth="2.4" />
        <path d="M-16 152 L16 152" stroke={C.coral} strokeWidth="3" />
        <path d="M-12 128 L10 112 M12 128 L-10 112" stroke={C.coral} strokeWidth="1.2" opacity="0.7" />
        <rect x="-6" y="96" width="12" height="5" rx="1.5" fill={C.coral} />
        <path d="M0 90 V78" stroke={C.coral} strokeWidth="2" />
        <circle cx="0" cy="76" r="2.4" fill={C.ginkgo} />
      </g>

      {/* 地面 */}
      <path d="M0 150 h360 v34 a16 16 0 0 1 -16 16 h-328 a16 16 0 0 1 -16 -16 Z" fill={C.sage} opacity="0.35" />
      <path d="M0 158 q60 -10 120 0 q60 -10 120 0 q60 -10 120 0 v26 a16 16 0 0 1 -16 16 h-328 a16 16 0 0 1 -16 -16 Z" fill={C.sageDeep} opacity="0.3" />

      {/* 銀杏樹 */}
      <g transform="translate(24 150)">
        <rect x="-3" y="-20" width="6" height="22" fill={C.brown} />
        <circle cx="0" cy="-26" r="16" fill={C.ginkgo} />
        <circle cx="-11" cy="-18" r="9" fill={C.ginkgoDeep} opacity="0.7" />
        <circle cx="11" cy="-18" r="8" fill="#FADF95" />
      </g>
      <g transform="translate(338 152)">
        <rect x="-2.5" y="-16" width="5" height="18" fill={C.brown} />
        <circle cx="0" cy="-22" r="13" fill={C.ginkgo} />
        <circle cx="9" cy="-15" r="7" fill={C.ginkgoDeep} opacity="0.65" />
      </g>

      {/* 小飛機 + 虛線航跡 */}
      <path d="M18 70 C70 46 120 50 168 34" fill="none" stroke={C.sakuraDeep} strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" opacity="0.85" />
      <g transform="translate(176 32) rotate(-16)">
        <path d="M-22 0 L16 -7 L28 0 L16 7 Z" fill={C.white} />
        <path d="M-5 0 L7 -19 L14 -17 L9 0 Z" fill={C.sakura} />
        <path d="M-5 0 L7 19 L14 17 L9 0 Z" fill={C.sakuraDeep} />
        <path d="M-22 0 L-29 -8 L-19 -5 Z" fill={C.sakura} />
        <circle cx="20" cy="0" r="3" fill={C.sky} />
        <circle cx="11" cy="0" r="2.4" fill={C.sky} />
      </g>

      {/* 前景銀杏葉 */}
      <GinkgoLeaf x={118} y={176} s={1.2} rot={18} />
      <GinkgoLeaf x={214} y={182} s={1} rot={-24} fill={C.ginkgoDeep} />
      <GinkgoLeaf x={162} y={190} s={0.9} rot={50} />
      <GinkgoLeaf x={262} y={174} s={0.8} rot={-8} />
    </svg>
  );
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      /**
       * ── Soft Pink × Japanese Kawaii 色票 ───────────────────────────
       * 全站唯一的顏色來源。要調整配色只要改這裡。
       *
       * 比例原則：60% 粉白背景與卡片／25% 柔和粉／10% 玫瑰粉互動元件／
       *          5% 銀杏黃與鼠尾草綠輔助色。
       *
       * 文字用的「Deep」色都刻意壓暗過，確保在粉白底上達到 WCAG AA 4.5:1。
       * 規格建議的玫瑰粉 #D96B94 當白字按鈕底只有 3.2:1，因此：
       *   - rose (#D96B94) 用於邊框、選中底色、圖示與大字
       *   - roseDeep (#B94E77) 用於按鈕填色與小字（白字 4.8:1）
       */
      colors: {
        cream: '#FFF8FA', // 全站主背景：奶油粉白
        card: '#FFFCFD', // 卡片背景：柔和白粉
        paper: '#FBE5ED', // 次要粉色底：淡粉
        line: '#EFD6DF', // 卡片邊框：粉灰

        sakura: '#F4AFC4', // 主要品牌粉：櫻花粉
        sakuraDeep: '#B94E77', // 粉色小字（= roseDeep，確保對比）
        rose: '#D96B94', // 按鈕主色：玫瑰粉
        roseDeep: '#B94E77', // 按鈕填色／按下
        rosePress: '#A34268', // 按鈕按住

        ginkgo: '#F4D57E', // 強調色：銀杏黃
        ginkgoDeep: '#6E5208', // 銀杏黃文字（在銀杏色底上 6:1）
        sage: '#B9CFBF', // 輔助色：鼠尾草綠
        sageDeep: '#4F6E5B', // 綠色文字（5.6:1）
        sky: '#BBD7EA', // Metro 用的淡藍
        skyDeep: '#3A6580', // 藍色文字（在淡藍徽章底上 5.3:1）
        coral: '#B04560', // 待確認／提醒（5.4:1）

        ink: '#49343D', // 主要文字：深莓棕
        inkSoft: '#6F5C66', // 次要文字：暖灰紫（壓暗過，在淡粉底上也有 5.2:1）

        night: '#2A2126', // 深色模式背景
        nightCard: '#382C32', // 深色模式卡片
      },
      fontFamily: {
        hand: ['"Zen Maru Gothic"', '"Hiragino Maru Gothic ProN"', '"Noto Sans TC"', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.5rem',
      },
      boxShadow: {
        sticker: '0 2px 0 rgba(185, 78, 119, 0.10), 0 8px 20px -8px rgba(185, 78, 119, 0.28)',
        card: '0 1px 2px rgba(73, 52, 61, 0.05), 0 10px 28px -16px rgba(185, 78, 119, 0.35)',
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translate3d(0,-10vh,0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '100%': { transform: 'translate3d(var(--drift,20px),110vh,0) rotate(540deg)', opacity: '0' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        fall: 'fall linear infinite',
        bob: 'bob 3.5s ease-in-out infinite',
        wiggle: 'wiggle 4s ease-in-out infinite',
        pop: 'pop 0.25s ease-out both',
      },
    },
  },
  plugins: [],
};

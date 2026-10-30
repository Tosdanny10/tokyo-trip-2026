/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FFFBF2',
        paper: '#FFF7E8',
        sakura: '#F3BECB',
        sakuraDeep: '#E89AAC',
        ginkgo: '#F2C14E',
        ginkgoDeep: '#DDA01F',
        sage: '#9CBFA0',
        sageDeep: '#6E9B78',
        sky: '#A8CFE4',
        skyDeep: '#6FA8C8',
        ink: '#4A4038',
        inkSoft: '#7A6C5D',
        coral: '#E58268',
        night: '#2A2521',
        nightCard: '#352F29',
      },
      fontFamily: {
        hand: ['"Zen Maru Gothic"', '"Hiragino Maru Gothic ProN"', '"Noto Sans TC"', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.5rem',
      },
      boxShadow: {
        sticker: '0 2px 0 rgba(74,64,56,0.10), 0 8px 20px -8px rgba(74,64,56,0.25)',
        card: '0 1px 2px rgba(74,64,56,0.06), 0 10px 30px -14px rgba(74,64,56,0.30)',
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

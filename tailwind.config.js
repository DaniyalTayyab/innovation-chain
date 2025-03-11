/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
      extend: {
        colors: {
          'clr-background': '#000000',
          'clr-main-dark': '#082627',
          'clr-secondary-dark': '#04684B',
          'clr-main-bright': '#01F299',
          'clr-secondary-bright': '#048C64',
          'clr-off-white': '#F4F4F4',
          'clr-bg-btn-1': 'rgba(1, 242, 153, 0.05)',
          'clr-bg-btn-2': 'rgba(1, 242, 153, 0.1)',
          'clr-main-gold': '#E9C78C',
          // 'clr-gold' : "#E8B608",
          'clr-gold' : "#AA60C8",
          // 'clr-gold-hover' : "#CCAB6B",
          'clr-gold-hover' : "#D69ADE",
          // 'clr-gold-gradient' : "#CAA969",
          'clr-gold-gradient' : "#AA60C8",
          'clr-gray' : '#CCC',
          'clr-lighter-text' : '#A1ADB2',
          'clr-white': '#ffffff',
        },
        fontFamily: {
          Ubuntu: ['Ubuntu', 'sans-serif'],
        },
        maxWidth: {
          'max-width': '1366px',
          'max-custom': '1437px',
        },
        minWidth: {
          'max-width': '1366px',
          'max-custom': '1437px',
        },
        width: {
          '90vw': '90vw',
          '80vw': '80vw',
          '70vw': '70vw',
          '60vw': '60vw',
        },
        backgroundImage: {
          bgBtn: "url('/public/btn_bg.png')",
          'base_bg': 'url("/src/assets/imgs/bg-base.svg")',
          'base_bg_1': 'url("/src/assets/imgs/bg-base_1.svg")',
        },
        // dropShadow : {
        //   'btn_shadow' : '46px 46px 40px rgba(4, 22, 23, 0.2)'
        // },
        boxShadow: {
          btn_shadow: '46px 46px 40px rgba(4, 22, 23, 0.2)',
          bene_shadow: '0px 15px 30px -12px rgba(4, 22, 23, 0.2)',
        },
        gradientColorStopPositions: {
          33: '33%',
        },
        screens: {
          'S-xl': '1530px',
          'S-1400' : '1400px',
          'S-1370' : '1370px',
          'S-950': '950px',
          'S-730' : "730px",
          'S-650': '650px',
          'S-550': '550px',
          'S-450': '450px',
          'S-330': '330px',
        },
        zIndex: {
          75: '75',
          100: '100',
          150: '150',
          200: '200',
          250: '250',
          500: '500',
          1000: '1000',
        },
        keyframes: {
          wave: {
            '0%': { transform: 'rotate(0deg)' },
            '20%': { transform: 'rotate(73deg)' },
            '40%': { transform: 'rotate(146deg)' },
            '60%': { transform: 'rotate(210deg)' },
            '80%': { transform: 'rotate(295deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          shake: {
            '0%': { transform: 'translate3d(0, 0, 0) rotateY(180deg)' },
            '50%': { transform: 'translate3d(0, 0, -100px) rotateY(90deg)' },
            '100%': { transform: 'translate3d(0, 0, 0) rotateY(180deg)' },
          },
        },
        animation: {
          'move-round': 'wave 16s linear infinite',
          'move-shake': 'shake 16s linear infinite',
        },
      },
  },
  plugins: [],
}


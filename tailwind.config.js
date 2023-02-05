const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lexend)', ...fontFamily.sans],
      },
      colors:{
        spacecadet: '#373152',
        culturedwhite: '#F5F5F5',
        sizzlingred: '#FF2C55',
        tartorange: '#FD4E4B'
      },
      animation: {
        text: 'text 5s ease infinite',
        blobs: 'blobs 8s ease-in-out infinite 1s',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        blobs: {
          '0%, 100%': {
            'border-radius': '60% 40% 30% 70%/60% 30% 70% 40%'
          },
          '50%': {
            'border-radius': '30% 60% 70% 40%/50% 60% 30% 60%'
          },
        },


      },
      screens: {
        'mobile': '425px',
        'desktop': '1440px',
      },
    },
  },
  plugins: [
    require('tailwindcss-fluid-type')({
        // your fluid type settings
        // works only with unitless numbers
        // This numbers are the defaults settings
        settings: {
            fontSizeMin: 1, // 16px
            fontSizeMax: 1.125, // 20px
            ratioMin: 1.125, // Multiplicator Min
            ratioMax: 1.2, // Multiplicator Max
            screenMin: 30, // 480px
            screenMax: 80, // 1280px
            unit: 'rem', // default is rem but it's also possible to use 'px'
            prefix: '' // set a prefix to use it alongside the default font sizes
        },
        // Creates the text-xx classes
        // This are the default settings and analog to the tailwindcss defaults
        // Each `lineHeight` is set unitless and we think that's the way to go especially in context with fluid type.
        values: {
            'sm': [-1, 1.6],
            'base': [0, 1.6],
            'lg': [1, 1.6],
            'xl': [2, 1.2],
            '2xl': [3, 1.2],
            '3xl': [4, 1.2],
        },
    }),
],
}

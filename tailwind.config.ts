import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')
import fs from "node:fs";
import path from "node:path";
import plaiceholder from "@plaiceholder/tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')



const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wrong: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '20%': { transform: 'translateX(10px)' },
          '40%': { transform: 'translateX(-10px)' },
          '60%': { transform: 'translateX(10px)' },
          '80%': { transform: 'translateX(-10px)' },
        },
        size: {
          '0%': { transform: 'skewX(11deg) scaleX(1)' },
          '100%': { transform: 'skewX(12deg) scaleX(3)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        show: {
          '0%': { opacity: '0' },
          '100%': { opacity: '100' },
        },
        hidden: {
          '0%': { opacity: '100' },
          '100%': { opacity: '0' },
        },

      },
      animation: {
        wrong: 'wrong 0.5s ease-in-out   ',
        show: 'show 1s ease-in-out   ',
        hidden: 'hidden 1s ease-in-out   ',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,

      // Background: '#e4e6e6',
      Background: '#F9F9F9',
      onBackground1: '#494A4A',
      onBackground2: '#5A5B5B',
      Surface: '#F2F4F4',
      // Surface80: '#edf2f2',
      Surface80: '#E4E6E6',
      onSurface1: '#494A4A',
      onSurface2: '#5A5B5B',
      btnFilter: '#E4E7E7',
      theme: '#0A4D68',
      theme2: '#088395',
      theme3: '#05BFDB',

      'mercury': {
        '50': '#f7f8f8',
        '100': '#eef0f0',
        '200': '#e4e6e6',
        '300': '#babfbf',
        '400': '#949c9b',
        '500': '#778080',
        '600': '#606969',
        '700': '#4f5555',
        '800': '#434949',
        '900': '#3b3f3f',
        '950': '#272a2a',
      },
      'solid-pink': {
        '50': '#fcf4f4',
        '100': '#fae9e9',
        '200': '#f5d6d8',
        '300': '#ecb5b9',
        '400': '#e18b93',
        '500': '#d2616e',
        '600': '#bc4256',
        '700': '#983144',
        '800': '#842d40',
        '900': '#72293c',
        '950': '#3e131c',
      },
      slate: colors.slate,
      neutral: colors.neutral,
      blue: colors.blue,
      stone: colors.stone,
      gray: colors.gray,
      red: colors.red,
      sky: colors.sky,
     

    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens
    },

  },
  plugins: [
    plaiceholder({
      resolver: (src) =>
        fs.readFileSync(path.join("./public", `${src}.jpg`)),
    }),
    // require('tailwind-scrollbar'),
  ],

}


export default config

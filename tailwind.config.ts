import { Barlow } from 'next/font/google';
import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')
import fs from "node:fs";
import path from "node:path";
import plaiceholder from "@plaiceholder/tailwindcss";
import { transform } from 'next/dist/build/swc';
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
        showVideoV: {
          '0%': { transform: 'translateY(-50%)', opacity: '0%' },
          '50%': { opacity: '40%'  },
          '100%': { transform: 'translateY(0%)', opacity: '100%' },
        },
        showVideoH: {
          '0%': { transform: 'translateX(50%)', opacity: '0%' },
          '50%': { opacity: '40%'  },
          '100%': { transform: 'translateX(0%)', opacity: '100%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        show: {
          '0%': { opacity: '0' },
          '100%': { opacity: '100%' },
        },
        mainMovie: {
          '0%': { opacity: '50%'},
          '100%': { opacity: '70%'},
        },
        hidden: {
          '0%': { opacity: '100%' },
          '100%': { opacity: '0' },
        },
        rotateToL: {
         '0%': { transform: 'rotate(0deg)' },
         '100%': { transform: 'rotate(190deg)' },
        },
        rotateToR: {
          '0%': { transform: 'rotate(190deg)' },
          '100%': { transform: 'rotate(0deg)' },
         }

      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      animation: {
        wrong: 'wrong 0.5s ease-in-out',
        show: 'show 0.3s ease-in-out',
        mainMovie: 'mainMovie 0.3s linear',
        hidden: 'hidden 1s ease-in-out',
        showVideoV: 'showVideoV 0.1s ease-out',
        showVideoH: 'showVideoH 0.1s ease-out',
        rotateToL: 'rotateToL 0.3s ease-in-out',
        rotateToR: 'rotateToR 0.3s ease-in-out',
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
      Background: '#f5f5f7',
      onBackground1: 'rgb(0 0 0 / 0.75)',
      onBackground2: '#5A5B5B',
      Surface: '#ffffff',
      Surface80: '#E4E6E6',
      onSurface1: '#494A4A',
      onSurface2: '#5A5B5B',
      btnFilter: '#E4E7E7',
      theme: '#0A4D68',
      themeSelected80:'#c9d7dc',
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
    fontFamily: {
      'sans': ['"Helvetica Neue"', 'Helvetica','var(--font-open-sans)','var(--font-barlow)','Arial' ]
    }

  },
  plugins: [
    plaiceholder({
      resolver: (src) =>
        fs.readFileSync(path.join("./public", `${src}.jpg`)),
    }),

  ],

}


export default config

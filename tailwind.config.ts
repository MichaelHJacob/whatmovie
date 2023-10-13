import type { Config } from 'tailwindcss'
import fs from "node:fs";
import path from "node:path";
import plaiceholder from "@plaiceholder/tailwindcss";

/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    plaiceholder({
      resolver: (src) =>
        fs.readFileSync(path.join("./public", `${src}.jpg`)),
    }),
  ],
}
export default config

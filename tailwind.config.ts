import plaiceholder from "@plaiceholder/tailwindcss";
import fs from "node:fs";
import path from "node:path";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wrong: {
          "0%, 100%": { transform: "translateX(0px)" },
          "20%": { transform: "translateX(10px)" },
          "40%": { transform: "translateX(-10px)" },
          "60%": { transform: "translateX(10px)" },
          "80%": { transform: "translateX(-10px)" },
        },
        showVideoV: {
          "0%": { transform: "translateY(-50%)", opacity: "0%" },
          "50%": { opacity: "40%" },
          "100%": { transform: "translateY(0%)", opacity: "100%" },
        },
        showVideoH: {
          "0%": { transform: "translateX(50%)", opacity: "0%" },
          "50%": { opacity: "40%" },
          "100%": { transform: "translateX(0%)", opacity: "100%" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        show: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100%" },
        },
        mainMovie: {
          "0%": { opacity: "50%" },
          "100%": { opacity: "70%" },
        },
        hidden: {
          "0%": { opacity: "100%" },
          "100%": { opacity: "0" },
        },
        rotateToL: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(190deg)" },
        },
        rotateToR: {
          "0%": { transform: "rotate(190deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      animation: {
        wrong: "wrong 0.5s ease-in-out",
        show: "show 0.3s ease-in-out",
        mainMovie: "mainMovie 0.3s linear",
        hidden: "hidden 1s ease-in-out",
        showVideoV: "showVideoV 0.1s ease-out",
        showVideoH: "showVideoH 0.1s ease-out",
        rotateToL: "rotateToL 0.3s ease-in-out",
        rotateToR: "rotateToR 0.3s ease-in-out",
      },
      fontFamily: {
        logo: ["var(--font-caladea)", "Times New Roman", "ui-serif"],
        button: [
          "var(--font-ss-pro)",
          "var(--font-open-sans)",
          "ui-sans-serif",
          "system-ui",
        ],
      },
      boxShadow: {
        mid: "0 8px 30px 2px rgba(46, 46, 46, 0.467)",
        light: "0 5px 35px -10px rgba(0, 0, 0, 0.150)",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      black: colors.black,
      red: colors.red,
      blue: colors.blue,
      gray: colors.gray,
      stone: colors.stone,
      rose: colors.rose,
      amber: colors.amber,
      nightDew: {
        100: "#FBFCFD",
        200: "#F6F8F9",
        300: "#F1F4F7",
        400: "#6A7786",
        500: "#484A4C",
        600: "#323233",
        700: "#1C1C1C",
      },
      selector: {
        100: "#1C83E6",
        200: "#24394E",
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ["var(--font-open-sans)", "ui-sans-serif", "system-ui"],
      serif: ["var(--font-caladea)", "Times New Roman", "ui-serif"],
    },
  },
  plugins: [
    plaiceholder({
      resolver: (src) => fs.readFileSync(path.join("./public", `${src}.jpg`)),
    }),
  ],
};

export default config;

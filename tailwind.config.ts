import plaiceholder from "@plaiceholder/tailwindcss";
import fs from "node:fs";
import path from "node:path";
import type { Config } from "tailwindcss";
import tailwindcssAnimated from "tailwindcss-animated";
import defaultTheme from "tailwindcss/defaultTheme";

import { noiseSvg } from "./src/styles/noise";
import {
  blackWhite,
  componentTokens,
  inputLink,
  primaryNeutralStates,
  surface,
} from "./src/styles/theme/tokens";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        ...componentTokens.background,
        ...surface.background,
        ...blackWhite.background,
        ...inputLink.background,
        ...primaryNeutralStates.background,
      },
      textColor: {
        ...componentTokens.foreground,
        ...blackWhite.foreground,
        ...inputLink.foreground,
        ...primaryNeutralStates.foreground,
      },
      textDecorationColor: {
        ...inputLink.foreground,
      },
      outlineColor: {
        ...surface.border,
        ...blackWhite.border,
        ...inputLink.border,
        ...primaryNeutralStates.border,
      },
      borderColor: {
        ...surface.border,
        ...blackWhite.border,
        ...inputLink.border,
        ...primaryNeutralStates.border,
      },
      fill: {
        ...componentTokens.foreground,
        ...blackWhite.foreground,
        ...inputLink.foreground,
        ...primaryNeutralStates.foreground,
      },
      stroke: {
        ...componentTokens.foreground,
        ...blackWhite.foreground,
        ...inputLink.foreground,
        ...primaryNeutralStates.foreground,
      },
      gradientColorStops: {
        "listBase-1": "var(--color-listBase-1)",
        "listBase-2": "var(--color-listBase-2)",
        "listBase-3": "var(--color-listBase-3)",
        "floating-1": "var(--color-floating-1)",
        "floating-2": "var(--color-floating-2)",
        "floating-3": "var(--color-floating-3)",
        "body-1": "var(--color-body-1)",
        "body-2": "var(--color-body-2)",
        "body-3": "var(--color-body-3)",
        "body-dense-1": "var(--color-body-dense-1)",
        "body-dense-2": "var(--color-body-dense-2)",
        "body-dense-3": "var(--color-body-dense-3)",
        "gray-1": "var(--color-gray-1)",
        "gray-2": "var(--color-gray-2)",
      },
      keyframes: {
        pulseDots: {
          "0%, 60%, 100%": { opacity: "10%" },
          "30%": { opacity: "100%" },
        },
        wrong: {
          "0%, 100%": { transform: "translateX(0px)" },
          "20%": { transform: "translateX(10px)" },
          "40%": { transform: "translateX(-10px)" },
          "60%": { transform: "translateX(10px)" },
          "80%": { transform: "translateX(-10px)" },
        },
      },
      animation: {
        wrong: "wrong 0.5s ease-in-out",
        pulseDots: "pulseDots 1.5s ease-in-out",
      },
      backgroundImage: {
        noise: `url("${noiseSvg}")`,
      },
      fontFamily: {
        sans: [
          "var(--font-open-sans)",
          "ui-sans-serif",
          "system-ui",
          ...defaultTheme.fontFamily.sans,
        ],
        brand: ["var(--font-caladea)", "Times New Roman", "ui-serif"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-subtle": "var(--shadow-card-subtle)",
        "card-minimal": "var(--shadow-card-minimal)",
        people: "var(--shadow-people)",
        btn: "var(--shadow-btn)",
        "btn-hover": "var(--shadow-btn-hover)",
        "btn-hList": "var(--shadow-btn-hList)",
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [
    tailwindcssAnimated,
    plaiceholder({
      resolver: (src) => fs.readFileSync(path.join("./public", `${src}.jpg`)),
    }),
  ],
};

export default config;

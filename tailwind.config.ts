import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f1e8d3",
        "paper-2": "#ebe1c6",
        ink: "#181614",
        "ink-soft": "#3a352e",
        "ink-mute": "#6e6757",
        pink: "#ff2e88",
        blue: "#2a3aff",
        yellow: "#f5cc00",
        teal: "#00a99d",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "riso-pink": "6px 6px 0 #ff2e88",
        "riso-blue": "6px 6px 0 #2a3aff",
        "riso-pink-lg": "8px 8px 0 #ff2e88",
        "riso-blue-lg": "8px 8px 0 #2a3aff",
        "riso-pink-sm": "3px 3px 0 #ff2e88",
        "riso-blue-sm": "3px 3px 0 #2a3aff",
        "riso-pink-xs": "2px 2px 0 #ff2e88",
        "riso-blue-xs": "2px 2px 0 #2a3aff",
      },
      keyframes: {
        marq: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        risoPulse: {
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        marq: "marq 60s linear infinite",
        "riso-pulse": "risoPulse 1.4s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090C",
        surface: {
          DEFAULT: "#101217",
          subtle: "#161922",
          border: "#232836",
          hover: "#1D222E"
        },
        neon: {
          lime: "#CCFF00",
          limeHover: "#B3E600",
          glow: "rgba(204, 255, 0, 0.25)"
        },
        accent: {
          cyan: "#00F0FF",
          orange: "#FF6B00",
          rose: "#FF2E63",
          emerald: "#10B981"
        }
      },
      boxShadow: {
        'neon': '0 0 20px -3px rgba(204, 255, 0, 0.35)',
        'neon-strong': '0 0 35px 2px rgba(204, 255, 0, 0.45)',
        'cyan-glow': '0 0 20px -3px rgba(0, 240, 255, 0.35)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;

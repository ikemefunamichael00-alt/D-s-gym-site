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
        brand: {
          coral: "#ff6b6b",
          coralHover: "#ff5252",
          coralLight: "rgba(255, 107, 107, 0.12)",
          coralBorder: "rgba(255, 107, 107, 0.35)",
        },
        surface: {
          base: "#000000",
          card: "#0c0e12",
          subtle: "#14171f",
          border: "#202533",
          hover: "#1a1f2b",
        },
        token: {
          textPrimary: "#111827",
          textSecondary: "#4b5563",
          textTertiary: "#171717",
          textInverse: "#ffffff",
          borderMuted: "#d1d5db",
          borderDefault: "#e5e7eb",
        },
        accent: {
          cyan: "#00F0FF",
          orange: "#FF922B",
          emerald: "#20C997",
          purple: "#845EF7",
        }
      },
      fontSize: {
        'token-xs': ['14px', '20px'],
        'token-sm': ['16px', '24px'],
        'token-md': ['18px', '28px'],
        'token-lg': ['20px', '28px'],
        'token-xl': ['30px', '36px'],
        'token-2xl': ['36px', '44px'],
        'token-3xl': ['60px', '1.08'],
      },
      borderRadius: {
        'token-xs': '8px',
        'token-sm': '9999px',
      },
      boxShadow: {
        'token-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'coral': '0 0 25px -4px rgba(255, 107, 107, 0.45)',
        'coral-strong': '0 0 40px 2px rgba(255, 107, 107, 0.6)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.7)',
      },
      transitionDuration: {
        'instant': '150ms',
        'fast': '300ms',
      },
      fontFamily: {
        sans: ['Poppins', '__Poppins_6bee3b', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;

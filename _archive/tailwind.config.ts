import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "rgba(255,255,255,0.9)",
          elevated: "rgba(255,255,255,0.95)",
        },
      },
      borderRadius: {
        card: "12px",
        "card-lg": "16px",
      },
      boxShadow: {
        soft: "0 2px 12px -4px rgba(0,0,0,0.06), 0 4px 24px -8px rgba(0,0,0,0.04)",
        "soft-sm": "0 1px 3px rgba(0,0,0,0.04)",
        "soft-md": "0 4px 12px -2px rgba(0,0,0,0.05)",
        "soft-lg": "0 10px 40px -10px rgba(0,0,0,0.08)",
        card: "0 2px 8px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;

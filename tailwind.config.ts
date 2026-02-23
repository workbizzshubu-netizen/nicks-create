import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: "#F5F5F7",
          surface: "#FFFFFF",
          section: "#FAFAFA",
          text: "#1D1D1F",
          secondary: "#6E6E73",
          border: "#E5E5EA",
          accent: "#0071E3",
        },
        dark: {
          bg: "#111111",
          surface: "#1C1C1E",
          text: "#F5F5F7",
          secondary: "#A1A1A6",
          accent: "#2997FF",
        },
        muted: "rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;

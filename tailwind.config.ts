import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        muted: "rgba(255,255,255,0.6)",
        neon: "#c6ff00",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "bg-color": "#CFFFDB",
        "sidebar-1": "#3D595D",
        "sidebar-2": "#393636",
        "bg-gray": "#F7F8F9",
        "filter-dark": "#516A6E",
      },
      colors: {
        "athome-orange": "#EF8A31",
        "athome-blue": "#2F75E2",
      },
    },
  },
  plugins: [],
};
export default config;

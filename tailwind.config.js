import {nextui} from "@nextui-org/react"; // 追記

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}" // 追記
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // 追記
  plugins: [nextui()] // 追記
}

export default config;

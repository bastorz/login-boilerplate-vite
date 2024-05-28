/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      blue: colors.sky,
      red: colors.rose,
      green: colors.green,
      pink: colors.fuchsia,
      primary: colors.blue,
      emerald: colors.emerald,
      purple: colors.purple,
      indigo: colors.indigo,
      orange: colors.orange,
      brown: colors.brown,
    },
  },
  plugins: [],
};

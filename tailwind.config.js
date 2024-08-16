/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xl: "1330px",
      lg: "1030px",
      md: "768px",
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};

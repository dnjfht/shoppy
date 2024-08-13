/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    screens: {
      "3sm": "320px",
      "2sm": "450px",
      sm: "625px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1921px",
    },
  },
  plugins: [],
  corePlugins: {
    aspectRatio: true,
    lineClamp: true,
  },
};

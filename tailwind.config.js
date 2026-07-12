/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./_products/**/*.md",
    "./_pages/**/*.md",
    "./*.html",
    "./products/**/*.html",
    "./categories/**/*.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "canvas-mist": "#f2f4f5",
        "pure-white": "#ffffff",
        "ink-black": "#000000",
        "faint-border": "#ebebeb",
        "muted-gray": "#787574",
        "shop-violet": "#5433eb",
        "violet-wash": "#c0b5f3",
        "slate-ink": "#332f2d"
      },
      fontFamily: {
        primary: ["Vazirmatn", "sans-serif"]
      },
      borderRadius: {
        card: "28px",
        pill: "9999px",
        img: "20px"
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        base: {
          0: "#F6F6F6",
          100: "#E8E5F2",
          200: "#DFDBEB",
          300: "#454970",
        },
        primary: {
          1: "#8E72E3",
          2: "#6CE0A4",
          3: "#4CC285",
          4: "#7456CD",
        },
      },
    },
  },
  plugins: [],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
};

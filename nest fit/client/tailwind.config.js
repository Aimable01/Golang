/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "rgb(38, 38, 38)",
        "normal-bg": "rgb(17, 17, 17)",
      },
    },
  },
  plugins: [],
};

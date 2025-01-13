/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#0A0A0A",
        "normal-bg": "rgb(17, 17, 17)",
        "feed-bg": "#181818",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      green: "rgb(4 120 87)",
      red: "rgb(190 18 60)",
      brand: "#04D98C",
      secondary: "#5F86FB",
      dark: "#002A11",
      white: "#ffff",
      gray: "#4C4554",
      lowop: "#FAF4F4",
      "gradient-green": "#C3F4E1",
      "gradient-blue": "#F4E8E4",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};

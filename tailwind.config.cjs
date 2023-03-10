// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        sarcastic: {
          gray: "#7F8C8D",
        },
        mindBlowing: {
          gold: "#FFD700",
        },
        inspirational: {
          turquoise: "#00CED1",
        },
        informative: {
          teal: "#008080"
        },
        humorous: {
          diamond: "#F8F8FF"
        },
        analytical: {
          gray: "#808080"
        },
        creative: {
          orange: "#FFA500"
        },
        provocative: {
          red: "#800000"
        },
        introspective: {
          purple: "#483D8B"
        },
        nostalgic: {
          beige: "#F5DEB3"
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("@tailwindcss/line-clamp")
  ],
}

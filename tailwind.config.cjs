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
          gray: "#959595",
        },
        mindBlowing: {
          gold: "#ffff00",
        },
        inspirational: {
          pink: "#ff00ff",
        },
        informative: {
          teal: "#40e0d0"
        },
        humorous: {
          pink: "#ff6ec7"
        },
        analytical: {
          green: "#00ff00"
        },
        creative: {
          orange: "#FFA500"
        },
        provocative: {
          red: "#ff0000"
        },
        introspective: {
          purple: "#800080"
        },
        nostalgic: {
          beige: "#F5DEB3"
        },
        satire: {
          blue: "#00ffff"
        },
        primary: {
          dark: "#2C2C2C",
          light: "#F5F5F5",
          darkPurple: "#8B56B4",
          lightPurple: "#C6A3D8",
          teal: "#4A8791",
        }
      }
    },
    fontFamily: {
      'VCR': ['VCR-OSD', 'sans-serif'],
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require("@tailwindcss/line-clamp")
  ],
}

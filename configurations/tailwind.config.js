/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        lklavika: ["Lklavika"],
        "lklavika-light": ["Lklavika-Light"],
        "lklavika-medium": ["Lklavika-Medium"],
        "lklavika-bold": ["Lklavika-Bold"],
      },
      
      colors: {
        primary: "#5BC82F",
        secondary: "#2FC850",
        support: "#8DC837",
        accent: "#000000",
        white: "#FFFFFF",
        gray: "#b6b6b6"
      }
    },
  },
  plugins: [],
}
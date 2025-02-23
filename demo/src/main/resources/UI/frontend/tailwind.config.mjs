/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#03AED2", // Vibrant blue (main color)
        secondary: "#86D2E8", // Light blue (background)
        highlight: "#FDDE55", // Yellow for important buttons
        soft: "#FEEFAD", // Light pastel yellow (subtle accents)
        dark: "#1a1a1a", // Dark theme option
      },
    },
  },
  plugins: [],
};

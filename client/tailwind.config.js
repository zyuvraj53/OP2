/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Scan all files in pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scan all files in components directory
    "./app/**/*.{js,ts,jsx,tsx}", // Optional: if using App Router
    "./(sub-pages)/**/*.{js,ts,jsx,tsx}", // Include sub-pages directory
    "./\\(components\\)/**/*.{js,ts,jsx,tsx}", // Include components directory
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        oplight: "#D39398",
        opdark: "#3A1210",
        bgcolor: "#f0b4dc",
        textcolorHeading: "#7a7a7a",
        textcolorBody: "#334862",
        navbarBgColor: "#f0dcc4",
        navbarTextColor: "#7a7a7a",
        navbarTextHoverColor: "#000000"
      },
      animation: {
        marquee: "marquee 33s linear infinite", // Adjusted to 24s
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        bannerImg: "url('/background.jpg')",
        tribalImg: "url('/Tribal.png')",
        blackOverlay:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba (0, 0, 0, 0.8) 100%)",
      },
    },
  },
  plugins: [],
  safelist: [
    "hover:animate-pause", // Corrected to match Tailwind's utility
    "animate-pause", // Corrected typo
  ],
};

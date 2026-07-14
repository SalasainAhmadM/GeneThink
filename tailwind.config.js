/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // Display — headings, titles, logo
        "fredoka": ["Fredoka-Regular", "sans-serif"],
        "fredoka-bold": ["Fredoka-Bold", "sans-serif"],

        // Body — paragraphs, labels, buttons
        "nunito": ["Nunito-Regular", "sans-serif"],
        "nunito-semibold": ["Nunito-SemiBold", "sans-serif"],
        "nunito-bold": ["Nunito-Bold", "sans-serif"],
        "nunito-extrabold": ["Nunito-ExtraBold", "sans-serif"],
      },

      colors: {
        // Brand greens
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#4CAF50",
          400: "#2E7D32",
          500: "#1b5e20",
        },
        // Science blues
        science: {
          100: "#e3f2fd",
          200: "#90CAF9",
          300: "#1565C0",
          400: "#0d47a1",
        },
        // Accent / game colors
        gold: "#FFD700",
        amber: "#FF9800",
        danger: "#F44336",
        danger2: "#ff7c72",
        success: "#4CAF50",
        // Difficulty
        easy: "#4CAF50",
        medium: "#FF9800",
        hard: "#F44336",
        // Neutrals
        ink: {
          DEFAULT: "#1a1a2e",
          100: "#9e9e9e",
          200: "#616161",
          300: "#212121",
          400: "#455a64",
          500: "#c8e6c9",
          600: "#3f3f3f"
        },
        // Glass surfaces (use with bg- or border-)
        glass: {
          white: "rgba(255,255,255,0.10)",
          white2: "rgba(255,255,255,0.18)",
          white3: "rgba(255,255,255,0.25)",
          dark: "rgba(0,0,0,0.20)",
          green: "rgba(76,175,80,0.20)",
          blue: "rgba(21,101,192,0.20)",
        },
        // Background solids
        bg: {
          dark: "#0d1b2a",
          green: "#1a3a1a",
          blue: "#0d2b4e",
          light: "#f5f9f5",
          card: "#ffffff",
        },
      },

      borderRadius: {
        xl2: "20px",
        xl3: "28px",
        pill: "99px",
      },
    },
  },
  plugins: [],
}
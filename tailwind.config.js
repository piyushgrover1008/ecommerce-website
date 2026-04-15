/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f6f7",
        surface: "#f5f6f7",
        "surface-container-low": "#eff1f2",
        "surface-container-lowest": "#ffffff",
        primary: "#0846ed",
        "primary-container": "#859aff",
        "on-surface": "#2c2f30",
        secondary: "#5c5b5b",
        "secondary-container": "#e5e2e1",
        error: "#b41340",
        "outline-variant": "rgba(171, 173, 174, 0.2)", // 20% opacity as per DESIGN.md
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        'md': '0.375rem',
        'lg': '0.5rem',
      },
      boxShadow: {
        'ambient': '0 20px 40px rgba(44, 47, 48, 0.06)',
      },
    },
  },
  plugins: [],
}

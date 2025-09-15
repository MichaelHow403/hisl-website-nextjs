/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        spectral: ['Spectral', 'serif'],
      },
      colors: {
        bg: '#0b1220',
        panel: '#0f1828',
        edge: '#1e2a42',
        text: '#e8f0ff',
        muted: '#a8b8d6',
        gold: '#f6c650',
        teal: '#39d7c9',
      },
      boxShadow: {
        glow: '0 0 40px rgba(57,215,201,.25)',
      },
      maxWidth: {
        wrap: '1200px',
      },
    },
  },
  plugins: [],
};

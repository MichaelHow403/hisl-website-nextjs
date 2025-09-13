/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        smooth: '0 10px 30px rgba(0,0,0,0.08)',
      },
      maxWidth: {
        wrap: '1200px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

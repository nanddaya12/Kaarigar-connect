/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0D5C46',
        'on-primary': '#FFFFFF',
        'primary-container': '#0D5C46',
        'on-primary-container': '#8CD2B6',
        'secondary': '#0F766E',
        'on-secondary': '#FFFFFF',
        'tertiary': '#D97706',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#7D4200',
        'surface': '#FBFBF9',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#EFF4FF',
        'surface-container': '#E6EEFF',
        'on-surface': '#1F2937',
        'on-surface-variant': '#4B5563',
        'outline': '#6F7974',
        'outline-variant': '#E5E7EB',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a'
      },
      fontFamily: {
        'headline': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

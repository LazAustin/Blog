/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        lightBlue: '#a273ff',
        darkBlue: '#3c0d99',
        lightYellow: '#7c8ba1',
        darkYellow: '#16253b',
        lightGray: '#f7fafc',
        darkGray: '#1a202c',   
      },
      backgroundImage: {
        'laz-austin-svg': "url('/img/lazSvg1.svg')",
        'britt-logo-jpg': "url('/img/brittLogo.jpg')",
      }
    },
  },
  plugins: [],
}

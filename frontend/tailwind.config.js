/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), 
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
}


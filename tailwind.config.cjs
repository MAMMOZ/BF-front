/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#1c306e',
        customPurple: '#403194',
      },
    },
  },
  plugins: [],
}

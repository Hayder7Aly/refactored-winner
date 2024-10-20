/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ensures Tailwind applies to your JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

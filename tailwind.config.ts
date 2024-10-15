import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        columbia_blue: {
          DEFAULT: '#cee5f2',
          100: '#133447',
          200: '#26688e',
          300: '#4199cc',
          400: '#88bfdf',
          500: '#cee5f2',
          600: '#d8eaf5',
          700: '#e2eff7',
          800: '#ecf5fa',
          900: '#f5fafc',
        },
        columbia_blue_light: {
          DEFAULT: '#accbe1',
          100: '#152b3a',
          200: '#2a5675',
          300: '#3f81af',
          400: '#72a7cc',
          500: '#accbe1',
          600: '#bdd6e7',
          700: '#cee0ed',
          800: '#deeaf3',
          900: '#eff5f9',
        },
        air_superiority_blue: {
          DEFAULT: '#7c98b3',
          100: '#161e26',
          200: '#2c3d4c',
          300: '#425b73',
          400: '#587999',
          500: '#7c98b3',
          600: '#95acc2',
          700: '#afc1d1',
          800: '#cad6e0',
          900: '#e4eaf0',
        },
        paynes_gray: {
          DEFAULT: '#637081',
          100: '#14171a',
          200: '#282d34',
          300: '#3c444e',
          400: '#505a68',
          500: '#637081',
          600: '#808d9d',
          700: '#a0a9b6',
          800: '#c0c6ce',
          900: '#dfe2e7',
        },
        paynes_gray_dark: {
          DEFAULT: '#536b78',
          100: '#111618',
          200: '#212b30',
          300: '#324148',
          400: '#435660',
          500: '#536b78',
          600: '#6f8b9b',
          700: '#93a8b4',
          800: '#b7c5cd',
          900: '#dbe2e6',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Add the forms plugin here
  ],
};
export default config;

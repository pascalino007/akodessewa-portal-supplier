import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary blue for text and headings
        primary: {
          DEFAULT: '#1e3a5f',
          light: '#2d4a6f',
          dark: '#152a45',
        },
        navy: {
          950: '#0f0f1a',
          900: '#161c28',
          800: '#1a1b2b',
          700: '#1e293b',
          600: '#20293a',
          500: '#252a3a',
          400: '#2c2c4a',
        },
        accent: {
          DEFAULT: '#FF6B35',
          light: '#ff8c5a',
          dark: '#e55a2b',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

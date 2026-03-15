import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0F',
          alt: '#12121A',
          dark: '#06060A',
          'dark-alt': '#0E0E14',
        },
        foreground: {
          DEFAULT: '#E8E8ED',
          muted: '#8B8B9E',
          faint: '#4A4A5C',
          'on-dark': '#E8E8ED',
        },
        card: '#14141F',
        accent: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'blue-light': 'rgba(37,99,235,0.20)',
          teal: '#0D9488',
          'teal-hover': '#0F766E',
          'teal-light': 'rgba(13,148,136,0.20)',
          coral: '#F43F5E',
          'coral-hover': '#E11D48',
          'coral-light': 'rgba(244,63,94,0.15)',
          amber: '#F59E0B',
          'amber-hover': '#D97706',
          'amber-light': 'rgba(245,158,11,0.15)',
        },
        border: {
          DEFAULT: '#1E1E2E',
          dark: '#2A2A3A',
        },
      },
      fontFamily: {
        clash: ['Clash Display', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [],
}

export default config

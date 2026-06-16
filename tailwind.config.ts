import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        pinyon: ['var(--font-pinyon)', 'cursive'],
        'great-vibes': ['var(--font-great-vibes)', 'cursive'],
      },
      colors: {
        alabaster: '#FAFAFA',
        obsidian:  '#000000',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

export default config

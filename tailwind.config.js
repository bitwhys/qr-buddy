import defaultTheme from 'tailwindcss/defaultTheme'
import formsPlugin from '@tailwindcss/forms'
import {
  mauve,
  mauveDark,
  crimsonDark,
  crimson,
  sand,
  sandDark,
  orange,
  orangeDark,
  cyan,
  cyanDark,
} from '@radix-ui/colors'

const radixToTailwind = radixColorObject => {
  const captureScaleRegEx = new RegExp(/(\d{1,2})/)
  const color = {}
  for (const [token, value] of Object.entries(radixColorObject)) {
    const match = token.match(captureScaleRegEx)
    if (match) {
      Object.assign(color, { [match[1]]: value })
    }
  }
  return color
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', 'src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: radixToTailwind(sand),
        neutralDark: radixToTailwind(sandDark),
        secondary: radixToTailwind(cyan),
        secondaryDark: radixToTailwind(cyanDark),
        primary: radixToTailwind(orange),
        primaryDark: radixToTailwind(orangeDark),
      },
      boxShadow: {
        1: '0px 0px 1px rgba(26, 32, 36, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32)',
        2: '0px 0px 1px rgba(26, 32, 36, 0.32), 0px 4px 8px rgba(91, 104, 113, 0.24)',
        3: '0px 0px 1px rgba(26, 32, 36, 0.32), 0px 8px 16px rgba(91, 104, 113, 0.24)',
        4: '0px 0px 1px rgba(26, 32, 36, 0.32), 0px 12px 24px rgba(91, 104, 113, 0.24)',
        5: '0px 0px 1px rgba(26, 32, 36, 0.32), 0px 24px 32px rgba(91, 104, 113, 0.24)',
        6: '0px 0px 1px rgba(26, 32, 36, 0.32), 0px 40px 64px rgba(91, 104, 113, 0.24)',
      },
      fontFamily: {
        sans: ['Josefin SansVariable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [formsPlugin],
}

import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: 'rgb(206, 228, 229)',
    lighter: 'rgb(156, 200, 202)',
    base: 'rgb(24, 170, 177)',
    dark: 'rgb(18, 129, 135)',
  },

  secondary: baseColor.primary,
}

export logo from './logo'
export logoHeader from './logo-header'



// WEBPACK FOOTER //
// ./packages/main/src/themes/effektif/index.js
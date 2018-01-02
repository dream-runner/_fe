import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#c2e0f2',
    lighter: '#82c4ed',
    base: '#148dea',
    dark: '#105c9e',
  },

  secondary: {
    ...baseColor.secondary,

    base: '#002065',
  },
}

export logo from './logo'
export logoHeader from './logo-header'



// WEBPACK FOOTER //
// ./packages/main/src/themes/dkb/index.js
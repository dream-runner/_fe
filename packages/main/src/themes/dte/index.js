import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#bae5f5',
    lighter: '#81ceeb',
    base: '#00aeef',
    dark: '#0b6c8f',
  },

  secondary: {
    ...baseColor.secondary,

    base: '#8dc63f',
  },
}

export logo from './logo' // eslint-disable-line import/no-unresolved
export logoHeader from './logo-header' // eslint-disable-line import/no-unresolved



// WEBPACK FOOTER //
// ./packages/main/src/themes/dte/index.js
import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#cee2f0',
    lighter: '#87b4d6',
    base: '#256399',
    dark: '#004179',
  },

  secondary: {
    ...baseColor.secondary,

    base: '#e30513',
  },
}

export logo from './logo' // eslint-disable-line import/no-unresolved
export logoHeader from './logo-header' // eslint-disable-line import/no-unresolved



// WEBPACK FOOTER //
// ./packages/main/src/themes/db-netze/index.js
import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#e6e2db',
    lighter: '#c8beab',
    base: '#908267',
    dark: '#746549',
  },

  secondary: {
    ...baseColor.secondary,

    base: '#a9112f',
  },
}

export logo from './logo' // eslint-disable-line import/no-unresolved
export logoHeader from './logo-header' // eslint-disable-line import/no-unresolved



// WEBPACK FOOTER //
// ./packages/main/src/themes/trianel/index.js
import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#fff5cc',
    lighter: '#ffe88c',
    base: '#ffcc00',
    dark: '#d6ab1e',
  },

  secondary: {
    ...baseColor.secondary,

    base: '#007dd1',
  },
}

export logo from './logo' // eslint-disable-line import/no-unresolved
export logoHeader from './logo-header' // eslint-disable-line import/no-unresolved



// WEBPACK FOOTER //
// ./packages/main/src/themes/streetscooter/index.js
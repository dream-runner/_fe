import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#fff6cc',
    lighter: '#ffe98b',
    base: '#ffcd00',
    dark: '#d7ac15',
  },

  secondary: {
    ...baseColor.secondary,

    base: '#d50311',
  },
}

export logo from './logo' // eslint-disable-line import/no-unresolved
export logoHeader from './logo' // eslint-disable-line import/no-unresolved



// WEBPACK FOOTER //
// ./packages/main/src/themes/dhl/index.js
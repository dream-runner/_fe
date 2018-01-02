import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#c7e5f2',
    lighter: '#8abfde',
    base: '#0a69c2',
    dark: '#104c87',
  },

  secondary: {
    ...baseColor.secondary,

    base: '#91b858',
  },

  mono: {
    ultradark: '#414141',
    dark: '#666666',
    middle: '#999796',
    lighter: '#d4d0cd',
    light: '#e5ded9',
    ultralight: 'rgb(242, 242, 242)',
  },
}

export logo from './logo' // eslint-disable-line import/no-unresolved
export logoHeader from './logo-header' // eslint-disable-line import/no-unresolved



// WEBPACK FOOTER //
// ./packages/main/src/themes/dmk/index.js
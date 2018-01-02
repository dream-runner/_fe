import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#cbeccb',
    lighter: '#90d28e',
    base: '#42ae3b',
    dark: '#268128',
  },

  mono: {
    ultradark: '#373134',
    dark: '#4e464a',
    middle: '#7e7478',
    lighter: '#cdc5c8',
    light: '#ece7e8',
    ultralight: 'rgb(242,242,242)',
  },
}

export logo from './logo' // eslint-disable-line import/no-unresolved
export logoHeader from './logo-header' // eslint-disable-line import/no-unresolved



// WEBPACK FOOTER //
// ./packages/main/src/themes/ableton/index.js
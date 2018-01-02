import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#f2d0da',
    lighter: '#eb96af',
    base: '#ae0055',
    dark: '#6b0935',
  },

  secondary: {
    ...baseColor.secondary,

    base: '#ae0055',
  },

  mono: {
    ...baseColor.mono,

    ultradark: '#383633',
    dark: '#6b6763',
    middle: '#a19b95',
    lighter: '#d6d0cb',
    light: '#e8e6e4',
  },

  header: {
    primary: '#e8e6e4',
    secondary: '#e8e6e4',
  },
}

export logo from './logo' // eslint-disable-line import/no-unresolved
export logoHeader from './logo' // eslint-disable-line import/no-unresolved

export const font = {
  family: {
    heading: 'Open Sans',
  },
}



// WEBPACK FOOTER //
// ./packages/main/src/themes/kion/index.js
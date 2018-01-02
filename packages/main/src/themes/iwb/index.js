import { color as baseColor } from '../default'

export const color = {
  ...baseColor,

  primary: {
    light: '#869bba',
    lighter: '#516f9a',
    base: '#032e6c',
    dark: '#032e6c',
  },

  secondary: {
    ...baseColor.secondary,

    dark: '#27a1dc',
    base: '#27a1dc',
    lighter: '#71c4e8',
    light: '#8bceec',
  },

  chart: [
    '#8258fa',
    '#5858fa',
    '#5882fa',
    '#58acfa',
    '#58d3f7',
    '#58faf4',
    '#58fad0',
    '#58faac',
    '#58fa82',

    '#58fa58',
    '#82fa58',
    '#acfa58',
    '#d0fa58',
    '#f4fa58',
    '#f7d358',
    '#faac58',
    '#fa8258',
    '#f78181',

    '#bdbdbd',
    '#fa5882',
    '#fa58ac',
    '#fa58d0',
    '#fa58f4',
    '#d358f7',
    '#ac58fa',

    '#fa5858',
  ],
}

export logo from './logo'
export logoHeader from './logo-header'



// WEBPACK FOOTER //
// ./packages/main/src/themes/iwb/index.js
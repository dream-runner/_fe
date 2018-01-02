import i18n from 'signavio-i18n'

export function priorities() {
  return [
    {
      id: '0',
      name: i18n('High'),
    },
    {
      id: '1',
      name: i18n('Medium'),
    },
    {
      id: '2',
      name: i18n('Normal'),
    },
    {
      id: '3',
      name: i18n('Low'),
    },
  ]
}

export const Colors = {
  high: '#ea86a7',
  medium: '#ead586',
  normal: '#8eea86',
  low: '#86e5ea',
}



// WEBPACK FOOTER //
// ./packages/cases/src/components/priority/priorities.js
// @flow
import { isEmpty } from 'lodash'

import i18n from 'signavio-i18n'

export default () => ({
  name: {
    target: field => (isBoundToNestedField(field) ? 'field' : 'variable'),
    label: i18n('Label'),
    placeholder: i18n('Label'),
    type: { name: 'text' },
    position: 0,
  },
  description: {
    target: field => (isBoundToNestedField(field) ? 'field' : 'variable'),
    label: i18n('Description'),
    placeholder: i18n('Enter a description (optional)'),
    type: {
      name: 'text',
      multiLine: true,
    },
    position: 1,
  },
  defaultValue: {
    target: 'variable',
    label: i18n('Initial value'),
    type: field => field.getType().copy(),
    hide: isBoundToNestedField,
    position: 2,
  },
  readOnly: {
    target: 'field',
    label: i18n('Read only'),
    type: { name: 'boolean' },
    disabled: isBoundToNestedField,
    position: 3,
  },
  required: {
    target: 'field',
    label: i18n('Mandatory'),
    type: { name: 'boolean' },
    disabled: field => field.get('readOnly'),
    position: 4,
  },
})

export function isBoundToNestedField(field) {
  return field.get('binding') && !isEmpty(field.get('binding').get('fields'))
}



// WEBPACK FOOTER //
// ./src/processes/statics/baseConfigs.js
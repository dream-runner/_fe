import _ from 'underscore'
import { locale } from 'i18n'

import EditableModel from 'forms/models/EditableModel'

import { availableLanguages } from '../../../packages/organizations'

module.exports = EditableModel.extend({
  defaults: {
    language: locale(),
    taskFilters: [],
    caseFilters: [],
  },

  fields: {
    notifications: {
      type: { name: 'boolean' },
    },
    batchNotifications: {
      type: { name: 'boolean' },
    },
    language: {
      type: {
        name: 'choice',
        elementType: { name: 'text' },
        options: _.map(availableLanguages(), (value, key) => {
          return {
            id: key,
            name: value,
          }
        }),
      },
    },
  },

  inlineJSON: ['taskFilterIds'],
})



// WEBPACK FOOTER //
// ./src/users/models/Preferences.js
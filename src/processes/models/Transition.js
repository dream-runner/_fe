import UniqueModel from 'uniquemodel'
import { get, includes, some } from 'lodash'

import Action from 'activities/models/Action'

import ProcessConstituent from './ProcessConstituent'

import { isValid } from '../../../packages/conditions'

/**
     * A Transition defines a sequential order between two Activities, i.e., the activity 'to' must not be
     * instantiated before the instance of activity 'from' has been executed.
     */
module.exports = UniqueModel(
  ProcessConstituent.extend({
    references: {
      from: Action,
      to: Action,
    },

    referencesVariable(variable) {
      const condition = this.get('condition')

      if (!condition) {
        return false
      }

      return some(condition.conditions, ({ left, right }) => {
        return (
          includes(get(left, 'expression'), variable.id) ||
          includes(get(right, 'expression'), variable.id)
        )
      })
    },

    initListeners: function() {
      if (this.get('from')) {
        this.get('from').trigger('connect', this.get('from'), this, 'from')
        this.get('from').on('destroy', this.destroy, this)
      }

      if (this.get('to')) {
        this.get('to').trigger('connect', this.get('to'), this, 'to')
        this.get('to').on('destroy', this.destroy, this)
      }

      this.on(
        'change:from',
        (m, current) => {
          var prev = this.previous('from')
          var to = this.get('to')

          if (prev) {
            prev.trigger('unconnect', prev, this, 'from')
            prev.off('destroy', this.destroy)
          }

          if (current) {
            current.trigger('connect', current, this, 'from')
            current.on('destroy', this.destroy, this)
          }

          if (to) {
            to.trigger('reconnect', to, this, current, prev, 'to')
          }
        },
        this
      )

      this.on(
        'change:to',
        (m, current) => {
          var prev = this.previous('to')
          var from = this.get('from')

          if (prev) {
            prev.trigger('unconnect', prev, this, 'to')
            prev.off('destroy', this.destroy)
          }

          if (current) {
            current.trigger('connect', current, this, 'to')
            current.on('destroy', this.destroy, this)
          }

          if (from) {
            from.trigger('reconnect', from, this, current, prev, 'from')
          }
        },
        this
      )

      this.on(
        'remove',
        () => {
          var from = this.get('from')
          var to = this.get('to')

          if (from) {
            from.trigger('unconnect', from, this, 'from')
          }

          if (to) {
            to.trigger('unconnect', to, this, 'to')
          }
        },
        this
      )
    },

    isDefault: function() {
      return !!this.get('isDefault')
    },

    isValid: function() {
      return !this.get('condition') || isValid(this.get('condition'))
    },
  }),
  'Transition'
)



// WEBPACK FOOTER //
// ./src/processes/models/Transition.js
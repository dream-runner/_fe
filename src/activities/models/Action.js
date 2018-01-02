import UniqueModel from 'uniquemodel'
import { some, keys, includes, isFunction } from 'lodash'

import Activity from './Activity'

module.exports = UniqueModel(
  Activity.extend({
    referencesVariable(variable) {
      if (this.get('inputs')) {
        const inputs = isFunction(this.get('inputs').toJSON)
          ? this.get('inputs').toJSON()
          : this.get('inputs')
        const mapsVariableAsInput = includes(keys(inputs), variable.id)

        if (mapsVariableAsInput) {
          return true
        }
      }

      if (this.get('variables')) {
        const mapsToGlobalVariable = some(
          this.get('variables'),
          localVariable => localVariable.targetCollectionId === variable.id
        )

        if (mapsToGlobalVariable) {
          return true
        }
      }

      return false
    },
  }),
  'Action'
)



// WEBPACK FOOTER //
// ./src/activities/models/Action.js
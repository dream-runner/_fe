import { keys, includes } from 'lodash'
import ProcessConstituentCollection from 'processes/collections/ProcessConstituentCollection'
import CaseColumn from 'processes/models/CaseColumn'
import Binding from 'processes/models/Binding'

import { supportedTypes } from '../../../packages/fields'

module.exports = ProcessConstituentCollection.extend({
  model: CaseColumn,

  initialize: function() {
    this.on('attach', (model, process) =>
      process.on('publish', this._handlePublish, this)
    )
    this.on('detach', (model, process) =>
      process.off('publish', this._handlePublish, this)
    )

    return ProcessConstituentCollection.prototype.initialize.apply(
      this,
      arguments
    )
  },

  _handlePublish: function(process) {
    // append columns for new variables
    var columnsToAdd = process
      .get('variables')
      .filter(variable => {
        const type = variable.get('type').isList()
          ? variable.get('type').get('elementType').get('name')
          : variable.get('type').get('name')

        return (
          includes(supportedTypes, type) &&
          !process.get('caseColumns').some(column => {
            return (
              column.get('binding') &&
              column.get('binding').get('variable') === variable
            )
          })
        )
      })
      .map(variable => {
        return new CaseColumn({
          binding: { variable: variable },
        })
      })

    this.add(columnsToAdd)

    if (columnsToAdd.length > 0) {
      // ensure that the process' _saveOutstanding flag is set, so that another save will
      // be dispatched before creating the new version
      process.debouncedSave()
    }
  },
})



// WEBPACK FOOTER //
// ./src/processes/collections/CaseColumnCollection.js
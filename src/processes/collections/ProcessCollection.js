import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Process from 'processes/models/Process'
import _ from 'underscore'
import $ from 'jquery'

/**
     * A collection of Processes
     */
var ProcessCollection = BaseCollection.extend(
  {
    urlRoot: function() {
      return Effektif.makeUrl('workflows')
    },

    model: Process,
  },
  {
    importBPMN: function(file) {
      var col = new ProcessCollection()
      var url = _.result(col, 'url')
      $.ajax({
        type: 'POST',
        url: url + '/import/bpmn/' + file.id,
        success: function(json, status, xhr) {
          col.set(json.editorWorkflow)
          col.trigger('sync', col, json, { xhr: xhr })
        },
        error: function(xhr) {
          col.trigger('error', col, xhr.responseJSON, { xhr: xhr })
        },
      })
      return col
    },
  }
)

module.exports = ProcessCollection



// WEBPACK FOOTER //
// ./src/processes/collections/ProcessCollection.js
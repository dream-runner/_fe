import { extend, values, includes } from 'lodash'
import $ from 'jquery'
import ProcessConstituent from 'processes/models/ProcessConstituent'

var Script = ProcessConstituent.extend({
  autoAssignId: false,

  defaults: {
    mappings: {},
    script: 'console.log("Hello world!");',
  },

  referencesVariable(variable) {
    return includes(values(this.get('mappings')), variable.id)
  },
})

// a mixin for the Activity model
// adds the methods that are specific to javascript type
module.exports = {
  embeddings: {
    script: Script,
  },

  defaults: {
    script: {},
    testValues: {},
  },

  testScript: function(resultCb) {
    var doTest = function() {
      // take snapshot of test values at the time the test is started
      var varMappingsSnapshot = this.get('script').get('mappings')
      var testValuesSnapshot = this.get('testValues')

      $.post(this.getTestUrl(), res => {
        resultCb(
          extend({ log: '', variableUpdates: {} }, res, {
            mappings: varMappingsSnapshot,
            testValues: testValuesSnapshot,
            date: new Date(),
          })
        )
      }).fail(res => {
        resultCb({
          error: res.statusText,
          mappings: varMappingsSnapshot,
          testValues: testValuesSnapshot,
          date: new Date(),
        })
      })
    }.bind(this)

    var process = this.getProcess()
    process.ensureSaved()
    if (process.isSyncing) {
      process.once('sync', doTest)
    } else {
      doTest()
    }
  },

  getTestUrl: function() {
    return [this.getProcess().url(), 'activities', this.id, 'test'].join('/')
  },
}



// WEBPACK FOOTER //
// ./src/activities/models/mixins/JavaScriptMixin.js
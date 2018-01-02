import Backbone from 'backbone-rel-partialput'
import UniqueModel from 'uniquemodel'
import _ from 'underscore'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import ActivityTypeCollection from 'activities/collections/ActivityTypeCollection'
import AccountCollection from 'services/collections/AccountCollection'

module.exports = UniqueModel(
  BaseModel.extend({
    urlRoot: function() {
      return Effektif.makeUrl('services')
    },

    embeddings: {
      actionTypes: ActivityTypeCollection,
      triggerTypes: ActivityTypeCollection,
      accounts: AccountCollection,
    },

    defaults: {
      actionTypes: [],
      triggerTypes: [],
      accounts: [],
    },

    idAttribute: 'key',

    oauth: function(path, accountId, successCb) {
      Backbone.ajax({
        type: 'POST',
        url: _.result(this, 'urlRoot') + '/oauth/start',
        contentType: 'application/json',
        data: JSON.stringify({
          path: path,
          serviceKey: this.get('key'),
          accountId: accountId,
        }),
        success: function(resp) {
          if (successCb) {
            successCb(resp)
          }
        }.bind(this),
        error: function() {
          throw new Error("Could not start oauth for '" + this.get('key') + "'")
        }.bind(this),
      })
    },

    isExternal: function() {
      return !_.includes(['effektif', 'bpmn-flow'], this.get('key'))
    },
  }),
  'Service'
)



// WEBPACK FOOTER //
// ./src/services/models/Service.js
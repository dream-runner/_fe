import _ from 'underscore'
import mapObject from 'fbjs/lib/mapObject'
import i18n from 'i18n'
import ActivityType from 'activities/models/ActivityType'
import ProcessConstituent from 'processes/models/ProcessConstituent'
import Variable from 'processes/models/Variable'

var SERVICE_ACTION_TYPES = [
  'changeState',
  'googleDriveCreateFolder',
  'googleCloudPrint',
  'googleDriveAddRow',
  'boxFileUpload',
  'boxAddFolder',
  'salesforceCreateLead',
  'salesforceCreateContact',
  'salesforceCreateAccount',
  'salesforceEditOpportunity',
]

/**
     * TODO Activity is the abstract base class for Action and Trigger
     *
     *
     * An Activity defines an atomic piece of work within a process
     *
     *
     * The following custom events are triggered on activity instances:
     *  - "connect" (activity, transition, ["from"|"to"]) When a transition is connected to the activity
     *  - "unconnect" (activity, transition, ["from"|"to"]) When a transition is unconnected from the activity
     *  - "reconnect" (activity, transition, otherActivity, otherActivityPrevious, ["from"|"to"]) When the connection
     * on the end of a transition connected to the activity is changed. "reconnect" is more of a theoretical event:
     * It will actually never be triggered, as the editor bridge, as it is now, always only deletes and creates transitions
     *
     *
     * The target ["from"|"to"] argument is related to the the `activity` argument, i.e., a value of "to" means
     * that the activity is (or has been) the "to" reference of the transition.
     */
module.exports = ProcessConstituent.extend({
  idAttribute: 'id',

  partialAttributesCore: ['id', 'type'],

  references: {
    type: ActivityType, // `type` value will be built dynamically in the `parse` function by concatenating the
    // original `type` value and the `descriptorId`
  },

  constructor: function() {
    this.on('attach', this.autoBind, this)
    return ProcessConstituent.prototype.constructor.apply(this, arguments)
  },

  referenceAttributeName: function(key) {
    if (key === 'type') {
      return 'type'
    }

    if (
      this.get('type') &&
      this.get('type').get('isCore') &&
      !!this.get('type').get('outputDescriptors').get(key)
    ) {
      // the key corresponds to an ouput variable reference
      return key // do not use "Id" suffix
    }

    return ProcessConstituent.prototype.referenceAttributeName.apply(
      this,
      arguments
    )
  },

  mixinSupportedMethods: ['initialize', 'initListeners'],

  defaults: {
    name: '',
  },

  initListeners: function() {
    _.each(
      this._mixins,
      mixin => {
        if (!mixin.initListeners) {
          return
        }
        mixin.initListeners.apply(this)
      },
      this
    )
  },

  // When setting the type of the Activity, request
  // from the ActivityType the mixins to use for this instance
  prepareForSet: function(attrs) {
    let { type: activityType } = attrs

    if (activityType) {
      if (!(activityType instanceof ActivityType)) {
        if (_.isString(activityType)) {
          activityType = { id: activityType }
        }
        activityType = new ActivityType(activityType)
      }
      this.mixin(activityType.getMixins())
    }
  },

  // Automatically bind inputs/outputs for parameters with an autoBindKey
  autoBind: function() {
    var variables = this.getProcess().get('variables')

    // auto bind outputs
    var bindingSetTarget = this.get('type').get('isCore')
      ? this
      : this.get('outputs')
    this.get('type').get('outputDescriptors').each(param => {
      if (!!bindingSetTarget.get(param.get('key'))) {
        return //only bind non-bound parameters
      }
      var autoBindKey = param.get('autoBindKey')
      // if(!autoBindKey || this.get(param.get("key"))) return;

      var matchingVar =
        autoBindKey && variables.findWhere({ autoBindKey: autoBindKey })
      if (!matchingVar) {
        // create a new variable with the autoBindKey for an output if there is no matching yet
        matchingVar = new Variable({
          type: param.get('type').copy(),
          name: param.get('name'),
          autoBindKey: autoBindKey,
        })
        variables.add(matchingVar)
      }

      bindingSetTarget.set(param.get('key'), matchingVar)
    }, this)

    // auto bind inputs
    bindingSetTarget = this.get('type').get('isCore')
      ? this
      : this.get('inputs')
    this.get('type').get('inputDescriptors').each(param => {
      var autoBindKey = param.get('autoBindKey')
      if (!autoBindKey || this.get(param.get('key'))) return

      var matchingVar = variables.findWhere({ autoBindKey: autoBindKey })
      if (matchingVar) {
        bindingSetTarget.set(param.get('key'), {
          variable: matchingVar,
          fields: [],
        })
      } else {
        // no matching variable existing, watch the vars collection and
        // try if new variables can be used

        var handleVarAdded = newVar => {
          if (newVar.get('autoBindKey') === autoBindKey) {
            bindingSetTarget.set(param.get('key'), {
              variable: newVar,
              fields: [],
            })
          }
        }
        variables.on('add', this.autoBind, this)
        this.once('change:' + param.get('key'), () => {
          variables.off('add', handleVarAdded)
        })
      }
    }, this)
  },

  getInput: function(inputKey) {
    var inputHost = this.get('type').get('isCore') ? this : this.get('inputs')
    return inputHost.get(inputKey)
  },

  getOutput: function(outputKey) {
    var outputHost = this.get('type').get('isCore') ? this : this.get('outputs')
    return outputHost.get(outputKey)
  },

  // return all bindables for the output variables of this activity
  getBindables: function() {
    var bindables = []
    this.get('type').get('outputDescriptors').each(param => {
      var variable = this.getOutput(param.get('key'))
      if (!variable) return

      bindables = bindables.concat(variable.getBindables())
    }, this)
    return bindables
  },

  getActivities: function(source, target, type) {
    if (_.isString(type)) {
      type = new ActivityType({ id: type })
    }

    var activities = _.map(this.getTransitions(source), transition => {
      return transition.get(target)
    })

    if (!type) {
      return activities
    }

    return _.filter(activities, activity => {
      if (!activity) {
        return false
      }

      return activity.get('type') === type
    })
  },

  getPreviousActivities: function(type) {
    return this.getActivities('to', 'from', type)
  },

  getNextActivities: function(type) {
    return this.getActivities('from', 'to', type)
  },

  getName: function() {
    return (
      this.get('name') ||
      (this.collection
        ? i18n('Unnamed __typeName__ #__index__', {
            typeName: this.get('type').get('name'),
            index: this.getUnnamedIndex(),
          })
        : i18n('Unnamed __typeName__', {
            typeName: this.get('type').get('name'),
          }))
    )
  },

  getUnnamedIndex: function() {
    if (this.get('name') || !this.collection) {
      return null
    }

    var type = this.get('type')
    var sameTypeUnnamed = this.collection.filter(activity => {
      return activity.get('type') === type && !activity.get('name')
    })

    return sameTypeUnnamed.indexOf(this) + 1
  },

  getVariables: function() {
    return this.getProcess() && this.getProcess().get('variables')
  },

  getTransitions: function(target) {
    var process = this.getProcess()

    if (!process) {
      return []
    }

    var activity = this
    target = target || 'from'

    var transitions = process.get('transitions')
      ? process.get('transitions').filter(transition => {
          return transition.get(target) === activity
        })
      : []

    return _.sortBy(transitions, transition => {
      return transition.id
    })
  },

  toJSON: function() {
    var json = ProcessConstituent.prototype.toJSON.apply(this, arguments)
    json.type = this.get('type').get('key')
    json.descriptorId = this.get('type').get('descriptorId')

    // TODO: This is a hacky fix for a miscommunicated API
    if (json.inputs) {
      json.inputs = mapObject(json.inputs, (val, key) => {
        if (_.isArray(val)) {
          return { bindings: val }
        } else if (val && val.binding) {
          return val
        }
        return { binding: val }
      })
    }

    return json
  },

  parse: function() {
    var attrs = ProcessConstituent.prototype.parse.apply(this, arguments)
    if (attrs.type) {
      attrs.type = _.compact([
        attrs.type.split('_')[0],
        attrs.descriptorId,
      ]).join('_')
    }

    // TODO: This is a hacky fix for a miscommunicated API
    if (attrs.inputs) {
      attrs.inputs = mapObject(
        attrs.inputs,
        val => val.binding || val.bindings || val
      )
    }

    return attrs
  },
})



// WEBPACK FOOTER //
// ./src/activities/models/Activity.js
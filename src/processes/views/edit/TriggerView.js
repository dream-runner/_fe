import PropTypes from 'prop-types'
import React from 'react'

import createReactClass from 'create-react-class'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'

import Process from 'processes/models/Process'
import Trigger from 'activities/models/Trigger'

import TriggerSelection from './TriggerSelection'
import TriggerConfiguration from './TriggerConfigurationView'

module.exports = createReactClass({
  displayName: 'ProcessEditTriggerView',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Process).isRequired,
  },

  render: function() {
    var showSelection = false
    var trigger = this.props.model.get('trigger')
    if (!trigger || trigger.get('type').get('key') === 'manual') {
      showSelection = true
    }

    return (
      <div className="application-triggers">
        {showSelection
          ? this.renderTriggerSelection()
          : this.renderTriggerConfiguration()}
      </div>
    )
  },

  renderTriggerSelection: function() {
    return <TriggerSelection {...this.props} onSelect={this.setTrigger} />
  },

  renderTriggerConfiguration: function() {
    return (
      <TriggerConfiguration
        {...this.props}
        model={this.props.model.get('trigger')}
        variableCollection={this.props.model.get('variables')}
        onRemove={this.removeTrigger}
      />
    )
  },

  removeTrigger: function() {
    this.props.model.set('trigger', null)
    this.props.model.save()
  },

  setTrigger: function(triggerType) {
    var trigger = new Trigger({ type: triggerType })
    this.props.model.set('trigger', trigger)
    this.props.model.save()
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/TriggerView.js
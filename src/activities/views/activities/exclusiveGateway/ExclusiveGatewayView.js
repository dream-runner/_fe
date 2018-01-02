import i18n from 'signavio-i18n'
import React from 'react'

import createReactClass from 'create-react-class'

import { BaseMixin } from 'commons-mixins'
import {
  Hint,
  UserGuideLink,
  RadioGroup,
  RadioOption,
} from 'commons-components'

import ReactToTransitionsMixin from '../../mixins/ReactToTransitionsMixin'

import Manual from './Manual'
import ExclusiveGatewayAutomaticView from './ExclusiveGatewayAutomaticView'

module.exports = createReactClass({
  displayName: 'ExclusiveGatewayView',

  mixins: [BaseMixin, ReactToTransitionsMixin],

  render: function() {
    return (
      <div className="activity-configuration gateway">
        {this.renderContent()}
      </div>
    )
  },

  renderContent: function() {
    if (!this.props.model.isMerging() && !this.props.model.isForking()) {
      return (
        <Hint>
          {this.renderBadConnectionsMessage()}
          {' '}
          <UserGuideLink chapter="control-flow" section="exclusive-gateway">
            {i18n('Learn more')}
          </UserGuideLink>
        </Hint>
      )
    }

    if (this.props.model.isMerging() && !this.props.model.isForking()) {
      return (
        <Hint>
          {i18n(
            'This gateway joins different sequence flows. Every execution ' +
              'that arrives at this gateway through any of the incoming transitions ' +
              'will continue along the path of the outgoing transition.'
          )}
          {' '}
          <UserGuideLink chapter="control-flow" section="exclusive-gateway">
            {i18n('Learn more')}
          </UserGuideLink>
        </Hint>
      )
    }

    if (
      !this.props.model.isManualPossible() &&
      !this.props.model.isAutoPossible()
    ) {
      return (
        <Hint>
          {i18n(
            'There are two kinds of decisions: manual decision and automatic ones. ' +
              'At the moment neither of both can be configured, but you can fix this: \n\n' +
              'If you want to have a manual decision, connect a user task to this gateway using a transition. ' +
              'For an automatic decision, make sure that your process has form fields or other data that can be ' +
              'used for formulating conditions.'
          )}
          {' '}
          <UserGuideLink chapter="control-flow" section="exclusive-gateway">
            {i18n('Learn more')}
          </UserGuideLink>
        </Hint>
      )
    }

    return this.renderDecisionMaker()
  },

  renderBadConnectionsMessage: function() {
    var previous = this.props.model.getPreviousActivities()
    var next = this.props.model.getNextActivities()

    if (previous.length === 0 && next.length === 0) {
      return i18n(
        'There are neither incoming nor outgoing sequence ' +
          'flows connected to this gateway. Add transitions ' +
          'to other elements in this process to continue.'
      )
    }

    if (previous.length > 0 && next.length === 0) {
      return i18n(
        'This gateway has no outgoing sequence flows. ' +
          'Connect this gateway to the next elements in ' +
          'your process to continue.'
      )
    }

    if (next.length > 0 && previous.length === 0) {
      return i18n(
        'There is no incoming sequence flow defined ' +
          'for this gateway. Set this gateway as the ' +
          'target of the last step in your process to ' +
          'continue.'
      )
    }

    if (previous.length === 1 && next.length === 1) {
      return i18n(
        'This gateway neither joins different ' +
          'sequence flows nor does it branch. Connect ' +
          'it to more activities or remove it alltogether.'
      )
    }
  },

  renderDecisionMaker: function() {
    return (
      <div className="row">
        <div className="col-xs-3">
          {this.renderChoice()}
        </div>
        <div className="col-xs-9">
          {this.renderConfiguration()}
        </div>
      </div>
    )
  },

  renderConfiguration: function() {
    if (this.props.model.isManualDecision()) {
      return (
        <Manual
          readOnly={this.props.readOnly}
          model={this.props.model}
          variableCollection={this.props.variableCollection}
        />
      )
    }

    return (
      <ExclusiveGatewayAutomaticView
        readOnly={this.props.readOnly}
        model={this.props.model}
        variableCollection={this.props.variableCollection}
      />
    )
  },

  renderChoice: function() {
    var type = this.props.model.isManualDecision() ? 'manual' : 'auto'
    return (
      <div className="decision-type">
        <h3>
          {i18n('Decision Type')}
        </h3>
        <RadioGroup
          readOnly={this.props.readOnly}
          value={type}
          onChange={this.handleDecisionTypeChange}
        >
          <RadioOption
            disabled={!this.props.model.isManualPossible()}
            value="manual"
            hint={i18n(
              'As this gateway is not preceded by a user task ' +
                'a manual decision is not possible.'
            )}
          >
            {i18n('Manual')}
          </RadioOption>
          <RadioOption
            disabled={!this.props.model.isAutoPossible()}
            value="auto"
            hint={i18n(
              'As there are no fields in this process yet it is not ' +
                'possible to formulate conditions for an automatic decision.'
            )}
          >
            {i18n('Automatic')}
          </RadioOption>
        </RadioGroup>
      </div>
    )
  },

  handleDecisionTypeChange: function(newType) {
    if (newType === 'manual') {
      this.props.model.switchToManual()
    } else {
      this.props.model.switchToAuto()
    }
    this.props.model.save()
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/exclusiveGateway/ExclusiveGatewayView.js
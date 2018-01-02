import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import _ from 'underscore'
import { includes } from 'lodash'

import { BaseMixin } from 'commons-mixins'

import { bindingUtils } from '../../../../../packages/fields'

import ReactToTransitionsMixin from 'activities/views/mixins/ReactToTransitionsMixin'

import { ContextHelp, Icon } from 'commons-components'

import ConditionEditor from './ConditionEditor'

module.exports = createReactClass({
  displayName: 'ExclusiveGatewayAutomaticView',

  mixins: [BaseMixin, ReactToTransitionsMixin],

  render: function() {
    var outgoing = _.filter(this.props.model.getTransitions(), function(
      transition
    ) {
      return transition.get('to')
    })

    return (
      <div className="editor auto">
        <h3>
          {i18n('Automatic decision')}
        </h3>
        <div>
          {i18n(
            'Configure the conditions for each of the outgoing transitions. '
          )}
          <ContextHelp
            chapter="control-flow"
            userGuideSection="automatic-decision"
          >
            {i18n(
              'Formulate conditional expressions by comparing values of fields. ' +
                'The transition’s conditions will be evaluated in order from top to bottom. ' +
                'The workflow will follow the first transition with a condition that is true, using the the current case’s field values. \n\n' +
                'You can also specify a default transition to be taken if none of the specified conditions is true.'
            )}
          </ContextHelp>
        </div>
        {_.map(outgoing, this.renderTransition)}
      </div>
    )
  },

  renderTransition: function(transition) {
    var isDefault = this.props.model.get('defaultTransition') === transition
    var activity = transition.get('to')
    var name = activity.get('name') || i18n('Action')

    return (
      <div className="transition clearfix" key={transition.cid}>
        <h5>
          <span>
            {i18n('Continue with __activity__', {
              activity: (
                <span className="task-name">
                  <Icon icon={activity.get('type').getIcon()} />
                  {activity.getName()}
                </span>
              ),
            })}
          </span>
        </h5>

        {this.renderDefaultIndicator(transition)}
        <ConditionEditor
          {...transition.get('condition') || {}}
          filterBindables={this.filterBindables}
          isDefault={this.props.model.get('defaultTransition') === transition}
          onChange={newCondition =>
            this.handleConditionChange(transition, newCondition)}
          onSetDefault={() => this.setDefault(transition)}
          onUnsetDefault={this.unsetDefault}
          readOnly={this.props.readOnly}
        />
      </div>
    )
  },

  filterBindables: function(bindable, dataTypeDescriptors, variables) {
    const bindableType = bindingUtils.getType(
      dataTypeDescriptors,
      variables,
      bindable
    )
    return !includes(['caseId', 'oid'], bindableType.name)
  },

  renderDefaultIndicator: function(transition) {
    if (this.props.model.get('defaultTransition') !== transition) {
      return
    }

    return (
      <div className="default-indicator">
        <Icon iconSet="fontAwesome" blue icon="star-o" />
      </div>
    )
  },

  renderDefaultTransition: function(transition) {
    var task = transition.get('to')
    var name = task.get('name') || i18n('Task')

    return (
      <div className="transition" key={transition.cid}>
        <div className="default">
          <div className="task-name">
            <Icon icon={task.get('type').getIcon()} />
            <div className="value" title={name}>{name}</div>
            <span className="default-hint pull-right">
              {i18n('Default')}
            </span>
          </div>
        </div>
      </div>
    )
  },

  handleConditionChange: function(transition, newCondition) {
    if (transition.isValid()) {
      transition.set('condition', newCondition)
      transition.save()
    }
  },

  setDefault: function(transition) {
    this.props.model.set('defaultTransition', transition)
    this.props.model.save()
  },

  unsetDefault: function() {
    if (!this.props.model.get('defaultTransition')) {
      return
    }

    this.props.model.set('defaultTransition', null)
    this.props.model.save()
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/exclusiveGateway/ExclusiveGatewayAutomaticView.js
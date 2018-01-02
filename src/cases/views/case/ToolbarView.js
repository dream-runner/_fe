import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import { Toolbar } from 'commons-components'
import { BaseMixin } from 'commons-mixins'
import { PopoverNew as Popover } from '@signavio/effektif-commons/lib/components'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import DueDate from './DueDateView'
import Actions from './Actions'
import { PrioritySelect, Participants } from '../../../../packages/cases'

module.exports = createReactClass({
  displayName: 'CaseToolbar',

  mixins: [BaseMixin],

  render: function() {
    return (
      <Toolbar left={this.renderParticipants()} right={this.renderCaseInfo()} />
    )
  },

  renderCaseInfo: function() {
    return [
      this.renderNewCaseLink(),
      this.renderPriority(),
      this.renderDueDate(),
      this.renderActions(),
    ]
  },

  renderParticipants: function() {
    var participants = this.props.model.get('participants')

    if (!participants) {
      return
    }

    return (
      <Participants
        participants={participants}
        disabled={this.props.model.get('closed')}
      />
    )
  },

  renderNewCaseLink: function() {
    return (
      <Popover
        popover={
          <div>
            <p>
              {i18n(
                'Test the beta version of our new case view and let us know what you think.'
              )}
            </p>
            <p>
              {i18n('You can switch back to the current layout at any time.')}
            </p>
          </div>
        }
      >
        <TextButton onClick={this.props.onNewLayoutClick} primary>
          {i18n('Try out the new layout!')}
        </TextButton>
      </Popover>
    )
  },

  renderPriority: function(rights) {
    return (
      <PrioritySelect
        readOnly={this.props.readOnly || this.props.model.get('closed')}
        value={this.props.model.get('priority')}
        onChange={this.props.onPrioChange}
      />
    )
  },

  renderActions: function() {
    return (
      <Actions
        readOnly={this.props.readOnly}
        print={this.props.print}
        case={this.props.model.toJSON()}
        onRefresh={this.props.onRefresh}
        onPrint={this.props.onPrint}
        onCancel={this.props.onClose}
        onDelete={this.props.onDelete}
      />
    )
  },

  renderDueDate: function() {
    if (!this.props.model.get('dueDate') && this.props.readOnly) {
      return
    }

    return (
      <Popover popover={i18n('Due date')}>
        <DueDate model={this.props.model} readOnly={this.props.readOnly} />
      </Popover>
    )
  },
})



// WEBPACK FOOTER //
// ./src/cases/views/case/ToolbarView.js
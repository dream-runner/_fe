import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import moment from '@signavio/effektif-commons/lib/extensions/moment'
import { DateUtils } from 'commons-utils'

import { BaseMixin } from 'commons-mixins'
import { DropDown, DueDate } from 'commons-components'
import { TextTile } from 'commons-components/tiles'

module.exports = createReactClass({
  displayName: 'TaskDueDate',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      open: false,
    }
  },

  render: function() {
    const { readOnly, model } = this.props
    return (
      <DropDown
        className="task-due-date"
        open={this.state.open}
        disabled={readOnly}
        toggle={this.renderToggle()}
        toggleIcon="clock"
        onToggle={this.handleToggle}
      >
        <DueDate
          onChange={this.handleDueDateChange}
          value={model.get('dueDate')}
        />
      </DropDown>
    )
  },

  handleToggle: function(isOpen) {
    this.setState({
      open: isOpen,
    })
  },

  handleDueDateChange: function(date) {
    const { model } = this.props

    model.set('dueDate', date)
    model.save()
    this.setState({
      open: false,
    })
  },

  renderToggle: function() {
    const dueDate = this.props.model.get('dueDate')

    if (!dueDate) {
      return (
        <TextTile>
          {i18n('Without due date')}
        </TextTile>
      )
    }

    return (
      <TextTile subtitle={moment(dueDate).format('LLL')}>
        {DateUtils.getDueMessage(dueDate)}
      </TextTile>
    )
  },
})



// WEBPACK FOOTER //
// ./src/tasks/views/DueDateView.js
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { DateUtils } from 'commons-utils'
import { BaseMixin } from 'commons-mixins'
import { DueDate, DropDown } from 'commons-components'

module.exports = createReactClass({
  displayName: 'CaseDueDateView',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      open: false,
    }
  },

  render: function() {
    if (this.props.model.get('closed')) {
      return null
    }

    return (
      <DropDown
        disabled={this.props.readOnly}
        open={this.state.open}
        toggle={this.renderToggle()}
        toggleIcon={this.getToggleIcon()}
        onToggle={this.handleToggle}
        pushRight
        className="case-due-date"
      >
        {this.renderOptions()}
      </DropDown>
    )
  },

  getToggleIcon: function() {
    if (this.props.model.get('dueDate')) {
      return null
    }

    return 'clock'
  },

  renderToggle: function() {
    if (!this.props.model.get('dueDate')) {
      return
    }

    return (
      <button
        className="btn btn-text"
        disabled={this.props.readOnly}
        title={this.getTitle()}
      >
        {DateUtils.getDueMessage(this.props.model.get('dueDate'))}
      </button>
    )
  },

  getTitle: function() {
    var duedate = DateUtils.formatDueDate(this.props.model.get('dueDate'))

    if (duedate) {
      return duedate
    }

    if (this.props.readOnly) {
      return i18n('No due date set')
    }

    return i18n('Click to set a due date for this task')
  },

  renderOptions: function() {
    if (this.props.readOnly || !this.state.open) {
      return
    }

    return (
      <DueDate
        value={this.props.model.get('dueDate')}
        onChange={this.handleDatePickerChange}
      />
    )
  },

  handleDatePickerChange: function(date) {
    this.props.model.set('dueDate', date)
    this.props.model.save()

    this.setState({
      open: false,
    })
  },

  handleToggle: function() {
    this.setState({
      open: !this.state.open,
    })
  },
})



// WEBPACK FOOTER //
// ./src/cases/views/case/DueDateView.js
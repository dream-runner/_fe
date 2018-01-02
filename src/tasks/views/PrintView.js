import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { DateUtils } from 'commons-utils'
import { BaseMixin } from 'commons-mixins'
import { Hint } from 'commons-components'

import { Form } from '../../../packages/forms'

var Print = createReactClass({
  displayName: 'Print',

  mixins: [BaseMixin],

  render: function() {
    return (
      <div className="print-task">
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    )
  },

  renderContent: function() {
    return (
      <div className="print-content">
        {this.renderForm()}
        {this.renderSubtasks()}
      </div>
    )
  },

  renderSubtasks: function() {
    if (this.props.model.get('subtasks').length === 0) {
      return
    }

    return (
      <div className="subtasks">
        <h4>
          {i18n('Subtasks')}
        </h4>

        {this.props.model.get('subtasks').map(task => {
          return <Print model={task} />
        })}
      </div>
    )
  },

  renderForm: function() {
    if (!this.props.model.get('form')) {
      return
    }

    return [
      <h4>
        {i18n('Form')}
      </h4>,
      <Form fields={this.props.model.get('form').get('fields')} readOnly />,
    ]
  },

  renderHeader: function() {
    return (
      <div className="print-header">
        <table className="table table-bordered">
          <thead>
            <th className="status" />
            <th className="name">
              {i18n('Name')}
            </th>
            <th className="assignment">
              {i18n('Assignee')}
            </th>
            <th className="due-date">
              {i18n('Due date')}
            </th>
          </thead>
          <tbody>
            <tr>
              <td>
                {this.renderTaskIcon()}
              </td>
              <td>
                {this.renderName()}
              </td>
              <td>
                {this.renderAssignee()}
              </td>
              <td>
                {this.renderDueDate()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },

  renderName: function() {
    if (!this.props.model.get('name')) {
      return (
        <Hint inline={true}>
          {i18n('Unnamed task')}
        </Hint>
      )
    }

    return this.props.model.get('name')
  },

  renderDueDate: function() {
    if (!this.props.model.get('dueDate')) {
      return (
        <Hint inline={true}>
          {i18n('Without due date')}
        </Hint>
      )
    }

    return DateUtils.getDueMessage(this.props.model.get('dueDate'))
  },

  renderTaskIcon: function() {
    if (this.props.model.get('completed')) {
      return <i className="icon signavio-icon icon-square-check" />
    }

    if (this.props.model.get('canceled')) {
      return <i className="icon signavio-icon icon-cancel" />
    }

    return <i className="icon signavio-icon icon-square" />
  },

  renderAssignee: function() {
    if (!this.props.model.get('assignee')) {
      return (
        <Hint inline={true}>
          {i18n('No assignee')}
        </Hint>
      )
    }

    return this.props.model.get('assignee').name()
  },
})

module.exports = Print



// WEBPACK FOOTER //
// ./src/tasks/views/PrintView.js
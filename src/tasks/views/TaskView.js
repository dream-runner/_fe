import i18n from 'i18n'
import moment from '@signavio/effektif-commons/lib/extensions/moment'
import React from 'react'

import createReactClass from 'create-react-class'

import Login from 'singleton/Login'

import { CSSUtils } from 'commons-utils'
import { BaseMixin } from 'commons-mixins'
import {
  Hint as LegacyHint,
  Divider,
  Markdown,
  InplaceEdit,
} from 'commons-components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextButton } from 'commons-components/buttons'

import {
  isTaskReadOnly,
  isTaskExecutable,
  canUserChangeAssignment,
} from '../utils'
import { Form } from '../../../packages/forms'

import TakeAssignmentButton from './TakeAssignmentButton'
import TaskHeader from './TaskHeaderView'
import TaskList from './list'

/**
 * The main view for a task
 * URL: /task/:cid
 *
 */
module.exports = createReactClass({
  displayName: 'Task',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: false,
      editing: false,
      defaultFields: [],
    }
  },

  componentWillMount: function() {
    this.load()
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.model !== nextProps.model) {
      this.load()
    }
  },

  load: function() {
    this.setState({
      loading: true,
    })

    const { model } = this.props

    model.fetch()
    model.once('sync', () => {
      const form = model.get('form')
      const { fields } = (form && form.toJSON()) || {}

      this.setState({
        loading: false,
        defaultFields: fields,
      })
    })
  },

  render: function() {
    const { model } = this.props
    const user = Login.user()
    const rights = model.getRights(user)

    const cls = CSSUtils.cls({
      task: true,
      'no-blur': !CSSUtils.knows('filter', 'blur(10px)'),
      completed: model.get('completed'),
    })

    return (
      <div className={cls}>
        {this.renderHeader(user)}
        {this.renderContent(rights)}
      </div>
    )
  },

  getHintMessage: function() {
    if (this.state.submitting) {
      if (!this.props.model.get('completed')) {
        return i18n('Reopening this task...')
      }

      return i18n('Completing your task...')
    }

    return i18n('Loading task information...')
  },

  renderHeader: function(user) {
    const { loading, submitting } = this.state

    if (loading) {
      return null
    }

    const { model } = this.props
    const readOnly = isTaskReadOnly(model)
    const canAssign = canUserChangeAssignment(model, user)

    return (
      <TaskHeader
        readOnly={readOnly || submitting || loading}
        disabled={!isTaskExecutable(model)}
        canAssign={canAssign && !submitting && !loading}
        model={model}
      />
    )
  },

  renderContent: function(rights) {
    if (this.state.loading || this.state.submitting) {
      return <Hint loading>{this.getHintMessage()}</Hint>
    }

    const { model } = this.props
    const completed = model.get('completed')

    return (
      <div className="task-content">
        {this.renderRightsHint(Login.user())}
        {this.renderCandidates()}

        {rights.edit && !completed ? (
          <InplaceEdit
            multiLine
            placeholder={i18n('Add a task description')}
            value={model.get('description')}
            onFocus={this.handleDescriptionFocus}
            onBlur={this.handleDescriptionBlur}
          >
            {description => <Markdown>{description}</Markdown>}
          </InplaceEdit>
        ) : (
          <Markdown>{model.get('description')}</Markdown>
        )}

        {this.renderForm()}
        {this.renderSubtasks(rights, completed)}
      </div>
    )
  },

  handleDescriptionFocus: function() {
    this.setState({
      editing: true,
    })
  },

  handleDescriptionBlur: function({ target }) {
    const { model } = this.props

    model.set('description', target.value)
    model.save()
    this.setState({
      editing: false,
    })
  },

  renderSubtasks: function(rights, completed) {
    const user = Login.user()
    const { addingSubtask, addSubtask } = this.state
    const { model } = this.props

    const readOnly = !rights.edit && !model.canCompleteTask(user)

    return (
      <TaskList
        title={i18n('Subtasks')}
        loading={addingSubtask}
        readOnly={readOnly || addSubtask}
        collection={model.get('subtasks')}
        onAdd={this.addSubtask}
        completed={completed}
      />
    )
  },

  addSubtask: function(task) {
    this.trySetState({
      addingSubtask: true,
    })

    this.props.model.createSubtask(
      task,
      function() {
        this.trySetState({
          addingSubtask: false,
        })
      }.bind(this)
    )
  },

  renderForm: function() {
    const user = Login.user()

    const { readOnly, model } = this.props

    const form = model.get('form')

    const { fields } = (form && form.toJSON()) || {}

    return (
      <div className="form-container">
        <Form
          defaultFields={this.state.defaultFields}
          fields={fields}
          taskId={model.id}
          hideDoneButton={!model.showDoneButton(user)}
          onSubmit={this.complete}
          onChange={fields => {
            if (this.formSaveRequest) {
              this.formSaveRequest.abort()
            }

            form.set('fields', fields)
            this.formSaveRequest = model.save(undefined, {
              success: () => {
                this.formSaveRequest = undefined
              },
            })
          }}
          readOnly={
            readOnly || model.get('completed') || !model.canCompleteTask(user)
          }
        />
      </div>
    )
  },

  renderRightsHint: function(user) {
    const task = this.props.model
    if (!task.isPrivate()) {
      return
    }

    if (task.isAssignee(user)) {
      return
    }

    if (!task.isAssignee(user) && canUserChangeAssignment(task, user)) {
      return (
        <LegacyHint>
          {i18n(
            'In order to complete this task you must first assign it to yourself.'
          )}
        </LegacyHint>
      )
    }

    return (
      <LegacyHint>
        {i18n('Sorry, you are not allowed to complete this task.')}
      </LegacyHint>
    )
  },

  complete: function() {
    this.setState({
      submitting: true,
    })

    this.props.model.complete(
      this.handleCompleteSuccess,
      this.handleCompleteError
    )
  },

  handleCompleteSuccess: function() {
    this.trySetState({
      submitting: false,
    })

    this.props.onComplete(this.props.model)
  },

  handleCompleteError: function() {
    this.trySetState({
      submitting: false,
    })
  },

  reopen: function() {
    this.trySetState({
      submitting: true,
    })

    this.props.model.reopen(this.handleReopenDone, this.handleReopenDone)
  },

  handleReopenDone: function() {
    this.trySetState({
      submitting: false,
    })
  },

  renderCandidates: function() {
    const { model } = this.props
    const hasAssignee = !!model.get('assignee')
    const group = model.get('assigneeGroup')
    const candidates = model.get('candidates')
    const completed = model.get('completed')
    const hasNoCandidates = !group && candidates.count === 0

    if (hasAssignee || hasNoCandidates || completed) {
      return
    }

    const user = Login.user()
    return (
      <TakeAssignmentButton
        assigneeGroup={group ? group.toJSON() : null}
        candidates={candidates.items}
        totalCount={candidates.count}
        disabled={!model.canAssign(user)}
        onClick={() => {
          model.assignTo(user)
          model.save()
        }}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/tasks/views/TaskView.js
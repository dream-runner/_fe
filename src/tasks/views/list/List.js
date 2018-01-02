import React from 'react'

import createReactClass from 'create-react-class'

import i18n from 'signavio-i18n'

import { CSSUtils } from '@signavio/effektif-commons/lib/utils'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'

import {
  InputWithButton,
  List,
  Disable,
} from '@signavio/effektif-commons/lib/components'
import { Tile, TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import Task from '../../models/Task'

import Print from '../PrintView'

import ListItem from './Item'

export default createReactClass({
  displayName: 'TaskList',

  mixins: [BaseMixin],
  render() {
    const {
      caze,
      title,
      collection,
      loading,
      print,
      readOnly,
      onAdd,
      completed,
    } = this.props

    const disabledMessage =
      caze != null
        ? i18n('This case is completed, so you cannot add any tasks to it.')
        : i18n('This task is completed, so you cannot add any subtasks to it.')

    return (
      <div className="task-list">
        <h3 className="container-header">{title}</h3>

        {this.renderTasks(collection)}

        {loading && (
          <TextTile icon="square">
            <Hint loading inline>
              {i18n('Adding task...')}
            </Hint>
          </TextTile>
        )}

        {!print && (
          <Tile icon="square" style={{ marginTop: 1 }}>
            <Disable
              hint={
                this.disableInputWithButton(completed, caze)
                  ? disabledMessage
                  : ''
              }
              disabled={this.disableInputWithButton(completed, caze)}
            >
              <InputWithButton
                clearOnSubmit
                border="none"
                onSubmit={value => {
                  const name = value.trim()

                  if (!name) {
                    return
                  }

                  onAdd(new Task({ name }))
                }}
                placeholder={
                  readOnly
                    ? i18n('You are not allowed to add subtasks')
                    : i18n('Add a new task')
                }
                buttonLabel={i18n('Add')}
                readOnly={readOnly}
              />
            </Disable>
          </Tile>
        )}
      </div>
    )
  },

  disableInputWithButton(taskCompleted, caze) {
    if (caze != null) return !!caze.get('closed')
    return !!taskCompleted
  },

  renderTasks(tasks) {
    if (!tasks || tasks.length === 0) {
      return null
    }

    const cls = CSSUtils.cls({
      list: true,
      'list-print': this.props.print,
    })

    return (
      <List className={cls}>{tasks.map(task => this.renderTask(task))}</List>
    )
  },

  renderTask(task) {
    if (this.props.flat) {
      return this.renderItem(task)
    }

    const subtasks = task.get('subtasks')

    if (!subtasks || subtasks.length === 0) {
      return this.renderItem(task)
    }

    return (
      <div className="item" key={task.id}>
        {this.renderItem(task)}

        <div className="subtasks">{this.renderTasks(subtasks)}</div>
      </div>
    )
  },

  renderItem(task) {
    const { print, onComplete } = this.props

    if (print) {
      return <Print key={task.id} model={task} />
    }

    return (
      <ListItem
        key={task.id}
        model={task}
        onComplete={onComplete}
        showDueDate
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/tasks/views/list/List.js
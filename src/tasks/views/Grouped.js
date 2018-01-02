import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from 'i18n'

import { padding } from 'commons-style'
import { Section, List } from 'commons-components'
import { TextTile } from 'commons-components/tiles'
import { User } from 'commons-propTypes'

import checkDueDate from '../../../packages/cases/lib/task/utils/checkDueDate'

import Task from '../propTypes'

export default class Grouped extends Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape(Task)).isRequired,
    renderTask: PropTypes.func.isRequired,

    onExpand: PropTypes.func.isRequired,

    maxEntries: PropTypes.number,
  }

  static defaultProps = {
    maxEntries: 18,
  }

  static contextTypes = {
    user: User.isRequired,
  }

  render() {
    let { tasks, definitions, maxEntries } = this.props
    let groups = this.getGroups(tasks, definitions)
    let bucketSize = Math.ceil(maxEntries / groups.length)

    return (
      <div>
        {groups.map((group, index) =>
          this.renderGroup(group, bucketSize, index)
        )}
      </div>
    )
  }

  getGroups(tasks, definitions) {
    let { user } = this.context

    return definitions
      .map(({ name, id, check }) => ({
        id,
        name,
        tasks: tasks.filter(task => check(task, user)),
      }))
      .filter(group => group.tasks.length > 0)
  }

  renderGroup({ id, name, tasks }, size, index) {
    let { renderTask } = this.props

    let visibleTasks = tasks.slice(0, size)
    let hiddenTasks = tasks.slice(size)

    return (
      <Section
        key={id}
        title={name}
        style={index > 0 ? { marginTop: padding.large } : null}
      >
        <List>
          {visibleTasks.map(task => renderTask(task))}
          {this.renderExpand(id, hiddenTasks.length)}
        </List>
      </Section>
    )
  }

  renderExpand(id, count) {
    if (count === 0) {
      return
    }

    return (
      <TextTile
        icon="expand"
        style={{ ...defaultStyle.expand }}
        onClick={() => this.props.onExpand(id)}
        subtitle={i18n('__count__ task hidden', '__count__ tasks hidden', {
          count,
        })}
      >
        {i18n('Show all tasks')}
      </TextTile>
    )
  }
}

const defaultStyle = {
  expand: {
    marginTop: 1,

    cursor: 'pointer',
  },
}



// WEBPACK FOOTER //
// ./src/tasks/views/Grouped.js
import React from 'react'
import createReactClass from 'create-react-class'
import { map, sortBy, groupBy, chain } from 'lodash'
import i18n from 'signavio-i18n'

import moment from '@signavio/effektif-commons/lib/extensions/moment'
import { padding } from '@signavio/effektif-commons/lib/styles'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import {
  Section,
  List,
  UserGuideLink,
  DocumentTitle,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import Controls from './Controls'
import { Item as ListItem } from './list'

module.exports = createReactClass({
  displayName: 'AllTasks',

  mixins: [BaseMixin],

  getInitialState() {
    return {
      loading: true,
    }
  },

  componentDidMount() {
    this.props.collection.once(
      'sync',
      () => {
        this.setState({
          loading: false,
        })
      },
      this
    )

    this.props.collection.fetch({
      data: this.props.taskFilters,
    })
  },

  componentWillUnmount() {
    this.props.collection.off(null, null, this)
  },

  render() {
    const { controls, filters } = this.props

    return (
      <div className="row all-tasks">
        <DocumentTitle title={i18n('All tasks')} />

        <div className="col-sm-7 col-md-8">{this.renderTasks()}</div>

        <div className="col-sm-5 col-md-4">
          <Controls
            controls={controls}
            filters={filters}
            onFilter={this.handleFilterChange}
          />
        </div>
      </div>
    )
  },

  renderTasks() {
    if (this.state.loading) {
      return <Hint loading>{i18n('Loading available tasks...')}</Hint>
    }

    if (this.props.collection.length === 0) {
      return (
        <div>
          <Hint>{i18n('No tasks available.')}</Hint>
          <Hint>
            {i18n(
              'A **task** is a concrete work item. ' +
                "Tasks can be assigned to keep track of who's doing what.",
              { markdown: true }
            )}{' '}
            <UserGuideLink chapter="tasks">{i18n('Learn more')}</UserGuideLink>
          </Hint>
        </div>
      )
    }

    let processes = this.props.collection.groupBy(task => {
      if (!task.get('case')) {
        return 'adhoc'
      }

      const process = task.get('sourceWorkflow')

      if (!process) {
        return 'adhoc'
      }

      return process.get('name')
    })

    const { adhoc, ...rest } = processes

    processes = chain(rest)
      .keys()
      .sortBy(name => name.toLowerCase())
      .map(key => [processes[key], key])
      .value()

    return (
      <div className="task-list">
        {adhoc &&
          adhoc.length > 0 && (
            <Section title={i18n('Tasks without process')} className="adhoc">
              <List>{adhoc.map(this.renderTask)}</List>
            </Section>
          )}

        {processes.map((args, index) =>
          this.renderProcess(...args.concat([index]))
        )}
      </div>
    )
  },

  renderProcess(tasks, name, index) {
    tasks = sortBy(tasks, task => -1 * moment(task.get('lastUpdated')))

    tasks = groupBy(tasks, task => {
      if (task.get('dueDate')) {
        return 'dueDate'
      }

      return 'regular'
    })

    return (
      <Section
        key={`${name}.${index}`}
        title={name}
        style={index > 0 ? { marginTop: padding.large } : null}
      >
        <List>
          {map(tasks.dueDate, this.renderTask)}
          {map(tasks.regular, this.renderTask)}
        </List>
      </Section>
    )
  },

  renderTask(task) {
    return (
      <ListItem
        key={task.id}
        showDueDate
        model={task}
        subtitle={task.get('case').get('name')}
      />
    )
  },

  handleFilterChange(query) {
    this.update(query)

    this.props.onFilter(query)
  },

  showLoading() {
    this.setState({
      loading: true,
    })
  },

  update(query) {
    this.showLoading()

    this.props.collection.once(
      'sync',
      () => {
        this.setState({
          loading: false,
        })
      },
      this
    )

    this.props.collection.fetch({
      data: query,
      reset: true,
    })
  },
})



// WEBPACK FOOTER //
// ./src/tasks/views/AllTasks.js
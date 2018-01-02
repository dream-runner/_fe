import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import _ from 'underscore'

import Router from 'singleton/Router'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'

import { Item as ListItem } from './list'
import Grouped from './Grouped'

import { categories as dueDateCategories } from './filters/DueDate'
import { personal as personalInvolvement } from './filters/Involvement'

import {
  Hint as LegacyHint,
  UserGuideLink,
  DocumentTitle,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

const MAX_ENTRIES_PER_COLUMN = 18

module.exports = createReactClass({
  displayName: 'Inbox',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: true,
    }
  },

  componentWillMount: function() {
    this.initFilters()
  },

  initFilters: function() {
    this.setState({
      loading: true,
    })

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
      data: {
        involvement: ['assignedToMe', 'imaCandidate', 'iStarted'],
        completed: false,
      },
    })
  },

  render: function() {
    if (this.state.loading) {
      return <Hint loading>{i18n('Loading your tasks...')}</Hint>
    }

    if (this.props.collection.length === 0) {
      return this.renderNoTasks()
    }

    let { dueDate, regular } = this.props.collection.groupBy(task => {
      if (task.get('dueDate')) {
        return 'dueDate'
      }

      return 'regular'
    })

    return (
      <div className="inbox task-list">
        <DocumentTitle title={i18n('Task inbox')} />

        {this.renderGrouped(dueDate, regular)}
      </div>
    )
  },

  renderNoTasks: function() {
    return (
      <div>
        <DocumentTitle title={i18n('Task inbox')} />

        <LegacyHint>{i18n('Cool! No work to do for you :)')}</LegacyHint>
        <LegacyHint>
          {i18n(
            'A **task** is a concrete work item. ' +
              "Tasks can be assigned to keep track of who's doing what.",
            { markdown: true }
          )}{' '}
          <UserGuideLink chapter="tasks">{i18n('Learn more')}</UserGuideLink>
        </LegacyHint>
      </div>
    )
  },

  renderGrouped: function(duedate, regular) {
    if (!duedate || duedate.length === 0) {
      return this.renderRegular(regular, MAX_ENTRIES_PER_COLUMN)
    }

    if (!regular || regular.length === 0) {
      return this.renderDueDate(duedate, MAX_ENTRIES_PER_COLUMN)
    }

    return (
      <div className="row">
        <div className="col-md-6">
          {this.renderDueDate(duedate, MAX_ENTRIES_PER_COLUMN)}
        </div>
        <div className="col-md-6">
          {this.renderRegular(regular, MAX_ENTRIES_PER_COLUMN)}
        </div>
      </div>
    )
  },

  renderDueDate: function(tasks, maxEntries) {
    return (
      <Grouped
        tasks={tasks}
        definitions={dueDateCategories()}
        renderTask={task => this.renderTask(task)}
        onExpand={group => this.handleExpand('dueDate', group)}
      />
    )
  },

  renderRegular: function(tasks, maxEntries) {
    return (
      <Grouped
        tasks={tasks}
        definitions={personalInvolvement()}
        renderTask={task => this.renderTask(task)}
        onExpand={group => this.handleExpand('involvement', group)}
      />
    )
  },

  renderTask: function(task) {
    return (
      <ListItem
        showDueDate
        key={task.id}
        subtitle={task.get('case').get('name')}
        model={task}
      />
    )
  },

  handleExpand: function(key, value) {
    this.props.onExpand({ [key]: [value] })
  },

  openTask: function(task) {
    Router.navigate(Router.reverse('task', { id: task.id }), { trigger: true })
  },
})



// WEBPACK FOOTER //
// ./src/tasks/views/Inbox.js
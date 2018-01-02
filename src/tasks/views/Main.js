// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'
import { isArray } from 'lodash'

import Router from 'singleton/Router'
import {
  connect as apiConnect,
  types,
  withUserPreferences,
  withUser,
} from '@signavio/effektif-api'
import { padding } from '@signavio/effektif-commons/lib/styles'
import { Tab, TabBar } from '@signavio/effektif-commons/lib/components'

import AllTasks from './AllTasks'
import Inbox from './Inbox'

const getFilters = userPreferences => {
  if (userPreferences.taskFilters && !isArray(userPreferences.taskFilters)) {
    return userPreferences.taskFilters
  }

  if (
    userPreferences.taskFilterIds &&
    userPreferences.taskFilterIds.length > 0
  ) {
    return {
      involvement: userPreferences.taskFilterIds,
    }
  }

  return {}
}

type ApiPropsT = {
  collection: any,
  processes: any,
  tab: string,
}

type PropsT = {
  onExpand: (filters: Object) => void,
  onFilter: (filters: Object) => void,
  onTabAllClick: () => void,
  onTabInboxClick: () => void,
  onSaveUserPreferences: (prefernce: Object) => void,
  updatePreferences: (userPreferences: Object) => void,
  userPreferences: Object,
} & ApiPropsT

function Tasks({
  collection,
  onExpand,
  onFilter,
  onTabAllClick,
  onTabInboxClick,
  processes,
  tab,
  userPreferences,
}: PropsT) {
  return (
    <div className="view tasks">
      <div className="view-header">
        <h2>{i18n('Tasks')}</h2>

        <TabBar style={{ marginTop: padding.large }}>
          <a href={Router.reverse('tasks', { tab: 'inbox' })}>
            <Tab active={tab === 'inbox'} onClick={onTabInboxClick}>
              {i18n('Inbox')}
            </Tab>
          </a>
          <a href={Router.reverse('tasks', { tab: 'all' })}>
            <Tab active={tab === 'all'} onClick={onTabAllClick}>
              {i18n('All tasks')}
            </Tab>
          </a>
        </TabBar>
      </div>

      <div className="view-content">
        {tab === 'inbox' ? (
          <Inbox collection={collection} onExpand={onExpand} />
        ) : (
          <AllTasks
            processes={processes}
            collection={collection}
            filters={getFilters(userPreferences)}
            onFilter={onFilter}
            taskFilters={userPreferences.taskFilters}
          />
        )}
      </div>
    </div>
  )
}

export default compose(
  withUser,
  withUserPreferences,
  apiConnect(({ user }) => ({
    updatePreferences: {
      id: user.id,
      type: types.USER_PREFERENCE,
      method: 'update',
    },
  })),
  withHandlers({
    onSaveUserPreferences: ({ updatePreferences, userPreferences }: PropsT) => (
      preference: Object
    ) => {
      updatePreferences({
        ...userPreferences,
        ...preference,
      })
    },
  }),
  withHandlers({
    onExpand: ({ onSaveUserPreferences }: PropsT) => (filters: Object) => {
      onSaveUserPreferences({
        taskFilters: filters,
        tasksTab: 'all',
      })

      const url = Router.reverse('tasks', { tab: 'all' })
      Router.navigate(url, { trigger: true })
    },
    onFilter: ({ onSaveUserPreferences }: PropsT) => (filters: Object) => {
      onSaveUserPreferences({ taskFilters: filters })
    },
    onTabAllClick: ({ onSaveUserPreferences }: PropsT) => () => {
      onSaveUserPreferences({ tasksTab: 'all' })
    },
    onTabInboxClick: ({ onSaveUserPreferences }: PropsT) => () => {
      onSaveUserPreferences({ tasksTab: 'inbox' })
    },
  })
)(Tasks)



// WEBPACK FOOTER //
// ./src/tasks/views/Main.js
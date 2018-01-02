// @flow

import React from 'react'
import { keys, groupBy, find, isEmpty as _isEmpty } from 'lodash'
import { compose, mapProps, withHandlers, withState } from 'recompose'
import $ from 'jquery'
import {
  connect,
  types,
  withUser,
  withOrganization,
} from '@signavio/effektif-api'
import i18n from 'signavio-i18n'
import {
  ELearningLink,
  Hint,
  NewInfiniteScroll as InfiniteScroll,
  Paginated as paginated,
  UserGuideLink,
  Disable,
  DocumentTitle,
} from '@signavio/effektif-commons/lib/components'

import Effektif from '../../singleton/Effektif'

import type { CompactProcessT, PreferencesT, WorkflowFiltersT } from '../types'

import ActionsMenu from './ActionsMenu'
import ProcessGroup from './ProcessGroup'
import { Controls } from './filters'

type GroupsT = {
  [name: string]: Array<CompactProcessT>,
}

type PropsT = {
  fetchUserPreferences: {
    fulfilled: boolean,
    value: PreferencesT,
  },
  updateUserPreferences: {
    fulfilled: boolean,
  },
  processes: Array<CompactProcessT>,

  onImport: () => void,
  onFetchProcesses: () => void,
  onFilter: (query: WorkflowFiltersT) => void,

  isEmpty: boolean,
  isEmptyFilter: boolean,
  isLoading: boolean,
  isLoaded: boolean,

  page: number,
}

const GROUPS = {
  '^[a-z]+.*': 'alpha',
  '^[\\W\\_0-9]+.*|^$': 'numeric',
}

const pageSize = 25

function ProcessList({
  fetchUserPreferences,
  processes,
  isEmpty,
  isEmptyFilter,
  isLoaded,
  isLoading,
  page,
  organization,
  onFetchProcesses,
  onFilter,
  onImport,
  updateUserPreferences,
}: PropsT) {
  const { numeric = [], alpha = [] } = groupBy(
    processes,
    (proc: CompactProcessT) => findGroup(proc.name)
  )

  const groups: GroupsT = groupBy(alpha, (proc: CompactProcessT) =>
    proc.name
      .trim()
      .toUpperCase()
      .slice(0, 1)
  )

  return (
    <div className="view processes">
      <DocumentTitle title={i18n('Processes')} />

      <div className="view-header">
        <div className="row">
          <div className="col-sm-7 col-md-8 col-lg-9">
            <h2 className="page-header">{i18n('Processes')}</h2>
          </div>

          <div className="col-sm-5 col-md-4 col-lg-3 hidden-xs">
            <Disable
              disabled={!organization.workflowCreator}
              hint={i18n('Sorry, you are not allowed to create workflows.')}
            >
              <ActionsMenu onImport={onImport} />
            </Disable>
          </div>
        </div>
      </div>

      <div className="view-content">
        <div className="col-sm-7 col-md-8">
          {fetchUserPreferences.fulfilled &&
          updateUserPreferences.fulfilled !== undefined ? (
            <InfiniteScroll
              isLoaded={isLoaded}
              isLoading={isLoading}
              page={page}
              loadingMessage={i18n('Loading your processes...')}
              onPageEnd={onFetchProcesses}
            >
              <div className="process-list">
                {isLoaded &&
                  !isLoading &&
                  isEmpty && (
                    <div>
                      <Hint>{i18n('No processes created yet.')}</Hint>
                      <Hint>
                        {i18n(
                          'A **process** is like a recipe to achieve a goal. Describe the flow of ' +
                            'actions once and Signavio Workflow will keep track of what has to be done for each ' +
                            'individual case. If you want to learn more check out our __userDocs__ or our __eLearning__ Courses.',
                          {
                            userDocs: (
                              <UserGuideLink chapter="processes">
                                {i18n('User docs')}
                              </UserGuideLink>
                            ),
                            eLearning: (
                              <ELearningLink>{i18n('eLearning')}</ELearningLink>
                            ),
                            markdown: true,
                          }
                        )}
                      </Hint>
                    </div>
                  )}
                {isLoaded &&
                  !isLoading &&
                  isEmptyFilter && (
                    <Hint>{i18n('No matching processes found.')}</Hint>
                  )}
                {numeric.length > 0 && (
                  <ProcessGroup key="#" name="#-9" processes={numeric} />
                )}

                {keys(groups)
                  .sort()
                  .map(
                    (group: string) =>
                      groups[group].length > 0 && (
                        <ProcessGroup
                          key={group}
                          name={group}
                          processes={groups[group]}
                        />
                      )
                  )}
              </div>
            </InfiniteScroll>
          ) : (
            <Hint>{i18n('Loading your processes...')}</Hint>
          )}
        </div>
        <div className="col-sm-5 col-md-4">
          {fetchUserPreferences.fulfilled && (
            <Controls
              filters={fetchUserPreferences.value.workflowFilters || {}}
              onFilter={onFilter}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function findGroup(name: string = ''): string {
  return find(GROUPS, (group: string, regex: RegExp) =>
    name.trim().match(new RegExp(regex, 'i'))
  )
}

export default compose(
  withUser,
  withOrganization,
  withState('isEmpty', 'toggleEmpty', false),
  withState('isEmptyFilter', 'toggleEmptyFilter', false),
  withState('isLoaded', 'toggleLoaded', false),
  withState('isLoading', 'toggleLoading', false),
  withState('processes', 'setProcesses', []),
  mapProps(({ user, ...rest }: PropsT) => ({
    id: user.id,
    ...rest,
  })),
  paginated({ pageSize }),
  connect(({ id }: PreferencesT) => ({
    updateUserPreferences: {
      type: types.USER_PREFERENCE,
      method: 'update',
      id,
    },
    fetchUserPreferences: {
      type: types.USER_PREFERENCE,
      id,
    },
  })),
  withHandlers({
    onFilter: ({
      fetchUserPreferences,
      setProcesses,
      toggleLoaded,
      onReset,
      updateUserPreferences,
    }: PropsT) => (query: WorkflowFiltersT) => {
      const newPreferences = {
        ...fetchUserPreferences.value,
        workflowFilters: { ...query },
      }

      toggleLoaded(false)
      setProcesses([])

      updateUserPreferences(newPreferences)
      onReset()
    },
    onImport: ({ toggleLoaded, setProcesses, onReset }: PropsT) => () => {
      toggleLoaded(false)
      setProcesses([])
      onReset()
    },
    onFetchProcesses: ({
      fetchUserPreferences,
      toggleLoading,
      setProcesses,
      toggleLoaded,
      offset,
      onNext,
      processes,
      toggleEmpty,
      toggleEmptyFilter,
    }: PropsT) => () => {
      toggleLoading(true)

      const { value: { workflowFilters = {} } } = fetchUserPreferences

      $.ajax({
        url: Effektif.makeUrl('workflows'),
        data: {
          offset,
          pagesize: pageSize,
          labelIds: workflowFilters.labels || [],
          ownerId: workflowFilters.ownerId,
          published: workflowFilters.published,
          trigger: workflowFilters.trigger,
        },
        success: (data: Array<CompactProcessT>, response, options) => {
          const newProcesses = [...processes, ...data]

          toggleEmpty(newProcesses.length === 0 && _isEmpty(workflowFilters))
          toggleEmptyFilter(
            newProcesses.length === 0 && !_isEmpty(workflowFilters)
          )
          setProcesses(newProcesses)
          toggleLoaded(
            newProcesses.length >=
              parseInt(options.getResponseHeader('Meta-Result-Size'), 10)
          )
          toggleLoading(false)

          onNext()
        },
      })
    },
  })
)(ProcessList)



// WEBPACK FOOTER //
// ./src/processes/views/Processes.js
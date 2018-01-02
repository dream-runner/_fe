/* @flow */
import React from 'react'
import i18n from 'signavio-i18n'
import {
  includes,
  filter,
  union,
  uniqBy,
  isEqual,
  groupBy,
  findIndex,
  get,
  map,
} from 'lodash'
import $ from 'jquery'
import {
  compose,
  withHandlers,
  withState,
  withPropsOnChange,
  lifecycle,
} from 'recompose'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { HttpUtils } from '@signavio/effektif-commons/lib/utils'

import {
  NewInfiniteScroll as InfiniteScroll,
  Paginated,
  omitProps,
  UserGuideLink,
} from '@signavio/effektif-commons/lib/components'

import { connect, types } from '@signavio/effektif-api'

import { Effektif } from 'singleton'

import { supportedTypes } from '../../../packages/fields'
import { withUser, withUserPreferences } from '../../../packages/api'
import { withToken } from '../../../packages/organizations'

import type { Column } from '../types'
import type { CaseT, StatsT } from '../../../packages/cases'

import Table from './table'
import ListOptions from './ListOptions'
import ErrorAlert from './ErrorAlert'
import CloseCasesErrorAlert from './CloseCasesErrorAlert'

const pageSize = 25

type PropsT = {
  workflowId: string,

  isLoaded: boolean,
  isLoading: boolean,
  showDeleted: boolean,
  showAdhoc: boolean,
  selectMode: boolean,
  deletingErrorAlert: boolean,
  closingErrorAlert: boolean,

  page: number,

  cases: Array<CaseT>,
  openCases: Array<CaseT>,
  closedCases: Array<CaseT>,
  columns: Array<Column>,
  selectedCases: Array<string>,
  sorting: string,
  stats: StatsT,

  onSortChange: (field: string) => void,
  onExport: () => void,
  onPageEnd: () => void,
  toggleSelectMode: () => void,
  onSelectionChange: () => void,
  onDeleteCases: () => void,
  onClearSelection: () => void,
  onDismissErrorAlert: () => void,
  onSelectCases: () => void,
  deleteCases: () => void,
  onCloseCases: () => void,
  closeCases: () => void,
}

function CaseList(props: PropsT) {
  const {
    workflowId,
    showAdhoc,
    showDeleted,
    sorting,
    page,
    isLoaded,
    isLoading,
    cases,
    columns,
    stats,
    openCases,
    closedCases,
    onSortChange,
    onExport,
    onPageEnd,
    selectMode,
    onSelectionChange,
    selectedCases,
    onDeleteCases,
    deleteCases,
    deletingErrorAlert,
    closingErrorAlert,
    onDismissErrorAlert,
    onSelectCases,
    onClearSelection,
    onCloseCases,
    closeCases,
  } = props

  if (!showDeleted && !showAdhoc && !workflowId) {
    return (
      <div>
        <Hint>
          {i18n('Please select a process to display the respective cases.')}
        </Hint>
        <Hint>
          {i18n(
            'A **case** is a collaboration page for a particular goal. It has a ' +
              'list of tasks representing the concrete action items to reach the goal ' +
              'and provides an overview of all relevant documents and events.',
            { markdown: true }
          )}
          <UserGuideLink chapter="cases">{i18n('Learn more')}</UserGuideLink>
        </Hint>
      </div>
    )
  }

  // clear is required because tasksOpen and tasksCompleted attributes are
  // undefined if there are none reset is required for the nested values
  // collection (option is passed through), because the field models in
  // that collection have no IDs
  return (
    <div className="case-list">
      <div className="list-options">
        <ListOptions
          cases={cases}
          sorting={sorting}
          onSortChange={onSortChange}
          onExport={onExport}
          selectMode={selectMode}
          selectedCases={selectedCases}
          onDeleteCases={onDeleteCases}
          onSelectCases={onSelectCases}
          onClearSelection={onClearSelection}
          onCloseCases={onCloseCases}
        />
      </div>
      <div className="list-content">
        <InfiniteScroll
          page={page}
          isLoaded={isLoaded}
          isLoading={isLoading}
          threshold={250}
          loadingMessage={getProcessTitle(props)}
          emptyMessage={i18n('No cases have been started yet.')}
          onPageEnd={onPageEnd}
        >
          {cases.length === 0 &&
            showAdhoc && (
              <Hint>
                {i18n(
                  'Signavio Workflow Accelerator supports two types of cases: ' +
                    'cases that relate to a process and ad-hoc cases. ' +
                    'An ad-hoc case does not have a predefined process. ' +
                    'It creates a collaboration space that you can use to reach a one-off goal. ',
                  { markdown: true }
                )}
                <UserGuideLink
                  chapter="tutorials"
                  section="using-an-ad-hoc-case-for-a-document-approval"
                >
                  {i18n('Learn more')}
                </UserGuideLink>
              </Hint>
            )}

          {cases.length === 0 &&
            showDeleted && (
              <Hint>
                {i18n(
                  'Signavio Workflow Accelerator supports two types of cases: ' +
                    'cases that relate to a process and ad-hoc cases. ' +
                    'An ad-hoc case does not have a predefined process. ' +
                    'It creates a collaboration space that you can use to reach a one-off goal.',
                  { markdown: true }
                )}
                <UserGuideLink
                  chapter="tutorials"
                  section="using-an-ad-hoc-case-for-a-document-approval"
                >
                  {i18n('Learn more')}
                </UserGuideLink>
              </Hint>
            )}

          {deleteCases.pending && (
            <Hint loading>{i18n('Deleting cases...')}</Hint>
          )}

          {closeCases.pending && (
            <Hint loading>{i18n('Closing cases...')}</Hint>
          )}

          {deletingErrorAlert && (
            <ErrorAlert
              deleteCases={deleteCases}
              onDismiss={onDismissErrorAlert}
            />
          )}

          {closingErrorAlert && (
            <CloseCasesErrorAlert
              closeCases={closeCases}
              onDismiss={onDismissErrorAlert}
            />
          )}

          <Table
            columns={columns}
            openCases={openCases}
            closedCases={closedCases}
            stats={stats}
            selectMode={selectMode}
            selectedCases={selectedCases}
            onSelectionChange={onSelectionChange}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}

const getProcessTitle = ({ showDeleted, showAdhoc }: PropsT) => {
  if (showDeleted) {
    return i18n('Loading cases for deleted processes...')
  }

  if (showAdhoc) {
    return i18n('Loading cases without processes...')
  }

  return i18n('Loading cases...')
}

const needsCasesRefreshed = (prevProps: PropsT, newProps: PropsT) => {
  if (prevProps.workflowId !== newProps.workflowId) {
    return true
  }

  if (prevProps.showDeleted !== newProps.showDeleted) {
    return true
  }

  if (prevProps.showAdhoc !== newProps.showAdhoc) {
    return true
  }

  if (
    (prevProps.deleteCases.pending && !newProps.deleteCases.pending) ||
    (prevProps.closeCases.pending && !newProps.closeCases.pending)
  ) {
    return true
  }

  return false
}

let caseLoad

const hasDeleteError = (prevProps, nextProps) => {
  if (!prevProps.deleteCases.rejected && nextProps.deleteCases.rejected) {
    return true
  }

  if (
    prevProps.deleteCases.pending &&
    !nextProps.deleteCases.pending &&
    !get(nextProps.deleteCases.value, 'allCasesDeleted', true)
  ) {
    return true
  }

  return false
}

const hasClosingError = (prevProps, nextProps) => {
  if (!prevProps.closeCases.rejected && nextProps.closeCases.rejected) {
    return true
  }

  if (
    prevProps.closeCases.pending &&
    !nextProps.closeCases.pending &&
    !get(nextProps.closeCases.value, 'allCasesCanceled', true)
  ) {
    return true
  }
  return false
}

export default compose(
  withToken,
  withUser,
  withUserPreferences,
  connect(({ user }) => ({
    deleteCases: {
      type: types.DELETE_CASES_ACTION,
      method: 'create',
    },
    updatePreferences: {
      id: user.id,
      type: types.USER_PREFERENCE,
      method: 'update',
    },
    closeCases: {
      type: types.CASES_CANCEL_ACTION,
      method: 'create',
    },
  })),
  withState('listState', 'changeState', ({ userPreferences }) => ({
    cases: [],
    columns: [],
    isLoaded: false,
    isLoading: false,
    sorting: userPreferences.caseSorting,
  })),
  withState('selectMode', 'toggleSelectMode', false),
  withState('deletingErrorAlert', 'toggleDeletingErrorAlert', false),
  withState('closingErrorAlert', 'toggleClosingErrorAlert', false),
  withState('selectedCases', 'setCases', []),
  Paginated({ pageSize }),
  withHandlers({
    onSaveUserPreferences: ({ updatePreferences, userPreferences }) => (
      preference: Object
    ) => {
      updatePreferences({
        ...userPreferences,
        ...preference,
      })
    },
  }),
  withHandlers({
    onSortChange: ({
      changeState,
      listState,
      onReset,
      onSaveUserPreferences,
    }) => (sorting: string) => {
      onSaveUserPreferences({ caseSorting: sorting })

      changeState(
        {
          ...listState,

          cases: [],
          isLoaded: false,
          isLoading: false,
          sorting,
        },
        onReset
      )
    },
    onExport: ({ token, workflowId, showAdhoc }) => options => {
      const url = Effektif.makeUrl('cases')

      const query = HttpUtils.queryString({
        ...options,

        ...(workflowId ? { editorWorkflowId: workflowId } : null),

        adhoc: showAdhoc,
        token,
      })

      window.open(`${url}/export/csv?${query}`)
    },
    onPageEnd: (props: PropsT) => () => {
      const {
        offset,
        workflowId,
        showAdhoc,
        showDeleted,
        listState,
        onNext,
        changeState,
      } = props

      const { cases, columns, sorting } = listState

      caseLoad = $.ajax({
        url: Effektif.makeUrl('cases'),
        data: {
          offset,

          pagesize: pageSize,

          sorting,

          editorWorkflowId: workflowId,
          adhoc: showAdhoc,
          workflowDeleted: showDeleted,
        },
        success: (
          { result, files = [], users = [], caseColumns },
          response,
          options
        ) => {
          caseLoad = null

          const newCases = [...cases, ...result]
          const newColumns = filter(
            uniqBy(union(columns, caseColumns), 'id'),
            ({ binding = {} }) =>
              binding.type && includes(supportedTypes, binding.type.name)
          )

          const columnsChanged = !isEqual(
            columns.map(({ id }) => id),
            newColumns.map(({ id }) => id)
          )

          changeState({
            cases: newCases.length !== cases.length ? newCases : cases,
            columns: columnsChanged ? newColumns : columns,
            isLoaded:
              newCases.length >=
              parseInt(options.getResponseHeader('Meta-Result-Size'), 10),
            isLoading: false,
            sorting,
          })

          onNext()
        },
        error: (xhr, textStatus: string) => {
          caseLoad = null

          if (textStatus === 'abort') {
            onNext()
          }
        },
      })
    },
    onSelectionChange: ({ selectedCases, setCases }) => caze => {
      const index = findIndex(
        selectedCases,
        selectedCase => selectedCase.id === caze.id
      )
      if (index !== -1) {
        setCases([
          ...selectedCases.slice(0, index),
          ...selectedCases.slice(index + 1),
        ])
        return
      }
      setCases([...selectedCases, caze])
    },
    onClearSelection: ({ setCases }) => () => setCases([]),
  }),
  withHandlers({
    onSelectCases: ({
      toggleSelectMode,
      selectMode,
      onClearSelection,
    }) => () => {
      toggleSelectMode(!selectMode)
      onClearSelection()
    },
    onDeleteCases: ({
      deleteCases,
      toggleSelectMode,
      selectedCases,
      onClearSelection,
    }) => cascade => {
      onClearSelection()
      toggleSelectMode(false)
      const selectedCaseIds = map(selectedCases, 'id')
      deleteCases({ cascade, selectedCaseIds })
    },
    onCloseCases: ({
      closeCases,
      onClearSelection,
      selectedCases,
      toggleSelectMode,
    }) => reason => {
      const selectedCaseIds = map(selectedCases, 'id')

      closeCases({ selectedCaseIds, reason })
      onClearSelection()
      toggleSelectMode(false)
    },
    onDismissErrorAlert: ({
      toggleDeletingErrorAlert,
      toggleClosingErrorAlert,
    }) => () => {
      toggleDeletingErrorAlert(false)
      toggleClosingErrorAlert(false)
    },
  }),
  lifecycle({
    componentWillReceiveProps(nextProps: PropsT) {
      if (this.props.workflowId !== nextProps.workflowId) {
        this.props.toggleSelectMode(false)
        this.props.onClearSelection()
      }

      if (hasDeleteError(this.props, nextProps)) {
        this.props.toggleDeletingErrorAlert(true)
      }

      if (hasClosingError(this.props, nextProps)) {
        this.props.toggleClosingErrorAlert(true)
      }

      if (!needsCasesRefreshed(this.props, nextProps)) {
        return
      }

      if (caseLoad) {
        caseLoad.abort()
      }

      const { onReset, changeState, listState } = this.props

      changeState(
        {
          cases: [],
          columns: [],
          isLoaded: false,
          isLoading: false,
          sorting: listState.sorting,
        },
        onReset
      )
    },
  }),
  withPropsOnChange(
    ['listState'],
    ({ listState: { cases, columns, isLoaded, isLoading, sorting } }) => ({
      cases,
      columns,
      isLoading,
      isLoaded,
      sorting,
    })
  ),
  withPropsOnChange(['cases'], ({ cases }) => ({
    stats: cases.reduce(
      (
        { open = 0, completed = 0 },
        { tasksOpen = [], tasksCompleted = [] }
      ) => ({
        open: Math.max(
          open,
          tasksOpen.reduce((count, task) => count + task.count, 0)
        ),
        completed: Math.max(
          completed,
          tasksCompleted.reduce((count, task) => count + task.count, 0)
        ),
      }),
      { open: 0, completed: 0 }
    ),
    ...groupBy(
      cases,
      ({ closed }: CaseT) => (closed ? 'closedCases' : 'openCases')
    ),
  })),
  omitProps(['offset', 'listState', 'token', 'user'])
)(CaseList)



// WEBPACK FOOTER //
// ./src/cases/views/CaseList.js
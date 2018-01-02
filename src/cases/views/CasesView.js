import React, { Component } from 'react'
import { compose } from 'recompose'
import i18n from 'signavio-i18n'
import { withRouter } from 'react-router'
import { filter, find } from 'lodash'

import {
  connect,
  types,
  withUserPreferences,
  withUser,
  prependOrg,
} from '@signavio/effektif-api'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { DocumentTitle } from '@signavio/effektif-commons/lib/components'

import CaseColumns from 'processes/views/CaseColumnsView'
import LoadProcess from 'processes/views/LoadView'

import CaseList from './CaseList'
import Header from './CasesHeaderView'

class Cases extends Component {
  render() {
    const {
      processId,
      fetchInfo,
      showConfig,
      userPreferences,
      showAdhoc,
      showDeleted,
    } = this.props

    if (fetchInfo.pending) {
      return (
        <Hint loading view>
          {i18n('Loading information...')}
        </Hint>
      )
    }

    const info = fetchInfo.value

    return (
      <div className="view cases">
        <DocumentTitle title={i18n('Case overview')} />

        <div className="view-header">
          <Header
            processId={processId}
            onProcessSelect={workflow => this.handleProcessChange(workflow)}
            info={filter(info, ({ editorWorkflow }) => !!editorWorkflow)}
            showConfig={showConfig}
            showAdhoc={showAdhoc}
            showDeleted={showDeleted}
          />
        </div>

        <div className="view-content">
          {showConfig ? (
            <LoadProcess
              model={this.props.process}
              loadingMessage={i18n(
                'Loading current configuration of the reporting table...'
              )}
            >
              <CaseColumns model={this.props.process} />
            </LoadProcess>
          ) : (
            <CaseList
              info={this.getInfo()}
              workflowId={!showDeleted && !showAdhoc ? processId : undefined}
              showDeleted={showDeleted}
              showAdhoc={showAdhoc}
            />
          )}
        </div>
      </div>
    )
  }

  handleProcessChange(process) {
    const { updatePreferences, history } = this.props

    if (process) {
      updatePreferences({
        casesProcessId: process.id,
      })

      history.replace(prependOrg(`/cases/${process.id}`))
    } else {
      updatePreferences({
        casesProcessId: null,
      })

      history.replace(prependOrg('/cases'))
    }
  }

  getInfo() {
    const { fetchInfo, processId, showAdhoc, showDeleted } = this.props

    return find(fetchInfo.value, ({ editorWorkflow, adhoc, deleted }) => {
      if (!processId || !editorWorkflow) {
        return adhoc === showAdhoc || deleted === showDeleted
      }

      return editorWorkflow.id === processId
    })
  }
}

export default compose(
  withUserPreferences,
  withUser,
  withRouter,
  connect(({ user }) => ({
    fetchInfo: {
      type: types.CASE_INFO,
    },
    updatePreferences: {
      type: types.USER_PREFERENCE,
      id: user.id,
      method: 'update',
    },
  }))
)(Cases)



// WEBPACK FOOTER //
// ./src/cases/views/CasesView.js
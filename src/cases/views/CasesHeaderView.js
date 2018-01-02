import React, { Component } from 'react'
import { some, first, find } from 'lodash'
import i18n from 'signavio-i18n'

import { prependOrg } from '@signavio/effektif-api'

import { List } from '@signavio/effektif-commons/lib/components'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import { getRights } from '../../../packages/access'

import ProcessSelect from './ProcessSelect'

export default class CaseHeader extends Component {
  componentWillMount() {
    const {
      processId,
      info,
      showDeleted,
      showAdhoc,
      onProcessSelect,
    } = this.props

    if (processId && !some(info, { editorWorkflowId: processId })) {
      if (info.length === 0) {
        onProcessSelect(null)

        return
      }

      onProcessSelect(first(info).editorWorkflow)

      return
    }

    if (processId || showDeleted || showAdhoc) {
      return
    }

    if (info.length > 0) {
      onProcessSelect(first(info).editorWorkflow)
    }
  }

  render() {
    const {
      processId,
      info,
      showDeleted,
      showAdhoc,
      onProcessSelect,
    } = this.props

    let rights

    if (processId) {
      const selectedEntry = find(info, { editorWorkflowId: processId })

      if (selectedEntry) {
        rights = getRights(
          selectedEntry.editorWorkflow.access,
          'edit',
          'start',
          'view'
        )
      }
    }

    return (
      <div className="cases-header">
        <div className="row">
          <div className="col-sm-7 col-md-8 col-lg-9">
            <ProcessSelect
              onSelect={onProcessSelect}
              showDeleted={showDeleted}
              showAdhoc={showAdhoc}
              info={info}
              processId={processId}
            />
          </div>

          <div className="col-sm-5 col-md-4 col-lg-3">
            <List>
              <IconButton
                light
                block
                icon="plus"
                href={
                  processId
                    ? prependOrg(`/process/${processId}/start`)
                    : prependOrg('/case')
                }
                disabled={!this.canAddCase(rights)}
              >
                {i18n('Start new case')}
              </IconButton>

              {this.renderColumnsConfigToggle(rights)}
            </List>
          </div>
        </div>
      </div>
    )
  }

  canAddCase(rights) {
    const { processId, showAdhoc, showDeleted } = this.props

    if (!processId) {
      return showAdhoc
    }

    if (showDeleted) {
      return false
    }

    if (!rights) {
      return false
    }

    return rights.start
    return !this.props.model.isApprovalWorkflow() && rights.start
  }

  renderColumnsConfigToggle(rights) {
    const { processId, showConfig } = this.props

    if (showConfig) {
      return (
        <IconButton
          light
          block
          icon="check"
          href={prependOrg(`/cases/${processId}`)}
        >
          {i18n('Back to the table')}
        </IconButton>
      )
    }

    return (
      <IconButton
        light
        block
        icon="wrench"
        iconSet="fontAwesome"
        className="hidden-xs"
        href={processId && prependOrg(`/cases/${processId}/config`)}
        disabled={!this.canConfigureColumns(rights)}
      >
        {i18n('Configure columns')}
      </IconButton>
    )
  }

  canConfigureColumns(rights) {
    const { processId, showDeleted, showAdhoc } = this.props

    if (!processId) {
      return false
    }

    if (showDeleted || showAdhoc) {
      return false
    }

    if (!rights) {
      return false
    }

    return rights.edit && rights.view
  }
}



// WEBPACK FOOTER //
// ./src/cases/views/CasesHeaderView.js
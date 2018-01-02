// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { withHandlers, withState, lifecycle, compose } from 'recompose'

import Router from 'singleton/Router'
import { withOrganization } from '@signavio/effektif-api'

import { withToken } from '../../../../packages/organizations'

import RemoveModal from '../RemoveModalView'
import SaveButton from './SaveButtonView'

import {
  DropDown,
  Confirm,
  Disable,
  List,
  Modal,
} from '@signavio/effektif-commons/lib/components'
import { ActionTile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

function Actions({
  readOnly,
  lastSaved,
  copying,
  copyId,
  confirmRemove,
  model,
  organization,
  onCopy,
  onExport,
  onRequestRemove,
  onCancelRemove,
  onRemove,
  onOpenCopy,
  onDismissCopy,
}) {
  return (
    <div>
      <DropDown closeOnClick pushRight toggleIcon="ellipsis">
        <List>
          <SaveButton key="save" lastSaved={lastSaved} />
          <ActionTile key="export" icon="cloud-download" onClick={onExport}>
            {i18n('Export BPMN 2.0 XML')}
          </ActionTile>
          <Disable
            key="copy"
            disabled={readOnly || !organization.workflowCreator}
          >
            <ActionTile icon="restore" onClick={onCopy}>
              {i18n('Create a copy')}
            </ActionTile>
          </Disable>
          <Disable key="remove" disabled={readOnly}>
            <ActionTile icon="trash status-danger" onClick={onRequestRemove}>
              {i18n('Delete process')}
            </ActionTile>
          </Disable>
        </List>
      </DropDown>

      {copying && (
        <Modal>
          <Hint loading>{i18n('Copying this process. Please wait...')}</Hint>
        </Modal>
      )}

      {copyId && (
        <Confirm
          cancelText={i18n('Keep editing')}
          confirmText={i18n('Open copy')}
          onCancel={onDismissCopy}
          onConfirm={onOpenCopy}
        >
          {i18n(
            'A copy of this process has been created. Do you want to keep editing this process or open the copy?'
          )}
        </Confirm>
      )}

      {confirmRemove && (
        <RemoveModal
          model={model}
          onHide={onCancelRemove}
          onRemove={onRemove}
        />
      )}
    </div>
  )
}

export default compose(
  withToken,
  withOrganization,
  withState('lastSaved', 'setLastSaved', () => Date.now()),
  withState('copying', 'toggleCopying', false),
  withState('copyId', 'setCopyId', null),
  withState('confirmRemove', 'toggleConfirmRemove', false),
  withHandlers({
    onUpdate: ({ setLastSaved }) => () => setLastSaved(Date.now()),
    onCopy: ({ model, toggleCopying, setCopyId, onCopy }) => () => {
      toggleCopying(true)

      model.once(
        'action:copy',
        copy => {
          if (onCopy) {
            onCopy(new Process(copy))
          }

          toggleCopying(false)
          setCopyId(copy.id)
        },
        this
      )

      model.action('copy')
    },
    onExport: ({ model, token }) => () => {
      window.open(`${model.url()}/export/bpmn?token=${token}`)
    },
    onRequestRemove: ({ toggleConfirmRemove }) => () =>
      toggleConfirmRemove(true),
    onCancelRemove: ({ toggleConfirmRemove }) => () =>
      toggleConfirmRemove(false),
    onRemove: () => () => {
      Router.navigate(Router.reverse('processes'), { trigger: true })
    },
    onOpenCopy: ({ copyId }) => () => {
      Router.navigate(Router.reverse('process', { id: copyId }))
    },
    onDismissCopy: ({ setCopyId }) => () => setCopyId(null),
  }),
  lifecycle({
    componentWillMount() {
      const { model, onUpdate } = this.props

      model.on('sync', onUpdate, this)
    },

    componentWillUnmount() {
      const { model, onUpdate } = this.props

      model.off('sync', onUpdate)
    },
  })
)(Actions)



// WEBPACK FOOTER //
// ./src/processes/views/edit/ToolbarActionsView.js
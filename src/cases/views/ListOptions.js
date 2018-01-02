// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withHandlers, withState } from 'recompose'

import {
  Disable,
  Feature,
  Divider,
  List,
} from '@signavio/effektif-commons/lib/components'
import { applicationName } from '@signavio/effektif-commons'

import type { Case as CaseT } from '../types'
import ListSorting from './ListSorting'
import SelectCases from './SelectCases'
import CSVExport from './CSVExport'
import ConfirmModal from './ConfirmModal'
import CaseSelectionOptions from './CaseSelectionOptions'

type ApiPropsT = {
  selectedCases: Array<CaseT>,
  cases: Array<CaseT>,
  sorting: string,
  onSortChange: string => void,
  onDeleteCases: () => void,
  onExport: () => void,
  onToggleDeletionModal: () => void,
  onToggleClosingModal: () => void,
  onSelectCases: () => void,
  onCancelDeletion: () => void,
  onConfirmDeletion: (cascade: boolean) => void,
  onClearSelection: () => void,
  onCancelClosing: () => void,
  onConfirmClosing: () => void,
  selectMode: boolean,
  showDeletionModal: boolean,
  showClosingModal: boolean,
}

const ListOptions = ({
  sorting,
  onSortChange,
  selectMode,
  selectedCases,
  onDeleteCases,
  cases,
  onExport,
  onToggleDeletionModal,
  onToggleClosingModal,
  showDeletionModal,
  showClosingModal,
  onSelectCases,
  onCancelDeletion,
  onCancelClosing,
  onConfirmDeletion,
  onConfirmClosing,
  onClearSelection,
  style,
}: ApiPropsT) => {
  return (
    <Disable disabled={cases.length === 0}>
      <div className="row">
        <div className="col-sm-6">
          <ListSorting sorting={sorting} onChange={onSortChange} />
        </div>
        <div className="col-sm-3">
          <SelectCases onSelectCases={onSelectCases} selectMode={selectMode} />
        </div>
        <div className="col-sm-3">
          <Feature
            sneekPeek
            tooltip
            feature="Action.ExportCaseCsv"
            hint={i18n(
              'You need the full version of __applicationName__ in order to use the CSV export.',
              { applicationName }
            )}
          >
            <CSVExport sorting={sorting} onExport={onExport} />
          </Feature>
        </div>
      </div>

      {selectMode && (
        <CaseSelectionOptions
          onClearSelection={onClearSelection}
          selectedCases={selectedCases}
          onToggleDeletionModal={onToggleDeletionModal}
          onToggleClosingModal={onToggleClosingModal}
        />
      )}

      <Divider padding="normal" />

      {showDeletionModal && (
        <ConfirmModal
          title={i18n('Delete cases')}
          confirmText={i18n('Delete cases')}
          action="delete"
          selectedCases={selectedCases}
          onCancel={onCancelDeletion}
          onConfirm={onConfirmDeletion}
        />
      )}

      {showClosingModal && (
        <ConfirmModal
          title={i18n('Close cases')}
          confirmText={i18n('Close cases')}
          action="close"
          selectedCases={selectedCases}
          onCancel={onCancelClosing}
          onConfirm={onConfirmClosing}
        />
      )}
    </Disable>
  )
}

export default compose(
  withState('showDeletionModal', 'toggleShowDeletionModal', false),
  withState('showClosingModal', 'toggleShowClosingModal', false),
  withHandlers({
    onToggleDeletionModal: ({
      toggleShowDeletionModal,
      showDeletionModal,
    }) => () => {
      toggleShowDeletionModal(!showDeletionModal)
    },
    onCancelDeletion: ({ toggleShowDeletionModal }) => () => {
      toggleShowDeletionModal(false)
    },
    onConfirmDeletion: ({
      toggleShowDeletionModal,
      onDeleteCases,
    }) => cascade => {
      onDeleteCases(cascade)
      toggleShowDeletionModal(false)
    },
    onToggleClosingModal: ({
      toggleShowClosingModal,
      showClosingModal,
    }) => () => {
      toggleShowClosingModal(!showClosingModal)
    },
    onCancelClosing: ({ toggleShowClosingModal }) => () => {
      toggleShowClosingModal(false)
    },
    onConfirmClosing: ({ onCloseCases, toggleShowClosingModal }) => reason => {
      onCloseCases(reason)
      toggleShowClosingModal(false)
    },
  })
)(ListOptions)



// WEBPACK FOOTER //
// ./src/cases/views/ListOptions.js
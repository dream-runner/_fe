import React from 'react'
import i18n from 'signavio-i18n'

import { Divider } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import type { Case as CaseT } from '../types'

type PropsT = {
  onClearSelection: () => void,
  onToggleDeletionModal: () => void,
  onToggleClosingModal: () => void,
  selectedCases: Array<CaseT>,
}

const CaseSelectionOptions = ({
  onClearSelection,
  selectedCases,
  onToggleDeletionModal,
  onToggleClosingModal,
  style,
}: PropsT) => {
  return (
    <div {...style} className="row">
      <div className="col-sm-12">
        <Divider padding="normal" />
        <Hint>
          {i18n(
            'Select cases below to close or delete multiple cases at once.'
          )}
        </Hint>
        <IconButton
          style={style('clearSelection')}
          disabled={selectedCases.length === 0}
          icon="cancel"
          onClick={onClearSelection}
        >
          {i18n('Clear selection')}
        </IconButton>

        <div {...style('caseActions')}>
          <IconButton
            disabled={selectedCases.length === 0}
            icon="folder-o"
            iconSet="fontAwesome"
            onClick={onToggleClosingModal}
          >
            {i18n('Close all selected cases')}
          </IconButton>

          <IconButton
            style={style('confirmDeleteSelection')}
            disabled={selectedCases.length === 0}
            icon="trash"
            onClick={onToggleDeletionModal}
          >
            {i18n('Delete all selected cases')}
          </IconButton>
        </div>
      </div>
    </div>
  )
}

const styled = defaultStyle(({ padding }) => ({
  caseActions: {
    float: 'right',
  },
  confirmDeleteSelection: {
    marginLeft: padding.normal,
  },
  clearSelection: {
    float: 'left',
  },
}))

export default styled(CaseSelectionOptions)



// WEBPACK FOOTER //
// ./src/cases/views/CaseSelectionOptions.js
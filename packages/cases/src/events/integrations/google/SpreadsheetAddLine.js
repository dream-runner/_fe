// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { LabeledField } from '@signavio/effektif-fields'

import Event from '@signavio/workflow-events'

import type { SpreadsheetEventT } from '../../../types'

type PropsT = {
  event: SpreadsheetEventT,
}

export default function GoogleSpreadsheetAddRowEvent({
  event,
  ...rest
}: PropsT) {
  const { worksheetLink } = event

  return (
    <Event
      {...rest}
      event={event}
      icon="table"
      title={
        !worksheetLink
          ? i18n('No row was added to a Google spreadsheet')
          : i18n('A row was added to a Google spreadsheet')
      }
    >
      {worksheetLink &&
        <LabeledField
          readOnly
          type={{ name: 'link' }}
          label={worksheetLink.name}
          value={worksheetLink.url}
        />}
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/google/SpreadsheetAddLine.js
// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { List } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import { LabeledField, FieldStructure } from '@signavio/effektif-fields'
import Event from '@signavio/workflow-events'

import type { JobT, PrintEventT } from '../../../types'

type PropsT = {
  event: PrintEventT,
}

export default function GoogleCloudPrintEvent({ event, ...rest }: PropsT) {
  const { printJobs } = event

  const infoJob = printJobs[0]
  const { printerName, numberOfCopies = 0 } = infoJob || {}

  return (
    <Event
      {...rest}
      event={event}
      icon="printer"
      title={
        printJobs.length === 0
          ? i18n('No files were printed on Google Cloud Print')
          : i18n('__count__ file was printed', '__count__ files were printed', {
              count: printJobs.length,
            })
      }
    >
      <List wrapItems>
        <LabeledField
          readOnly
          narrow
          type={{ name: 'text' }}
          label={i18n('Printer')}
          value={printerName}
        />

        <LabeledField
          readOnly
          narrow
          type={{ name: 'text' }}
          label={i18n('Copies')}
          value={numberOfCopies}
        />

        <FieldStructure narrow label={i18n('Files')}>
          <List>
            {printJobs.map((job: JobT) =>
              <TextTile key={`${job.fileName}-${job.ticketLink}`}>
                <a href={job.ticketLink} rel="external">
                  {job.fileName}
                </a>
              </TextTile>
            )}
          </List>
        </FieldStructure>
      </List>
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/google/CloudPrint.js
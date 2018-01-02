// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { Field } from '@signavio/effektif-fields'

import type { FileAddEventT } from '@signavio/workflow-events'
import Event from '@signavio/workflow-events'

type PropsT = {
  event: FileAddEventT,
}

export default function FileAddEvent({ event, ...rest }: PropsT) {
  const { fileId } = event

  return (
    <Event {...rest} expanded event={event} title={i18n('added a document')}>
      <Field readOnly showImage type={{ name: 'fileId' }} value={fileId} />
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/interaction/FileAdd.js
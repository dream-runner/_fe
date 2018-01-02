// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import type { FileUploadEventT } from '@signavio/workflow-events'

import { UploadEvent } from '@signavio/workflow-events'

type PropsT = {
  event: FileUploadEventT,
}

export default function BoxUploadEvent({ event, ...rest }: PropsT) {
  return (
    <UploadEvent {...rest} event={event} serviceName={i18n('Box')} icon="box" />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/box/FileUpload.js
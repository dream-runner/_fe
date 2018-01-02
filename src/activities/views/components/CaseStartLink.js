// @flow
import React from 'react'

import i18n from 'signavio-i18n'
import { variables } from '@signavio/effektif-commons/lib/styles'
import {
  ContextHelp,
  CopyToClipboard,
} from '@signavio/effektif-commons/lib/components'

type ApiPropsT = {
  url: string,
}

export default function CaseStartLink({ url }: ApiPropsT) {
  return (
    <div className="row">
      <div
        className="col-md-5 col-sm-12"
        style={{ lineHeight: `${variables.lineHeight.block}px` }}
      >
        {i18n('Use this URL to directly reach the page to start a case:')}

        <ContextHelp>
          {i18n(
            'Click the icon or link to copy the link to your clipboard, so you can send it by email.'
          )}
        </ContextHelp>
      </div>
      <div className="col-md-7 col-sm-12">
        <CopyToClipboard
          displayText={url}
          popover={i18n('Copied to clipboard')}
        >
          {url}
        </CopyToClipboard>
      </div>
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/activities/views/components/CaseStartLink.js
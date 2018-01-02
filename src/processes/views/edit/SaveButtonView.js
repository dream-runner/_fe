// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import moment from '@signavio/effektif-commons/lib/extensions/moment'
import { Disable } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'

type ApiPropsT = {
  lastSaved?: string,
}

export default function SaveButton({ lastSaved }: ApiPropsT) {
  return (
    <Disable
      hint={
        lastSaved
          ? i18n('Last saved __moment__', {
              moment: moment(lastSaved).fromNow(),
            })
          : i18n('No changes to save')
      }
    >
      <TextTile icon="document-add">{i18n('Save process')}</TextTile>
    </Disable>
  )
}



// WEBPACK FOOTER //
// ./src/processes/views/edit/SaveButtonView.js
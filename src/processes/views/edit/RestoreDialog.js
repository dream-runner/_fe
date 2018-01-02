// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { Modal, List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  versionNr: number,
  isLatest: boolean,
  children: React$Element<any>,

  onAbort: () => void,
  onRestore: () => void,
  onPublish: () => void,
}

function RestoreDialog({
  versionNr,
  isLatest,
  style,
  children,
  onAbort,
  onRestore,
  onPublish,
}: PropsT) {
  return (
    <Modal
      title={i18n('Re-Publish or Restore version __version__', {
        version: versionNr,
      })}
      footer={
        <List>
          <div>
            <IconButton
              primary
              style={style('republish')}
              icon="reload"
              disabled={isLatest}
              onClick={onPublish}
            >
              {i18n('Re-Publish')}
            </IconButton>

            <IconButton
              primary
              style={style('restore')}
              icon="restore"
              onClick={onRestore}
            >
              {i18n('Restore')}
            </IconButton>
          </div>

          <IconButton block icon="times" onClick={onAbort}>
            {i18n('Cancel')}
          </IconButton>
        </List>
      }
      onRequestHide={onAbort}
    >
      <Hint>
        <q>{children}</q>
      </Hint>

      <ul>
        <li>
          {i18n(
            '**Republish** sets version __version__ as the current published version that will be used for new cases, without affecting the version that you are currently editing.',
            {
              markdown: true,
              version: versionNr,
            }
          )}
        </li>
        <li>
          {i18n(
            '**Restoring** discards the version you are currently editing, replacing it with version __version__, but does not change the published version.',
            {
              markdown: true,
              version: versionNr,
            }
          )}
        </li>
      </ul>
    </Modal>
  )
}

const styled = defaultStyle({
  republish: {
    width: '50%',
  },
  restore: {
    width: 'calc(50% - 1px)',
    marginLeft: 1,
  },
})

export default styled(RestoreDialog)



// WEBPACK FOOTER //
// ./src/processes/views/edit/RestoreDialog.js
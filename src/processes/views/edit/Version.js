// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withState, withHandlers } from 'recompose'

import { Time } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import {
  IconButton,
  TextButton,
} from '@signavio/effektif-commons/lib/components/buttons'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { UserAvatar } from '../../../../packages/organizations'

import type { VersionT } from '../../types'

import RestoreDialog from './RestoreDialog'

type PropsT = {
  versionNr: number,
  version: VersionT,

  isLatest: boolean,
  isStartable: boolean,
  showRestoreDialog: boolean,
  children: React$Element<any>,
  readOnly?: boolean,

  onRequestRestore: () => void,
  onAbortRestore: () => void,
  onStart: () => void,
  onRestore: () => void,
  onPublish: () => void,
}

function Version(props: PropsT) {
  const {
    versionNr,
    version,
    isLatest,
    isStartable,
    style,
    readOnly,
    showRestoreDialog,
    children,
    onRequestRestore,
    onAbortRestore,
    onStart,
    onRestore,
    onPublish,
  } = props

  return (
    <TextTile
      header={version.creatorId && <UserAvatar value={version.creatorId} />}
      toolbar={
        <div>
          {isLatest &&
            isStartable &&
            <TextButton {...style('startButton')} onClick={onStart}>
              {i18n('Start new case')}
            </TextButton>}

          <IconButton
            style={style('restoreButton')}
            disabled={readOnly}
            icon="reload"
            onClick={onRequestRestore}
          />
        </div>
      }
      subtitle={
        version.createTime
          ? <Time hideIcon time={version.createTime} />
          : i18n('Just now')
      }
    >
      {children}

      {showRestoreDialog &&
        <RestoreDialog
          versionNr={versionNr}
          isLatest={isLatest}
          onRestore={onRestore}
          onPublish={onPublish}
          onAbort={onAbortRestore}
        >
          {children}
        </RestoreDialog>}
    </TextTile>
  )
}

type ApiPropsT = PropsT & {
  toggleRestoreDialog: (showDialog: boolean) => void,
}

export default compose(
  withState('showRestoreDialog', 'toggleRestoreDialog', false),
  withHandlers({
    onRequestRestore: ({ toggleRestoreDialog }: ApiPropsT) => () =>
      toggleRestoreDialog(true),
    onAbortRestore: ({ toggleRestoreDialog }: ApiPropsT) => () =>
      toggleRestoreDialog(false),
    onRestore: ({ version, onRestore, toggleRestoreDialog }) => () => {
      toggleRestoreDialog(false)
      onRestore(version)
    },
    onPublish: ({ version, onPublish, toggleRestoreDialog }) => () => {
      toggleRestoreDialog(false)
      onPublish(version)
    },
  }),
  defaultStyle(() => ({
    startButton: {
      borderRight: '1px solid white',
    },

    restoreButton: {
      transform: 'scaleX(-1)',
    },

    versionNumber: {
      background: 'white',

      float: 'left',

      textAlign: 'center',
    },
  }))
)(Version)



// WEBPACK FOOTER //
// ./src/processes/views/edit/Version.js
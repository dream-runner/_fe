import React from 'react'
import i18n from 'signavio-i18n'
import { withState, withHandlers, compose } from 'recompose'
import { filter, sortBy, includes, first, last } from 'lodash'

import moment from '@signavio/effektif-commons/lib/extensions/moment'
import { Confirm } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { KeyUtils } from '@signavio/effektif-commons/lib/utils'

import { Field, textType } from '../../../packages/fields'
import type { CaseT } from '../types'

type PropsT = {
  selectedCases: Array<CaseT>,
  title: string,
  confirmText?: string,
  action: string,
  reason: string,
  cascade: boolean,
  toggleCascade: () => void,
  onConfirm: () => void,
  onCancel: () => void,
  onChangeReason: () => void,
  onKeyDown: (event: SyntheticInputEvent) => void,
}

const ConfirmModal = ({
  title,
  confirmText,
  action,
  toggleCascade,
  cascade,
  onConfirm,
  onCancel,
  selectedCases,
  onChangeReason,
  reason,
  onKeyDown,
}: PropsT) => (
  <Confirm
    danger
    title={title}
    confirmText={confirmText}
    onConfirm={onConfirm}
    onCancel={onCancel}
    disabled={action === 'close' && !reason}
  >
    {getInfoText(action, selectedCases)}

    <Hint warning>
      {getWarning(action, selectedCases.length)}

      {action === 'delete' && (
        <Field
          regularBoolean
          type={{ name: 'boolean' }}
          value={cascade}
          onChange={toggleCascade}
          label={
            action === 'delete'
              ? i18n('Also delete all subcases')
              : i18n('Also close all subcases')
          }
        />
      )}
    </Hint>

    {action === 'close' && (
      <Field
        noClear
        type={textType()}
        value={reason}
        placeholder={i18n(
          'Please enter the reason for closing this case',
          'Please enter the reason for closing these cases',
          {
            count: selectedCases.length,
          }
        )}
        onKeyDown={onKeyDown}
        onChange={onChangeReason}
      />
    )}
  </Confirm>
)

const getTimeFrame = selectedCases => {
  const createTimes = sortBy(selectedCases, 'createTime')

  if (createTimes.length > 0) {
    const oldest = moment(first(createTimes).createTime).format('LL')
    const youngest = moment(last(createTimes).createTime).format('LL')

    if (oldest === youngest) {
      return oldest
    }
    return `${oldest} - ${youngest}`
  }
}

const getInfoText = (action, selectedCases) => {
  if (action === 'delete') {
    return i18n(
      'You are about to delete __count__ case from __timeFrame__',
      'You are about to delete __count__ cases in a time frame from __timeFrame__',
      {
        count: selectedCases.length,
        timeFrame: getTimeFrame(selectedCases),
      }
    )
  }

  if (action === 'close') {
    return i18n(
      'You are about to close __count__ case from __timeFrame__',
      'You are about to close __count__ cases in a time frame from __timeFrame__',
      {
        count: selectedCases.length,
        timeFrame: getTimeFrame(selectedCases),
      }
    )
  }
}

const getWarning = (action, count) => {
  if (action === 'delete') {
    return i18n(
      'Are you sure you want to delete this case? This action cannot be undone.',
      'Are you sure you want to delete these cases? This action cannot be undone.',
      { count }
    )
  }

  if (action === 'close') {
    return i18n(
      'Are you sure you want to close this case? This action cannot be undone.',
      'Are you sure you want to close these cases? This action cannot be undone.',
      { count }
    )
  }
}

export default compose(
  withState('cascade', 'toggleCascade', false),
  withState('reason', 'setReason'),
  withHandlers({
    toggleCascade: ({ cascade, toggleCascade }) => () => {
      toggleCascade(!cascade)
    },
    onConfirm: ({ onConfirm, cascade, reason, action, setReason }) => () => {
      if (action === 'close') {
        onConfirm(reason)
        setReason(null)
        return
      }
      onConfirm(cascade)
    },
    onChangeReason: ({ setReason }) => (value: string) => {
      setReason(value)
    },
    onKeyDown: ({ onConfirm, reason, setReason }) => (
      event: SyntheticInputEvent
    ) => {
      if (reason && KeyUtils.isEnter(event)) {
        onConfirm(reason)
        setReason(null)
      }
    },
  })
)(ConfirmModal)



// WEBPACK FOOTER //
// ./src/cases/views/ConfirmModal.js
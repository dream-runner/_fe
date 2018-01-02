// @flow
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import i18n from 'signavio-i18n'

import { Confirm } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { KeyUtils } from '@signavio/effektif-commons/lib/utils'

import { Field, textType } from '../../../../../packages/fields'
import type { ConnectorT, DescriptorT } from '../../../types'

import AffectedWorkflows from './AffectedWorkflows'

type ApiPropsT = {
  connector: ConnectorT,
  descriptor: DescriptorT,
  onCancel: () => void,
  onConfirm: () => void,
}

type PropsT = {
  isValid: boolean,
  onConfirmationTextChange: () => void,
  onKeyDown: (event: Event) => void,
  toggleValid: (isValid: boolean) => void,
} & ApiPropsT

function DeactivateModal({
  connector,
  descriptor,
  isValid,
  onCancel,
  onConfirm,
  onConfirmationTextChange,
  onKeyDown,
}: PropsT) {
  return (
    <Confirm
      danger
      disabled={!isValid}
      confirmText={i18n('Deactivate')}
      title={i18n('Deactivate: __name__', {
        name: descriptor.name,
      })}
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <Hint warning>
        {i18n(
          'Are you sure you want to deactivate this category? You will not be able to add this category as a form field to your processes anymore. To deactivate, type __name__ to confirm.',
          {
            name: <code key="code">{descriptor.name.toLowerCase()}</code>,
          }
        )}
      </Hint>

      <AffectedWorkflows connector={connector} descriptor={descriptor} />

      <Field
        noClear
        onChange={onConfirmationTextChange}
        onKeyDown={onKeyDown}
        type={textType()}
      />
    </Confirm>
  )
}

export default compose(
  withState('isValid', 'toggleValid'),
  withHandlers({
    onConfirmationTextChange: ({ descriptor, toggleValid }: PropsT) => (
      value: string
    ) => {
      toggleValid(
        value && value.toLowerCase() === descriptor.name.toLowerCase()
      )
    },
    onKeyDown: ({ isValid, onConfirm }: PropsT) => (event: Event) => {
      if (KeyUtils.isEnter(event) && isValid) {
        onConfirm()
      }
    },
  })
)(DeactivateModal)



// WEBPACK FOOTER //
// ./src/services/views/spmIntegration/components/DeactivateModal.js
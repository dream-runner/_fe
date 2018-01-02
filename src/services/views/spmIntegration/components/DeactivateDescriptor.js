// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withHandlers, withStateHandlers } from 'recompose'

import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'

import DeactivateModal from './DeactivateModal'

import type { ConnectorT, DescriptorT } from '../../../types'

type ApiPropsT = {
  connector: ConnectorT,
  descriptor: DescriptorT,
  onDeactivate: (descriptor: DescriptorT) => void,
}

type PropsT = {
  onCancel: () => void,
  onConfirm: () => void,
  showConfirm: boolean,
  toggleConfirm: (showConfirm: boolean) => void,
} & ApiPropsT

function DeactivateDescriptor({
  connector,
  descriptor,
  onCancel,
  onConfirm,
  onDeactivate,
  showConfirm,
}: PropsT) {
  return (
    <div>
      <RemoveButton light block onClick={onDeactivate}>
        {i18n('Deactivate')}
      </RemoveButton>

      {showConfirm && (
        <DeactivateModal
          connector={connector}
          descriptor={descriptor}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}
    </div>
  )
}

export default compose(
  withStateHandlers(
    { showConfirm: false },
    {
      toggleConfirm: () => (showConfirm: boolean) => ({
        showConfirm,
      }),
    }
  ),
  withHandlers({
    onCancel: ({ toggleConfirm }: PropsT) => () => {
      toggleConfirm(false)
    },
    onConfirm: ({ descriptor, onDeactivate, toggleConfirm }: PropsT) => () => {
      toggleConfirm(false)
      onDeactivate(descriptor)
    },
    onDeactivate: ({ toggleConfirm }: PropsT) => (event: Event) => {
      event.stopPropagation()
      toggleConfirm(true)
    },
  })
)(DeactivateDescriptor)



// WEBPACK FOOTER //
// ./src/services/views/spmIntegration/components/DeactivateDescriptor.js
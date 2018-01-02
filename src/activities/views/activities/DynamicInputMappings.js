// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { connect, types } from '@signavio/effektif-api'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import DynamicInputs from '../../../../packages/workflows-app/src/actions/components/DynamicInputs'
import type { InputDescriptorT } from '../../../activities/types'

type PropsT = {
  readOnly: boolean,
  refresh: boolean,
  onChangeInputs: () => void,
  inputs: Array<InputDescriptorT>,
} & ApiPropsT

type ApiPropsT = {
  fetchInputs: () => void,
}

const DynamicInputMappings = ({
  readOnly,
  refresh,
  fetchInputs,
  onChangeInputs,
  inputs,
}: PropsT) => {
  if (fetchInputs.pending) {
    return (
      <Hint loading>
        {i18n('Loading input configuration...')}
      </Hint>
    )
  }

  if (fetchInputs.rejected) {
    return (
      <Hint danger>
        {i18n(
          'The following error prevented loading the input configuration: __error__',
          {
            error: fetchInputs.reason,
          }
        )}
      </Hint>
    )
  }

  return (
    <DynamicInputs
      readOnly={readOnly}
      value={inputs.toJSON ? inputs.toJSON() : inputs}
      onChange={onChangeInputs}
      inputDescriptors={fetchInputs.value}
    />
  )
}

export default connect(({ workflowId, actionId, refresh }: PropsT) => ({
  fetchInputs: {
    type: types.INPUT_DESCRIPTORS,
    query: {
      workflowId,
      actionId,
    },
    refresh,
  },
}))(DynamicInputMappings)



// WEBPACK FOOTER //
// ./src/activities/views/activities/DynamicInputMappings.js
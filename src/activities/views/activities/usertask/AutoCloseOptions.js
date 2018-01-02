// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { withHandlers } from 'recompose'

import { Group } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { LabeledBinding, durationType } from '../../../../../packages/fields'
import type {
  ValueBindingT,
  ExpressionBindingT,
  DurationT,
} from '../../../../../packages/fields'

type PropsT = {
  autoClose: ValueBindingT<number, DurationT> | ExpressionBindingT,

  onChange: (
    value: ValueBindingT<number, DurationT> | ExpressionBindingT
  ) => void,
}

function AutoCloseOptions({ autoClose, onChange }: PropsT) {
  return (
    <Group title={i18n('Automatic close')}>
      <Hint>
        {i18n(
          'If this task is optional you can automatically close it after a certain amount of time.'
        )}
      </Hint>

      <LabeledBinding
        allowStatic
        label={i18n('Close this task after')}
        type={durationType}
        binding={autoClose}
        onChange={onChange}
      />
    </Group>
  )
}

type AutoClosePartialT = {
  autoClose: ValueBindingT<number, DurationT> | ExpressionBindingT,
}

type ApiPropsT = PropsT & {
  onChange: (value: AutoClosePartialT) => void,
}

const enhance = withHandlers({
  onChange: ({ onChange }: ApiPropsT) => (
    autoClose: ValueBindingT<number, DurationT> | ExpressionBindingT
  ) => onChange({ autoClose }),
})

export default enhance(AutoCloseOptions)



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/AutoCloseOptions.js
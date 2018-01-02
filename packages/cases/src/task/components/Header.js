// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'

import { PrimaryHeader } from '@signavio/effektif-commons/lib/components/headers'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { TaskT } from '../../types'

type ApiPropsT = {
  canAssign: boolean,
  onChange: (task: TaskT) => void,
  readOnly: boolean,
  task: TaskT,
}

type PropsT = {
  onNameChange: (event: Event) => void,
} & ApiPropsT

const Header = ({ readOnly, style, task, onNameChange }: PropsT) =>
  <PrimaryHeader
    light
    style={style}
    readOnly={readOnly}
    value={task.name}
    onBlur={onNameChange}
    placeholder={i18n('What is specific for this task?')}
  />

export default compose(
  withHandlers({
    onNameChange: ({ task, readOnly, onChange }: PropsT) => ({
      target,
    }: SyntheticInputEvent) => {
      if (readOnly) {
        return
      }

      onChange({
        ...task,
        name: target.value,
      })
    },
  }),
  defaultStyle(({ padding, font }) => ({
    paddingTop: 0,
  }))
)(Header)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/Header.js
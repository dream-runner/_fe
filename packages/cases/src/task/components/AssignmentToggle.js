// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { User, Group } from '@signavio/workflow-organizations'

type ToggleT = {
  assigneeId?: string,
  assigneeGroupId?: string,
  disabled?: boolean,
}

export default function AssignmentToggle({
  assigneeId,
  assigneeGroupId,
  disabled,
}: ToggleT) {
  if (assigneeId) {
    return <User small transparent value={assigneeId} />
  }

  if (assigneeGroupId) {
    return <Group small transparent value={assigneeGroupId} />
  }

  return <Hint inline>{i18n('Unassigned')}</Hint>
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/AssignmentToggle.js
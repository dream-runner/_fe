// @flow
import React, { Element } from 'react'

import i18n from 'signavio-i18n'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import type { TaskT } from '../../../../types'

export function taskName(task: TaskT): string | Element {
  return task.name || <Hint inline>{i18n('Unnamed task')}</Hint>
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/utils/index.js
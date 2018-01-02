// @flow
import type { CompactProcessT } from '../types'

export * as BindingUtils from './Binding'
export * as VariableUtils from './Variable'

export function isApprovalWorkflow(proc: CompactProcessT) {
  const { trigger } = proc

  return !!trigger && trigger.type === 'approvalWorkflow'
}

export function isPublished(proc: CompactProcessT) {
  return !!proc.latestVersion
}

export getAccessDefinition from './getAccessDefinition'
export getInitialRights from './getInitialRights'
export removeInputsWithKey from './removeInputsWithKey'



// WEBPACK FOOTER //
// ./src/processes/utils/index.js
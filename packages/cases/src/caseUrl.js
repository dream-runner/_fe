import { getCurrentOrgKey } from '@signavio/effektif-api'

export default ({ caseId, taskId }): string => {
  const url = `/${getCurrentOrgKey()}/case/${caseId}`

  if (taskId) {
    return `${url}/task/${taskId}`
  }

  return url
}



// WEBPACK FOOTER //
// ./packages/cases/src/caseUrl.js
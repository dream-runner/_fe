import $ from 'jquery'

import { LoginUtils } from 'commons-utils'

export function retrieveWorkflows(organization) {
  return new Promise((resolve, reject) => {
    $.get(
      LoginUtils.makeUrl('/workflows', organization)
    ).then((body, status, response) => {
      if (status !== 'success') {
        return reject(response, status, body)
      }

      resolve(body)
    })
  })
}



// WEBPACK FOOTER //
// ./src/tasks/utils/WorkflowUtils.js
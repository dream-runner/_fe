import $ from 'jquery'
import i18n from 'i18n'

import { Query } from 'commons-models'
import { LoginUtils } from 'commons-utils'

export default class ProcessQuery extends Query {
  constructor(organization, process) {
    super(...arguments)

    this.organization = organization
    this.process = process
  }

  fetch(query, options = {}) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: LoginUtils.makeUrl('workflows', this.organization),
        data: {
          name: query,
        },
      }).then((results, status, xhr) => {
        // this.setSize(xhr);

        resolve(this.transformProcesses(results))
      })
    })
  }

  getDescriptor() {
    return {
      id: 'process',
      size: this.size,
      name: i18n('Processes'),
    }
  }

  transformProcesses(processes) {
    return processes.filter(p => p.id !== this.process.id).map(p => ({
      value: p.name,
      entity: p,
      type: 'process',
    }))
  }
}



// WEBPACK FOOTER //
// ./src/activities/models/ProcessQuery.js
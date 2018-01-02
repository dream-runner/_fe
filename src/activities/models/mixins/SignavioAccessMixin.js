import Login from 'singleton/Login'

import { grantRights, revokeRight } from '../../../../packages/access'

const neededRights = ['view', 'start', 'casesView']

module.exports = {
  initialize() {
    this.on('attach', (model, process) => {
      this.ensureSignavioAccess(process)
      process.on('publish', this.ensureSignavioAccess, this)
    })
    this.on('detach', (model, process) => {
      process.off('publish', this.ensureSignavioAccess, this)
      this.removeSignavioAccess(process)
    })
  },

  getSignavioSystemUserId() {
    const org = Login.getActiveOrganization()

    return org && org.systemUserIds[0]
  },

  ensureSignavioAccess(process) {
    if (!process.get('access')) {
      return
    }

    const systemUserId = this.getSignavioSystemUserId()

    if (!systemUserId) {
      return
    }

    process.set(
      'access',
      grantRights(process.get('access'), neededRights, {
        id: systemUserId,
        type: 'user',
      })
    )
  },

  removeSignavioAccess(process) {
    if (!process.get('access')) {
      return
    }

    const systemUserId = this.getSignavioSystemUserId()
    let access = process.get('access')

    if (!systemUserId) {
      return
    }

    neededRights.forEach(right => {
      access = revokeRight(access, right, {
        id: systemUserId,
        type: 'user',
      })
    })

    process.set('access', access)
  },
}



// WEBPACK FOOTER //
// ./src/activities/models/mixins/SignavioAccessMixin.js
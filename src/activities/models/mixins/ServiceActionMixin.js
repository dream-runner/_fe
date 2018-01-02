import _ from 'underscore'
import Form from 'forms/models/Form'
import OAuthUtils from 'services/utils/OAuthUtils'
import Account from 'services/models/Account'
import Login from 'singleton/Login'

// A mixin for the Activity models for service actions
module.exports = {
  embeddings: {
    // configuration : Form
  },

  references: {
    account: Account,
  },

  setAccount: function(account) {
    this.set('account', account)
    if (account && account.get('userId') === Login.user().id) {
      account.ensureOrganizationHasRestrictedAccess(
        Login.organization(),
        Login.user()
      )
    }

    this.save()
  },

  addAccount: function(clb) {
    var service = this.get('type').getService()
    var accounts = service && service.get('accounts')

    if (!service || !accounts) {
      return
    }

    var activity = this

    OAuthUtils.performOAuth(service, null, () => {
      accounts.once('sync', () => {
        if (accounts.length) {
          activity.setAccount(accounts.last())
        }

        if (clb) {
          clb()
        }
      })

      // Fetch again the accounts and set the account
      accounts.fetch()
    })
  },

  refreshAccount: function(clb) {
    var service = this.get('type').getService()
    var accounts = service && service.get('accounts')
    var account = this.get('account')

    if (!service || !account) {
      return
    }

    OAuthUtils.performOAuth(
      service,
      account,
      () => {
        account.set('needsAuthorization', null)

        accounts.once(
          'sync',
          () => {
            if (clb) {
              clb()
            }
          },
          this
        )

        accounts.fetch()
      },
      this
    )
  },
}



// WEBPACK FOOTER //
// ./src/activities/models/mixins/ServiceActionMixin.js
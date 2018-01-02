import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import Service from 'services/models/Service'
import Account from 'services/models/Account'

import { BaseMixin } from 'commons-mixins'

import AccountSelect from './AccountSelectView'

module.exports = createReactClass({
  displayName: 'AccountConfiguration',

  mixins: [BaseMixin],

  propTypes: {
    service: PropTypes.instanceOf(Service).isRequired,

    onSelect: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,

    account: PropTypes.instanceOf(Account),
    readOnly: PropTypes.bool,
    hideAccount: PropTypes.bool,
  },

  render: function() {
    return (
      <div className="account-configuration">
        {this.renderAccount()}
      </div>
    )
  },

  renderAccount: function() {
    if (this.props.hideAccount) {
      return
    }

    return (
      <AccountSelect
        readOnly={this.props.readOnly}
        service={this.props.service}
        value={this.props.account}
        collection={this.props.service.get('accounts')}
        onSelect={this.props.onSelect}
        onAdd={this.props.onAdd}
        onRemove={this.handleRemove}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/service/AccountConfigView.js
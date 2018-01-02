import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'
import { InfiniteScroll } from 'commons-components'

import RegistrationQuery from '../../models/params/RegistrationQuery'
import RegistrationCollection from '../../collections/RegistrationCollection'

import Registration from './Registration'

module.exports = createReactClass({
  displayName: 'RegistrationList',

  mixins: [BaseMixin],

  propTypes: {
    query: PropTypes.instanceOf(RegistrationQuery).isRequired,
    collection: PropTypes.instanceOf(RegistrationCollection).isRequired,
  },

  render: function() {
    return (
      <div className="registration-list">
        <InfiniteScroll
          collection={this.props.collection}
          requestData={this.props.query.print()}
          emptyMessage={i18n('No registrations found.')}
          loadingMessage={i18n('Loading registrations...')}
        >

          {this.renderRegistrations()}
        </InfiniteScroll>
      </div>
    )
  },

  renderRegistrations: function() {
    return this.props.collection.map(this.renderRegistration)
  },

  renderRegistration: function(registration) {
    return <Registration key={registration.cid} model={registration} />
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/registrations/Registrations.js
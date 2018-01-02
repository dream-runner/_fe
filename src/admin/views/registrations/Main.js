import PropTypes from 'prop-types'
import React from 'react'

import createReactClass from 'create-react-class'

import { BaseMixin } from 'commons-mixins'

import Router from 'singleton/Router'

import RegistrationQuery from '../../models/params/RegistrationQuery'
import RegistrationModel from '../../models/Registration'
import RegistrationCollection from '../../collections/RegistrationCollection'

import Managed from '../ManagedView'
import RegistrationOptions from './Options'
import RegistrationList from './Registrations'

module.exports = createReactClass({
  displayName: 'ManageRegistrations',

  mixins: [BaseMixin],

  propTypes: {
    query: PropTypes.instanceOf(RegistrationQuery).isRequired,

    model: PropTypes.instanceOf(RegistrationModel),
    collection: PropTypes.instanceOf(RegistrationCollection),
  },

  render: function() {
    return (
      <Managed className="manage-registrations" filters={this.renderFilters()}>
        {this.renderContent()}
      </Managed>
    )
  },

  renderContent: function() {
    if (this.props.model) {
      return this.renderRegistration()
    }

    return this.renderList()
  },

  renderList: function() {
    return (
      <RegistrationList
        collection={this.props.collection}
        query={this.props.query}
      />
    )
  },

  renderFilters: function() {
    return (
      <RegistrationOptions
        model={this.props.query}
        onChange={this.handleOptionsChange}
      />
    )
  },

  handleOptionsChange: function() {
    var url = Router.reverse('admin_registrations')

    Router.navigate(url, {
      search: `?${this.props.query.toString()}`,
    })

    this.props.collection.reset()
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/registrations/Main.js
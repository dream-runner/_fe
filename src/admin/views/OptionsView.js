import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'

import Query from '../models/params/Query'

import Option from './OptionView'

import { Select as OrganizationSelect } from './organizations'
import { Select as UserSelect } from './users'

module.exports = class extends React.Component {
  static displayName = 'Options'

  static propTypes = {
    model: PropTypes.instanceOf(Query).isRequired,
    onChange: PropTypes.func.isRequired,

    hideUser: PropTypes.bool,
    hideOrganization: PropTypes.bool,
  }

  render() {
    return (
      <div className="options">
        {this.renderOrganization()}
        {this.renderUser()}

        {this.props.children}
      </div>
    )
  }

  renderOrganization = () => {
    if (this.props.hideOrganization) {
      return
    }

    return (
      <Option title={i18n('Organization')}>
        <OrganizationSelect
          value={this.props.model.get('organization')}
          onChange={this.handleOrganizationChange}
        />
      </Option>
    )
  }

  renderUser = () => {
    if (this.props.hideUser) {
      return
    }

    return (
      <Option title={i18n('User')}>
        <UserSelect
          organization={this.props.model.get('organization')}
          value={this.props.model.get('user')}
          onChange={this.handleUserChange}
        />
      </Option>
    )
  }

  handleOrganizationChange = organization => {
    this.props.model.set('organization', organization)
    this.props.onChange()
  }

  handleUserChange = user => {
    this.props.model.set('user', user)
    this.props.onChange()
  }
}



// WEBPACK FOOTER //
// ./src/admin/views/OptionsView.js
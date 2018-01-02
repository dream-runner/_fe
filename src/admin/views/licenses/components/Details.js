import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'

import LicenseModel from '../../../models/License'

import Details from '../../DetailsView'
import Controls from '../../ControlsView'
import FormItem from '../../FormItemView'

import { Select as OrganizationSelect } from '../../organizations'

import License from '../License'
import Generator from '../Generator'

import LicenseTypeSelect from '../TypeSelect'

module.exports = createReactClass({
  displayName: 'AuthDetails',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(LicenseModel).isRequired,
    category: PropTypes.string.isRequired,
  },

  render: function() {
    var { model, ...rest } = this.props

    return (
      <Details className="auth-info" model={model}>
        <FormItem label={i18n('Type')} required={true}>
          {this.renderTypeSelect()}
        </FormItem>

        <FormItem label={i18n('Organization')} required={true}>
          {this.renderOrganizationSelect()}
        </FormItem>

        {this.renderItem(i18n('Creation date'), 'creationDate')}
        {this.renderItem(i18n('Expiration date'), 'expirationDate')}
        {this.renderItem(i18n('Packages'), 'packages')}

        {this.renderDetails()}

        {this.renderAssignOnActivation()}

        <Controls
          model={model}
          deleteWarning={this.getDeleteMessage()}
          {...rest}
        />
      </Details>
    )
  },

  renderItem: function(label, field, description, required) {
    return (
      <FormItem
        label={label}
        description={description}
        field={field}
        model={this.props.model}
        required={required}
      />
    )
  },

  getDeleteMessage: function() {
    if (this.props.model.get('isGenerator')) {
      return i18n('Are you sure you want to delete this generator?')
    }

    return i18n('Are you sure you want to delete this license?')
  },

  renderDetails: function() {
    var { model, category, ...rest } = this.props

    if (category === 'licenses') {
      return <License model={model} {...rest} />
    }

    return <Generator model={model} />
  },

  renderTypeSelect: function() {
    const { model } = this.props

    return (
      <LicenseTypeSelect
        readOnly={!model.isNew()}
        value={model.get('type')}
        onChange={type => model.set('type', type)}
      />
    )
  },

  renderOrganizationSelect: function() {
    return (
      <OrganizationSelect
        readOnly={!this.props.model.isNew()}
        value={this.props.model.get('organization')}
        onChange={this.handleOrganizationChange}
      />
    )
  },

  renderAssignOnActivation: function() {
    if (this.props.model.get('id')) {
      return
    }
    // only render this option when creating new licenses / generators
    return this.renderItem(
      i18n('Auto assign on creation '),
      'assignOnActivation',
      i18n(
        'If set to YES, new licenses will automatically be assigned to existing users.'
      )
    )
  },

  handleOrganizationChange: function(organization) {
    this.props.model.set('organization', organization)
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/licenses/components/Details.js
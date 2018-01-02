import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import { BaseMixin } from 'commons-mixins'
import {
  DropdownSelect,
  Option,
} from '@signavio/effektif-commons/lib/components/forms'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import Router from 'singleton/Router'

import AuthQuery from '../../../models/params/AuthQuery'

import Options from '../../OptionsView'
import FilterOption from '../../OptionView'

import LicenseTypeSelect from '../TypeSelect'

var CATEGORIES = [
  {
    id: 'licenses',
    value: i18n('Licenses'),
  },
  {
    id: 'generators',
    value: i18n('Generators'),
  },
]

module.exports = createReactClass({
  displayName: 'AuthOptions',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(AuthQuery),
  },

  render: function() {
    return (
      <div className="auth-options">
        <FilterOption title={i18n('Category')}>
          {this.renderCategorySelect()}
        </FilterOption>

        <IconButton light block icon="plus" onClick={this.createAuthEntity}>
          {i18n('Create new')}
        </IconButton>

        <Options model={this.props.model} onChange={this.props.onChange}>
          <FilterOption title={i18n('License type')}>
            {this.renderLicenseTypeSelect()}
          </FilterOption>

          {this.renderOption(i18n('Expiration date'), 'expirationDate')}
          {this.renderOption(i18n('Used'), 'used', 'licenses')}
        </Options>
      </div>
    )
  },

  renderOption: function(title, field, category) {
    if (category && this.props.category !== category) {
      return
    }

    return (
      <FilterOption
        title={title}
        field={field}
        model={this.props.model}
        onChange={this.props.onChange}
      />
    )
  },

  createAuthEntity: function() {
    var url = Router.reverse('admin_auth', {
      tab: this.props.category,
      id: 'new',
    })

    Router.navigate(url, { search: `?${this.props.model.toString()}` })
  },

  renderLicenseTypeSelect: function() {
    return (
      <LicenseTypeSelect
        allowClear
        value={this.getValue()}
        placeholder={i18n('Select an license type')}
        onChange={this.handleLicenseTypeChange}
      />
    )
  },

  getValue: function() {
    if (this.props.model.get('type')) {
      return this.props.model.get('type').id
    }
  },

  handleLicenseTypeChange: function(licenseType) {
    this.props.model.set('type', licenseType)
    this.props.onChange()
  },

  renderCategorySelect: function() {
    return (
      <DropdownSelect
        onChange={this.handleCategoryChange}
        value={this.props.category}
      >
        {CATEGORIES.map(category => (
          <Option key={category.id} value={category.id} name={category.value} />
        ))}
      </DropdownSelect>
    )
  },

  handleCategoryChange: function(category) {
    var url = Router.reverse('admin_auth', {
      tab: category,
    })

    Router.navigate(url, {
      search: `?${this.props.model.toString()}`,
    })
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/licenses/components/Options.js
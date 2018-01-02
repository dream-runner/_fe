import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'

import { LicenseUtils } from 'organizations/utils'

import Purchase from '../../models/Purchase'

import Details from '../DetailsView'
import FormItem from '../FormItemView'
import { Select as OrganizationSelect } from '../organizations'
import { Select as UserSelect } from '../users'

module.exports = createReactClass({
  displayName: 'Purchase',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Purchase).isRequired,
    onComplete: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <Details className="purchase" model={this.props.model}>
        <FormItem label={i18n('License type')} readOnly>
          {this.renderLicenseType()}
        </FormItem>

        {this.renderItem(i18n('Number of licenses'), 'count')}

        <FormItem label={i18n('Organization')}>
          <OrganizationSelect
            value={this.props.model.get('organization')}
            readOnly
          />
        </FormItem>

        <FormItem label={i18n('Ordered by')}>
          <UserSelect value={this.props.model.get('orderedBy')} readOnly />
        </FormItem>

        {this.renderItem(i18n('Ordered on'), 'created')}
        {this.renderItem(i18n('Billing type'), 'billingType')}
        {this.renderItem(i18n('Bill to'), 'billTo')}
        {this.renderItem(i18n('Company'), 'company')}
        {this.renderItem(i18n('Address'), 'address')}
        {this.renderItem(i18n('Contact email'), 'emailAddress')}
        {this.renderItem(i18n('Contact phone'), 'phone')}

        {this.renderActiviator()}

        <div className="form-controls">
          {this.renderCompleteButton()}
          {this.renderRejectButton()}
        </div>
      </Details>
    )
  },

  renderLicenseType: function() {
    return LicenseUtils.getTitle(this.props.model.get('licenseType'))
  },

  renderActiviator: function() {
    if (!this.props.model.get('completedBy')) {
      return
    }
    let rejected = !!this.props.model.get('rejected')
    return (
      <FormItem label={rejected ? i18n('Rejected by') : i18n('Approved by')}>
        <UserSelect value={this.props.model.get('completedBy')} readOnly />
      </FormItem>
    )
  },

  renderCompleteButton: function() {
    if (this.props.model.get('completed')) {
      if (this.props.model.get('rejected')) {
        return
      }
      return (
        <button
          disabled
          className="btn btn-eff-primary btn-text btn-add-on btn-add-left"
        >

          <i className="icon signavio-icon icon-check" />

          {i18n('Approved')}
        </button>
      )
    }

    return (
      <button
        className="btn btn-eff-primary btn-text btn-add-on btn-add-left"
        onClick={this.handleComplete}
      >

        <i className="icon signavio-icon icon-check" />
        {i18n('Approve order')}
      </button>
    )
  },

  handleComplete: function() {
    this.props.onComplete(this.props.model)
  },

  renderRejectButton: function() {
    if (this.props.model.get('completed')) {
      if (!this.props.model.get('rejected')) {
        return
      }
      return (
        <button
          disabled
          className="btn btn-eff-primary btn-text btn-add-on btn-add-left"
        >

          <i className="icon signavio-icon icon-times" />

          {i18n('Rejected')}
        </button>
      )
    }

    return (
      <button
        className="btn btn-eff-primary btn-text btn-add-on btn-add-left"
        onClick={this.handleReject}
      >

        <i className="icon signavio-icon icon-times" />
        {i18n('Reject order')}
      </button>
    )
  },

  handleReject: function() {
    this.props.onReject(this.props.model)
  },

  renderItem: function(label, field) {
    return (
      <FormItem label={label} field={field} model={this.props.model} readOnly />
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/purchases/Details.js
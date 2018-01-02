import PropTypes from 'prop-types'
import React from 'react'

import createReactClass from 'create-react-class'

import { moment } from '@signavio/effektif-commons/lib/extensions'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'

import Router from 'singleton/Router'

import AuthQuery from '../../../models/params/AuthQuery'

import ManageAuthDetails from './ManageDetails'
import AuthOptions from './Options'
import AuthList from './List'

module.exports = createReactClass({
  displayName: 'Auth',

  mixins: [BaseMixin],

  propTypes: {
    query: PropTypes.instanceOf(AuthQuery).isRequired,
  },

  getInitialState: function() {
    return {
      batch: null,
    }
  },

  render: function() {
    return (
      <div className="manage-auth">
        <div className="row">
          <div className="col-md-3">
            <AuthOptions
              category={this.props.category}
              model={this.props.query}
              onChange={this.handleOptionsChange}
            />
          </div>
          <div className="col-md-9">{this.renderContent()}</div>
        </div>
      </div>
    )
  },

  renderContent: function() {
    if (!this.props.model && !this.state.batch) {
      return (
        <AuthList
          category={this.props.category}
          collection={this.props.collection}
          query={this.props.query}
          onBulkEdit={this.handleBulkEdit}
          onDelete={this.handleDelete}
        />
      )
    }

    return (
      <ManageAuthDetails
        model={this.props.model}
        batch={this.state.batch}
        category={this.props.category}
        onGeneratorClick={this.handleGeneratorClick}
        onBatchSave={this.handleBatchSave}
        onSave={this.handleSave}
        onDiscard={this.handleDiscard}
        onDelete={this.handleDelete}
      />
    )
  },

  handleBatchSave: function() {
    this.setState({
      batch: null,
    })
  },

  handleGeneratorClick: function(generator) {
    var url = Router.reverse('admin_auth', {
      id: generator.id,
      tab: 'generators',
    })

    Router.navigate(url, { search: `?${this.props.query.toString()}` })
  },

  handleDelete: function(model) {
    if (model) {
      model.destroy()
    }

    Router.navigate(
      Router.reverse('admin_auth', {
        tab: this.props.category,
      }),
      { search: `?${this.props.query.toString()}` }
    )
  },

  handleOptionsChange: function() {
    var url = Router.reverse('admin_auth', {
      tab: this.props.category,
    })

    Router.navigate(url, { search: `?${this.props.query.toString()}` })

    this.props.collection.reset()
  },

  handleBulkEdit: function(batch) {
    this.setState({
      batch: batch,
    })
  },

  handleSave: function(model) {
    let expirationDate = model.get('expirationDate')

    if (expirationDate) {
      expirationDate = moment(expirationDate)

      // the server expects the expirationDate as utc but without offset and time consideration
      // example: local= 21.10.2016 00:00:00 -> utc 21.10.2016 00:00:00
      const utcDate = moment.utc(
        expirationDate.format('MM-DD-YYYY'),
        'MM-DD-YYYY'
      )

      model.set('expirationDate', utcDate.toISOString())
    }

    model.save()

    var url = Router.reverse('admin_auth', {
      tab: this.props.category,
    })

    Router.navigate(url, {
      search: `?${this.props.query.toString()}`,
    })
  },

  handleDiscard: function() {
    var url = Router.reverse('admin_auth', {
      tab: this.props.category,
    })

    this.setState({
      batch: null,
    })

    Router.navigate(url, {
      search: `?${this.props.query.toString()}`,
    })
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/licenses/components/Main.js
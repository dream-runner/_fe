import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'
import { InfiniteScroll, Hint } from 'commons-components'

import Router from 'singleton/Router'
import { LicenseUtils } from 'organizations/utils'

import PurchaseQuery from '../../models/params/PurchaseQuery'
import Purchase from '../../models/Purchase'
import PurchaseCollection from '../../collections/PurchaseCollection'
import PurchaseOptions from './Options'
import PurchaseListItem from './Purchase'
import PurchaseDetails from './Details'

module.exports = createReactClass({
  displayName: 'Purchases',

  mixins: [BaseMixin],

  propTypes: {
    collection: PropTypes.instanceOf(PurchaseCollection).isRequired,
    query: PropTypes.instanceOf(PurchaseQuery).isRequired,

    model: PropTypes.instanceOf(Purchase),
  },

  getInitialState: function() {
    return {
      completing: null,
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (
      this.state.completing &&
      nextState.completing !== this.state.completing
    ) {
      this.state.completing.off(null, null, this)
    }
  },

  componentWillUnmount: function() {
    if (!this.state.completing) {
      return
    }

    this.state.completing.off(null, null, this)
  },

  render: function() {
    return (
      <div className="purchases">
        <div className="row">
          <div className="col-sm-3">
            <PurchaseOptions
              model={this.props.query}
              onChange={this.handleQueryChange}
            />
          </div>
          <div className="col-sm-9">{this.renderContent()}</div>
        </div>

        {this.renderCompletingMessage()}
      </div>
    )
  },

  renderCompletingMessage: function() {
    if (!this.state.completing) {
      return
    }

    return (
      <Hint modal={true} loading={true}>
        {i18n(
          'Completing purchase of __count__ __type__ license...',
          'Completing purchase of __count__ __type__ licenses...',
          {
            count: this.state.completing.get('count'),
            type: LicenseUtils.getTitle(
              this.state.completing.get('licenseType')
            ),
          }
        )}
      </Hint>
    )
  },

  renderContent: function() {
    if (this.props.model) {
      return (
        <PurchaseDetails
          model={this.props.model}
          onComplete={this.handleComplete}
          onReject={this.handleReject}
        />
      )
    }

    return (
      <InfiniteScroll
        collection={this.props.collection}
        loadingMessage={i18n('Loading purchases...')}
        emptyMessage={i18n('No purchases found.')}
        requestData={this.props.query.print()}
      >
        {this.props.collection.map(this.renderPurchase)}
      </InfiniteScroll>
    )
  },

  handleComplete: function(purchase) {
    this.setState({
      completing: purchase,
    })

    purchase.once(
      'action:complete',
      function() {
        this.setState({
          completing: false,
        })

        purchase.set('completed', true)

        this.props.collection.reset()
      },
      this
    )

    purchase.action('complete')
  },

  handleReject: function(purchase) {
    this.setState({
      completing: purchase,
    })

    purchase.once(
      'action:reject',
      function() {
        this.setState({
          completing: false,
        })

        purchase.set('rejected', true)
        purchase.set('completed', true)

        this.props.collection.reset()
      },
      this
    )

    purchase.action('reject')
  },

  handleQueryChange: function() {
    var url = Router.reverse('admin_purchase')

    Router.navigate(url, { search: `?${this.props.query.toString()}` })

    this.props.collection.reset()
  },

  renderPurchase: function(purchase) {
    return (
      <PurchaseListItem
        key={purchase.cid}
        query={this.props.query}
        model={purchase}
        onComplete={this.handleComplete}
        onReject={this.handleReject}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/purchases/Purchases.js
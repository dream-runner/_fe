import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'

import moment from '@signavio/effektif-commons/lib/extensions/moment'

import { Tile } from 'commons-components'

import Router from 'singleton/Router'
import { LicenseUtils } from 'organizations/utils'

import Purchase from '../../models/Purchase'

module.exports = class extends React.Component {
  static displayName = 'PurchaseListItem'

  static propTypes = {
    model: PropTypes.instanceOf(Purchase).isRequired,
    onComplete: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Tile
        user={this.props.model.get('orderedBy')}
        toolbar={this.renderToolbar()}
        subtitle={this.createSubtitle()}
      >

        {this.renderLink()}
      </Tile>
    )
  }

  createSubtitle = () => {
    let subtitle = this.props.model.get('organization').get('name')
    if (this.props.model.get('orderedBy')) {
      subtitle +=
        ' (' + this.props.model.get('orderedBy').get('emailAddress') + ')'
    }
    return subtitle
  }

  renderLink = () => {
    var url = Router.reverse('admin_purchase', {
      id: this.props.model.id,
      query: this.props.query.toString(),
    })

    return (
      <a className="title-link" href={url}>

        {i18n('__count__ __type__ (__date__)', {
          count: this.props.model.get('count'),
          type: LicenseUtils.getTitle(this.props.model.get('licenseType')),
          date: moment(this.props.model.get('created')).format('LL'),
        })}
      </a>
    )
  }

  renderToolbar = () => {
    if (this.props.model.get('completed')) {
      if (this.props.model.get('rejected')) {
        return (
          <button className="btn" disabled={true}>
            <i className="icon signavio-icon icon-times" />
          </button>
        )
      }
      return (
        <button className="btn" disabled={true}>
          <i className="icon signavio-icon icon-check" />
        </button>
      )
    }

    return [
      <button className="btn" onClick={this.handleComplete}>
        <i className="icon signavio-icon icon-check" />
      </button>,
      <button className="btn" onClick={this.handleReject}>
        <i className="icon signavio-icon icon-times" />
      </button>,
    ]
  }

  handleComplete = () => {
    this.props.onComplete(this.props.model)
  }

  handleReject = () => {
    this.props.onReject(this.props.model)
  }
}



// WEBPACK FOOTER //
// ./src/admin/views/purchases/Purchase.js
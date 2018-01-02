import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import moment from '@signavio/effektif-commons/lib/extensions/moment'

import Router from 'singleton/Router'

import ReleaseOptions from './ReleaseOptions'
import ReleaseDetails from './ManageReleaseDetails'

import { BaseMixin } from 'commons-mixins'
import { InfiniteScroll, List } from 'commons-components'
import { TextTile } from 'commons-components/tiles'

export default createReactClass({
  displayName: 'ManageReleases',

  mixins: [BaseMixin],

  render: function() {
    return (
      <div className="manage-releases">
        <div className="row">
          <div className="col-md-3">
            <ReleaseOptions
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
    if (this.props.model) {
      return (
        <ReleaseDetails
          model={this.props.model}
          onSave={this.handleSave}
          onDiscard={this.handleDiscard}
          onDelete={this.handleDelete}
        />
      )
    }

    return (
      <InfiniteScroll
        className="entries"
        loadingMessage={i18n('Loading releases...')}
        emptyMessage={i18n('No releases found')}
        requestData={this.props.query.print()}
        collection={this.props.collection}
      >
        <List>{this.props.collection.map(this.renderRelease)}</List>
      </InfiniteScroll>
    )
  },

  navigateToOverview: function() {
    let url = Router.reverse('admin_releases')

    Router.navigate(url, {
      search: `?${this.props.query.toString()}`,
    })
  },

  handleSave: function(model) {
    model.save()

    this.navigateToOverview()
  },

  handleDiscard: function() {
    this.navigateToOverview()
  },

  handleDelete: function(model) {
    model.destroy()

    this.navigateToOverview()
  },

  renderRelease: function(release) {
    return (
      <TextTile
        key={release.id}
        subtitle={moment(release.get('releaseDate')).format('LL')}
      >
        {this.renderLink(release)}
      </TextTile>
    )
  },

  renderLink: function(release) {
    let url = Router.reverse('admin_releases', {
      query: this.props.query.toString(),
      id: release.id,
    })

    return <a href={url}>{release.get('title')}</a>
  },

  handleOptionsChange: function() {
    var url = Router.reverse('admin_releases')

    Router.navigate(url, { search: `?${this.props.query.toString()}` })

    this.props.collection.reset()
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/ManageReleases.js
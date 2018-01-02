import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import Router from 'singleton/Router'

import { BaseMixin } from 'commons-mixins'
import { padding, variables } from 'commons-style'
import { InfiniteScroll, List } from 'commons-components'

import { UserTile } from '../../../../packages/organizations'

import FeedbackCollection from '../../collections/FeedbackCollection'
import FeedbackQuery from '../../models/params/FeedbackQuery'
import Feedback from '../../models/Feedback'

import { getFeedbackOptions } from '@signavio/effektif-api'

import FeedbackOptions from './Options'
import FeedbackDetails from './Details'

module.exports = createReactClass({
  displayName: 'Feedback',

  mixins: [BaseMixin],

  propTypes: {
    collection: PropTypes.instanceOf(FeedbackCollection),
    model: PropTypes.instanceOf(Feedback),
    query: PropTypes.instanceOf(FeedbackQuery),
  },

  render: function() {
    return (
      <div className="feedback">
        <div className="row">
          <div className="col-sm-3">
            <FeedbackOptions
              model={this.props.query}
              onChange={this.handleQueryChange}
            />
          </div>

          <div className="col-sm-9">{this.renderContent()}</div>
        </div>
      </div>
    )
  },

  renderContent: function() {
    if (this.props.model) {
      return <FeedbackDetails model={this.props.model} />
    }

    return (
      <InfiniteScroll
        collection={this.props.collection}
        requestData={this.props.query.print()}
        loadingMessage={i18n('Loading feedback...')}
        emptyMessage={i18n('No feedback to show.')}
      >
        <List>{this.props.collection.map(this.renderFeedback)}</List>
      </InfiniteScroll>
    )
  },

  handleQueryChange: function() {
    var url = Router.reverse('admin_feedback')

    Router.navigate(url, { search: `?${this.props.query.toString()}` })

    this.props.collection.reset()
  },

  renderFeedback: function(feedback) {
    return (
      <UserTile
        className="item"
        key={feedback.id}
        toolbar={this.renderVersion(feedback)}
        subtitle={
          feedback.get('organization').get('name') +
          ' — ' +
          this.renderSubject(feedback)
        }
        user={feedback.get('user').toJSON()}
      >
        <a href={Router.reverse('admin_feedback', { id: feedback.id })}>
          {feedback.get('message')}
        </a>
      </UserTile>
    )
  },

  renderVersion: function(feedback) {
    return (
      <label
        className="label label-info"
        style={{
          lineHeight: `${variables.lineHeight.block}px`,
          marginRight: padding.normal,
        }}
      >
        {feedback.get('effektifVersion')}
      </label>
    )
  },

  renderSubject: function(feedback) {
    return _.find(getFeedbackOptions(), function(subject) {
      return feedback.get('subject') === subject.id
    }).value
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/feedback/Main.js
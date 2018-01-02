import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import _ from 'underscore'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { InfiniteScroll, List } from '@signavio/effektif-commons/lib/components'

import GeneratorCollection from '../../../collections/GeneratorCollection'
import LicenseCollection from '../../../collections/LicenseCollection'
import AuthQuery from '../../../models/params/AuthQuery'

import AuthItem from './Item'
import AuthActions from './Actions'

module.exports = createReactClass({
  displayName: 'AuthList',

  mixins: [BaseMixin],

  propTypes: {
    category: PropTypes.string.isRequired,
    collection: PropTypes.oneOfType([
      PropTypes.instanceOf(LicenseCollection),
      PropTypes.instanceOf(GeneratorCollection),
    ]).isRequired,
    query: PropTypes.instanceOf(AuthQuery).isRequired,

    onBulkEdit: PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      selection: [],
    }
  },

  componentWillMount: function() {
    this.props.collection.on(
      'reset',
      function() {
        this.setState({
          selection: [],
        })
      },
      this
    )
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextProps.category !== this.props.category) {
      this.setState({
        selection: [],
      })
    }
  },

  componentWillUnmount: function() {
    this.props.collection.off(null, null, this)
  },

  render: function() {
    return (
      <div className="auth-list">
        {this.renderActions()}

        <InfiniteScroll
          className={this.props.category}
          collection={this.props.collection}
          requestData={this.props.query.print()}
          clearOnInitialLoad={true}
          loadingMessage={this.getLoadingMessage()}
          emptyMessage={this.getEmptyMessage()}
        >

          <List>
            {this.props.collection.map(this.renderItem)}
          </List>
        </InfiniteScroll>
      </div>
    )
  },

  renderActions: function() {
    if (this.props.category === 'generators') {
      return
    }
    return (
      <AuthActions
        selection={this.state.selection}
        category={this.props.category}
        onDelete={this.handleDelete}
        onEdit={this.props.onBulkEdit}
      />
    )
  },

  handleDelete: function() {
    this.setState({
      selection: [],
    })

    this.props.onDelete()
  },

  getLoadingMessage: function() {
    if (this.props.category === 'licenses') {
      return i18n('Loading licenses...')
    }

    return i18n('Loading generators...')
  },

  getEmptyMessage: function() {
    if (this.props.category === 'licenses') {
      return i18n('No licenses available.')
    }

    return i18n('No generators available.')
  },

  renderItem: function(item) {
    let params = {
      key: item.id,
      model: item,
      query: this.props.query,
    }
    if (this.props.category === 'licenses') {
      params.isSelected = _.includes(this.state.selection, item)
      params.onSelect = this.handleSelect
      params.onDeselect = this.handleDeselect
    }
    return <AuthItem {...params} />
  },

  handleSelect: function(item) {
    this.setState({
      selection: this.state.selection.concat(item),
    })
  },

  handleDeselect: function(item) {
    this.setState({
      selection: _.without(this.state.selection, item),
    })
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/licenses/components/List.js
import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { QueryContainer } from '@signavio/effektif-commons/lib/models'
import { Autocomplete } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'

import Router from 'singleton/Router'

import { UserQuery } from '../../models'
import User from '../../models/User'

import { UserTile } from '../../../../packages/organizations'

module.exports = createReactClass({
  displayName: 'UserSelect',

  mixins: [BaseMixin],

  propTypes: {
    value: PropTypes.instanceOf(User),
    readOnly: PropTypes.bool,

    onChange: PropTypes.func,
  },

  getInitialState: function() {
    return {
      query: new QueryContainer(new UserQuery(this.props.organization)),
    }
  },

  componentWillMount: function() {
    if (this.props.value && !this.props.value.isSynced) {
      this.setState({
        loading: true,
      })

      this.props.value.once(
        'sync',
        function() {
          this.setState({
            loading: false,
          })
        },
        this
      )

      if (!this.props.value.isSyncing) {
        this.props.value.fetch()
      }
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.value && prevProps.value !== this.props.value) {
      prevProps.value.off(null, null, this)
    }

    if (prevProps.organization !== this.props.organization) {
      this.setState({
        query: new QueryContainer(new UserQuery(this.props.organization)),
      })
    }
  },

  componentWillUnmount: function() {
    if (this.props.value) {
      this.props.value.off(null, null, this)
    }
  },

  render: function() {
    return (
      <div className="user-select">
        {this.renderSelect()}
      </div>
    )
  },

  renderSelect: function() {
    if (this.state.loading) {
      return (
        <TextTile icon="user">
          <Hint loading inline>
            {i18n('Loading user...')}
          </Hint>
        </TextTile>
      )
    }

    if (this.props.value) {
      return (
        <UserTile
          user={this.props.value.toJSON()}
          toolbar={this.renderToolbar()}
          subtitle={this.props.value.get('emailAddress')}
        >
          <a href={Router.reverse('admin_users', { id: this.props.value.id })}>
            {this.props.value.name()}
          </a>
        </UserTile>
      )
    }

    return (
      <Autocomplete
        static={this.props.static}
        placeholder={i18n('Please select a user')}
        query={this.state.query}
        renderItem={this.renderUser}
        onComplete={this.handleUserSelect}
      />
    )
  },

  renderUser: function(item) {
    return (
      <UserTile
        transparent
        user={item.entity}
        subtitle={item.entity.emailAddress}
      >
        {item.value}
      </UserTile>
    )
  },

  renderToolbar: function() {
    if (this.props.readOnly) {
      return
    }

    return <RemoveButton onClick={this.clear} />
  },

  clear: function() {
    this.props.onChange(null)
  },

  handleUserSelect: function(item) {
    this.props.onChange(new User(item.entity))
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/users/Select.js
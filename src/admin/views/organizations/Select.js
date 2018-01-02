import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { QueryContainer } from '@signavio/effektif-commons/lib/models'
import { Autocomplete } from '@signavio/effektif-commons/lib/components'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { Tile, TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import Router from 'singleton/Router'

import { OrganizationQuery } from '../../models'

export default createReactClass({
  displayName: 'OrganizationSelect',

  mixins: [BaseMixin],

  propTypes: {
    value: PropTypes.object,
    readOnly: PropTypes.bool,

    onChange: PropTypes.func,
  },

  getInitialState: function() {
    return {
      query: new QueryContainer(new OrganizationQuery()),
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
  },

  componentWillUnmount: function() {
    if (this.props.value) {
      this.props.value.off(null, null, this)
    }
  },

  render: function() {
    return (
      <div className="organization-select">
        {this.renderSelect()}
      </div>
    )
  },

  renderSelect: function() {
    if (!this.props.value) {
      return (
        <Autocomplete
          readOnly={this.props.readOnly}
          query={this.state.query}
          placeholder={i18n('Please select an organization')}
          renderItem={this.renderOrganization}
          onComplete={this.handleSelect}
        />
      )
    }

    if (this.state.loading) {
      return (
        <TextTile iconSet="fontAwesome" icon="building-o">

          <Hint loading inline>
            {i18n('Loading organization...')}
          </Hint>
        </TextTile>
      )
    }

    return (
      <TextTile
        iconSet="fontAwesome"
        icon="building-o"
        toolbar={this.renderToolbar()}
        subtitle={this.props.value.id}
      >

        <a
          href={Router.reverse('admin_organizations', {
            id: this.props.value.id,
          })}
        >
          {this.props.value.get('name')}
        </a>
      </TextTile>
    )
  },

  renderOrganization: function(item) {
    return (
      <TextTile
        iconSet="fontAwesome"
        transparent
        icon="building-o"
        subtitle={item.entity.id}
      >
        {item.value}
      </TextTile>
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

  handleSelect: function(item) {
    this.props.onChange(item.entity)
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/organizations/Select.js
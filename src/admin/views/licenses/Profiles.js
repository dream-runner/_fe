import PropTypes from 'prop-types'
import React from 'react'
import { each } from 'lodash'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { QueryContainer } from 'commons-models'

import { BaseMixin } from 'commons-mixins'

import { Autocomplete, Hint } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import LicenseProfileCollection from '../../collections/LicenseProfileCollection'
import Organization from '../../models/Organization'

import { ProfileQuery } from '../../models'

export default createReactClass({
  displayName: 'LicenseProfiles',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Organization).isRequired,
    collection: PropTypes.instanceOf(LicenseProfileCollection).isRequired,
  },

  getInitialState: function() {
    return {
      query: new QueryContainer(new ProfileQuery()),
      adding: false,
    }
  },

  componentWillUnmount: function() {
    this.props.model.off(null, null, this)
  },

  render: function() {
    return (
      <div className="license-profiles">
        {this.props.collection.map(this.renderLicenseProfile)}

        <Autocomplete
          placeholder={i18n('Activate another edition')}
          query={this.state.query}
          renderItem={this.renderItem}
          onResult={this.markExisting}
          onComplete={this.handleProfileAdd}
        />

        {this.renderAddHint()}
      </div>
    )
  },

  renderAddHint: function() {
    if (!this.state.adding) {
      return
    }

    return (
      <Hint modal={true} loading={true}>
        {i18n('Adding license profile to __org__', {
          org: this.props.model.get('name'),
        })}
      </Hint>
    )
  },

  handleProfileAdd: function(item) {
    const action = `licenseProfiles/${item.entity.id}`

    this.setState({
      adding: true,
    })

    this.props.model.once(
      `action:${action}`,
      function() {
        this.props.model.once(
          'sync',
          function() {
            this.setState({
              adding: false,
            })
          },
          this
        )

        this.props.model.fetch()
      },
      this
    )

    this.props.model.action(action)
  },

  markExisting: function(results) {
    each(results, result => {
      this.props.collection.each(profile => {
        if (profile.id !== result.entity.id) {
          return
        }

        result.disabled = true
      })
    })
  },

  renderItem: function(item) {
    return (
      <TextTile icon="cube">
        {item.value}
      </TextTile>
    )
  },

  renderLicenseProfile: function(profile) {
    return (
      <TextTile key={profile.cid} icon="cube">
        {profile.id}
      </TextTile>
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/licenses/Profiles.js
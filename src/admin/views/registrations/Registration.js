import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Hint, Popover } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import Registration from '../../models/Registration'

module.exports = createReactClass({
  displayName: 'Registration',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Registration).isRequired,
  },

  getInitialState: function() {
    return {
      resending: false,
      resent: false,
    }
  },

  componentWillUnmount: function() {
    this.props.model.off(null, null, this)
  },

  render: function() {
    return (
      <TextTile
        icon="at"
        subtitle={this.renderOrganization()}
        toolbar={
          <Popover small popover={i18n('Resend invitation')}>
            <IconButton icon="reload" onClick={this.resend} />
          </Popover>
        }
      >
        {this.props.model.get('user').get('emailAddress')}

        {this.renderResending()}
        {this.renderResent()}
      </TextTile>
    )
  },

  renderResent: function() {
    if (!this.state.resent) {
      return
    }

    return (
      <Hint info modal onDismiss={this.hideResent}>
        {i18n('The confirmation mail has been resent to __address__', {
          address: this.props.model.get('user').get('emailAddress'),
        })}
      </Hint>
    )
  },

  hideResent: function() {
    this.setState({
      resent: false,
    })
  },

  renderResending: function() {
    if (!this.state.resending) {
      return
    }

    return (
      <Hint loading modal>
        {i18n('Resending confirmation mail to __address__', {
          address: this.props.model.get('user').get('emailAddress'),
        })}
      </Hint>
    )
  },

  renderOrganization: function() {
    if (!this.props.model.get('organization')) {
      return
    }

    return this.props.model.get('organization').get('name')
  },

  resend: function() {
    this.setState({
      resending: true,
    })

    this.props.model.once(
      'action:resend',
      function() {
        this.setState({
          resending: false,
          resent: true,
        })
      },
      this
    )

    this.props.model.action('resend')
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/registrations/Registration.js
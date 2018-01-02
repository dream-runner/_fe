import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'

import RegistrationQuery from '../../models/params/RegistrationQuery'

import Options from '../OptionsView'
import Option from '../OptionView'

module.exports = createReactClass({
  displayName: 'RegistrationOptions',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(RegistrationQuery).isRequired,

    onChange: PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <Options
        model={this.props.model}
        onChange={this.props.onChange}
        hideUser={true}
      >

        {this.renderOption(i18n('Mail address'), 'emailAddress')}
        {this.renderOption(i18n('Registered after'), 'after')}
        {this.renderOption(i18n('Registered before'), 'before')}
      </Options>
    )
  },

  renderOption: function(title, field) {
    return (
      <Option
        model={this.props.model}
        field={field}
        title={title}
        onChange={this.props.onChange}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/registrations/Options.js
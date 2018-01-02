import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'

import Options from '../OptionsView'
import Option from '../OptionView'

module.exports = createReactClass({
  displayName: 'PurchaseOptions',

  mixins: [BaseMixin],

  render: function() {
    return (
      <Options model={this.props.model} onChange={this.props.onChange}>
        {this.renderOption(i18n('Completed'), 'completed')}
        {this.renderOption(i18n('Order after'), 'after')}
        {this.renderOption(i18n('Order before'), 'before')}
      </Options>
    )
  },

  renderOption: function(title, field) {
    return (
      <Option
        title={title}
        field={field}
        model={this.props.model}
        onChange={this.props.onChange}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/purchases/Options.js
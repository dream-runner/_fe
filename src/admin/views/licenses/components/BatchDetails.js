import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { BaseMixin } from 'commons-mixins'

import { LabeledField } from '../../../../../packages/fields'

import Controls from '../../ControlsView'

module.exports = createReactClass({
  displayName: 'BatchDetails',

  mixins: [BaseMixin],

  render: function() {
    return (
      <div className="auth-batch-info">
        <h4 className="container-header">
          {i18n('Editing __count__ item', 'Editing __count__ items', {
            count: this.props.model.get('references').length,
          })}
        </h4>

        {this.renderItem(i18n('Expiration date'), 'expirationDate')}
        {this.renderItem(i18n('Packages'), 'packages')}

        <Controls
          model={this.props.model}
          onDiscard={this.props.onDiscard}
          onSave={this.props.onSave}
        />
      </div>
    )
  },

  renderItem: function(label, field) {
    const instance = this.props.model.field(field)

    return (
      <LabeledField
        label={label}
        {...instance.toJSON()}
        onComplete={value => instance.set('value', value)}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/licenses/components/BatchDetails.js
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'
import { Hint, List } from 'commons-components'

import FormItem from '../FormItemView'
import Controls from '../ControlsView'
import { Field } from '../../../../packages/fields'

export default createReactClass({
  displayName: 'Info',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      saving: false,
      saved: false,
    }
  },

  render: function() {
    return (
      <div className="info">
        {this.renderSaveHint()}

        <List>
          {this.renderItem(i18n('Name'), 'name')}
          {this.renderItem(i18n('Custom style'), 'customCSS')}
          {this.renderItem(i18n('Tenant ID'), 'tenantId')}
          {this.renderItem(i18n('Use central SSO'), 'useCentralSSO')}
        </List>

        <Controls
          model={this.props.model}
          enableDelete={false}
          onDiscard={this.handleDiscard}
          onSave={this.handleSave}
        />
      </div>
    )
  },

  renderItem: function(label, field) {
    return <FormItem label={label} field={field} model={this.props.model} />
  },

  handleDiscard: function() {
    this.props.model.discardUnsavedChanges()
  },

  renderSaveHint: function() {
    if (this.state.saving) {
      return (
        <Hint loading={true} modal={true}>
          {i18n('Saving changes to __org__', {
            org: this.props.model.get('name'),
          })}
        </Hint>
      )
    }

    if (this.state.saved) {
      return (
        <Hint info={true}>
          {i18n('All changes have been saved.')}
        </Hint>
      )
    }
  },

  handleSave: function() {
    if (!this.props.model.hasUnsavedChanges()) {
      return
    }

    this.setState({
      saving: true,
    })

    this.props.model.once(
      'sync',
      function() {
        this.setState({
          saving: false,
          saved: true,
        })
      },
      this
    )

    this.props.model.save()
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/organizations/Info.js
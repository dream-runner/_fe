import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { BaseMixin } from 'commons-mixins'
import Toolbar from './ToolbarView'

import { PrimaryHeader } from 'commons-components/headers'
import { LabelSuggestionsView } from '../../../../packages/organizations'

module.exports = createReactClass({
  displayName: 'Header',

  mixins: [BaseMixin],

  render: function() {
    return (
      <PrimaryHeader
        autoFocus={this.props.model.isNew()}
        value={this.props.model.get('name')}
        onChange={ev => this.props.model.set('name', ev.target.value)}
        onKeyDown={this.handleKeyDown}
        onBlur={this.changeTitle}
        readOnly={this.props.readOnly}
        placeholder={i18n('Type the name or goal of the process')}
        toolbar={this.renderToolbar()}
        style={{
          title: {
            marginBottom: 0,
          },
        }}
      />
    )
  },

  renderToolbar: function() {
    const { model, readOnly } = this.props

    if (model.isNew()) {
      return (
        <LabelSuggestionsView
          onChange={this.handleLabelsChange}
          readOnly={readOnly}
        />
      )
    }

    return (
      <div>
        <LabelSuggestionsView
          onChange={this.handleLabelsChange}
          readOnly={readOnly}
          value={model.get('labels') || []}
        />
        <Toolbar readOnly={readOnly} model={model} />
      </div>
    )
  },

  changeTitle: function() {
    if (this.props.model.isNew() && !this.props.model.get('name')) {
      return
    }

    this.props.model.save()
  },

  handleKeyDown: function(event) {
    if (event.keyCode !== 13) {
      return
    }

    event.target.blur()
  },

  handleLabelsChange: function(labels) {
    const { model } = this.props

    if (model.isNew() && !model.get('labelIds')) {
      return
    }

    model.set('labelIds', labels.map(label => label.id))
    model.save()
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/HeaderView.js
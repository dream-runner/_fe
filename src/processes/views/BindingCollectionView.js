import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import _ from 'underscore'
import { BaseMixin } from 'commons-mixins'

import { FieldStructure } from '../../../packages/fields'

import { Autocomplete, List } from 'commons-components'
import { Tile, TextTile } from 'commons-components/tiles'
import { IconButton } from 'commons-components/buttons'
import { Hint } from 'commons-components/hints'

module.exports = createReactClass({
  displayName: 'BindingCollectionView',

  mixins: [BaseMixin],

  getDefaultProps: function() {
    return {
      placeholder: i18n('Click to add a field'),
      label: null,
    }
  },

  render: function() {
    return (
      <FieldStructure narrowLabel label={this.props.label}>
        {this.renderItems()}

        <div className="add-item">
          <Tile icon="link">
            <Autocomplete
              resetOnBlur
              ref="autocomplete"
              readOnly={this.props.readOnly}
              data={this.getItems()}
              renderItem={this.renderBindable}
              placeholder={this.props.placeholder}
              emptyText={i18n('No matching fields found')}
              onComplete={this.handleComplete}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              onResult={this.handleQueryResult}
            />
          </Tile>
        </div>
      </FieldStructure>
    )
  },

  handleQueryResult: function(result) {
    _.each(result, item => {
      var contained = this.props.collection.find(b => b.id === item.entity.id)

      item.disabled = !!contained
    })
  },

  renderItems: function() {
    if (this.props.collection.length === 0) {
      return
    }

    return (
      <List>
        {this.props.collection.map(this.renderBinding)}
      </List>
    )
  },

  getItems: function() {
    return _.map(this.props.bindables, function(bindable) {
      return {
        entity: bindable,
        value: bindable.getName(),
      }
    })
  },

  renderBinding: function(binding) {
    return (
      <TextTile
        key={binding.id}
        icon={binding.getType().getIcon()}
        toolbar={this.renderBindingToolbar(binding)}
      >

        {binding.getName()}
      </TextTile>
    )
  },

  renderBindingToolbar: function(binding) {
    return (
      <IconButton
        component="a"
        icon="times"
        style={{ display: 'block' }}
        disabled={this.props.readOnly}
        onClick={this.removeBinding.bind(null, binding)}
      />
    )
  },

  renderBindable: function(item) {
    var bindable = item.entity

    return (
      <TextTile
        style={{ backgroundColor: null }}
        icon={bindable.getType().getIcon()}
      >
        {this.renderBindableName(bindable)}
      </TextTile>
    )
  },

  renderBindableName: function(bindable) {
    var name = bindable.getName()

    if (!name) {
      return (
        <Hint inline>
          {i18n('Unnamed __type__', { type: bindable.getType().getName() })}
        </Hint>
      )
    }

    return name
  },

  queryBindables: function(query) {
    var bindings = this.props.collection
    return _.filter(this.props.bindables, function(bindable) {
      return (
        !(bindings && bindings.get(bindable.id)) && // not already in the list
        (!query ||
          bindable.getName().toLowerCase().indexOf(query.toLowerCase()) >= 0)
      )
    })

    transform(result)
  },

  handleComplete: function(item) {
    var bindable = item.entity
    this.props.collection.add(bindable.copy())

    if (this.props.onChange) {
      this.props.onChange()
    }
  },

  removeBinding: function(binding, ev) {
    if (this.props.readOnly) {
      return
    }

    this.props.collection.remove(binding)
    if (this.props.onChange) {
      this.props.onChange()
    }

    // do not focus the add new input (triggered by label click)
    ev.preventDefault()
    ev.stopPropagation()
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/BindingCollectionView.js
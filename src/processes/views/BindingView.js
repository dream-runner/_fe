import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import ReactDOM from 'react-dom'
import i18n from 'i18n'
import { filter, sortBy } from 'lodash'

import { CSSUtils } from 'commons-utils'
import { Autocomplete, Tile, Hint, Icon } from 'commons-components'
import { IconButton } from 'commons-components/buttons'
import { TextTile } from 'commons-components/tiles'
import { BaseMixin } from 'commons-mixins'

import { FieldStructure } from '../../../packages/fields'

import Activity from 'activities/models/Activity'

import Field from 'forms/models/Field'
import { Field as FieldView } from 'forms/views'

import Binding from '../models/Binding'
import ProcessConstituent from '../models/ProcessConstituent'

import BindingCollectionView from './BindingCollectionView'

module.exports = createReactClass({
  displayName: 'BindingView',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(ProcessConstituent).isRequired,
    attribute: PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      attribute: 'binding',
      placeholder: i18n('Click to select a field'),
      canClear: false, // can the selected binding be cleared
      label: null,
      autoFocusIfEmpty: false,
      allowStatic: false,
    }
  },

  getInitialState: function() {
    var binding = this.getBinding()
    return {
      showExpressionBinding: false, // only used when allowStatic prop is set to true
      changingExpression: this.props.autoFocusIfEmpty && !binding,
    }
  },

  getBinding: function() {
    return this.props.model.get(this.props.attribute)
  },

  render: function() {
    var TypedBindingClass = this.getTypedBindingClass()
    if (TypedBindingClass.isCollection) {
      return this.renderBindingCollection()
    }

    return this.renderSingleBinding()
  },

  renderSingleBinding: function() {
    return (
      <FieldStructure narrowLabel label={this.props.label}>
        {this.renderControl()}
      </FieldStructure>
    )
  },

  renderControl: function() {
    if (this.props.disabled) {
      return
    }

    var binding = this.getBinding()

    if (
      !this.props.allowStatic ||
      this.state.showExpressionBinding ||
      (binding && binding.get('expression'))
    ) {
      return this.renderExpressionBinding()
    }

    return this.renderStaticBinding()
  },

  renderBindingCollection: function() {
    var bindables =
      this.props.bindables || this.props.model.getProcess().getBindables()
    return (
      <BindingCollectionView
        collection={this.getBinding()}
        bindables={bindables}
        readOnly={this.props.readOnly}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        label={this.props.label}
      />
    )
  },

  getTypedBindingClass: function() {
    // use nested inputs object's embeddings for non-core activity types
    var useInputs =
      this.props.model instanceof Activity &&
      !this.props.model.get('type').get('isCore')

    var embeddings = useInputs
      ? this.props.model.get('inputs').embeddings
      : this.props.model.embeddings

    return embeddings[this.props.attribute] || Binding
  },

  // renders a form field to allow entering a static value for the binding
  renderStaticBinding: function() {
    var TypedBindingClass = this.getTypedBindingClass()
    var binding = this.getBinding()
    var type =
      (binding && binding.getType()) ||
      TypedBindingClass.prototype.staticType ||
      this.props.type

    var field
    if (type) {
      field = new Field({
        type: type,
        placeholder: i18n('Enter a value'),
        value: binding && binding.get('value'),
      })
      field.on(
        'change:value',
        function() {
          this.props.model.set(this.props.attribute, {
            value: field.get('value'),
          })
        },
        this
      )
    }

    return (
      <Tile
        className="static-binding"
        toolbar={this.renderStaticBindingToolbar()}
      >
        {field &&
          <FieldView
            readOnly={this.props.readOnly}
            model={field}
            save={this.props.onChange}
          />}
      </Tile>
    )
  },

  renderStaticBindingToolbar: function() {
    return (
      <IconButton
        component="a"
        style={{ display: 'block' }}
        icon="link"
        disabled={this.props.readOnly}
        onClick={this.showExpressionBinding}
      />
    )
  },

  // renders an autocomplete to select a matching expression bindable
  renderExpressionBinding: function() {
    return (
      <div className="select">
        <Tile
          className="expression-binding"
          icon={this.renderIcon()}
          toolbar={this.renderExpressionBindingToolbar()}
        >
          {this.state.changingExpression
            ? this.renderAutocomplete()
            : this.renderExpressionBindingValue()}
        </Tile>
      </div>
    )
  },

  renderExpressionBindingToolbar: function() {
    var showClear =
      (this.props.canClear || this.props.allowStatic) && !!this.getBinding()

    if (showClear) {
      return (
        <IconButton
          component="a"
          icon="times"
          style={{ display: 'block' }}
          disabled={this.props.readOnly}
          onClick={this.clearBinding}
        />
      )
    }
    let { changingExpression } = this.state

    return (
      <IconButton
        iconSet="fontAwesome"
        component="a"
        ref="toggleButton"
        style={{ display: 'block' }}
        disabled={this.props.readOnly}
        onClick={this.toggleChangingExpression}
        icon={changingExpression ? 'angle-up' : 'angle-down'}
      />
    )
  },

  renderIcon: function() {
    if (!this.props.model.get('binding')) {
      return
    }

    return CSSUtils.cls(
      {
        'signavio-icon': true,
      },
      this.props.model.get('binding').getType().getIcon()
    )
  },

  renderExpressionBindingValue: function() {
    var binding = this.getBinding()
    return (
      <input
        readOnly
        type="text"
        className="form-control"
        value={binding && binding.getName()}
        placeholder={this.props.placeholder}
        onClick={this.toggleChangingExpression}
      />
    )
  },

  renderAutocomplete: function() {
    return (
      <Autocomplete
        autoFocus
        blurOnComplete
        data={this.getBindables()}
        readOnly={this.props.readOnly}
        renderItem={this.renderItem}
        renderValue={this.renderAutocompleteValue}
        onComplete={this.handleComplete}
        emptyText={i18n('No matching fields found')}
        onBlur={this.handleBlur}
      />
    )
  },

  renderItem: function(item) {
    var bindable = item.entity
    return (
      <TextTile
        style={{ backgroundColor: null }}
        subtitle={
          bindable.getType().isList() ? bindable.getType().getName() : null
        }
        icon={bindable.getType().getIcon()}
      >

        {this.renderName(bindable)}
      </TextTile>
    )
  },

  renderName: function(bindable) {
    if (bindable.hasName()) {
      return bindable.getName()
    }

    return (
      <Hint inline>
        {bindable.getName()}
      </Hint>
    )
  },

  getBindables: function() {
    var TypedBindingClass = this.getTypedBindingClass()
    var type = TypedBindingClass.prototype.staticType || this.props.type

    var bindables =
      this.props.bindables || this.props.model.getProcess().getBindables()

    if (type) {
      bindables = filter(bindables, bindable =>
        bindable.getType().convertsTo(type)
      )
    }

    bindables = bindables.map(bindable => ({
      value: bindable.getName(),
      entity: bindable,
      id: bindable.id,
    }))

    return sortBy(bindables, ({ value = '' }) => value.toLowerCase())
  },

  toggleChangingExpression: function(ev) {
    if (this.props.readOnly) {
      return
    }

    ev.nativeEvent.stopImmediatePropagation()

    this.setState({
      changingExpression: !this.state.changingExpression,
    })
  },

  handleComplete: function(item) {
    this.props.model.set(this.props.attribute, item.entity.copy())
    //this.setState({ changingExpression: false });

    if (this.props.onChange) {
      this.props.onChange()
    }
  },

  clearBinding: function(ev) {
    if (this.props.readOnly) {
      return
    }

    this.props.model.set(this.props.attribute, null)

    this.setState({
      showExpressionBinding: false,
    })

    if (this.props.onChange) {
      this.props.onChange()
    }

    // do not bubble click event up to the parent
    ev.stopPropagation()
  },

  showExpressionBinding: function(ev) {
    this.setState({
      showExpressionBinding: true,
      changingExpression: true,
    })

    ev.nativeEvent.stopImmediatePropagation()
  },

  handleBlur: function(ev) {
    this.setState({
      showExpressionBinding: false,
    })

    var toggleButtonEl = ReactDOM.findDOMNode(this.refs.toggleButton)
    if (
      !toggleButtonEl ||
      (ev.target !== toggleButtonEl && !toggleButtonEl.contains(ev.target))
    ) {
      this.setState({
        changingExpression: false,
      })
    }

    if (this.props.onBlur) {
      this.props.onBlur.apply(null, arguments)
    }
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/BindingView.js
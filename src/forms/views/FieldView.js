import PropTypes from 'prop-types'
// @flow
import React from 'react'

import createReactClass from 'create-react-class'

import { isFunction, omit } from 'lodash'
import { compose, mapProps } from 'recompose'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { withValidation } from '@signavio/effektif-commons/lib/components/forms'

import Field from '../models/Field'

import * as __FieldViews__ from './fields'

import FieldStructure from './FieldStructureView'

const FormField = createReactClass({
  displayName: 'FormField',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Field).isRequired,

    save: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  },

  componentWillMount: function() {
    this.props.model.on(
      'validate',
      function() {
        this.tryForceUpdate()
      },
      this
    )
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.model && prevProps.model !== this.props.model) {
      prevProps.model.off(null, null, this)

      this.props.model.on(
        'validate',
        function() {
          this.tryForceUpdate()
        },
        this
      )
    }
  },

  componentWillUnmount: function() {
    this.props.model.off(null, null, this)

    this.save(true)
  },

  render: function() {
    const {
      model,
      required,
      description,
      regularBoolean,
      style,
      ...rest
    } = this.props

    var type = model.get('type') && model.get('type').get('name')
    if (!type) {
      console.error(`Field '${model.id}' does not have a type.`)
      return null
    }

    return (
      <FieldStructure
        className={'field-' + model.get('type').get('name')}
        label={this.getLabel()}
        description={model.get('description') || description}
        readOnly={this.isReadOnly()}
        required={(model.get('required') || required) && !model.get('readOnly')}
        disabled={model.get('disabled')}
        regularBoolean={regularBoolean}
        {...style}
      >

        {this.renderControl()}
      </FieldStructure>
    )
  },

  getLabel: function() {
    if (this.props.unlabeled) {
      return
    }

    if (this.props.model.get('asButtons')) {
      return
    }

    var label = this.props.label || this.props.model.get('name')

    if (!label && this.props.forceLabel) {
      return ' '
    }

    return label
  },

  isReadOnly: function() {
    return this.props.model.get('readOnly') || this.props.readOnly
  },

  renderControl: function() {
    if (this.props.children) {
      return this.props.children
    }

    var Control = this.getViewClass()

    var { model, readOnly, onComplete, ...rest } = this.props

    // TODO: This is a mess and must go away!
    const {
      placeholder,
      name,
      type,
      value,
      disabled,
      asButtons,
    } = model.toJSON()
    return (
      <Control
        model={model}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={value => model.set('value', value)}
        label={this.getLabel()}
        asButtons={asButtons}
        {...omit(rest, 'style', 'className')}
        onComplete={value => {
          this.save()

          if (onComplete) {
            onComplete(value)
          }
        }}
        readOnly={readOnly || model.get('disabled')}
      />
    )
  },

  getViewClass: function() {
    const { model, listItem } = this.props

    const type = model.get('type').get('name')

    const { Edit, Read, ListRead } = __FieldViews__[type]

    if (listItem && ListRead) {
      return ListRead
    }

    if (this.isReadOnly()) {
      if (!Read) {
        throw new Error(`Could not find read view for type '${type}'`)
      }

      return Read
    }

    if (!Edit) {
      throw new Error(`Could not find edit view for type '${type}'`)
    }

    return Edit
  },

  save: function(unmounting) {
    if (!this.props.model.validateValue()) {
      return
    }

    if (this.isReadOnly()) {
      return
    }

    if (this.props.save === true) {
      this.props.model.save()
    } else if (isFunction(this.props.save)) {
      this.props.save(this.props.model, this, unmounting)
    }
  },
})

export default compose(
  mapProps(props => ({
    ...props,
    validationErrors: props.model.getValueErrors(),
  })),
  withValidation
)(FormField)



// WEBPACK FOOTER //
// ./src/forms/views/FieldView.js
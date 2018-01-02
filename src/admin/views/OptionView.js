import React, { Component } from 'react'

import Field from '../../../packages/fields'

import { Group } from 'commons-components'

export default class Option extends Component {
  static defaultProps = {
    showLabel: false,
  }

  render() {
    return (
      <Group className="option" narrow title={this.props.title}>
        {this.renderControl()}
      </Group>
    )
  }

  renderControl() {
    if (!this.props.field) {
      return this.props.children
    }

    const instance = this.props.model.field(this.props.field)

    return (
      <Field
        {...instance.toJSON()}
        onComplete={value => {
          instance.set('value', value)

          this.props.onChange(instance)
        }}
      />
    )
  }
}



// WEBPACK FOOTER //
// ./src/admin/views/OptionView.js
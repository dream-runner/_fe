import PropTypes from 'prop-types'
import React from 'react'

import createReactClass from 'create-react-class'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import { User } from '../../../packages/organizations'

import Binding from '../models/Binding'

module.exports = createReactClass({
  displayName: 'BindingTile',

  propTypes: {
    model: PropTypes.instanceOf(Binding).isRequired,
  },

  mixins: [BaseMixin],

  render: function() {
    var { model, ...rest } = this.props
    const user =
      model.isStatic() &&
      model.getType().get('name') === 'userId' &&
      model.get('value')

    if (user) {
      return <User {...rest} value={user.id} />
    }

    return (
      <TextTile {...rest} icon={this.getIcon()}>

        {this.getName()}
      </TextTile>
    )
  },

  getIcon: function() {
    var model = this.props.model
    var type = model.getType()
    if (model.isStatic()) {
      // if(!type.getReferenceModel()) {
      //     return null;
      // }

      if (type.get('name') === 'fileId') {
        return model.get('value').getIcon()
      }
    }

    return 'signavio-icon ' + type.getIcon()
  },

  getName: function() {
    var { model } = this.props
    if (!model.isStatic()) {
      return model.getName()
    }

    var value = model.get('value')

    switch (model.getType().get('name')) {
      case 'fileId':
        return value.get('name')
      case 'userId':
        return value.name()
      case 'groupId':
        return value.get('name')
    }

    return JSON.stringify(value)
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/BindingTile.js
import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import { BaseMixin } from 'commons-mixins'
import { Autocomplete, List } from 'commons-components'
import { Tile } from 'commons-components/tiles'
import { IconButton } from 'commons-components/buttons'
import {
  QueryContainer,
  UserQuery,
  GroupQuery,
  EmailQuery,
} from 'commons-models'
import { Organization } from 'commons-propTypes'

import BindingTile from 'processes/views/BindingTile'

import Action from 'activities/models/Action'
import VariableType from 'processes/models/VariableType'
import BindingModel from 'processes/models/Binding'

import { BindableQuery } from 'processes/models'

import { Binding, bindingUtils } from '../../../../../packages/fields'

// the following values are concatenaded to the `parameter` prop's value to derive the
// attribute keys for the "email" Action's inputs
var PARAMETER_ATTR_EXTENSIONS = {
  userId: 'UserIds',
  groupId: 'GroupIds',
  emailAddress: 'EmailAddresses',
}

module.exports = createReactClass({
  displayName: 'AddresseeSelect',

  mixins: [BaseMixin],

  contextTypes: {
    organization: Organization.isRequired,
  },

  propTypes: {
    parameter: PropTypes.string.isRequired,
    model: PropTypes.instanceOf(Action).isRequired,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      readOnly: false,
      onChange: function() {},
    }
  },

  render: function() {
    return (
      <div className="addressee-select">
        {this.renderCurrentBindings()}
        {this.renderAutocomplete()}
      </div>
    )
  },

  renderAutocomplete: function() {
    return (
      <Tile icon="user">
        <Autocomplete
          resetOnComplete
          resetOnBlur
          readOnly={this.props.readOnly}
          query={this.getQuery()}
          onResult={this.handleQueryResult}
          renderItem={this.renderItem}
          placeholder={i18n(
            'Search for fields, people, or enter a valid email address'
          )}
          emptyText={i18n('Please enter a valid email address')}
          onComplete={this.add}
        />
      </Tile>
    )
  },

  renderItem: function(item) {
    return <BindingTile transparent model={this.itemToBinding(item)} />
  },

  renderCurrentBindings: function() {
    var bindings = this.getCurrentBindings(true)
    if (bindings.length === 0) {
      return
    }

    return (
      <List>
        {bindings
          .map(binding => ({
            binding: binding.toJSON(),
            model: binding,
          }))
          .map((item, index) => (
            <Tile
              key={index}
              icon={
                bindingUtils.hasStaticTypeWithName(item.binding, 'emailAddress')
                  ? 'at'
                  : null
              }
              toolbar={
                <IconButton
                  icon="times"
                  disabled={this.props.readOnly}
                  onClick={this.remove.bind(null, item.model)}
                />
              }
            >
              <Binding
                readOnly
                binding={item.binding}
                type={item.binding.type}
              />
            </Tile>
          ))}
      </List>
    )
  },

  getCurrentBindings: function(sorted) {
    var currentBindings = []
    _.each(PARAMETER_ATTR_EXTENSIONS, attrExtension => {
      currentBindings = currentBindings.concat(
        this.props.model.getInput(this.props.parameter + attrExtension).models
      )
    })

    return sorted
      ? _.sortBy(currentBindings, binding => {
          var key = binding.isStatic()
            ? binding.getType().get('name')
            : 'expression'
          return {
            expression: 1,
            groupId: 2,
            userId: 3,
            emailAddress: 4,
          }[key]
        })
      : currentBindings
  },

  getQuery: function() {
    var bindables = this.props.model.getProcess().getBindables([
      new VariableType({ name: 'emailAddress' }),
      new VariableType({ name: 'userId' }),
      new VariableType({ name: 'groupId' }),
      new VariableType({ name: 'list', elementType: { name: 'emailAddress' } }),
      new VariableType({ name: 'list', elementType: { name: 'userId' } }),
      // userId might be added for supporting list<userId> type bindings, but atm a user always also matches user / mail address
    ])

    return new QueryContainer(
      new BindableQuery(_.difference(bindables, this.getCurrentBindings())),
      new GroupQuery(this.context.organization),
      new UserQuery(this.context.organization),
      new EmailQuery()
    )
  },

  getType: function(bindable) {
    if (bindable.getType().get('name') === 'list') {
      return bindable.getType().get('elementType')
    }

    return bindable.getType()
  },

  handleQueryResult: function(result, transform) {
    // disable all items, that are already bound
    return _.map(result, item => {
      var bindable = this.itemToBinding(item)

      var attrExtension =
        PARAMETER_ATTR_EXTENSIONS[this.getType(bindable).get('name')]
      var inputBindings = this.props.model.getInput(
        this.props.parameter + attrExtension
      )

      item.disabled = inputBindings.contains(bindable)
      return item
    })
  },

  remove: function(binding, event) {
    event.stopPropagation()
    event.preventDefault()

    var attrExtension =
      PARAMETER_ATTR_EXTENSIONS[this.getType(binding).get('name')]

    var inputBindings = this.props.model.getInput(
      this.props.parameter + attrExtension
    )
    inputBindings.remove(binding)

    this.props.onChange(this.props.model, this.props.parameter + attrExtension)
  },

  add: function(item) {
    var bindable = this.itemToBinding(item)
    var attrExtension =
      PARAMETER_ATTR_EXTENSIONS[this.getType(bindable).get('name')]

    var inputBindings = this.props.model.getInput(
      this.props.parameter + attrExtension
    )
    inputBindings.add(bindable)

    this.props.onChange(this.props.model, this.props.parameter + attrExtension)
  },

  itemToBinding: function(item) {
    if (item.type === 'bindable') {
      return item.entity
    }

    var typeName = {
      user: 'userId',
      group: 'groupId',
      email: 'emailAddress',
    }[item.type]
    var TypedBinding = BindingModel.extend({
      staticType: new VariableType({ name: typeName }),
    })
    return new TypedBinding({ value: item.entity })
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/email/AddresseeSelect.js
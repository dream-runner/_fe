import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import _ from 'underscore'

import { Login } from 'singleton'

import { BaseMixin, AccordionMixin } from 'commons-mixins'
import { InputWithButton, List } from 'commons-components'
import { Alert, Hint } from 'commons-components/hints'

import TriggerDescriptor from '../../../models/TriggerDescriptor'

import Descriptor from './Descriptor'

const getServiceName = descriptor => {
  if (!descriptor.get('service')) {
    return ''
  }

  return descriptor.get('service').get('name')
}

const getDescriptor = descriptor => ({
  ...descriptor.toJSON(),

  serviceName: getServiceName(descriptor),
  endpoint: descriptor.getEndpointUrl(Login.getActiveOrganization()),
})

module.exports = createReactClass({
  displayName: 'TriggerDescriptorListView',

  mixins: [BaseMixin, AccordionMixin],

  getInitialState: function() {
    return {
      errorWith: null,
    }
  },

  render: function() {
    var descriptors = this.props.collection.filter(td => {
      return td.get('type') === this.props.type
    })

    return (
      <div className="trigger-descriptors">
        {this.renderError()}

        <List>
          {_.map(descriptors, descriptor => (
            <Descriptor
              key={descriptor.id}
              icon={descriptor.getIcon()}
              descriptor={getDescriptor(descriptor)}
              expanded={this.isExpanded(descriptor)}
              onToggle={this.handleToggle.bind(null, descriptor)}
              onRemove={() => this.props.onRemove(descriptor)}
              onChange={changes => this.handleChange(descriptor, changes)}
            />
          ))}
        </List>

        <InputWithButton
          clearOnSubmit
          buttonLabel={i18n('Create')}
          placeholder={i18n(
            'Enter a name for the new __serviceName__ trigger type',
            {
              serviceName: this.props.service.get('name'),
            }
          )}
          onSubmit={this.handleAddNew}
        />
      </div>
    )
  },

  renderError: function() {
    let { message, errorWith } = this.state

    if (!errorWith) {
      return
    }

    return (
      <Alert onDismiss={() => this.setState({ errorWith: null })}>
        <Hint danger>
          {i18n(
            'The server returned an error for the trigger __name__.\n\n__message__',
            {
              markdown: true,
              name: errorWith.get('name'),
              message,
            }
          )}
        </Hint>
      </Alert>
    )
  },

  handleChange: function(descriptor, changes) {
    descriptor.set(changes)

    descriptor.once('error', (model, error) => {
      console.log(error)
      this.setState({
        errorWith: descriptor,

        message: error.responseText,
      })
    })

    descriptor.once('sync', () => descriptor.off('error'))

    descriptor.save()
  },

  handleAddNew: function(newDescriptorName) {
    var newDescriptor = new TriggerDescriptor({
      type: this.props.type,
      name: newDescriptorName,
    })

    this.props.collection.add(newDescriptor)
    newDescriptor.save()

    this.expand(newDescriptor)
  },
})



// WEBPACK FOOTER //
// ./src/services/views/services/triggerDescriptors/List.js
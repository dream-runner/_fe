import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'
import { BindingsTextInput, Divider, List } from 'commons-components'

import { FieldStructure } from '../../../../../packages/fields'

import Action from '../../../models/Action'

import InputBindingsMixin from '../../mixins/InputBindingsMixin'

import AddresseeSelect from './AddresseeSelect'

module.exports = createReactClass({
  displayName: 'SendEmailTaskView',

  propTypes: {
    model: PropTypes.instanceOf(Action).isRequired,
    readOnly: PropTypes.bool,
  },

  mixins: [BaseMixin, InputBindingsMixin],

  render() {
    return (
      <div className="activity-configuration send-email-task">
        <div className="body">
          <List>
            {this.renderFrom()}

            {this.renderTo()}
            {this.renderReplyTo()}
            {this.renderSubject()}
            {/* remove i18n(Attachemnts) */}
            {this.renderBinding(
              'attachmentFileIds',
              false,
              i18n('Attachments')
            )}
          </List>

          <Divider title={i18n('Email message')} />

          {this.renderBody()}
        </div>
      </div>
    )
  },

  renderFrom() {
    return (
      <FieldStructure narrowLabel label={i18n('Sender name')}>
        <BindingsTextInput
          singleLine
          readOnly={this.props.readOnly}
          value={this.props.model.get('senderName')}
          onChange={value => this.props.model.set('senderName', value)}
          bindables={this.props.model.getProcess().getBindables()}
          onBlur={this.saveModel}
        />
      </FieldStructure>
    )
  },

  renderTo() {
    return (
      <FieldStructure narrowLabel label={i18n('To')}>
        <AddresseeSelect
          parameter="to"
          model={this.props.model}
          readOnly={this.props.readOnly}
          onChange={this.saveModel}
        />
      </FieldStructure>
    )
  },

  renderReplyTo() {
    return (
      <FieldStructure narrowLabel label={i18n('Reply to')}>
        <AddresseeSelect
          parameter="replyTo"
          model={this.props.model}
          readOnly={this.props.readOnly}
          onChange={this.saveModel}
        />
      </FieldStructure>
    )
  },

  renderSubject() {
    return (
      <FieldStructure narrowLabel label={i18n('Subject')}>
        <BindingsTextInput
          singleLine
          readOnly={this.props.readOnly}
          value={this.props.model.get('subject')}
          onChange={value => this.props.model.set('subject', value)}
          bindables={this.props.model.getProcess().getBindables()}
          onBlur={this.saveModel}
        />
      </FieldStructure>
    )
  },

  renderBody() {
    return (
      <div className="mail-body">
        <BindingsTextInput
          style={{
            input: {
              mentions: {
                '&multiLine': {
                  input: {
                    minHeight: 250,
                  },
                },
              },
            },
          }}
          readOnly={this.props.readOnly}
          value={this.props.model.get('bodyText')}
          onChange={value => this.props.model.set('bodyText', value)}
          bindables={this.props.model.getProcess().getBindables()}
          onBlur={this.saveModel}
          infoText={i18n(
            'Press __key__ to insert values from form fields in the message.',
            {
              key: <kbd>#</kbd>,
            }
          )}
        />
      </div>
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/email/SendEmail.js
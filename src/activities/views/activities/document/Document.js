import PropTypes from 'prop-types'
import React from 'react'

import createReactClass from 'create-react-class'

import i18n from 'signavio-i18n'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import {
  BindingsTextInput,
  List,
  Divider,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { LabeledField, FieldStructure } from '../../../../../packages/fields'

import Action from '../../../models/Action'
import InputBindingsMixin from '../../mixins/InputBindingsMixin'

module.exports = createReactClass({
  displayName: 'DocumentTask',

  mixins: [BaseMixin, InputBindingsMixin],

  propTypes: {
    model: PropTypes.instanceOf(Action).isRequired,

    readOnly: PropTypes.bool,
  },

  render() {
    const { model, readOnly } = this.props

    return (
      <div className="activity-configuration send-email-task">
        <List>
          <Hint>
            {i18n(
              'Create a document that can be sent via email or uploaded to cloud services.'
            )}
          </Hint>
          <LabeledField
            noClear
            label={i18n('Document name')}
            description={i18n(
              'The document will be stored as a field that can be ' +
                'used in other actions of this process, e.g., for uploading it to a cloud ' +
                "service. Edit the name of this field so it's easy to find."
            )}
            type={{ name: 'text' }}
            value={model.get('outputFile').get('name')}
            onChange={value => model.get('outputFile').set('name', value)}
            onBlur={() => model.save()}
          />
          <FieldStructure label={i18n('File name')}>
            <BindingsTextInput
              singleLine
              readOnly={readOnly}
              value={model.get('documentName')}
              onChange={value => model.set('documentName', value)}
              bindables={model.getProcess().getBindables()}
              onBlur={() => model.save()}
            />
          </FieldStructure>
          <LabeledField
            label={i18n('File format')}
            type={{
              name: 'choice',
              options: [
                {
                  id:
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  name: i18n('.docx (Word document)'),
                },
                {
                  id: 'text/plain; charset=utf-8',
                  name: i18n('.txt (plain text)'),
                },
                {
                  id: 'text/csv; charset=utf-8',
                  name: i18n('.csv (comma-separated values)'),
                },
              ],
            }}
            value={
              model.get('format') ||
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
            onChange={value => model.set('format', value)}
            noClear
          />
          <Divider title={i18n('Document contents')} />

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
            readOnly={readOnly}
            value={model.get('text')}
            onChange={value => model.set('text', value)}
            bindables={model.getProcess().getBindables()}
            onBlur={() => model.save()}
            infoText={i18n(
              'Press __key__ to insert values from form fields in the message.',
              {
                key: <kbd>#</kbd>,
              }
            )}
          />
        </List>
      </div>
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/document/Document.js
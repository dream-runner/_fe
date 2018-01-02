// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'

import i18n from 'signavio-i18n'

import { defaultStyle, padding } from '@signavio/effektif-commons/lib/styles'
import {
  List,
  MarkdownInput,
  CopyToClipboard,
  ContextHelp,
} from '@signavio/effektif-commons/lib/components'

import { LabeledField } from '../../../../../packages/fields'

import File from 'container/models/File'

function Configuration(props) {
  const { descriptor, onChange, onWSDLChange, onDescriptionChange } = props
  const { endpoint, wsdlId, serviceName, description } = descriptor

  return (
    <List style={props.style}>
      <CopyToClipboard
        label={i18n('Endpoint URL')}
        description={
          <ContextHelp chapter="salesforce">
            {i18n(
              'Copy & paste this URL to your __serviceName__ outbound message configuration.',
              {
                serviceName,
              }
            )}
          </ContextHelp>
        }
      >
        {endpoint}
      </CopyToClipboard>

      <LabeledField
        label={i18n('WSDL File')}
        description={
          <ContextHelp
            chapter="integration/salesforce"
            section="salesforce-configuration"
          >
            {i18n(
              'Generate a WSDL file in your __serviceName__ outbound message configuration and upload it here.',
              {
                serviceName,
              }
            )}
          </ContextHelp>
        }
        type={{ name: 'fileId' }}
        value={wsdlId}
        onChange={onWSDLChange}
      />

      <MarkdownInput
        label={i18n('Description')}
        defaultValue={description}
        placeholder={i18n('Enter a description for this trigger type')}
        onBlur={onDescriptionChange}
      />
    </List>
  )
}

export default compose(
  withHandlers({
    onWSDLChange: ({ onChange }) => (id: string) =>
      onChange({ wsdl: new File({ id }) }),
    onDescriptionChange: ({ onChange }) => (ev: KeyboardEvent) =>
      onChange({ description: ev.target.value }),
  }),
  defaultStyle({
    backgroundColor: 'white',

    padding: padding.normal,
  })
)(Configuration)



// WEBPACK FOOTER //
// ./src/services/views/services/triggerDescriptors/Configuration.js
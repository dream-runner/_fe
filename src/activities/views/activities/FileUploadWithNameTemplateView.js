import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'
import { BindingsTextInput } from 'commons-components'

import { FieldStructure } from '../../../../packages/fields'

import FileUploadService from './FileUploadServiceView'

module.exports = createReactClass({
  displayName: 'FileUploadWithNameTemplate',

  mixins: [BaseMixin],

  render: function() {
    return (
      <FileUploadService {...this.props}>
        <FieldStructure narrowLabel label={i18n('Folder name template')}>
          <BindingsTextInput
            readOnly={this.props.readOnly}
            value={this.props.model.get('folderNameTemplate')}
            onChange={value =>
              this.props.model.set('folderNameTemplate', value)}
            bindables={this.props.model.getProcess().getBindables()}
            singleLine={true}
            onBlur={() => this.props.model.save()}
          />
        </FieldStructure>
      </FileUploadService>
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/FileUploadWithNameTemplateView.js
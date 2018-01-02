import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'

import Activity from '../../models/Activity'

import ServiceAction from './service'
import ProvidePath from './ProvidePath'

module.exports = createReactClass({
  displayName: 'FileUpload',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Activity).isRequired,
  },

  render: function() {
    var { model, ...rest } = this.props

    return (
      <ServiceAction model={model} {...rest}>
        <div className="application-configuration">
          <ProvidePath
            label={i18n('Folder')}
            account={model.get('account')}
            value={model.get('folderId')}
            types={['folder']}
            onChange={this.handleFolderChange}
          />

          {this.props.children}
        </div>
      </ServiceAction>
    )
  },

  handleFolderChange: function({ id }) {
    this.props.model.set('folderId', id)
    this.props.model.save()
  },

  handleRemove: function() {
    this.props.model.set('folderId', null)
    this.props.model.save()
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/FileUploadServiceView.js
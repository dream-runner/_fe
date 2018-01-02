import React from 'react'
import createReactClass from 'create-react-class'
import { isEmpty, result, uniqBy } from 'lodash'
import $ from 'jquery'
import i18n from 'i18n'

import Router from 'singleton/Router'
import ProcessCollection from 'processes/collections/ProcessCollection'

import File from 'container/models/File'

import { Modal, FileUpload } from 'commons-components'
import { TextButton } from 'commons-components/buttons'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

module.exports = createReactClass({
  displayName: 'ProcessImport',

  getInitialState: function() {
    return {
      importing: false,
      error: false,
      importedProcesses: null,
      importIssues: null,
    }
  },

  render: function() {
    return (
      <div className="bpmn-import">
        <FileUpload
          ref="fileupload"
          title={i18n('Import BPMN')}
          buttonClassName="btn btn-light btn-add-on btn-add-left btn-block"
          onStart={this.handleUploadStart}
          onUploaded={this.handleUploadFinished}
        />
        {this.renderModal()}
      </div>
    )
  },

  renderModal: function() {
    if (
      !this.state.importing &&
      !this.state.error &&
      !this.state.importedProcesses
    ) {
      return
    }

    return (
      <Modal
        title={this.renderModalTitle()}
        onRequestHide={this.reset}
        className="modal-confirm"
        footer={this.renderModalFooter()}
      >

        {this.renderModalMessage()}
      </Modal>
    )
  },

  renderModalTitle: function() {
    if (this.state.importing) {
      return null
    }

    if (this.state.error) {
      return i18n('There was an error importing the process')
    }

    if (this.state.importedProcesses) {
      return i18n('The process was imported successfully.')
    }
  },

  renderModalMessage: function() {
    if (this.state.importing) {
      return (
        <Hint loading>
          {i18n('Importing BPMN...')}
        </Hint>
      )
    }

    if (this.state.error) {
      return (
        <div>
          <p>
            {i18n(
              'The uploaded file could not be imported. Please select a valid BPMN document.'
            )}
          </p>
          <p>{`${i18n('Reason:')} ${this.state.error}`}</p>
        </div>
      )
    }

    return (
      <div>
        <p>
          {i18n(
            'The following processes have been added to your organization:'
          )}
        </p>
        <ul>
          {this.state.importedProcesses.map(this.renderImportedProcessItem)}
        </ul>
        {this.renderImportWarnings(this.state.importIssues)}
      </div>
    )
  },

  renderImportWarnings(issues) {
    if (isEmpty(issues)) {
      return null
    }

    return (
      <Hint warning inline={true}>
        <ul>
          {uniqBy(issues, 'message').map((issue, idx) =>
            <li key={idx}>
              {issue.message}
            </li>
          )}
        </ul>
      </Hint>
    )
  },

  renderImportedProcessItem: function(process, issues) {
    var url = Router.reverse('process', { id: process.id })
    return (
      <li>
        <a href={url}>
          {process.get('name') || <i>{i18n('Unnamed process')}</i>}
        </a>
      </li>
    )
  },

  renderModalFooter: function() {
    if (this.state.importing) {
      return
    }

    if (this.state.error) {
      return [
        <TextButton
          style={{ width: '50%' }}
          onClick={this.openFileUpload}
          key="select-other"
        >

          {i18n('Select another file')}
        </TextButton>,

        <TextButton
          style={{ width: 'calc(50% - 1px)', marginLeft: 1 }}
          onClick={this.reset}
          key="cancel"
        >

          {i18n('Cancel')}
        </TextButton>,
      ]
    }

    return (
      <TextButton block onClick={this.completeImport}>
        {i18n('Close')}
      </TextButton>
    )
  },

  handleUploadStart: function() {
    this.setState({
      importing: true,
    })
  },

  handleUploadFinished: function(file) {
    var processCollection = ProcessCollection.importBPMN(new File(file))
    processCollection.once('sync', this.handleImportSuccess)
    processCollection.once('error', this.handleImportError)
  },

  handleImportSuccess: function(processCollection, json) {
    processCollection.off('error', this.handleImportError)
    this.setState({
      importedProcesses: processCollection,
      importing: false,
      importIssues: result(json, 'issues', null),
    })
  },

  handleImportError: function(processCollection, error) {
    processCollection.off('sync', this.handleImportSuccess)

    this.setState({
      error: error ? error.message : i18n('We could not import your document.'),
      importing: false,
    })
  },

  openFileUpload: function() {
    this.reset()
    this.setState({
      openFileUploadTriggerToggle: !this.state.openFileUploadTriggerToggle,
    })
  },

  reset: function() {
    this.setState(this.getInitialState())
  },

  completeImport: function() {
    this.reset()
    if (this.props.onComplete) {
      this.props.onComplete()
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (
      this.state.openFileUploadTriggerToggle !==
      prevState.openFileUploadTriggerToggle
    ) {
      this.refs.fileupload.open()
    }
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/ImportView.js
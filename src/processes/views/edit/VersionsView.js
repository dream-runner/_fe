import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import Router from 'singleton/Router'
import Login from 'singleton/Login'

import { BaseMixin } from 'commons-mixins'
import { InfiniteScroll, Icon, Divider, List, Modal } from 'commons-components'
import { Hint } from 'commons-components/hints'
import { TextButton } from 'commons-components/buttons'

import { Rights } from '../../../../packages/access'

import { getAccessDefinition } from '../../utils'

import Version from './Version'

/**
 * A view to edit a process model
 *
 */
module.exports = createReactClass({
  displayName: 'ProcessVersions',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: true,
      size: this.props.model.get('versions').length,
      copied: false,
    }
  },

  componentWillMount: function() {
    let versions = this.props.model.get('versions')

    versions.on(
      'sync',
      () => {
        this.setState({
          size: versions.meta('size'),
        })
      },
      this
    )
  },

  componentWillUnmount: function() {
    this.props.model.get('versions').off(null, null, this)
  },

  updateVersions: function() {
    this.props.model.get('versions').reset()
  },

  render() {
    const { restoring, publishing } = this.state

    return (
      <div className="process-versions">
        {this.renderContent()}

        {restoring &&
          <Modal>
            <Hint loading>
              {i18n('Restoring version __version__', {
                version: restoring.commitMessage,
              })}
            </Hint>
          </Modal>}

        {publishing &&
          <Modal>
            <Hint loading>
              {i18n('Publishing version __version__', {
                version: publishing.commitMessage,
              })}
            </Hint>
          </Modal>}
      </div>
    )
  },

  renderContent: function() {
    const { model, readOnly } = this.props

    if (!model.isPrivate()) {
      return this.renderVersions()
    }

    return (
      <div className="row content">
        <div className="col-md-6 col-lg-7">
          {this.renderVersions()}
        </div>
        <div className="col-md-6 col-lg-5">
          <Rights
            readOnly
            access={model.get('access')}
            definition={getAccessDefinition()}
          />

          {!readOnly &&
            <div>
              <Divider />

              <TextButton
                block
                style={{ textAlign: 'center' }}
                href={Router.reverse('process', {
                  id: model.id,
                  tab: 'details',
                  sub: 'access',
                })}
              >
                {i18n('Configure Access Rights')}
              </TextButton>
            </div>}
        </div>
      </div>
    )
  },

  renderPublishedState: function() {
    var published = this.props.model.isPublished()
    var changed = this.props.model.get('changed')

    if (!published) {
      return i18n(
        'Tasks can only be started in a published version of the process.'
      )
    }

    if (published && !changed) {
      return i18n('There is nothing to publish.')
    }

    return i18n('There are unpublished changes.')
  },

  renderVersions: function() {
    const { size } = this.state
    const { readOnly } = this.props

    return (
      <InfiniteScroll
        collection={this.props.model.get('versions')}
        loadingMessage={i18n('Loading versions...')}
        emptyMessage={i18n(
          'There are currently no published versions of this process.'
        )}
      >
        <List>
          {this.props.model.get('versions').map((version, index) =>
            <Version
              key={version.id}
              version={version.toJSON()}
              versionNr={size - index}
              readOnly={readOnly}
              isStartable={this.isStartable(version)}
              isLatest={index === 0}
              onPublish={this.handlePublish}
              onRestore={this.handleRestore}
              onStart={this.startCase}
            >
              {size - index === 1
                ? i18n('Initial version')
                : version.get('commitMessage') ||
                    <Hint inline>{i18n('No message entered')}</Hint>}
            </Version>
          )}
        </List>
      </InfiniteScroll>
    )
  },

  handleRestore(version) {
    this.setState({
      restoring: version,
    })

    const model = this.props.model.get('versions').get(version.id)

    model.once('action:restore', () => {
      this.setState({
        restoring: null,
      })

      this.reload()
    })

    model.action('restore')
  },

  handlePublish(version) {
    this.setState({
      publishing: version,
    })

    const model = this.props.model.get('versions').get(version.id)

    model.once('action:publish', () => {
      this.setState({
        publishing: null,
      })

      this.updateVersions()
    })

    model.action('publish')
  },

  startCase: function() {
    const url = Router.reverse('create_case', { id: this.props.model.id })

    Router.navigate(url, { trigger: true })
  },

  reload: function() {
    window.location.reload()
  },

  isStartable: function(version) {
    return this.props.model.isStartable(Login.user())
  },

  publish: function() {
    this.props.model.publish()
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/VersionsView.js
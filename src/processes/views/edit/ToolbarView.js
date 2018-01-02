import React from 'react'
import createReactClass from 'create-react-class'
import moment from '@signavio/effektif-commons/lib/extensions/moment'
import i18n from 'i18n'

import Router from 'singleton/Router'

import { BaseMixin } from 'commons-mixins'

import { CSSUtils } from 'commons-utils'

import RightsIndicator from './access/RightsIndicator'

import ToolbarActions from './ToolbarActionsView'
import PublishModal from './PublishModalView'

import { Remove, Toolbar, Hint, alert } from 'commons-components'

module.exports = createReactClass({
  displayName: 'ProcessToolbar',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      showPublishModal: false,
    }
  },

  render: function() {
    return (
      <Toolbar left={this.renderLeft()} right={this.renderRight()}>
        {this.renderPublishModal()}
      </Toolbar>
    )
  },

  renderLeft: function() {
    return (
      <RightsIndicator
        placement="right"
        model={this.props.model.get('access')}
        onClick={this.handleRightsClick}
      />
    )
  },

  renderRight: function() {
    return [
      this.renderPublishButton(),
      <ToolbarActions
        key="actions"
        readOnly={this.props.readOnly}
        model={this.props.model}
      />,
    ]
  },

  handleRightsClick: function() {
    Router.navigate(
      Router.reverse('process', {
        id: this.props.model.id,
        tab: 'details',
        sub: 'access',
      }),
      { trigger: true }
    )
  },

  renderPublishButton: function() {
    var initialPublish = !this.props.model.isPublished()
    var cls = CSSUtils.cls(
      {
        'btn-eff-primary': initialPublish
          ? this.props.model.get('activities').length > 0
          : this.props.model.get('changed'),
      },
      'btn btn-text'
    )
    return (
      <button
        key="publish"
        className={cls}
        onClick={this.handlePublish}
        disabled={this.props.readOnly || !this.props.model.get('changed')}
      >
        {initialPublish
          ? i18n('Publish to run this process')
          : i18n('Publish changes')}
      </button>
    )
  },

  handlePublish: function() {
    if (this.props.model.isPublished()) {
      // show modal before publishing new versions
      this.setState({ showPublishModal: true })
      return
    }

    // initial version can be published without asking for confirmation
    this.props.model.publish(
      null,
      () => {
        this.redirectToVersions()
      },
      errMsg => {
        const errorMessages = errMsg.split('\n')
        const header = errorMessages.splice(0, 1)

        alert(
          <Hint error>
            {i18n('Something went wrong publishing this process:')}
            <div>
              {header}
            </div>
            {errorMessages.map((errorMessage, i) =>
              <li key={i}>
                {errorMessage}
              </li>
            )}
          </Hint>
        )
      }
    )
  },

  renderPublishModal: function() {
    if (!this.state.showPublishModal) {
      return
    }

    return (
      <PublishModal
        model={this.props.model}
        onPublished={this.redirectToVersions}
        onHide={() => this.setState({ showPublishModal: false })}
      />
    )
  },

  redirectToVersions: function() {
    var url = Router.reverse('process', {
      id: this.props.model.id,
      tab: 'versions',
    })
    Router.navigate(url, { trigger: true })
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/ToolbarView.js
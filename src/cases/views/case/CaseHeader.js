import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import Color from 'color'
import { compose } from 'recompose'
import { withUserPreferences } from '@signavio/effektif-api'

import Router from 'singleton/Router'
import Login from 'singleton/Login'

import { BaseMixin } from 'commons-mixins'
import Toolbar from './ToolbarView'

import { defaultStyle, utils } from 'commons-style'
import { Hint, Icon } from 'commons-components'
import { PrimaryHeader } from 'commons-components/headers'
import { TextTile } from 'commons-components/tiles'

const CaseHeader = createReactClass({
  displayName: 'CaseHeader',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      closing: false,
      closeFailed: false,
    }
  },

  render: function() {
    var rights = this.props.model.getRights()

    return (
      <div {...this.props.style}>
        {this.renderWorkflowInfo()}

        <PrimaryHeader
          style={this.props.style('header')}
          readOnly={!rights.edit}
          value={this.props.model.get('name')}
          onChange={ev => this.props.model.set('name', ev.target.value)}
          onBlur={this.save}
          placeholder={i18n('What is the topic of this case?')}
          toolbar={this.renderToolbar(rights)}
        />

        {this.renderCloseHint()}
        {this.renderCloseFailedHint()}
      </div>
    )
  },

  renderWorkflowInfo: function() {
    var workflow = this.props.model.get('sourceWorkflow')

    if (!workflow || !workflow.get('name')) {
      return
    }

    return (
      <TextTile
        small
        transparent
        icon="cogs"
        iconSet="fontAwesome"
        style={this.props.style('workflow')}
      >
        {workflow.get('name')}
      </TextTile>
    )
  },

  save: function() {
    this.props.model.save()
  },

  renderCloseHint: function() {
    if (!this.state.closing) {
      return
    }

    return (
      <Hint modal loading>
        {i18n('Closing this case. Please wait...')}
      </Hint>
    )
  },

  renderCloseFailedHint: function() {
    if (!this.state.closeFailed) {
      return
    }

    return (
      <Hint modal onDismiss={this.hideFailedHint}>
        {i18n(
          'We could not close this case. Please try again. If the problem persists please contact our support at [support@signavio.com](mailto:support@signavio.com).',
          {
            markdown: true,
          }
        )}
      </Hint>
    )
  },

  hideFailedHint: function() {
    this.setState({
      closeFailed: false,
    })
  },

  renderToolbar: function(rights) {
    return (
      <Toolbar
        readOnly={!rights.edit}
        model={this.props.model}
        print={this.props.print}
        onNewLayoutClick={this.props.onNewLayoutClick}
        onPrioChange={this.handlePriorityChange}
        onPrint={this.props.onPrint}
        onRefresh={this.props.onRefresh}
        onClose={this.closeCase}
        onDelete={this.deleteCase}
      />
    )
  },

  deleteCase: function(cascade) {
    this.props.model.destroy({ cascade })

    Router.navigate(
      Router.reverse('cases', {
        pid: this.props.userPreferences.casesProcessId,
      }),
      { trigger: true }
    )
  },

  handlePriorityChange: function(priority) {
    this.props.model.set('priority', priority)
    this.props.model.save()
  },

  closeCase: function(closingReason) {
    this.setState({
      closing: true,
    })

    this.props.model.cancel(
      () => this.setState({ closing: false }),
      () => this.setState({ closing: false, closeFailed: true }),
      closingReason
    )
  },
})

const styled = defaultStyle(
  theme => ({
    '&closed': {
      header: {
        value: {
          backgroundColor: theme.color.mono.lighter,
          color: utils.textColor(theme.color.mono.lighter),
        },
        input: {
          backgroundColor: theme.color.mono.lighter,

          ':hover': {
            backgroundColor: Color(theme.color.mono.lighter)
              .lighten(0.1)
              .string(),
          },
          ':focus': {
            backgroundColor: Color(theme.color.mono.lighter)
              .lighten(0.1)
              .string(),
          },
        },
      },
    },

    header: {
      paddingTop: 0,
    },

    workflow: {
      opacity: 0.5,

      cursor: 'default',

      ...utils.transition('opacity'),
      ...utils.media.print({
        display: 'none',
      }),

      ':hover': {
        opacity: 1,
      },

      icon: {
        backgroundColor: null,
      },
    },
  }),
  props => ({
    '&closed': props.model.get('closed'),
  })
)

export default compose(withUserPreferences, styled)(CaseHeader)



// WEBPACK FOOTER //
// ./src/cases/views/case/CaseHeader.js
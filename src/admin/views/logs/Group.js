import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { map } from 'lodash'

import { CSSUtils } from '@signavio/effektif-commons/lib/utils'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'

import {
  Hint,
  Collapsible,
  Tile,
} from '@signavio/effektif-commons/lib/components'

module.exports = createReactClass({
  displayName: 'LogEntry',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      expanded: this.props.expanded,
    }
  },

  render: function() {
    const cls = CSSUtils.cls(
      {
        'log-group': true,
      },
      'level-' + this.getLogLevel()
    )

    if (this.props.model.get('logs').length === 0) {
      return (
        <div className={cls}>
          {this.renderHeader()}
        </div>
      )
    }

    return (
      <div className={cls}>
        <Collapsible
          header={this.renderHeader()}
          onToggle={this.handleToggle}
          onCollapse={this.handleCollapse}
        >
          {this.renderContent()}
        </Collapsible>
      </div>
    )
  },

  handleToggle: function(expanded) {
    this.setState({
      expanded: expanded,
      collapsing: !expanded,
    })
  },

  handleCollapse: function() {
    this.setState({
      collapsing: false,
    })
  },

  renderHeader: function() {
    const hasLogs = this.props.model.get('logs').length > 0

    return (
      <Tile
        padding
        icon="fa fa-terminal"
        onClick={hasLogs ? this.handleSelect : null}
        toolbar={this.renderDetails()}
      >
        {this.renderMethod()}
        {this.props.model.get('path')}
      </Tile>
    )
  },

  renderMethod: function() {
    if (!this.props.model.get('method')) {
      return
    }

    return (
      <span className="method">
        {this.props.model.get('method')}
      </span>
    )
  },

  renderContent: function() {
    if (!this.state.expanded && !this.state.collapsing) {
      return
    }

    const logs = this.props.model.get('logs')

    return (
      <div className="entry">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>
                {i18n('Context')}
              </th>
              <th>
                {i18n('Message')}
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map(this.renderEntry)}
          </tbody>
        </table>
      </div>
    )
  },

  renderEntry: function(entry, index) {
    return (
      <tr key={entry.cid} className={'level level-' + entry.get('level')}>
        <td className="line">
          {entry.get('loggerName')}
        </td>
        <td className="message">
          {this.renderMessage(entry.get('message'))}
        </td>
      </tr>
    )
  },

  prettyPrint: function(message) {
    let json

    try {
      json = JSON.parse(message.trim())
    } catch (e) {
      return message
    }

    return (
      <pre>
        {JSON.stringify(json, null, 2)}
      </pre>
    )
  },

  renderOutgoingMessage: function(message, regex) {
    const match = message.match(regex)

    const context = match[1]

    return (
      <div className="outgoing">
        <div className="title">
          <i className="fa fa-angle-left" />
          {i18n('Query of **__queryContext__** returned:', {
            queryContext: context,
            markdown: true,
          })}
        </div>

        {this.prettyPrint(message.replace(regex, ''))}
      </div>
    )
  },

  renderIncomingMessage: function(message, regex) {
    const match = message.match(regex)

    const context = match[1]
    const action = match[2]

    message = message.replace(regex, '').trim()

    const groupRegex = /(\w+)=(\{[^=]*\})/g

    const groups = []
    let groupMatch

    while ((groupMatch = groupRegex.exec(message))) {
      groups.push([groupMatch[1], groupMatch[2]])
    }

    return (
      <div className="incoming">
        <div className="title">
          <i className="fa fa-angle-right" />
          {i18n(
            'Query to **__queryContext__** performing action **__action__**:',
            {
              queryContext: context,
              action,
              markdown: true,
            }
          )}
        </div>

        {map(
          groups,
          function(group) {
            return (
              <div className="group">
                {i18n('Variable **__variable__** set to:', {
                  variable: group[0],
                  markdown: true,
                })}

                {this.prettyPrint(group[1])}
              </div>
            )
          },
          this
        )}
      </div>
    )
  },

  renderAdvancedMessage: function(message) {
    const outgoingMsg = /<-(\w+)-(?:\[\d+\])?/
    const incomingMsg = /-(\w+)-> ([\w]*) /

    if (message.match(outgoingMsg)) {
      return this.renderOutgoingMessage(message, outgoingMsg)
    }

    if (message.match(incomingMsg)) {
      return this.renderIncomingMessage(message, incomingMsg)
    }

    return message
  },

  renderMessage: function(message) {
    if (message.indexOf('<<<') !== 0 && message.indexOf('>>>') !== 0) {
      return this.renderAdvancedMessage(message)
    }

    return this.prettyPrint(message.replace('<<<', '').replace('>>>', ''))
  },

  renderDetails: function() {
    const user = this.props.model.get('user')
    const duration = this.props.model.get('duration')
    const workspace = this.props.model.get('organization')
    const time = this.props.model.get('time')

    return (
      <div className="details">
        <div className="column">
          <div className="user">
            {(user && user.name()) ||
              <Hint inline={true}>
                {i18n('No user')}
              </Hint>}
          </div>
          <div className="duration">
            {(duration || '?') + ' ms'}
          </div>
        </div>
        <div className="column">
          <div className="organization">
            {(workspace && workspace.get('name')) ||
              <Hint inline={true}>
                {i18n('No workspace')}
              </Hint>}
          </div>
          <div className="time">
            {time}
          </div>
        </div>
      </div>
    )
  },

  handleSelect: function() {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.model, !this.props.expanded)
    }
  },

  getLogLevel: function() {
    if (!this.props.model.get('level')) {
      return 7
    }

    return this.props.model.get('level')
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/logs/Group.js
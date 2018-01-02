import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'
import Router from 'singleton/Router'
import {
  Markdown,
  AccordionItem,
  Hint as LegacyHint,
} from '@signavio/effektif-commons/lib/components'
import Process from 'processes/models/Process'
import {
  BaseMixin,
  AccordionMixin,
} from '@signavio/effektif-commons/lib/mixins'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

module.exports = createReactClass({
  displayName: 'Examples',

  mixins: [BaseMixin, AccordionMixin],

  getInitialState: function() {
    return {
      loading: true,
    }
  },

  componentDidMount: function() {
    this.props.collection.once(
      'sync',
      function() {
        this.trySetState({
          loading: false,
        })
      },
      this
    )
    this.props.collection.fetch()
  },

  render: function() {
    return (
      <div className="view examples">
        <div className="view-header">
          <h2 className="page-header">
            {i18n('Examples')}
            <LegacyHint>
              {i18n(
                'Copy these example processes into your own organization to explore, execute, and customize them.'
              )}
            </LegacyHint>
          </h2>
        </div>

        {this.renderContent()}
        {this.renderHint()}
      </div>
    )
  },

  renderHint: function() {
    if (!this.state.loading) {
      return null
    }

    return (
      <Hint loading view>
        {i18n('Loading examples...')}
      </Hint>
    )
  },

  renderContent: function() {
    if (this.state.loading) {
      return
    }

    return (
      <div className="view-content examples-list">
        {this.props.collection.map(this.renderExample)}
      </div>
    )
  },

  renderCopyButton: function(example) {
    return (
      <button className="btn btn-text" onClick={this.copy.bind(null, example)}>
        {i18n('Copy to your organization')}
      </button>
    )
  },

  renderExample: function(example) {
    return (
      <AccordionItem
        key={example.cid}
        disabled={true}
        expanded={this.isExpanded(example)}
        onToggle={this.handleToggle.bind(null, example)}
        icon="cogs"
        iconSet="fontAwesome"
        toolbar={this.renderCopyButton(example)}
        title={example.get('name')}
      >
        <div className="example">
          <Markdown>{example.get('description')}</Markdown>
        </div>
      </AccordionItem>
    )
  },

  copy: function(example) {
    var process = new Process({
      name: example.get('name'),
      templateId: example.id,
    })

    process.save()

    process.once(
      'sync',
      function() {
        var url = Router.reverse('process', { id: process.id, tab: 'trigger' })
        Router.navigate(url, { trigger: true })
      },
      this
    )
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/ExampleProcessCollectionView.js
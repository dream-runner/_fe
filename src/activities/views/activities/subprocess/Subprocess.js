// @flow

import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import { defaultStyle, variables } from 'commons-style'
import { BaseMixin } from 'commons-mixins'
import { Hint } from 'commons-components/hints'
import { TextTile } from 'commons-components/tiles'
import { RemoveButton } from 'commons-components/buttons'

import Process from 'processes/models/Process'

import { FieldStructure } from '../../../../../packages/fields'

import DynamicMappingsContainer from '../DynamicMappingsContainer'

import ProcessSelect from './ProcessSelect'

const Subprocess = createReactClass({
  displayName: 'Subprocess',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: false,
      noAccess: false,
      saveOutstanding: false,
    }
  },

  componentWillMount: function() {
    let value = this.getValue()

    if (value) {
      this.fetchProcess(value.id)
    } else {
      this.setState({
        loading: false,
      })
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (this.state.noAccess || nextState.noAccess) {
      return
    }

    if (nextProps.model === this.props.model) {
      return
    }

    let binding = nextProps.model.get('subWorkflowSourceId')

    if (!binding || !binding.get('value')) {
      return
    }

    this.fetchProcess(binding.get('value'))
  },

  fetchProcess: function(id) {
    let value = new Process({ id })

    if (value.get('variables').length > 1) {
      // case var is always there
      return
    }

    this.setState({
      loading: true,
      noAccess: false,
    })

    value.once('sync', () => {
      this.setState({
        loading: false,
      })
    })

    value.once('error', (model, jqxhr) => {
      jqxhr.preventFallback = true

      this.setState({
        loading: false,
        noAccess: true,
      })
    })

    value.fetch()
  },

  render: function() {
    return (
      <div>
        <div {...this.props.style('process')}>
          <FieldStructure
            label={i18n('Sub-process')}
            description={i18n(
              'This action starts a new case for this sub-process.'
            )}
          >

            {this.renderSelect()}
          </FieldStructure>
        </div>

        {this.renderMappings()}
      </div>
    )
  },

  renderMappings: function() {
    const { loading, noAccess, saveOutstanding } = this.state
    const { readOnly, model } = this.props

    if (loading) {
      return (
        <Hint>
          {i18n('You can map fields here once the process has been loaded.')}
        </Hint>
      )
    }

    if (noAccess) {
      return (
        <Hint warning>
          {i18n(
            "Because you either don't have access to the process or the process doesn't exist anymore, you cannot map data to fields of this process."
          )}
        </Hint>
      )
    }

    let value = this.getValue()

    if (!value) {
      return (
        <Hint>
          {i18n(
            'You will be able to map fields of this process to fields of the sub-process once you have selected one.'
          )}
        </Hint>
      )
    }

    let trigger = value.get('trigger')

    if (trigger && trigger.get('type').get('key') !== 'form') {
      return (
        <Hint>
          {i18n(
            'It is currently only possible to start process with a manual or a form trigger.'
          )}
        </Hint>
      )
    }

    if (saveOutstanding) {
      return (
        <Hint loading>
          {i18n('Waiting for the process to be saved...')}
        </Hint>
      )
    }

    return <DynamicMappingsContainer readOnly={readOnly} model={model} refresh={value.id} />
  },

  renderSelect: function() {
    const { loading, noAccess } = this.state
    const { readOnly } = this.props

    if (loading) {
      return (
        <Hint loading
          inline
          style={{ lineHeight: `${variables.lineHeight.block}px` }}
        >
          {i18n('Loading process information...')}
        </Hint>
      )
    }

    if (noAccess) {
      return (
        <TextTile
          toolbar={
            <RemoveButton
              disabled={readOnly}
              onClick={ev => this.handleRemove(ev)}
            />
          }
        >
          <Hint inline>
            {i18n(
              "This process either does not exist anymore or you don't have sufficient rights to see it."
            )}
          </Hint>
        </TextTile>
      )
    }

    return (
      <ProcessSelect
        value={this.getJSONValue()}
        onSelect={processId => this.handleSelect(processId)}
        readOnly={readOnly}
      />
    )
  },

  getJSONValue: function() {
    let value = this.getValue()

    if (!value) {
      return
    }

    return value.toJSON()
  },

  getValue: function() {
    let binding = this.props.model.get('subWorkflowSourceId')

    if (!binding) {
      return
    }

    let id = binding.get('value')

    if (!id) {
      return
    }

    return new Process({ id })
  },

  handleRemove: function(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    this.handleSelect(null)

    this.setState({
      noAccess: false,
    })
  },

  handleSelect: function(value) {
    const { model } = this.props

    if (value === null) {
      model.set('subWorkflowSourceId', null)
      model.set('inputs', {})
      model.set('outputs', {})
    } else {
      this.fetchProcess(value)

      model.set('subWorkflowSourceId', { value })
    }

    this.setState({
      saveOutstanding: true,
    })

    const proc = model.getProcess()

    proc.once('sync', () => this.setState({ saveOutstanding: false }))

    model.save()
  },
})

const styled = defaultStyle(theme => ({
  process: {
    backgroundColor: 'white',

    padding: theme.padding.normal,
  },
}))

export default styled(Subprocess)



// WEBPACK FOOTER //
// ./src/activities/views/activities/subprocess/Subprocess.js
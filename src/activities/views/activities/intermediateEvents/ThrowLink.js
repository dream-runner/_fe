// @flow

import React, { PropTypes } from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import { defaultStyle, variables } from '@signavio/effektif-commons/lib/styles'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Box } from '@signavio/effektif-commons/lib/components'

import Process from 'processes/models/Process'

import { FieldStructure } from '../../../../../packages/fields'

import DynamicInputMappings from '../DynamicInputMappings'

import ProcessSelect from '../subprocess/ProcessSelect'

const ThrowLink = createReactClass({
  displayName: 'ThrowLinkEvent',

  mixins: [BaseMixin],

  getInitialState() {
    return {
      loading: false,
      noAccess: false,
      saveOutstanding: false,
    }
  },

  componentWillMount() {
    let value = this.getValue()

    if (value) {
      this.fetchProcess(value.id)
    } else {
      this.setState({
        loading: false,
      })
    }
  },

  componentWillUpdate(nextProps, nextState) {
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

  fetchProcess(id) {
    let value = new Process({
      id,
    })

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

  render() {
    return (
      <div>
        <div {...this.props.style('process')}>
          <FieldStructure
            label={i18n('Linked process')}
            description={i18n(
              'This action starts a new case for the selected process. The selected process is decoupled from the calling process and cannot map values back.' +
                'Thus the calling process continues its execution immediately.'
            )}
          >
            {this.renderSelect()}
          </FieldStructure>
        </div>
        {this.renderMappings()}
      </div>
    )
  },

  renderMappings() {
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
            "Since you either don't have access to the process or the process doesn't exist anymore, you also cannot map data to fields of this process."
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
        <Hint loading>{i18n('Waiting for the process to be saved...')}</Hint>
      )
    }

    return (
      <Box white>
        <DynamicInputMappings
          readOnly={readOnly}
          refresh={value.id}
          inputs={model.get('inputs') || {}}
          workflowId={model.getProcess().id}
          actionId={model.id}
          onChangeInputs={this.handleChangeInputs}
        />
      </Box>
    )
  },

  renderSelect() {
    const { loading, noAccess } = this.state
    const { readOnly } = this.props

    if (loading) {
      return (
        <Hint
          loading
          inline
          style={{
            lineHeight: `${variables.lineHeight.block}px`,
          }}
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

  getJSONValue() {
    let value = this.getValue()

    if (!value) {
      return
    }

    return value.toJSON()
  },

  getValue() {
    let binding = this.props.model.get('subWorkflowSourceId')

    if (!binding) {
      return
    }

    let id = binding.value

    if (!id) {
      return
    }

    return new Process({
      id,
    })
  },

  handleRemove(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    this.handleSelect(null)

    this.setState({
      noAccess: false,
    })
  },

  handleSelect(value) {
    const { model } = this.props

    if (value === null) {
      model.set('subWorkflowSourceId', null)
      model.set('inputs', {})
      model.set('outputs', {})
    } else {
      this.fetchProcess(value)

      model.set('subWorkflowSourceId', {
        value,
      })
    }

    this.setState({
      saveOutstanding: true,
    })

    const proc = model.getProcess()

    proc.once('sync', () =>
      this.setState({
        saveOutstanding: false,
      })
    )

    model.save()
  },

  handleChangeInputs(newInputs, newVariables) {
    const { model } = this.props
    model
      .getProcess()
      .get('variables')
      .add(newVariables)
    model.set('inputs', null) //force re-setting the entire nested inputs model instead of only updating its attributes
    model.set('inputs', newInputs)
    model.save()
  },
})

ThrowLink.propTypes = {
  readOnly: PropTypes.bool,
  model: PropTypes.object.isRequired,
}

const styled = defaultStyle(theme => ({
  process: {
    backgroundColor: 'white',

    padding: theme.padding.normal,
  },
}))

export default styled(ThrowLink)



// WEBPACK FOOTER //
// ./src/activities/views/activities/intermediateEvents/ThrowLink.js
// @flow

import React from 'react'
import createReactClass from 'create-react-class'
import { map } from 'lodash'
import i18n from 'signavio-i18n'
import { compose, withHandlers, withState } from 'recompose'
import { arrayMove } from 'react-sortable-hoc'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { dataTypeUtils } from '../../../../../packages/fields'

import type { DecisionOptionT } from '../../../types'

import DecisionOptions from './DecisionOptions'

type PropsT = {
  model: any,
  options: Array<DecisionOptionT>,
  setOptions: () => void,
  onSortEnd: () => void,
  readOnly?: boolean,
  onDecisionRename: () => void,
  onTransitionTypeChange: (transition: any, type: string) => void,
}

const ExclusiveGatewayManualView = createReactClass({
  displayName: 'ExclusiveGatewayManualView',

  mixins: [BaseMixin],

  // option is only sortable after being dragged min. 5px (distance prop)
  render() {
    const {
      onSortEnd,
      options,
      model,
      readOnly,
      onDecisionRename,
      onTransitionTypeChange,
      onComplete,
    } = this.props

    return (
      <div className="editor">
        <h3>
          {i18n('Manual decision')}
        </h3>
        <p>
          {i18n(
            'Configure the buttons that represent the options of this decision. ' +
              'Example buttons could be "Approve" and "Reject". ' +
              'These buttons will show on the form of the previous user task.'
          )}
        </p>
        <p>
          {i18n(
            'If you want to re-order the decision options, drag an option to the desired position.'
          )}
        </p>
        <DecisionOptions
          options={options}
          onSortEnd={onSortEnd}
          readOnly={readOnly}
          onDecisionRename={onDecisionRename}
          onTransitionTypeChange={onTransitionTypeChange}
          onComplete={onComplete}
          distance={5}
          transitions={model.getProcess().get('transitions')}
          withTransitionDropdown={model.isPrecededByMIUserTask()}
        />
      </div>
    )
  },
})

type SortChangeT = {
  oldIndex: number,
  newIndex: number,
}

const isList = variable => dataTypeUtils.isList(variable.get('type').toJSON())

export default compose(
  withState(
    'options',
    'setOptions',
    ({ model }: PropsT) =>
      isList(model.getDecisionVariable())
        ? model
            .getDecisionVariable()
            .get('type')
            .get('elementType')
            .get('options')
        : model.getDecisionVariable().get('type').get('options')
  ),
  withHandlers({
    onSortEnd: ({ model, options, setOptions }: PropsT) => ({
      oldIndex,
      newIndex,
    }: SortChangeT) => {
      const reorderArray = arrayMove(options, oldIndex, newIndex)
      const decisionVariable = model.getDecisionVariable()

      if (isList(decisionVariable)) {
        decisionVariable
          .get('type')
          .get('elementType')
          .set('options', reorderArray)
      } else {
        decisionVariable.get('type').set('options', reorderArray)
      }

      setOptions(reorderArray)
      model.updateManualDecisionOptions()
      model.updateMIManualDecisionOptions(reorderArray)
      model.save()
    },
    onDecisionRename: ({ model, setOptions }: PropsT) => (
      id: string,
      name: string
    ) => {
      const decisionVariable = model.getDecisionVariable()

      const options = map(
        isList(decisionVariable)
          ? decisionVariable.get('type').get('elementType').get('options')
          : decisionVariable.get('type').get('options'),
        (option: DecisionOptionT) => {
          if (option.id === id) {
            return { ...option, name }
          }
          return option
        }
      )

      if (isList(decisionVariable)) {
        decisionVariable.get('type').get('elementType').set('options', options)
      } else {
        decisionVariable.get('type').set('options', options)
      }

      setOptions(options)
      model.getProcess().trigger('change:decision', decisionVariable)
      model.updateManualDecisionOptions()
      model.updateMIManualDecisionOptions(options)
      model.save()
    },
    onTransitionTypeChange: () => (transition: any, type: string) => {
      transition.set('condition', {
        ...transition.toJSON().condition,
        type,
      })
      transition.save()
    },
  })
)(ExclusiveGatewayManualView)



// WEBPACK FOOTER //
// ./src/activities/views/activities/exclusiveGateway/Manual.js
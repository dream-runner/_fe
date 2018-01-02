// @flow
import React from 'react'
import { get } from 'lodash'
import { compose, withProps } from 'recompose'
import { sortableContainer } from 'react-sortable-hoc'

import type { DecisionOptionT } from '../../../types'

import DecisionOption from './DecisionOption'

type PropsT = {
  options: Array<DecisionOptionT>,
  readOnly?: boolean,

  transitions: Array<any>,

  onDecisionRename: (name: string) => void,
  onTransitionTypeChange: (transition: any, type: string) => void,
  onComplete: () => void,
  withTransitionDropdown: boolean,
}

const DecisionOptions = ({
  options,
  readOnly,
  transitions,
  onDecisionRename,
  onTransitionTypeChange,
  withTransitionDropdown,
}: PropsT) =>
  <div>
    {options.map((option: DecisionOptionT, index: number) => {
      const transition = transitions.find(
        transition =>
          transition.id === option.id ||
          get(transition.get('condition'), 'right.value') === option.id
      )

      const to = transition.get('to')

      return (
        <DecisionOption
          key={to.id}
          index={index}
          option={option}
          readOnly={readOnly}
          onDecisionRename={onDecisionRename}
          onTransitionTypeChange={onTransitionTypeChange}
          targetName={to.getName()}
          targetIcon={to.get('type').getIcon()}
          transition={transition}
          withTransitionDropdown={withTransitionDropdown}
        />
      )
    })}
  </div>

export default compose(
  withProps(() => ({
    lockToContainerEdges: true,
    lockAxis: 'y',
  })),
  sortableContainer
)(DecisionOptions)



// WEBPACK FOOTER //
// ./src/activities/views/activities/exclusiveGateway/DecisionOptions.js
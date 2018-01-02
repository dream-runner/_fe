// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { sortableElement } from 'react-sortable-hoc'
import { compose, withHandlers } from 'recompose'

import { triggerOnCompleteOnBlur } from '@signavio/react-forms'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { Tile, TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import {
  Clearfix,
  Icon,
  List,
  DragHandle,
  Text,
} from '@signavio/effektif-commons/lib/components'
import { choiceType, Field } from '../../../../../packages/fields'

import type { DecisionOptionT } from '../../../types'

type PropsT = {
  option: DecisionOptionT,
  readOnly?: boolean,
  onDecisionRename: () => void,
  onTransitionTypeChange: (transition: any, type: string) => void,
  targetName: string,
  targetIcon: string,
  transition: any,
  withTransitionDropdown: boolean,
}

const options = () => [
  {
    id: 'allEqual',
    name: i18n('All users have chosen this option'),
  },
  {
    id: 'someEqual',
    name: i18n('At least one user has chosen this option'),
  },
]

const CompletableInput = compose(triggerOnCompleteOnBlur)(Text)

const DecisionOption = ({
  option,
  readOnly,
  targetName,
  targetIcon,
  style,
  onDecisionRename,
  onTransitionTypeChange,
  transition,
  withTransitionDropdown,
}: PropsT) =>
  <div {...style}>
    <div {...style('leftContainer')}>
      <DragHandle />
    </div>
    <div {...style('rightContainer')}>
      <List>
        {withTransitionDropdown &&
          <Field
            noClear
            readOnly={readOnly}
            type={choiceType(options())}
            onChange={onTransitionTypeChange}
            placeholder={i18n('Transition type')}
            value={transition.get('condition').type}
          />}

        <div>
          <div {...style('column1')}>
            <Tile transparent tooltip={option.name}>
              <CompletableInput
                readOnly={readOnly}
                placeholder={i18n('Please enter a button caption')}
                defaultValue={option.name}
                id={option.id}
                onComplete={onDecisionRename}
              />
            </Tile>
          </div>

          <div {...style('column2')}>
            <Icon icon="angle-double-right" iconSet="fontAwesome" />
          </div>

          <div {...style('column3')}>
            <TextTile icon={targetIcon}>
              <label htmlFor={option.id} title={targetName}>
                {targetName}
              </label>
            </TextTile>
          </div>
          <Clearfix />
        </div>
      </List>
    </div>
    <Clearfix />
  </div>

export default compose(
  sortableElement,
  withHandlers({
    onDecisionRename: ({ onDecisionRename, option }) => ev => {
      onDecisionRename(option.id, ev)
    },
    onTransitionTypeChange: ({
      onTransitionTypeChange,
      transition,
    }) => value => {
      onTransitionTypeChange(transition, value)
    },
  }),
  defaultStyle(
    ({ font, lineHeight, padding }) => {
      const iconSize = utils.calculateHeight(
        font.size.normal,
        lineHeight,
        padding.small
      )

      return {
        cursor: 'pointer',
        marginTop: padding.normal,
        zIndex: 1,

        leftContainer: {
          float: 'left',
          position: 'relative',
          top: 0,
        },

        rightContainer: {
          marginLeft: iconSize,
        },

        column1: {
          float: 'left',
          width: '45%',
        },

        column2: {
          float: 'left',
          textAlign: 'center',
          width: '10%',
        },

        column3: {
          float: 'left',
          width: '45%',
        },

        '&withTransitionDropdown': {
          leftContainer: {
            top: iconSize / 2,
          },
        },
      }
    },
    ({ withTransitionDropdown }) => ({
      '&withTransitionDropdown': withTransitionDropdown,
    })
  )
)(DecisionOption)



// WEBPACK FOOTER //
// ./src/activities/views/activities/exclusiveGateway/DecisionOption.js
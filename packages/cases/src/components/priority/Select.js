// @flow
import React from 'react'
import Color from 'color'
import i18n from 'signavio-i18n'

import { DropDown, Popover } from '@signavio/effektif-commons/lib/components'
import {
  TextButton,
  IconButton,
} from '@signavio/effektif-commons/lib/components/buttons'
import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'

import { priorities, Colors } from './priorities'
import Options from './Options'

type PropsT = {
  readOnly?: boolean,

  value: ?string,

  onChange: (id: ?string) => void,
}

function Select({ readOnly, onChange, value, style }: PropsT) {
  return (
    <DropDown
      readOnly={readOnly}
      toggle={
        <Popover popover={i18n('Case priority')}>
          {value ? (
            <TextButton style={style('priority-toggle')} disabled={readOnly}>
              {priorities()[value].name}
            </TextButton>
          ) : (
            <IconButton icon="priority" />
          )}
        </Popover>
      }
      toggleIcon={null}
      closeOnClick
      pushRight
    >
      <Options value={value} onChange={onChange} />
    </DropDown>
  )
}

const getModifiers = ({ value }: PropsT) => {
  if (value) {
    return {
      [`&priority-${value}`]: true,
    }
  }
  return {}
}

const styled = defaultStyle(
  () => ({
    '&priority-0': {
      'priority-toggle': {
        backgroundColor: Colors.high,
        color: utils.color(Colors.high),
        ':hover': {
          backgroundColor: Color(Colors.high)
            .darken(0.05)
            .string(),
          color: utils.color(
            Color(Colors.high)
              .darken(0.05)
              .string()
          ),
        },
      },
    },
    '&priority-1': {
      'priority-toggle': {
        backgroundColor: Colors.medium,
        color: utils.color(Colors.medium),
        ':hover': {
          backgroundColor: Color(Colors.medium)
            .darken(0.05)
            .string(),
          color: utils.color(
            Color(Colors.medium)
              .darken(0.05)
              .string()
          ),
        },
      },
    },
    '&priority-2': {
      'priority-toggle': {
        backgroundColor: Colors.normal,
        color: utils.color(Colors.normal),
        ':hover': {
          backgroundColor: Color(Colors.normal)
            .darken(0.05)
            .string(),
          color: utils.color(
            Color(Colors.normal)
              .darken(0.05)
              .string()
          ),
        },
      },
    },
    '&priority-3': {
      'priority-toggle': {
        backgroundColor: Colors.low,
        color: utils.color(Colors.low),
        ':hover': {
          backgroundColor: Color(Colors.low)
            .darken(0.05)
            .string(),
          color: utils.color(
            Color(Colors.low)
              .darken(0.05)
              .string()
          ),
        },
      },
    },
  }),
  getModifiers
)

export default styled(Select)



// WEBPACK FOOTER //
// ./packages/cases/src/components/priority/Select.js
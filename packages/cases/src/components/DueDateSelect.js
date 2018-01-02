// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { moment } from '@signavio/effektif-commons/lib/extensions'
import {
  DueDate,
  DropDown,
  Icon,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  value: ?string,
  readOnly: boolean,

  onChange: (value: ?string) => void,
}

function DueDateSelect({ value, style, readOnly, onChange }: PropsT) {
  return (
    <DropDown
      hideToggleButton
      disabled={readOnly}
      toggle={(open: boolean) => {
        if (value) {
          return (
            <span {...style('toggle')}>
              {moment(value).format('LLL')}

              {!readOnly &&
                <Icon
                  small
                  iconSet="fontAwesome"
                  icon={open ? 'angle-up' : 'angle-down'}
                />}
            </span>
          )
        }

        return (
          <span {...style('toggle')}>
            <Hint inline>
              {i18n('Not set')}
            </Hint>

            {!readOnly &&
              <Icon
                small
                iconSet="fontAwesome"
                icon={open ? 'angle-up' : 'angle-down'}
              />}
          </span>
        )
      }}
    >
      <DueDate value={value} onChange={onChange} />
    </DropDown>
  )
}

const styled = defaultStyle(
  {
    toggle: {
      cursor: 'pointer',
    },

    '&readOnly': {
      toggle: {
        cursor: null,
      },
    },
  },
  ({ readOnly }: PropsT) => ({
    '&readOnly': readOnly,
  })
)

export default styled(DueDateSelect)



// WEBPACK FOOTER //
// ./packages/cases/src/components/DueDateSelect.js
import React from 'react'
import { isUndefined } from 'lodash'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { Disable, Icon } from '@signavio/effektif-commons/lib/components'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'

import { FieldStructure } from '../../../../../packages/fields'

import type { TimeSpanT } from '../../../types'

import TimespanControl from '../TimespanControl'

type PropsT = {
  value?: TimeSpanT,
  dependsOn?: TimeSpanT,

  label: string,
  description?: string,

  readOnly?: boolean,

  onChange: (value: TimeSpanT) => void,
}

function DependentField({
  value,
  label,
  description,
  dependsOn,
  readOnly,
  style,
  onChange,
}: PropsT) {
  return (
    <Disable disabled={!isUndefined(dependsOn) && !dependsOn}>
      <FieldStructure label={label} description={description}>
        <Tile toolbar={<Icon icon="check" style={style('indicator')} />}>
          <TimespanControl
            value={value}
            readOnly={readOnly}
            onChange={onChange}
          />
        </Tile>
      </FieldStructure>
    </Disable>
  )
}

const styled = defaultStyle(
  ({ color }) => ({
    indicator: {
      backgroundColor: color.primary.middle,
      color: utils.color(color.primary.middle),

      opacity: 0.2,
    },

    '&valid': {
      indicator: {
        backgroundColor: color.primary.base,
        color: utils.color(color.primary.base),

        opacity: 1,
      },
    },
  }),
  ({ value, dependsOn }) => {
    const isValid = dependsOn ? !!value && dependsOn : !!value

    return {
      '&valid': isValid,
    }
  }
)

export default styled(DependentField)



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/DependentField.js
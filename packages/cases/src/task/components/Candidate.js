// @flow
import React from 'react'

import { Popover } from '@signavio/effektif-commons/lib/components'

import { Avatar } from '@signavio/workflow-organizations'
import { userUtils } from '@signavio/effektif-api'
import type { UserT } from '@signavio/effektif-api'

type PropsT = {
  candidate: UserT,
  circular?: boolean,

  disabled: boolean,

  style?: Object,
  className?: string,
}

export default function Candidate({
  circular,
  candidate,
  disabled,
  style,
  small,
  className,
  ...rest
}: PropsT) {
  return (
    <Popover
      {...rest}
      small
      placement="top"
      popover={userUtils.name(candidate)}
    >
      <Avatar
        circular={circular}
        small={small}
        style={style}
        className={className}
        user={candidate}
        disabled={disabled}
      />
    </Popover>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/Candidate.js
// @flow
import React from 'react'
import { withHandlers, compose } from 'recompose'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { Popover } from '@signavio/effektif-commons/lib/components'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

type ApiPropsT = {
  active: boolean,
  icon: string,
  item: string,
  onClick?: (item: string) => void,
}

type PropsT = {
  children: React$Element<any>,
} & ApiPropsT

function ToolbarButton({ active, children, icon, style, onClick }: PropsT) {
  return (
    <div {...style}>
      <Popover small popover={children}>
        <IconButton
          light
          style={style('icon')}
          primary={active}
          icon={icon}
          onClick={onClick}
        />
      </Popover>
    </div>
  )
}

export default compose(
  withHandlers({
    onClick: ({ item, onClick }: PropsT) => () => {
      if (onClick) {
        onClick(item)
      }
    },
  }),
  defaultStyle({
    icon: {
      borderRadius: 40,
    },
  })
)(ToolbarButton)



// WEBPACK FOOTER //
// ./packages/cases/src/components/ToolbarButton.js
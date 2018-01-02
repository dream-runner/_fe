/* @flow */
import React from 'react'
import Color from 'color'

import {
  defaultStyle,
  font,
  utils,
} from '@signavio/effektif-commons/lib/styles'
import { Popover } from '@signavio/effektif-commons/lib/components'

type Props = {
  value: number,
  scale: number,

  title: string,

  popover: Element,
  children: Element,
}

function Bar({ title, popover, children, style, fromRight }: Props) {
  return (
    <div {...style}>
      <Popover
        small
        title={title}
        dx={fromRight ? -TEXT_OFFSET : TEXT_OFFSET}
        placement={fromRight ? 'left' : 'right'}
        popover={popover}
      >
        <div {...style('bar')}>
          <span {...style('info')}>{children}</span>
        </div>
      </Popover>
    </div>
  )
}

const TEXT_OFFSET = 20

const styled = defaultStyle(
  (theme, { value, scale }) => ({
    position: 'relative',

    height: theme.padding.xsmall + 2,
    minWidth: theme.padding.xsmall,

    bar: {
      position: 'absolute',
      width: `calc((100% - ${TEXT_OFFSET}px) * ${value / scale})`,

      top: 0,
      left: 0,

      height: theme.padding.xsmall + 2,

      backgroundColor: Color(theme.color.mono.lighter)
        .fade(0.3)
        .string(),

      ...utils.border('1px', 'solid', theme.color.mono.lighter),
      ...utils.transition('width'),
    },

    info: {
      position: 'absolute',

      top: -6,
      right: -TEXT_OFFSET,

      fontSize: font.size.small,
    },

    '&fromRight': {
      bar: {
        right: 0,
        left: null,
      },

      info: {
        right: null,
        left: -TEXT_OFFSET,
      },
    },
  }),
  props => ({
    '&fromRight': props.fromRight,
  })
)

export default styled(Bar)



// WEBPACK FOOTER //
// ./packages/cases/src/components/progress/Bar.js
// @flow
import React from 'react'
import { withHandlers, compose } from 'recompose'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { LinkButton } from '@signavio/effektif-commons/lib/components/buttons'
import { omitProps } from '@signavio/effektif-commons/lib/components'

type PropsT = {
  children: string,
}

export type FilterT = {
  type?: string,
  taskId?: string,
}

function Filter({ children, ...rest }: PropsT) {
  return (
    <LinkButton {...rest}>
      {children}
    </LinkButton>
  )
}

type ApiPropsT = {
  active: boolean,
  data: FilterT,
  onClick: (data: FilterT) => void,
}

export default compose(
  defaultStyle(
    ({ color, font, padding, lineHeight }) => {
      const height = utils.calculateHeight(
        font.size.small,
        lineHeight,
        padding.xsmall
      )

      return {
        paddingLeft: padding.small,
        paddingRight: padding.small,

        height,
        lineHeight: `${height}px`,

        '&active': {
          ...utils.borderBottom('1px', 'solid', color.primary.base),
        },
      }
    },
    ({ active }: ApiPropsT) => ({
      '&active': active,
    })
  ),
  withHandlers({
    onClick: ({ data, onClick }: ApiPropsT) => () => onClick(data),
  }),
  omitProps(['active', 'data'])
)(Filter)



// WEBPACK FOOTER //
// ./packages/cases/src/events/components/Filter.js
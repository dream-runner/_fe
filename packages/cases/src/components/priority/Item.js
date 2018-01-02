// @flow

import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Icon } from '@signavio/effektif-commons/lib/components'
import { ActionTile } from '@signavio/effektif-commons/lib/components/tiles'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { Colors } from './priorities'

type PropsT = {
  name: string,
  selected: boolean,
  onClick: void => void,
}

type ApiPropsT = {
  id: string,
  name: string,
  selected: boolean,
  onClick: string => void,
}

function Item({ name, selected, onClick, style }: PropsT) {
  return (
    <ActionTile
      header={
        <Icon
          style={style('icon')}
          icon={selected ? 'dot-circle-o' : 'circle-o'}
          iconSet="fontAwesome"
        />
      }
      onClick={onClick}
    >
      {name}
    </ActionTile>
  )
}

const enhance = compose(
  withHandlers({
    onClick: ({ id, onClick }: ApiPropsT) => () => {
      onClick(id)
    },
  }),
  defaultStyle(
    () => ({
      '&priority-0': {
        icon: {
          backgroundColor: Colors.high,
        },
      },
      '&priority-1': {
        icon: {
          backgroundColor: Colors.medium,
        },
      },
      '&priority-2': {
        icon: {
          backgroundColor: Colors.normal,
        },
      },
      '&priority-3': {
        icon: {
          backgroundColor: Colors.low,
        },
      },
    }),
    ({ id }: ApiPropsT) => ({ [`&priority-${id}`]: true })
  )
)

export default enhance(Item)



// WEBPACK FOOTER //
// ./packages/cases/src/components/priority/Item.js
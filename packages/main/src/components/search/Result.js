// @flow
import React from 'react'
import { withHandlers } from 'recompose'

import { ActionTile } from '@signavio/effektif-commons/lib/components/tiles'

type PropsT = {
  icon: string,
  iconSet?: 'fontAwesome' | 'signavio',
  children: React$Element<any>,

  onMouseEnter: () => void,
}

function Result({ children, icon, iconSet, onMouseEnter }: PropsT) {
  return (
    <ActionTile small iconSet={iconSet} icon={icon} onMouseEnter={onMouseEnter}>
      {children}
    </ActionTile>
  )
}

type ApiPropsT<T> = PropsT & {
  result: T,

  onActivate: (result: T) => void,
}

const enhance = withHandlers({
  onMouseEnter: function onMouseEnter<T>({ result, onActivate }: ApiPropsT<T>) {
    return () => onActivate(result)
  },
})

export default enhance(Result)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/Result.js
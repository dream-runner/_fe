// @flow

import React from 'react'

import Added from './Added'
import Removed from './Removed'
import Changed from './Changed'

type Props = {
  type: string,
}

export default function Change(props: Props) {
  const { type } = props
  const View = changeViews[type]

  return <View {...props} />
}

const changeViews = {
  typeRemoved: ({ typeKey, ...rest }) => <Removed {...rest}>{typeKey}</Removed>,
  typeAdded: ({ typeKey, ...rest }) => <Added {...rest}>{typeKey}</Added>,

  typeFieldRemoved: ({ fieldKey, ...rest }) =>
    <Removed {...rest}>{fieldKey}</Removed>,
  typeFieldAdded: ({ fieldKey, ...rest }) =>
    <Added {...rest}>{fieldKey}</Added>,
  typeFieldChanged: ({ fieldKey, ...rest }) =>
    <Changed {...rest}>{fieldKey}</Changed>,
}



// WEBPACK FOOTER //
// ./src/services/views/connectors/diffs/Change.js
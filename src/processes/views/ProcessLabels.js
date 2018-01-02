// @flow
import React from 'react'
import { compose } from 'recompose'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { LabelTile, LabelT } from '../../../packages/organizations'

type PropsT = {
  labels: Array<LabelT>,
}

const ProcessLabels = ({ labels, style }: PropsT) =>
  <div {...style}>
    {labels.map((label: LabelT) =>
      <LabelTile key={label.id} xsmall {...label} style={style('label')} />
    )}
  </div>

export default compose(
  defaultStyle(theme => ({
    label: {
      cursor: 'default',
      marginRight: theme.padding.xsmall,
    },
  }))
)(ProcessLabels)



// WEBPACK FOOTER //
// ./src/processes/views/ProcessLabels.js
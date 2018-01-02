// @flow
import { withProps, compose } from 'recompose'

import { Icon } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

export default compose(
  withProps({
    iconSet: 'fontAwesome',
    icon: 'angle-double-right',
  }),
  defaultStyle(({ color, font }) => ({
    fontSize: font.size.xsmall,
    color: color.mono.lighter,
  }))
)(Icon)



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/LineIdentifier.js
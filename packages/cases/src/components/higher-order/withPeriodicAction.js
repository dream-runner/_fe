// @flow
import { lifecycle, withHandlers, compose } from 'recompose'
import { uniqueId } from 'lodash'

import { omitProps } from '@signavio/effektif-commons/lib/components'
import { TimeUtils } from '@signavio/effektif-commons/lib/utils'

export default function withPeriodicAction(action: Function) {
  const actionId = uniqueId('action')

  return compose(
    withHandlers({
      onPeriodicAction: props => () => action(props),
    }),
    withHandlers({
      onRestartAction: ({ onPeriodicAction }) => () => {
        TimeUtils.stop(actionId)
        TimeUtils.create(actionId)
          .perform(onPeriodicAction)
          .seconds(15)
      },
    }),
    lifecycle({
      componentDidMount() {
        const { onPeriodicAction } = this.props

        TimeUtils.create(actionId)
          .perform(onPeriodicAction)
          .seconds(15)

        onPeriodicAction()
      },
      componentWillUnmount() {
        TimeUtils.stop(actionId)
      },
    }),
    omitProps(['onPeriodicAction'])
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/components/higher-order/withPeriodicAction.js
import { lifecycle } from 'recompose'
import { keys, each } from 'lodash'

export default function(methodMap) {
  const methodsToWatch = keys(methodMap)

  return lifecycle({
    componentWillReceiveProps(nextProps) {
      each(methodsToWatch, (method: string) => {
        const methodExists = this.props[method] && nextProps[method]

        if (!methodExists) {
          return
        }

        const methodFulfilled =
          this.props[method].pending &&
          !nextProps[method].pending &&
          nextProps[method].fulfilled

        if (methodFulfilled) {
          methodMap[method](nextProps)
        }
      })
    },
  })
}



// WEBPACK FOOTER //
// ./src/services/views/spmIntegration/higher-order/handleRequestFulfilled.js
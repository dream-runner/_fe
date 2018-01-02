import { withHandlers } from 'recompose'

const activateWithType = type =>
  withHandlers({
    onActivate: ({ onActivate }) => result => onActivate(result, type),
  })

export default activateWithType



// WEBPACK FOOTER //
// ./packages/main/src/components/search/higher-order/activateWithType.js
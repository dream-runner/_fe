// @flow
import { withHandlers } from 'recompose'

type PropsT<T> = {
  value: T,
  onComplete: (value: T) => void,
}

export default withHandlers({
  onKeyDown: function onKeyDown<T>({ value, onComplete }: PropsT<T>) {
    return (event: SyntheticKeyboardEvent) => {
      const { keyCode, shiftKey, metaKey, ctrlKey } = event

      if (keyCode !== 13 || (!shiftKey && !metaKey && !ctrlKey)) {
        return
      }

      event.preventDefault()

      onComplete(value)
    }
  },
})



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/higher-order/triggerOnCompleteOnShiftEnter.js
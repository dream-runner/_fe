/* @flow */

import React, { Component } from 'react'

type Props = {
  value: any,
  onChange: (value: any) => void,

  onComplete?: () => void,
}

type State = {
  value: any,
}

// a HoC that takes the hacky route to perf optimization:
// reinterpret onChange as onComplete callback
export default function buffered(BufferedComponent: ReactClass) {
  class ValueBuffer extends Component {
    props: Props

    state: State = { value: null }

    _lastPublishedValue: any
    _nextState: State = { value: null }
    _inStateTransition: boolean

    constructor(props: Props) {
      super(...arguments)

      this.state = {
        value: props.value,
      }

      this._lastPublishedValue = props.value
    }

    componentWillReceiveProps(nextProps: Props) {
      if (
        nextProps.value !== this.props.value &&
        nextProps.value !== this.state.value
      ) {
        this.setState({ value: nextProps.value })

        this._lastPublishedValue = nextProps.value
      }
    }

    getLatestValue() {
      return this._inStateTransition ? this._nextState.value : this.state.value
    }

    render() {
      let { onChange, onComplete, ...rest } = this.props
      let { value } = this.state
      return (
        <BufferedComponent
          {...rest}
          value={value}
          onChange={value => {
            this._inStateTransition = true
            this._nextState = { value }

            this.setState({ value }, () => {
              delete this._inStateTransition
              delete this._nextState
            })
          }}
          onComplete={value => {
            if (value !== this._lastPublishedValue) {
              onChange(value)
              this._lastPublishedValue = value
            }
            if (onComplete) {
              onComplete(value)
            }
          }}
        />
      )
    }
  }

  ValueBuffer.displayName = `${BufferedComponent.displayName ||
    BufferedComponent.name}ValueBuffer`

  return ValueBuffer
}



// WEBPACK FOOTER //
// ./src/forms/views/fields/buffered.js
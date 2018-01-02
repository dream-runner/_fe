// @flow
import React from 'react'
import { isNumber, isEqual, find } from 'lodash'
import {
  withState,
  withHandlers,
  mapProps,
  lifecycle,
  compose,
} from 'recompose'

import i18n from 'signavio-i18n'

import { Select, omitProps } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  duration?: number,
  unit: string,

  onDurationChange: (event: KeyboardEvent) => void,
  onUnitChange: (unit: string) => void,
  onBlur: () => void,

  readOnly?: boolean,
}

function TimespanControl(props: PropsT) {
  const {
    readOnly,
    duration,
    unit,
    onDurationChange,
    onBlur,
    onUnitChange,
    style,
    ...rest
  } = props

  return (
    <div {...rest} {...style}>
      <input
        {...style('duration')}
        type="number"
        placeholder="#"
        min="0"
        step="1"
        readOnly={readOnly}
        value={isNumber(duration) ? duration : ''}
        onChange={onDurationChange}
        onBlur={onBlur}
      />

      <Select
        style={style('unit')}
        options={getIntervals(duration)}
        readOnly={readOnly}
        value={unit || defaultUnit}
        onChange={onUnitChange}
      />
    </div>
  )
}

type IntervalT = {
  id: string,
  value: string,
}

function getIntervals(count: ?number): Array<IntervalT> {
  return [
    {
      id: 'minutes',
      value: i18n('minute', 'minutes', { count }),
    },
    {
      id: 'hours',
      value: i18n('hour', 'hours', { count }),
    },
    {
      id: 'days',
      value: i18n('day', 'days', { count }),
    },
    {
      id: 'weeks',
      value: i18n('week', 'weeks', { count }),
    },
    {
      id: 'months',
      value: i18n('month', 'months', { count }),
    },
  ]
}

const defaultUnit = 'days'

type ValueT = {
  duration: number,
  durationUnit: string,
}

type ApiPropsT = PropsT & {
  value?: ValueT,

  onChange: (value: ValueT) => void,

  changeDuration: (duraiton: number) => void,
  changeUnit: (unit: string) => void,
}

export default compose(
  withState(
    'duration',
    'changeDuration',
    ({ value }: ApiPropsT) => (value || {}).duration
  ),
  withState(
    'unit',
    'changeUnit',
    ({ value }: ApiPropsT) => (value || {}).durationUnit || defaultUnit
  ),
  lifecycle({
    componentWillReceiveProps(nextProps: ApiPropsT) {
      if (isEqual(this.props.value, nextProps.value)) {
        return
      }

      const { changeDuration, changeUnit } = this.props
      const { duration, durationUnit } = nextProps.value || {}

      changeDuration(duration)
      changeUnit(durationUnit)
    },
  }),
  withHandlers({
    onDurationChange: ({ changeDuration }: ApiPropsT) => (ev: KeyboardEvent) =>
      changeDuration(parseInt(ev.target.value, 10)),
    onUnitChange: ({ changeUnit, duration, onChange }: ApiPropsT) => (
      unit: string
    ) => {
      changeUnit(unit)

      if (duration) {
        onChange({ duration, durationUnit: unit, type: 'after' })
      }
    },
    onBlur: ({ duration, unit, onChange }: ApiPropsT) => () =>
      onChange(
        duration
          ? { duration, durationUnit: unit || defaultUnit, type: 'after' }
          : null
      ),
  }),
  mapProps((props: ApiPropsT) => {
    const { unit } = props
    const option = find(
      getIntervals(),
      (interval: IntervalT) => unit === interval.id
    )

    if (!option) {
      return props
    }

    return {
      ...props,

      unit: option.id,
    }
  }),
  defaultStyle(() => ({
    duration: {
      float: 'left',

      width: 75,
      marginRight: 1,
    },

    unit: {
      float: 'left',
    },
  })),
  omitProps(['changeDuration', 'changeUnit', 'value', 'onChange'])
)(TimespanControl)



// WEBPACK FOOTER //
// ./src/activities/views/activities/TimespanControl.js
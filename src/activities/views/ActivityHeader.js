// @flow

import React from 'react'
import i18n from 'signavio-i18n'
import { withHandlers, mapProps, compose } from 'recompose'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { Remove } from '@signavio/effektif-commons/lib/components'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Field } from '../../../packages/fields'

type PropsT = {
  header: React$Element<any>,
  onChange: (value: string) => void,
  isNew?: boolean,
  onClose: () => void,
  onRemove: () => void,
  onKeyDown: (event: KeyboardEvent) => void,
  value?: string,
  readOnly?: boolean,
}

function ActivityHeader(props: PropsT) {
  const {
    value,
    isNew,
    readOnly,
    header,
    onChange,
    onClose,
    onRemove,
    onKeyDown,
    style,
    ...rest
  } = props

  return (
    <Tile
      style={style}
      header={header}
      toolbar={
        <div>
          <Remove
            style={style('remove')}
            disabled={readOnly}
            onRemove={onRemove}
          />
          <IconButton
            primary
            style={style('toggle')}
            icon="check"
            onClick={onClose}
          />
        </div>
      }
    >

      <Field
        {...rest}
        {...style('input')}
        autoFocus={isNew}
        noClear
        type={{ name: 'text' }}
        value={value}
        readOnly={readOnly}
        placeholder={i18n('What needs to be done?')}
        onComplete={onChange}
        onKeyDown={onKeyDown}
      />
    </Tile>
  )
}

const styled = defaultStyle(
  () => ({
    input: {
      width: '100%',
    },

    remove: {
      float: 'left',
    },

    toggle: {
      float: 'left',

      ...utils.borderLeft('1px', 'solid', 'white'),
    },
  }),
  (props: PropsT) => ({
    '&readOnly': props.readOnly,
  })
)

export default compose(
  withHandlers({
    onKeyDown: ({ onClose }: PropsT) => ({ keyCode }: KeyboardEvent) => {
      if (keyCode !== 13) {
        return
      }
      onClose()
    },
    onChange: ({ onChange }: PropsT) => (value: string) => {
      onChange(value || '') // our beloved editor renders `null` as `'null'`
    },
  }),
  mapProps(({ value, ...rest }) => ({
    // make sure to map empty string back to `null`, as otherwise we might run into endless update
    // loops via the Field component
    value: value || null,
    ...rest,
  })),
  styled
)(ActivityHeader)



// WEBPACK FOOTER //
// ./src/activities/views/ActivityHeader.js
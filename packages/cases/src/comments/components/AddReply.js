// @flow
import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import i18n from 'signavio-i18n'

import { withUser } from '@signavio/effektif-api'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'
import { omitProps } from '@signavio/effektif-commons/lib/components'

import { triggerOnCompleteOnShiftEnter } from './higher-order'

import CommentInput from './CommentInput'

type PropsT = {
  isBusy: boolean,

  value: string,

  onReply: () => void,
  onChange: (event: SyntheticInputEvent) => void,
}

function AddReply({
  isBusy,
  onReply,
  value,
  style,
  onChange,
  ...rest
}: PropsT) {
  return (
    <div {...style}>
      <CommentInput
        {...rest}
        style={style('input')}
        value={value}
        onChange={onChange}
        markdown={false}
        readOnly={isBusy}
        placeholder={
          isBusy ? i18n('Adding reply...') : i18n('Reply to this comment')
        }
      />

      <div {...style('buttonContainer')}>
        <TextButton
          small
          primary
          disabled={!(value || '').trim()}
          onClick={onReply}
        >
          {i18n('Submit reply')}
        </TextButton>
      </div>
    </div>
  )
}

type ApiPropsT = PropsT & {
  value: string,
  setValue: (value: string) => void,
}

export default compose(
  withUser,
  withState('value', 'setValue', ''),
  withHandlers({
    onReply: ({ value, setValue, onReply }: ApiPropsT) => () => {
      onReply(value.trim())

      setValue('')
    },
    onChange: ({ setValue }: ApiPropsT) => ({ target }: SyntheticInputEvent) =>
      setValue(target.value),
  }),
  withHandlers({
    onComplete: ({ onReply }: ApiPropsT) => onReply,
  }),
  triggerOnCompleteOnShiftEnter,
  defaultStyle(({ font, padding }) => ({
    input: {
      backgroundColor: 'white',
      zIndex: 2,

      input: {
        fontSize: font.size.small,

        minHeight: 40,
      },
    },

    buttonContainer: {
      marginTop: padding.small,

      textAlign: 'right',
    },
  })),
  omitProps(['setValue'])
)(AddReply)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/AddReply.js
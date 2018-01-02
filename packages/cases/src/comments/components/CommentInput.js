// @flow
import React from 'react'
import { compose } from 'recompose'
import { Mention } from 'react-mentions'
import { reduce, toLower } from 'lodash'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { UserMentionsInput } from '@signavio/workflow-organizations'

import ShortcutSuggestion, { descriptions } from './ShortcutSuggestion'

// TODO: fix that
// import { getUsersFromLocalCache } from '../../../../../users/utils'

type PropsT = {
  children: React$Element<any>,
}

type DataT = {
  id: string,
  display: string,
}

function CommentInput({
  children,
  style,
  value,
  description,
  placeholder,
  participants,
  onChange,
  onComplete,
  ...rest
}: PropsT) {
  return (
    <UserMentionsInput
      {...style}
      value={value}
      onChange={onChange}
      onComplete={onComplete}
      description={description}
      placeholder={placeholder}
      participants={participants}
      {...rest}
    >
      <Mention
        style={style('mention')}
        type="shortcut"
        trigger="@"
        data={matchData}
        renderSuggestion={(suggestion: DataT) => (
          <ShortcutSuggestion index={suggestion.id}>
            {suggestion.display}
          </ShortcutSuggestion>
        )}
      />

      {children}
    </UserMentionsInput>
  )
}

const isIncluded = (value: string, other: string) =>
  toLower(value).indexOf(toLower(other)) === 0

const matchData = (search: string) =>
  reduce(
    descriptions(),
    (data, { display }, id) => {
      if (!isIncluded(display, search)) {
        return data
      }

      return [...data, { display, id }]
    },
    []
  )

export default compose(
  defaultStyle(({ color }) => ({
    mention: {
      backgroundColor: color.primary.light,
    },
  }))
)(CommentInput)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/CommentInput.js
// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withHandlers } from 'recompose'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Disable, TabBar, Tab } from '@signavio/effektif-commons/lib/components'

import type { CommentTargetT } from '../types'

import CommentHint from './CommentHint'

type PropsT = {
  value: ?CommentTargetT,
  canCommentOnTask: boolean,

  onChange: (commentTarget: CommentTargetT) => void,
}

function CommentTarget({
  value,
  canCommentOnTask,
  style,
  onChange,
  onSelectionChange,
}: PropsT) {
  return (
    <div {...style}>
      <h5 {...style('title')}>{i18n('You are commenting on')}</h5>

      <TabBar>
        <Tab
          small
          active={value === 'case'}
          onClick={() => onSelectionChange('case')}
        >
          {i18n('The current case')}
        </Tab>
        <Tab
          small
          style={style('tab')}
          active={value === 'task'}
          onClick={() => onSelectionChange('task')}
        >
          {i18n('The current task')}
        </Tab>
      </TabBar>

      <CommentHint commentOnTask={value === 'task'} />
    </div>
  )
}

const styled = defaultStyle(
  ({ padding, font, color }) => ({
    fontSize: font.size.form,

    title: {
      fontFamily: font.family.normal,
      marginBottom: padding.small,
    },
    '&disabled': {
      tab: {
        opacity: 0.5,
        cursor: null,
      },
    },
  }),
  ({ canCommentOnTask }) => ({
    '&disabled': !canCommentOnTask,
  })
)

export default compose(
  withHandlers({
    onSelectionChange: ({ onChange, canCommentOnTask }) => target => {
      if (!canCommentOnTask) return
      onChange(target)
    },
  }),
  styled
)(CommentTarget)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/CommentTarget.js
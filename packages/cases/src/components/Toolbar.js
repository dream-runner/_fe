import React from 'react'
import i18n from 'signavio-i18n'
import { isEmpty } from 'lodash'
import { compose } from 'recompose'

import { Stick } from '@signavio/react-forms'

import { connect, types } from '@signavio/effektif-api'

import { List } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import ToolbarButton from './ToolbarButton'
import CommentCounter from './CommentCounter'

type PropsT = {
  category?: string,
  style: Object,
  onCategoryChange: (category: string) => void,
}

const Toolbar = ({
  category,
  style,
  onCategoryChange,
  fetchComments,
}: PropsT) => (
  <List direction="horizontal" style={style}>
    <ToolbarButton
      active={category === 'coreInfo'}
      icon="info"
      item="coreInfo"
      onClick={onCategoryChange}
    >
      {i18n('Core information')}
    </ToolbarButton>

    <Stick
      inline
      position="top right"
      align="middle center"
      node={
        !isEmpty(fetchComments.value) && (
          <div {...style('bubble')}>
            <CommentCounter>{fetchComments.value.length}</CommentCounter>
          </div>
        )
      }
    >
      <ToolbarButton
        active={category === 'comments'}
        icon="comment"
        item="comments"
        onClick={onCategoryChange}
      >
        {i18n('Comments')}
      </ToolbarButton>
    </Stick>

    <ToolbarButton
      active={category === 'events'}
      icon="clock"
      item="events"
      onClick={onCategoryChange}
    >
      {i18n('History')}
    </ToolbarButton>
  </List>
)

export default compose(
  connect(({ caseId, taskId }) => ({
    fetchComments: {
      type: types.COMMENTS,
      query: {
        caseId,
        taskId,
      },
    },
  })),
  defaultStyle(({ padding }) => ({
    entry: {
      paddingLeft: padding.small,
    },

    bubble: {
      marginTop: 2,
      marginLeft: -2,
    },
  }))
)(Toolbar)



// WEBPACK FOOTER //
// ./packages/cases/src/components/Toolbar.js
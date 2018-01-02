// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type DescriptionT = {
  display: string,
  description: string,
}

type DescriptionsT = {
  all: DescriptionT,
  open: DescriptionT,
}

const Suggestion = ({ style, children, index }) =>
  <TextTile
    transparent
    style={style}
    icon="at"
    subtitle={descriptions(index).description}
  >
    {children}
  </TextTile>

export const descriptions = (key?: string): DescriptionsT | DescriptionT => {
  const items = {
    all: {
      display: i18n('All participants'),
      description: i18n('Mention all participants of this case'),
    },
    open: {
      display: i18n('Open task assignees'),
      description: i18n('Mention all users with open tasks'),
    },
  }

  if (key) {
    return items[key]
  }

  return items
}

const styled = defaultStyle(
  ({ color }) => ({
    marginTop: 1,

    '&first': {
      marginTop: null,
    },
  }),
  ({ index }) => ({
    '&first': index === 0,
  })
)

export default styled(Suggestion)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/ShortcutSuggestion.js
// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { connect, types, withUser, getBaseUrl } from '@signavio/effektif-api'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import {
  MarkdownMentions,
  Divider,
  omitProps,
} from '@signavio/effektif-commons/lib/components'
import { File } from '@signavio/effektif-commons/lib/views'

import type { CommentT } from '../types'

import Replies from './Replies'

type PropsT = {
  caseId: string,
  comment: CommentT,

  isLoaded: boolean,
  isLoading: boolean,

  replies: Array<CommentT>,

  onToggle: () => void,
  onReply: (message: string) => void,
}

function CommentContent({ style, caseId, comment }: PropsT) {
  const { message, type, file } = comment

  if (type === 'fileAdd') {
    return (
      <div {...style}>
        <File
          showImage
          file={{
            src: `${getBaseUrl()}files/${file.id}`,
            size: file.sizeInBytes,
            name: file.name,
            contentType: file.contentType,
          }}
        />

        <Divider />

        <Replies caseId={caseId} comment={comment} />
      </div>
    )
  }

  return (
    <div {...style}>
      <MarkdownMentions style={style('message')}>{message}</MarkdownMentions>

      <Divider />

      <Replies caseId={caseId} comment={comment} />
    </div>
  )
}

type ApiPropsT = PropsT & {
  caseId: string,
}

const styled = defaultStyle(({ color, padding }) => ({
  message: {
    padding: padding.normal,
    backgroundColor: color.mono.ultralight,
  },
}))

export default styled(CommentContent)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/CommentContent.js
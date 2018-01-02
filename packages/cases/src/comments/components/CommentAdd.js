// @flow
import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import i18n from 'signavio-i18n'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import {
  FileUpload,
  FileUploadDropZone,
  FileUploadDropZoneConnection,
  omitProps,
} from '@signavio/effektif-commons/lib/components'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Row, Col } from '@signavio/effektif-commons/lib/components/grid'

import type { UserT } from '@signavio/effektif-api'

import { triggerOnCompleteOnShiftEnter } from './higher-order'

import CommentInput from './CommentInput'

type PropsT = {
  user: UserT,

  fileUploadConnection: FileUploadDropZoneConnection,

  value: string,

  onChange: (comment: string) => void,
  onFileAdd: (file: File) => void,
  onSubmit: (comment: string) => void,
}

const SubmittableCommentInput = compose(
  triggerOnCompleteOnShiftEnter,
  omitProps(['onComplete'])
)(CommentInput)

function CommentAdd(props: PropsT) {
  const {
    fileUploadConnection,
    value,
    style,
    onChange,
    onFileAdd,
    onSubmit,
    participants,
  } = props

  return (
    <FileUploadDropZone fileUploadConnection={fileUploadConnection}>
      <div {...style}>
        <SubmittableCommentInput
          value={value}
          onChange={onChange}
          onComplete={onSubmit}
          description={i18n(
            'Type __atSign__ to mention people in your comment',
            {
              atSign: <kbd>@</kbd>,
            }
          )}
          placeholder={i18n('Type a comment, involve people, or drop a file')}
          participants={participants}
        />

        <div {...style('controls')}>
          <Row>
            <Col xs={5}>
              <FileUpload
                inline
                title={i18n('Upload a document')}
                onUploaded={onFileAdd}
                dropZoneConnection={fileUploadConnection}
              />
            </Col>
            <Col xs={7}>
              <div {...style('submit')}>
                <TextButton
                  small
                  primary
                  onClick={onSubmit}
                  title={i18n('shift+enter')}
                  disabled={!value}
                >
                  {i18n('Submit comment')}
                </TextButton>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </FileUploadDropZone>
  )
}

type ApiPropsT = PropsT & {
  setComment: (comment: string) => void,
}

export default compose(
  defaultStyle(({ font, padding }) => ({
    controls: {
      marginTop: padding.small,
      fontSize: font.size.small,
    },

    submit: {
      textAlign: 'right',
    },
  })),
  withState(
    'fileUploadConnection',
    'setConnection',
    () => new FileUploadDropZoneConnection()
  ),
  withState('value', 'setComment', ''),
  withHandlers({
    onChange: ({ setComment }: ApiPropsT) => (
      ev: KeyboardEvent,
      value: string
    ) => setComment(value),
    onSubmit: ({ value, setComment, onComment }: ApiPropsT) => () => {
      onComment(value)

      setComment('')
    },
  }),
  omitProps(['setConnection', 'setComment'])
)(CommentAdd)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/CommentAdd.js
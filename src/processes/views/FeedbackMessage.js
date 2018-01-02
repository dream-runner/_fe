// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Markdown, Divider } from '@signavio/effektif-commons/lib/components'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import Router from '../../singleton/Router'

type PropsT = {
  children: React$Element<any>,
  caseId?: string,
  workflowId: string,
}

function FeedbackMessage({
  children,
  caseId,
  workflowId,
  style,
  ...rest
}: PropsT) {
  return (
    <div {...rest} {...style}>
      <Markdown>
        {children}
      </Markdown>

      <Divider padding="normal" />

      {caseId
        ? <div className="row">
            <div className="col-sm-6">
              <TextButton
                style={style('button')}
                block
                light
                href={Router.reverse('create_case', { id: workflowId })}
              >
                {i18n('Start another new case')}
              </TextButton>
            </div>
            <div className="col-sm-6">
              <TextButton
                style={style('button')}
                block
                primary
                href={Router.reverse('case', { id: caseId })}
              >
                {i18n('Open this case')}
              </TextButton>
            </div>
          </div>
        : <TextButton
            style={style('button')}
            block
            primary
            href={Router.reverse('create_case', { id: workflowId })}
          >
            {i18n('Start another new case')}
          </TextButton>}
    </div>
  )
}

const styled = defaultStyle(({ padding }) => ({
  paddingTop: padding.large,
  paddingBottom: padding.normal,

  button: {
    textAlign: 'center',
  },
}))

export default styled(FeedbackMessage)



// WEBPACK FOOTER //
// ./src/processes/views/FeedbackMessage.js
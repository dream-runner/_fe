// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withHandlers, withState } from 'recompose'
import { withRouter } from 'react-router'

import {
  Feedback,
  withUserPreferences,
  withUser,
  connect,
  types,
  fulfillRequestThen,
  prependOrg,
} from '@signavio/effektif-api'

import { Popover } from '@signavio/effektif-commons/lib/components'
import { LinkButton } from '@signavio/effektif-commons/lib/components/buttons'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type ApiPropsT = {
  onFeedbackClick: () => void,
  onGoBackClick: () => void,
}

function SwitchViewHeader({
  userPreferences,
  style,
  location,
  feedback,
  onFeedbackClick,
  onGoBackClick,
}: ApiPropsT) {
  return (
    <div {...style}>
      {userPreferences.newCaseViewFeedbackGiven ? (
        <LinkButton onClick={onGoBackClick} style={style('linkButton')}>
          {i18n('Go back to old layout')}
        </LinkButton>
      ) : (
        <Popover
          placement="top"
          popover={
            <div>
              {i18n(
                "We kindly ask you to provide us some feedback about this new layout. Don't worry, you can skip it if you want."
              )}
            </div>
          }
          showDelay={0}
        >
          <LinkButton onClick={onGoBackClick} style={style('linkButton')}>
            {i18n('Go back to old layout')}
          </LinkButton>
        </Popover>
      )}

      {' | '}

      <LinkButton onClick={onFeedbackClick} style={style('linkButton')}>
        {i18n('Give feedback')}
      </LinkButton>

      {feedback && (
        <Feedback page={location.pathname} onSubmit={onFeedbackClick} />
      )}
    </div>
  )
}

export default compose(
  withRouter,
  withUserPreferences,
  withUser,
  withState('useNewCaseView', 'toggleNewCaseView', true),
  withState('feedback', 'toggleFeedback', false),
  connect(({ user }) => ({
    updatePreferences: {
      id: user.id,
      type: types.USER_PREFERENCE,
      method: 'update',
    },
  })),
  fulfillRequestThen({
    updatePreferences: ({ useNewCaseView, taskId, caseId, history }) => {
      if (!useNewCaseView) {
        if (taskId) {
          history.push(prependOrg(`/case/${caseId}/task/${taskId}`))
        } else {
          history.push(prependOrg(`/case/${caseId}`))
        }
      }
    },
  }),
  withHandlers({
    onFeedbackClick: ({
      toggleFeedback,
      userPreferences,
      caseId,
      taskId,
      history,
      feedback,
    }: PropsT) => () => {
      toggleFeedback(!feedback)
      // Redirects the user to the old case view if its the first time the user is on the page, can be removed when the old detail view is being removed.
      if (!userPreferences.useNewCaseView) {
        history.push(prependOrg(`/case/${caseId}/task/${taskId}`))
      }
    },
    onGoBackClick: ({
      toggleFeedback,
      toggleNewCaseView,
      updatePreferences,
      userPreferences,
    }: PropsT) => () => {
      if (!userPreferences.newCaseViewFeedbackGiven) {
        updatePreferences({
          newCaseViewFeedbackGiven: true,
          useNewCaseView: false,
        })

        toggleFeedback(true)

        return
      }

      toggleNewCaseView(false)

      updatePreferences({
        useNewCaseView: false,
      })
    },
  }),
  defaultStyle(({ font }) => ({
    linkButton: {
      fontSize: font.size.form,
      textDecoration: 'underline',
    },
  }))
)(SwitchViewHeader)



// WEBPACK FOOTER //
// ./packages/cases/src/components/SwitchViewHeader.js
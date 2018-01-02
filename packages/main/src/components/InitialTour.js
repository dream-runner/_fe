import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'

import Router from 'singleton/Router'

import { defaultStyle, utils, padding } from 'commons-style'
import { Modal, Icon, List, Clearfix } from 'commons-components'
import { IconButton, TextButton, LinkButton } from 'commons-components/buttons'
import { applicationName } from '@signavio/effektif-commons'

export default function InitialTour({ step }) {
  const steps = [StepOne, StepTwo, StepThree, StepFour]

  let Step = steps[step - 1]

  return (
    <Modal
      className="tour"
      title={
        step === 4
          ? i18n('__applicationName__ Tour', { applicationName })
          : i18n('__applicationName__ Tour (__step__/3)', {
              applicationName,
              step,
            })
      }
      onRequestHide={exitTour}
    >

      <Step />

      <Navigation step={step} />
    </Modal>
  )
}

InitialTour.propTypes = {
  step: PropTypes.number,
}

InitialTour.defaultProps = {
  step: 1,
}

const exitTour = () =>
  Router.navigate(Router.reverse('tasks'), { trigger: true })

function Navigation({ step }) {
  return (
    <div style={{ marginTop: padding.large }}>
      <LinkButton style={{ float: 'left' }} onClick={exitTour}>
        {i18n('Skip this tour')}
      </LinkButton>

      <div style={{ float: 'right' }}>
        <IconButton
          iconSet="fontAwesome"
          icon="angle-left"
          style={{
            ...utils.borderRight('1px', 'solid', 'white'),
          }}
          onClick={() =>
            Router.navigate(Router.reverse('tour', { step: step - 1 }), {
              trigger: true,
            })}
          disabled={step === 1}
        >

          {i18n('Back')}
        </IconButton>

        {step < 4
          ? <IconButton
              right
              iconSet="fontAwesome"
              icon="angle-right"
              onClick={() =>
                Router.navigate(Router.reverse('tour', { step: step + 1 }), {
                  trigger: true,
                })}
            >

              {i18n('Next')}
            </IconButton>
          : <TextButton onClick={exitTour}>
              {i18n('Close')}
            </TextButton>}
      </div>
    </div>
  )
}

Navigation.propTypes = {
  step: PropTypes.number,
}

const StepIcon = defaultStyle(theme => ({
  float: 'left',
  display: 'block',

  marginRight: padding.normal,
  marginBottom: padding.xsmall,

  backgroundColor: theme.color.primary.base,
  color: utils.color(theme.color.primary.base),
}))(props => <Icon {...props} />)

function StepOne() {
  return (
    <div>
      <p>
        {i18n('There are just **3** things you need to know to get started:', {
          markdown: true,
        })}
      </p>

      <StepIcon icon="square-check" />

      {i18n(
        'A **task** is a concrete work item. ' +
          "Tasks can be assigned to keep track of who's doing what.",
        { markdown: true }
      )}
    </div>
  )
}

function StepTwo() {
  return (
    <div>
      <StepIcon iconSet="fontAwesome" icon="folder-open-o" />

      {i18n(
        'A **case** is a collaboration page for a particular goal. It has a ' +
          'list of tasks representing the concrete action items to reach the goal ' +
          'and provides an overview of all relevant documents and events.',
        { markdown: true }
      )}
    </div>
  )
}

function StepThree() {
  return (
    <div>
      <StepIcon iconSet="fontAwesome" icon="cogs" />

      {i18n(
        'A **process** is like a recipe to achieve a goal. Describe the flow of ' +
          'actions once and __applicationName__ will keep track of what has to be done for each ' +
          'individual case. ',
        { applicationName, markdown: true }
      )}
    </div>
  )
}

function StepFour() {
  return (
    <div>
      {i18n('**You can do it!**\n  ' + 'Start creating your own processes.', {
        markdown: true,
      })}

      <div style={{ paddingTop: padding.large }}>
        <TextButton
          primary
          style={{
            width: '50%',
            float: 'left',
            textAlign: 'center',

            ...utils.borderRight('1px', 'solid', 'white'),
          }}
          href="/examples"
        >

          {i18n('Start from an example')}
        </TextButton>
        <TextButton
          primary
          style={{
            width: '50%',
            float: 'left',
            textAlign: 'center',
          }}
          href="/process"
        >

          {i18n('Start an empty new process')}
        </TextButton>

        <Clearfix />
      </div>
    </div>
  )
}



// WEBPACK FOOTER //
// ./packages/main/src/components/InitialTour.js
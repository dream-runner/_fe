import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'signavio-i18n'
import _ from 'lodash'
import { CSSUtils } from '@signavio/effektif-commons/lib/utils'
import { Hint } from '@signavio/effektif-commons/lib/components'
import { applicationName } from '@signavio/effektif-commons'

var STEPS = [
  {
    title: i18n('Verify your email'),
    description: i18n(
      "To create an account, please enter your email address and click the link we will send to you. You don't need a credit card to register."
    ),
  },
  {
    title: i18n('Complete your profile'),
  },
  {
    title: i18n('Enjoy __applicationName__', { applicationName }),
  },
]

module.exports = class extends React.Component {
  static displayName = 'RegistrationProgress'

  static propTypes = {
    step: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div className="registration-progress">
        <div className="row">
          {_.map(STEPS, (step, index) => {
            return (
              <div key={index} className="col-sm-4">
                {this.renderStep(step, index)}
              </div>
            )
          })}
        </div>

        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            {this.renderDescription()}
          </div>
        </div>
      </div>
    )
  }

  renderStep = (step, index) => {
    var cls = CSSUtils.cls({
      step: true,
      'step-active': this.props.step >= index + 1,
    })

    return (
      <div className={cls}>
        <div className="title">
          {index + 1 + '.'} {step.title}
          {this.renderIcon(index)}
        </div>
      </div>
    )
  }

  renderIcon = index => {
    if (this.props.step <= index + 1) {
      return
    }

    return <i className="icon signavio-icon icon-check" />
  }

  renderDescription = () => {
    var step = STEPS[this.props.step - 1]

    if (!step || !step.description) {
      return
    }

    return <Hint className="description">{step.description}</Hint>
  }
}



// WEBPACK FOOTER //
// ./packages/main/src/components/login/RegistrationProgress.js
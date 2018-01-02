import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'
import { withProps } from 'recompose'

import Registration from 'users/models/Registration'

import Effektif from 'singleton/Effektif'
import Login from 'singleton/Login'
import Router from 'singleton/Router'

import { applicationName } from '@signavio/effektif-commons'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { CSSUtils, UserUtils } from '@signavio/effektif-commons/lib/utils'
import { Select, Modal, List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import { Field } from '@signavio/effektif-fields'
import { UserDetails } from '@signavio/workflow-organizations'

import {
  RegistrationProgress,
  RegistrationInfoField,
  businessCategories,
  salutations,
  numberOfEmployees,
  departments,
  seniorityLevels,
} from '../../components'

/**
 * A view to activate a user after registration
 *
 */
const ActivateRegistration = createReactClass({
  displayName: 'Registration',

  mixins: [BaseMixin],

  getInitialState() {
    return {
      loading: true,
      activating: false,
      lastAvatarUpload: new Date().getTime(),
    }
  },

  componentDidMount() {
    this.props.model.once(
      'sync',
      function() {
        const user = this.props.model.get('user')
        user.set('color', UserUtils.changeColor(user.get('color')))
        this.setState({
          loading: false,
        })
      },
      this
    )
    this.props.model.once('error', () => {
      Router.navigate('/', {
        trigger: true,
      })
    })
    this.props.model.fetch()
  },

  componentWillUnmount() {
    this.props.model.off(null, null, this)
  },

  render() {
    const cls = CSSUtils.cls({
      view: true,
      registration: true,
    })

    const { loading, activating } = this.state

    return (
      <div className={cls}>
        <div className="view-header">
          {!loading && (
            <h2 className="page-header">{i18n('Complete your profile')}</h2>
          )}
        </div>

        <div className="view-content">
          <RegistrationProgress step={2} />

          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              {this.renderForm()}

              {!loading && (
                <div className="row">
                  <div className="col-xs-12">
                    <small>* {i18n('required fields')}</small>
                  </div>
                </div>
              )}

              {loading && (
                <Hint loading view>
                  {i18n('Loading registration info...')}
                </Hint>
              )}
            </div>
          </div>
        </div>

        {activating && (
          <Modal>
            <Hint loading>{i18n('Setting up your workspace...')}</Hint>
          </Modal>
        )}
      </div>
    )
  },

  renderForm() {
    if (this.state.loading) {
      return null
    }

    const { model } = this.props

    const user = model.get('user')

    const isOnPremise = Effektif.config().isOnPremise()

    return (
      <List>
        <RegistrationInfoField label={i18n('Salutation')}>
          <Select
            value={model.get('salutation')}
            options={salutations()}
            onChange={this.handleSalutationChange}
            placeholder={i18n('Salutation')}
          />
        </RegistrationInfoField>

        <UserDetails
          inputOnly
          user={user.toJSON()}
          userEndpoint={model.url()}
          onChange={this.hanelUserChange}
        />

        <RegistrationInfoField
          label={i18n('Enter the name of the team or your company.')}
        >
          <input
            type="text"
            className="form-control input-organization"
            id="login-organization"
            placeholder={model.defaultOrganizationName()}
            disabled={!!model.get('organization')}
            value={model.organizationName()}
            onChange={this.handleOrganizationNameChange}
          />
        </RegistrationInfoField>

        <RegistrationInfoField label={i18n('Kind of business')}>
          <Select
            value={model.get('industry')}
            options={businessCategories()}
            onChange={this.handleBusinessCategoryChange}
            placeholder={i18n('Please specify the kind of your business')}
          />
        </RegistrationInfoField>

        <RegistrationInfoField label={i18n('Number of employees')}>
          <Select
            value={model.get('numberOfEmployees')}
            options={numberOfEmployees()}
            onChange={this.handleNumberOfEmployeesChange}
            placeholder={i18n('Please select the number of employees')}
          />
        </RegistrationInfoField>

        <RegistrationInfoField label={i18n('Seniority level')}>
          <Select
            value={model.get('seniorityLevel')}
            options={seniorityLevels()}
            onChange={this.handleSeniorityLevelChange}
            placeholder={i18n('Please select your seniority level')}
          />
        </RegistrationInfoField>

        <RegistrationInfoField label={i18n('Department')}>
          <Select
            value={model.get('department')}
            options={departments()}
            onChange={this.handleDepartmentChange}
            placeholder={i18n('Please select your department')}
          />
        </RegistrationInfoField>

        <Field
          regularBoolean
          label={i18n(
            "By clicking 'Enter __applicationName__' I agree to the [Terms and Conditions](http://signavio.com/terms-and-conditions) and the [Data Privacy](http://signavio.com/privacy) as outlined in the linked documents.",
            {
              markdown: true,
              applicationName,
            }
          )}
          type={{ name: 'boolean' }}
          value={model.get('tc')}
          onChange={this.handleTCChange}
        />

        {!isOnPremise && (
          <Field
            regularBoolean
            label={i18n(
              'I would like to be informed regularly by __applicationName__ by email about innovations and offers. My email address will not be passed on to third parties. I may at any time unregister from this service',
              {
                markdown: true,
                applicationName,
              }
            )}
            type={{ name: 'boolean' }}
            value={model.get('newsletter')}
            onChange={this.handleNewsletterChange}
          />
        )}

        <TextButton
          primary
          block
          onClick={this.handleSubmit}
          disabled={!this.isValid()}
        >
          {this.getButtonLabel()}
        </TextButton>
      </List>
    )
  },

  isValid() {
    return this.props.model.isValid() && !this.state.passwordError
  },

  getButtonLabel() {
    if (!this.props.model.get('salutation').trim()) {
      return i18n('Please select a salutation')
    }

    if (
      !this.props.model
        .get('user')
        .get('firstName')
        .trim()
    ) {
      return i18n('Please enter your first name')
    }

    if (
      !this.props.model
        .get('user')
        .get('lastName')
        .trim()
    ) {
      return i18n('Please enter your last name')
    }

    if (
      !this.props.model
        .get('user')
        .get('phone')
        .trim()
    ) {
      return i18n('Please enter your phone number')
    }

    if (
      !this.props.model
        .get('user')
        .get('country')
        .trim()
    ) {
      return i18n('Please enter your country')
    }

    if (!this.props.model.get('user').get('password')) {
      return i18n('Please enter a valid password')
    }

    if (!this.props.model.get('tc')) {
      return i18n('Please accept the Terms and Conditions')
    }

    return i18n('Join __applicationName__', { applicationName })
  },

  handleSubmit(ev) {
    ev.preventDefault()

    if (!this.props.model.isValid() || !this.props.model.get('tc')) {
      return
    }

    this.setState({
      activating: true,
    })

    const activation = this.props.model.activate()

    activation.once(
      'sync',
      function() {
        Login.activate(activation)

        Effektif.init(() => {
          this.setState({
            activating: false,
          })

          Router.navigate(Router.reverse('tour'), {
            trigger: true,
          })
        })
      },
      this
    )
  },

  hanelUserChange(changes = {}) {
    this.props.model.get('user').set(changes)
  },

  handleColorChange(color) {
    this.props.model.set('color', color)
  },

  handleNewsletterChange(value) {
    this.props.model.set('newsletter', value)
  },

  handleTCChange(value) {
    this.props.model.set('tc', value)
  },

  handleSalutationChange(id) {
    this.props.model.set('salutation', id)
  },

  handleBusinessCategoryChange(id) {
    this.props.model.set('industry', id)
  },

  handleDepartmentChange(id) {
    this.props.model.set('department', id)
  },

  handleNumberOfEmployeesChange(id) {
    this.props.model.set('numberOfEmployees', id)
  },

  handleSeniorityLevelChange(id) {
    this.props.model.set('seniorityLevel', id)
  },

  handleOrganizationNameChange(event) {
    this.props.model.set('organizationName', event.target.value)
  },
})

const enhance = withProps(({ code }) => ({
  model: new Registration({ code }),
}))

export default enhance(ActivateRegistration)



// WEBPACK FOOTER //
// ./packages/main/src/containers/login/ActivateRegistration.js
import React, { Component } from 'react'

import RegistrationModel from 'users/models/Registration'

import { Container } from '@signavio/effektif-commons/lib/components'

import { Registration } from '../../components'

import ActivateRegistration from './ActivateRegistration'

export default class RegistrationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { match } = this.props

    if (match.params.id) {
      return (
        <Container>
          <ActivateRegistration code={match.params.id} />
        </Container>
      )
    }

    return (
      <Container>
        <Registration
          onRegister={email => this.handleRegistration(email)}
          waiting={this.state.waiting}
          success={this.state.success}
          error={this.state.error}
        />
      </Container>
    )
  }

  handleRegistration(email) {
    const registration = new RegistrationModel()
    registration.set('emailAddress', email)

    this.setState({ waiting: true })
    registration.once('error', () =>
      this.setState({ error: true, waiting: false })
    )
    registration.once('sync', () =>
      this.setState({ success: true, waiting: false })
    )

    registration.save()
  }
}



// WEBPACK FOOTER //
// ./packages/main/src/containers/login/Registration.js
import React from 'react'
import i18n from 'i18n'

import Router from 'singleton/Router'

import EffektifDetails from '../../../packages/main/src/components/EffektifDetails'
import { Events } from '../../../packages/admin'
import { LabeledField } from '../../../packages/fields'

import { Tile, Group, List } from 'commons-components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

module.exports = class extends React.Component {
  static displayName = 'SystemConfiguration'

  state = {
    loading: true,
  }

  componentWillMount() {
    this.props.model.once(
      'sync',
      function() {
        this.setState({
          loading: false,
        })
      },
      this
    )

    this.props.model.fetch()
  }

  componentWillUnmount() {
    this.props.model.off(null, null, this)
  }

  render() {
    if (this.state.loading) {
      return (
        <Hint loading view>
          {i18n('Loading system configuration...')}
        </Hint>
      )
    }

    return (
      <div className="about">
        <div className="row">
          <div className="col-sm-8">
            <h4 className="container-header">
              {i18n('General')}
            </h4>

            <EffektifDetails model={this.props.model.get('about')} />

            {this.renderProperties()}

            <div className="group row">
              <div className="col-sm-6">
                {this.renderSystemAdmins()}
              </div>
              <div className="col-sm-6">
                {this.renderSystemUsers()}
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            {this.renderEvents()}
          </div>
        </div>
      </div>
    )
  }

  renderEvents = () => {
    return (
      <Group className="events" title={i18n('Events')}>
        <Events filter={{ category: 'system' }} />
      </Group>
    )
  }

  renderSystemAdmins = () => {
    return (
      <Group className="system-admins" title={i18n('System admins')}>
        {this.props.model.get('systemAdmins').map(this.renderUser)}
      </Group>
    )
  }

  renderSystemUsers = () => {
    return (
      <Group className="system-users" title={i18n('System users')}>
        {this.props.model.get('systemUsers').map(this.renderUser)}
      </Group>
    )
  }

  renderProperties = () => {
    return (
      <Group className="properties" title={i18n('System properties')}>
        <List>
          {this.renderField(i18n('Server name'), 'serverName')}
          {this.renderField(i18n('Database name'), 'dbName')}
          {this.renderField(i18n('Mail domain'), 'mailDomain')}
          {this.renderField(i18n('Receiver mail domain'), 'receiverMailDomain')}
          {this.renderField(i18n('Base url'), 'baseUrl')}
          {this.renderField(
            i18n('Base url (Signavio approval)'),
            'baseUrlSignavioApproval'
          )}
          {this.renderField(i18n('Mode'), 'mode')}
          {this.renderField(
            i18n('Registration enabled'),
            'registrationEnabled'
          )}
          {this.renderField(
            i18n('Authentication providers'),
            'authenticationProviders'
          )}
        </List>
      </Group>
    )
  }

  renderUser = user => {
    return (
      <Tile user={user} onClick={this.showUser.bind(null, user)}>
        {user.name()}
      </Tile>
    )
  }

  showUser = user => {
    var url = Router.reverse('admin_users', { id: user.id })

    Router.navigate(url, { trigger: true })
  }

  renderField = (label, field) => {
    const instance = this.props.model.field(field).toJSON()

    return <LabeledField readOnly {...instance} label={label} readOnly={true} />
  }
}



// WEBPACK FOOTER //
// ./src/admin/views/SystemConfigurationView.js
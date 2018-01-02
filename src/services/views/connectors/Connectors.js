// @flow

import React, { Component } from 'react'
import i18n from 'i18n'
import moment from '@signavio/effektif-commons/lib/extensions/moment'
import { without, sortBy } from 'lodash'

import Router from 'singleton/Router'

import { padding } from 'commons-style'
import { List, Menu, Confirm, Divider, Modal } from 'commons-components'
import { Hint,Alert } from 'commons-components/hints'
import { TextTile, ActionTile } from 'commons-components/tiles'

import type { OrganizationT } from '../../../organizations/types'

import type { ConnectorT, ChangeT } from '../../types'
import {
  getConnectors,
  saveConnector,
  removeConnector,
  reloadConnector,
  createConnector,
} from '../../api'

import AddConnector from './AddConnector'
import Connector from './Connector'
import ConnectorHeader from './ConnectorHeader'
import Diff from './diffs'

type Props = {
  connectorId?: string,

  organization: OrganizationT,
}

type State = {
  connectors: Array<ConnectorT>,
  changes: Array<ChangeT>,

  connectorToRemove?: ConnectorT,

  reloading: string,
  reloaded: string,

  loading: boolean,

  showChanges: boolean,
  showRemoveWarning: boolean,
  addingConnector: boolean,
}

export default class Connectors extends Component {
  props: Props

  state: State

  constructor() {
    super(...arguments)

    this.state = {
      loading: true,
      connectors: [],
      changes: [],

      reloading: '',
      reloaded: '',

      addingConnector: false,
      showChanges: false,
      showRemoveWarning: false,
    }
  }

  componentWillMount() {
    this.loadConnectors()
  }

  componentWillUpdate(nextProps: Props) {
    const { connectorId } = nextProps

    if (!connectorId) {
      return
    }

    if (
      !this.state.loading &&
      connectorId !== 'add' &&
      !this.getConnector(connectorId)
    ) {
      Router.navigate(Router.reverse('services', { tab: 'connectors' }), {
        trigger: true,
      })
    }
  }

  loadConnectors() {
    const { organization } = this.props

    this.setState({
      loading: true,
    })

    return getConnectors(organization).then((connectors = []) => {
      this.setState({
        loading: false,

        connectors,
      })

      if (connectors.length === 0) {
        Router.navigate(
          Router.reverse('services', {
            tab: 'connectors',
            id: 'add',
          }),
          { trigger: true }
        )
      }
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <Hint loading>
          {i18n('Loading connectors...')}
        </Hint>
      )
    }

    return (
      <div className="row">
        <div className="col-md-4">
          {this.renderConnectors()}
          {this.renderAdd()}
        </div>
        <div className="col-md-8">
          {this.renderConnector()}
          {this.renderInfo()}
        </div>
      </div>
    )
  }

  renderInfo() {
    const { showRemoveWarning, addingConnector } = this.state

    if (addingConnector) {
      return (
        <Modal>
          <Hint loading>
            {i18n('Creating new connector...')}
          </Hint>
        </Modal>
      )
    }

    const { connectorToRemove } = this.state

    if (showRemoveWarning && connectorToRemove) {
      return (
        <Confirm
          onCancel={() => this.setState({ showRemoveWarning: false })}
          onConfirm={() => this.removeConnector(connectorToRemove)}
        >

          <Hint warning>
            {i18n(
              `Do you really want to remove the connector "${connectorToRemove.name}"? This action cannot be undone.`
            )}
          </Hint>
        </Confirm>
      )
    }
  }

  removeConnector(connector: ConnectorT) {
    let { organization } = this.props

    removeConnector(connector, organization).then(() => this.loadConnectors())

    this.setState({
      showRemoveWarning: false,
      connectorToRemove: null,
    })

    Router.navigate(Router.reverse('services', { tab: 'connectors' }), {
      trigger: true,
    })
  }

  renderAdd() {
    return (
      <div>
        <Divider />

        <ActionTile
          icon="plus"
          onClick={() =>
            Router.navigate(
              Router.reverse('services', {
                tab: 'connectors',
                id: 'add',
              }),
              { trigger: true }
            )}
        >

          {i18n('Add new connector')}
        </ActionTile>
      </div>
    )
  }

  renderConnectors() {
    const { connectors } = this.state

    if (connectors.length === 0) {
      return <Hint>{i18n("You haven't added any connectors yet.")}</Hint>
    }

    return (
      <Menu
        value={this.props.connectorId}
        options={connectors.map(({ id, name: title }) => ({
          id: id,
          title: title || i18n('Unnamed connector'),
        }))}
        onChange={id =>
          Router.navigate(
            Router.reverse('services', {
              tab: 'connectors',

              id,
            }),
            { trigger: true }
          )}
      />
    )
  }

  renderConnector() {
    const { connectorId, organization } = this.props

    if (!connectorId) {
      return (
        <Hint>
          {i18n('Please select a connector from the menu on the left.')}
        </Hint>
      )
    }

    if (connectorId === 'add') {
      return (
        <AddConnector
          organization={organization}
          onAdd={url => this.handleAdd(url)}
        />
      )
    }

    const connector = this.getConnector(connectorId)

    if (!connector) {
      return (
        <Hint warning>
          {i18n("We couldn't find that connector.")}
        </Hint>
      )
    }

    const { reloading } = this.state

    if (reloading === connector.id) {
      return (
        <Hint loading>
          {i18n('Reloading connector information...')}
        </Hint>
      )
    }

    const { showChanges } = this.state

    return (
      <div>
        <div style={{ marginBottom: padding.large }}>
          <ConnectorHeader
            onRemove={() => this.handleRemove(connector)}
            onReload={() => this.handleReload(connector)}
          >

            <TextTile subtitle={this.renderChanges(connector)}>
              {connector.name || i18n('Unnamed connector')}
            </TextTile>
          </ConnectorHeader>
        </div>

        {showChanges
          ? <Diff connector={connector} changes={connector.lastChanges} />
          : <Connector
              connector={connector}
              onChange={updated => this.handleChange(connector, updated)}
            />}
      </div>
    )
  }

  renderChanges(connector: ConnectorT) {
    if (!connector.lastUpdated) {
      return
    }

    let { showChanges } = this.state

    return i18n('Last changed on __date__. __link__', {
      date: moment.utc(connector.lastUpdated).format('LLL'),
      link: (
        <a
          href="#"
          onClick={() => this.setState({ showChanges: !showChanges })}
        >
          {showChanges ? i18n('Hide changes') : i18n('Show changes')}
        </a>
      ),
    })
  }

  handleChange(connector: ConnectorT, updatedConnector: ConnectorT) {
    const { organization } = this.props

    saveConnector(updatedConnector, organization)

    const { connectors } = this.state

    this.setState({
      connectors: sortBy(
        [...without(connectors, connector), updatedConnector],
        ({ name }) => name
      ),
    })
  }

  handleReload(connector: ConnectorT) {
    let { organization } = this.props

    this.setState({
      reloading: connector.id,
    })

    reloadConnector(connector, organization)
      .then(changes => {
        this.setState({
          reloading: '',
          reloaded: connector.id,

          changes,
        })

        // reload if something has changed or the previous version had errors
        if (changes.length > 0 || connector.lastOperationFailed) {
          this.loadConnectors()
        }
      })
      .catch(error => {
        this.setState({
          reloading: '',
        })

        this.loadConnectors()
      })
  }

  handleRemove(connector: ConnectorT) {
    this.setState({
      showRemoveWarning: true,
      connectorToRemove: connector,
    })
  }

  getConnector(id: string) {
    return this.state.connectors.find(connector => connector.id === id)
  }

  handleAdd(url: string) {
    this.setState({
      addingConnector: true,
    })

    const { organization } = this.props

    createConnector(url, organization).then(connector => {
      this.setState({
        addingConnector: false,
      })

      this.loadConnectors().then(() => {
        Router.navigate(
          Router.reverse('services', {
            tab: 'connectors',
            id: connector.id,
          }),
          { trigger: true }
        )
      })
    })
  }
}



// WEBPACK FOOTER //
// ./src/services/views/connectors/Connectors.js
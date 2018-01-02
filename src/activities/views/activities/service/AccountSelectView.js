import React from 'react'
import createReactClass from 'create-react-class'
import _ from 'underscore'

import i18n from 'signavio-i18n'

import { BaseMixin, DropDownMixin } from '@signavio/effektif-commons/lib/mixins'
import {
  DropDown,
  Divider,
  List,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import {
  ActionTile,
  TextTile,
} from '@signavio/effektif-commons/lib/components/tiles'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import Login from 'singleton/Login'

import { UserTile } from '../../../../../packages/organizations'

import { FieldStructure } from '../../../../../packages/fields'

module.exports = createReactClass({
  displayName: 'AccountSelect',

  mixins: [BaseMixin, DropDownMixin],

  render: function() {
    if (!this.props.value && this.props.collection.length === 0) {
      return (
        <div className="application-account">
          <TextButton
            primary
            disabled={this.props.readOnly}
            onClick={this.addAccount}
          >
            {i18n('Configure a __service__ account', {
              service: this.props.service.get('name'),
            })}
          </TextButton>
        </div>
      )
    }

    var accounts = this.props.collection.filter(account => {
      return (
        account.get('userId') === Login.user().id &&
        this.props.value !== account
      )
    })

    return (
      <div className="application-account">
        <FieldStructure
          narrowLabel
          label={i18n('Account')}
          description={this.getAccountDescription()}
          descriptionChapter="action-types"
        >
          <DropDown
            disabled={this.props.readOnly}
            open={this.state.dropDownOpen}
            basic
            onToggle={this.toggle}
            toggle={this.renderToggle()}
          >
            {this.renderSelect(accounts)}
          </DropDown>
        </FieldStructure>
      </div>
    )
  },

  getAccountDescription: function() {
    return i18n(
      'Every configuration that is directly related to the chosen account will only be visible to the account owner. However, everything else can be changed by anybody with access rights to this workflow.'
    )
  },

  renderSelect: function(accounts) {
    if (this.props.readOnly || !this.state.dropDownOpen) {
      return
    }

    return (
      <List>
        {this.renderRemove()}
        {this.renderAdd()}
        {this.renderAccounts(accounts)}
      </List>
    )
  },

  renderRemove: function() {
    if (!this.props.value) {
      return
    }

    return (
      <ActionTile key="clear" icon="times" onClick={this.removeAccount}>
        {i18n('Remove this account from the action')}
      </ActionTile>
    )
  },

  renderAdd: function() {
    return (
      <ActionTile key="add" icon="plus" onClick={this.addAccount}>
        {i18n('Specify a different __service__ account', {
          service: this.props.service.get('name'),
        })}
      </ActionTile>
    )
  },

  renderAccounts: function(accounts) {
    if (accounts.length === 0) {
      return
    }

    return (
      <List>
        <Divider title={i18n('Select an account')} />

        {_.map(accounts, this.renderAccount)}
      </List>
    )
  },

  renderAccount: function(account) {
    return (
      <ActionTile
        key={account.cid}
        icon={this.props.service.get('icon')}
        onClick={this.selectAccount.bind(null, account)}
      >
        {account.get('email')}
      </ActionTile>
    )
  },

  isDeleted: function() {
    return !this.props.value.collection
  },

  renderDeletedMessage: function() {
    if (this.props.value.get('restricted')) {
      return [
        this.props.value.get('user').name(),
        <Hint inline>({i18n('restricted')})</Hint>,
      ]
    }

    if (!this.props.value.get('user') || this.isDeleted()) {
      return <Hint inline>{i18n('This account has been deleted.')}</Hint>
    }
  },

  renderToggle: function() {
    if (this.props.value) {
      if (this.isDeleted()) {
        return <TextTile>{this.renderDeletedMessage()}</TextTile>
      }

      return (
        <UserTile user={this.props.value.get('user').toJSON()}>
          {this.props.value.get('email')}
        </UserTile>
      )
    }

    return (
      <TextTile>
        <Hint inline>{i18n('No account selected')}</Hint>
      </TextTile>
    )
  },

  addAccount: function() {
    this.props.onAdd()

    _.defer(this.close)
  },

  removeAccount: function() {
    this.selectAccount(null)

    if (this.props.onRemove) {
      this.props.onRemove()
    }
  },

  selectAccount: function(account) {
    this.props.onSelect(account)

    _.defer(this.close)
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/service/AccountSelectView.js
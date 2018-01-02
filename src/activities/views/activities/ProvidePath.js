import PropTypes from 'prop-types'
import React from 'react'

import createReactClass from 'create-react-class'

import i18n from 'signavio-i18n'

import { FieldStructure } from '../../../../packages/fields'

import Login from 'singleton/Login'

import * as PathUtils from 'services/utils/PathUtils'

import { BaseMixin } from 'commons-mixins'

import { ColumnBrowser, Hint as LegacyHint } from 'commons-components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

export default createReactClass({
  displayName: 'ProvidePath',

  mixins: [BaseMixin],

  propTypes: {
    types: PropTypes.arrayOf(PropTypes.string).isRequired,

    value: PropTypes.string,
    onChange: PropTypes.func,
  },

  getInitialState: function() {
    return {
      data: {},
      path: [],
      fetched: false,
    }
  },

  componentDidMount: function() {
    this.prefetch()
  },

  componentDidUpdate: function() {
    this.prefetch()
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.account === this.props.account) {
      // only reset state when account has changed
      return
    }

    this.setState({
      path: [],
      fetched: false,
      data: {},
    })
  },

  render: function() {
    return (
      <FieldStructure narrowLabel label={this.props.label}>
        {this.renderBrowser()}
      </FieldStructure>
    )
  },

  renderBrowser: function() {
    if (this.props.account.hasViewAccess(Login.user())) {
      return this.renderElement()
    }

    return (
      <LegacyHint inline>
        {i18n('Only the account owner can change this field.')}
      </LegacyHint>
    )
  },

  renderElement: function() {
    if (this.state.fetched) {
      return (
        <ColumnBrowser
          path={this.state.path}
          data={this.state.data}
          showRoot
          loading={this.state.loadingFolder}
          onSelect={this.loadChildFolder}
        />
      )
    }

    return (
      <div className="folders-fetch-inprogress">
        <Hint loading>
          {this.getMessage()}
        </Hint>
      </div>
    )
  },

  loadChildFolder: function(child, path) {
    if (this.props.onChange) {
      this.props.onChange(child)
    }

    if (child.isLeaf) {
      this.setState({
        data: {
          ...this.state.data,

          [child.id]: child,
        },
        path: path,
      })

      return
    }

    this.setState({
      loadingFolder: child.id,
    })

    let { account } = this.props

    PathUtils.fetchChild(account, child, this.getTypes()).then(data => {
      if (!this.isMounted()) {
        return
      }

      this.setState({
        data: {
          ...this.state.data,
          ...data,
        },
        path: path,
        loadingFolder: null,
      })
    })
  },

  getTypes: function() {
    return this.props.types.map(type => `type:${type}`).join(',')
  },

  getMessage: function() {
    if (this.state.path.length === 0) {
      return i18n('Preparing to load...')
    }

    return i18n('Fetching...')
  },

  getFetched: function() {
    return _.filter(this.state.path, entry => this.state.data[entry]).length > 0
  },

  prefetch: function() {
    // If the path is already known or changed by the user
    // no data needs to be prefetched
    if (this.state.path.length > 0 || this.state.fetched) {
      return
    }

    let { value, account } = this.props

    if (!account || !account.hasViewAccess(Login.user())) {
      return
    }

    this.setState({
      fetched: false,
    })

    PathUtils.hierarchy(account, value)
      .then(({ path, references }) => {
        if (!this.isMounted()) {
          return
        }

        this.setState({ path })

        PathUtils.prefetch(account, references, this.getTypes()).then(data => {
          if (!this.isMounted()) {
            return
          }

          this.setState({
            fetched: true,

            data,
          })
        })
      })
      .fail(() => {
        if (!account.collection) {
          return
        }

        // re-fetch the accounts of the service, as the current one might be
        // marked with `needsAuthorization` now
        account.collection.fetch()
      })
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/ProvidePath.js
import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'

import Router from 'singleton/Router'

import Option from './OptionView'

import { Divider } from 'commons-components'
import { IconButton } from 'commons-components/buttons'

export default class extends React.Component {
  static displayName = 'ReleaseOptions'

  render() {
    return (
      <div>
        <IconButton light block icon="plus" onClick={this.createRelease}>
          {i18n('Create new')}
        </IconButton>

        <Divider />

        {this.renderOption('version', i18n('Version'))}
        {this.renderOption('before', i18n('Released before'))}
        {this.renderOption('after', i18n('Released after'))}
      </div>
    )
  }

  createRelease = () => {
    var url = Router.reverse('admin_releases', {
      id: 'new',
    })

    Router.navigate(url, { search: `?${this.props.model.toString()}` })
  }

  renderOption = (field, title) => {
    return (
      <Option
        title={title}
        field={field}
        model={this.props.model}
        onChange={this.props.onChange}
      />
    )
  }
}



// WEBPACK FOOTER //
// ./src/admin/views/ReleaseOptions.js
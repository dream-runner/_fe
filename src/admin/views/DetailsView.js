import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'
import { CSSUtils } from 'commons-utils'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import { BaseMixin } from 'commons-mixins'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

module.exports = class extends React.Component {
  static displayName = 'Details'

  static propTypes = {
    model: PropTypes.instanceOf(BaseModel).isRequired,
  }

  state = {
    loading: !this.props.model.isNew(),
  }

  componentWillMount() {
    if (this.props.model.isNew()) {
      return
    }

    if (this.props.model.isSynced) {
      this.setState({
        loading: false,
      })

      return
    }

    this.props.model.once(
      'sync',
      function() {
        this.setState({
          loading: false,
        })
      },
      this
    )

    if (this.props.model.isSyncing) {
      return
    }

    this.props.model.fetch()
  }

  componentWillUnmount() {
    this.props.model.off(null, null, this)
  }

  render() {
    if (this.state.loading) {
      return (
        <Hint loading view>
          {i18n('Loading information...')}
        </Hint>
      )
    }

    var cls = CSSUtils.cls(
      {
        details: true,
      },
      this.props.className
    )

    return (
      <div className={cls}>
        {this.renderHeader()}

        {this.props.children}
      </div>
    )
  }

  renderHeader = () => {
    if (this.props.model.isNew()) {
      return (
        <h4 className="container-header">
          {i18n('Create new')}
        </h4>
      )
    }

    return (
      <h4 className="container-header">
        {i18n('Details (ID: __id__)', {
          id: this.props.model.id,
        })}
      </h4>
    )
  }
}



// WEBPACK FOOTER //
// ./src/admin/views/DetailsView.js
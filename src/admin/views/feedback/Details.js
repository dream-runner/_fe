import React from 'react'
import i18n from 'i18n'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { List } from '@signavio/effektif-commons/lib/components'
import { applicationName } from '@signavio/effektif-commons'

import { LabeledField } from '../../../../packages/fields'

module.exports = class extends React.Component {
  static displayName = 'Feedback'

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
          {i18n('Loading feedback...')}
        </Hint>
      )
    }

    return (
      <div className="Feedback">
        <h4 className="container-header">
          {i18n('Details (ID: __id__)', {
            id: this.props.model.id,
          })}
        </h4>

        <List>
          {this.renderField(i18n('Subject'), 'subject')}
          {this.renderField(i18n('Date'), 'created')}
          {this.renderField(i18n('Message'), 'message')}
          {this.renderField(i18n('Current page'), 'url')}
          {this.renderField(
            i18n('__applicationName__ version', { applicationName }),
            'effektifVersion'
          )}
          {this.renderField(i18n('Browser'), 'browser')}
        </List>
      </div>
    )
  }

  renderField = (label, field) => {
    const instance = this.props.model.field(field).toJSON()

    return <LabeledField {...instance} label={label} readOnly />
  }
}



// WEBPACK FOOTER //
// ./src/admin/views/feedback/Details.js
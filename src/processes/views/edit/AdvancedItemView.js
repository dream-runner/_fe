import React from 'react'
import { CSSUtils } from 'commons-utils'
import { ContextHelp } from 'commons-components'

module.exports = class extends React.Component {
  static displayName = 'Item'

  render() {
    var cls = CSSUtils.cls(
      {
        'advanced-item': true,
        'form-group': true,
      },
      this.props.className
    )

    var controlCls = CSSUtils.cls({
      'col-xs-8': true,
      control: true,
      'control-text': this.props.textControl,
    })

    return (
      <div className={cls}>
        <label className="col-xs-4 control-label">
          {this.props.label}
          {this.renderContextHelp()}
          {this.renderDescription()}
        </label>
        <div className={controlCls}>
          {this.props.children}
        </div>
      </div>
    )
  }

  renderContextHelp = () => {
    if (!this.props.contextHelp) {
      return
    }

    return (
      <ContextHelp>
        {this.props.contextHelp}
      </ContextHelp>
    )
  }

  renderDescription = () => {
    if (!this.props.description) {
      return
    }

    return <small />
  }
}



// WEBPACK FOOTER //
// ./src/processes/views/edit/AdvancedItemView.js
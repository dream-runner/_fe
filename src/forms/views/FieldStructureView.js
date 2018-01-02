import PropTypes from 'prop-types'
import React from 'react'
import { isString } from 'lodash'

import { CSSUtils } from '@signavio/effektif-commons/lib/utils'
import {
  Popover,
  ContextHelp,
  Markdown,
} from '@signavio/effektif-commons/lib/components'

export default class extends React.Component {
  static displayName = 'Field'

  static propTypes = {
    label: PropTypes.node,
    description: PropTypes.node,

    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,

    onLabelClick: PropTypes.func,
  }

  render() {
    const { className, style, label, onLabelClick, regularBoolean } = this.props

    var cls = CSSUtils.cls(
      {
        field: true,
        'field-read': this.props.readOnly,
        'field-edit': !this.props.readOnly,
        'field-unlabeled': !this.props.label,

        required: this.props.required,
        disabled: this.props.disabled,
      },
      className
    )

    if (regularBoolean) {
      return this.renderControl()
    }

    return (
      <div className={cls} style={style}>
        <label
          className="field-label clearfix"
          title={isString(label) ? label : undefined}
          onClick={onLabelClick}
        >

          {this.renderLabel()}
          {this.renderControl()}
        </label>
      </div>
    )
  }

  renderControl = () => {
    if (!this.props.label && this.props.description) {
      return (
        <Popover placement="top" popover={this.props.description}>

          <div className="control">
            {this.props.children}
          </div>
        </Popover>
      )
    }

    return (
      <div className="control">
        {this.props.children}
      </div>
    )
  }

  renderLabel = () => {
    if (!this.props.label) {
      return
    }

    if (this.props.regularBoolean && !this.props.readOnly) {
      return
    }

    var cls = CSSUtils.cls({
      'form-label': true,
      'with-description': !!this.props.description,
    })

    return (
      <span className={cls}>
        <span className="label-inline">{this.props.label}</span>
        <span className="label-overlay">{this.props.label}</span>

        {this.renderDescription()}
      </span>
    )
  }

  renderDescription = () => {
    let { description, descriptionChapter, descriptionSection } = this.props

    if (!description) {
      return
    }

    return (
      <ContextHelp
        placement="top"
        chapter={descriptionChapter}
        section={descriptionSection}
      >
        <Markdown>
          {description}
        </Markdown>
      </ContextHelp>
    )
  }
}



// WEBPACK FOOTER //
// ./src/forms/views/FieldStructureView.js
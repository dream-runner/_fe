import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { variables } from 'commons-style'
import { Collapsible, Icon } from 'commons-components'
import { TextTile } from 'commons-components/tiles'

export default class FilterList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,

    expanded: PropTypes.bool,
  }

  constructor(props = {}) {
    super(...arguments)

    this.state = {
      expanded: props.expanded,
    }
  }

  render() {
    return (
      <Collapsible
        header={this.renderHeader()}
        onToggle={() => this.handleToggle()}
        expanded={this.state.expanded}
        style={this.props.style}
      >

        {this.props.children}
      </Collapsible>
    )
  }

  handleToggle() {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  renderHeader() {
    return (
      <TextTile
        toolbar={this.renderToggle()}
        subtitle={!this.state.expanded && this.props.hint}
        style={{
          backgroundColor: 'none',
          cursor: 'pointer',

          main: { paddingLeft: 0 },
        }}
      >

        <h4 style={{ lineHeight: `${variables.lineHeight.block}px` }}>
          {this.props.title}
        </h4>
      </TextTile>
    )
  }

  renderToggle() {
    let { expanded } = this.state

    return (
      <Icon iconSet="fontAwesome" icon={expanded ? 'angle-up' : 'angle-down'} />
    )
  }
}



// WEBPACK FOOTER //
// ./src/tasks/views/FilterList.js
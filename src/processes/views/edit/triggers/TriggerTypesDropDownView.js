import PropTypes from 'prop-types'
import React from 'react'

import createReactClass from 'create-react-class'

import Trigger from 'activities/models/Trigger'
import Service from 'services/models/Service'

import { CSSUtils } from 'commons-utils'
import { getTheme, font } from 'commons-style'
import { BaseMixin } from 'commons-mixins'

import { DropDown, Tile, Icon, List } from 'commons-components'
import { IconButton } from 'commons-components/buttons'
import { ActionTile } from 'commons-components/tiles'

module.exports = getTheme(
  createReactClass({
    displayName: 'TriggerTypesDropDown',

    mixins: [BaseMixin],

    propTypes: {
      service: PropTypes.instanceOf(Service).isRequired,
    },

    render: function() {
      var cls = CSSUtils.cls(
        {
          'trigger-types-dropdown': true,
        },
        this.props.className
      )

      return (
        <div className={cls}>
          <DropDown
            hideToggleButton
            toggle={this.renderToggle}
            readOnly={this.props.readOnly}
          >

            {this.renderTriggerTypes()}
          </DropDown>
        </div>
      )
    },

    renderToggle: function(open) {
      return (
        <IconButton
          light
          block
          disabled={this.props.readOnly}
          icon={this.props.service.icon}
          style={triggerStyle(this.props.theme)}
        >

          {this.props.service.name}

          <Icon iconSet="fontAwesome" icon={open ? 'angle-up' : 'angle-down'} />
        </IconButton>
      )
    },

    renderTriggerTypes: function() {
      return (
        <List>
          {this.props.service.triggerTypes.map(this.renderTriggerType)}
        </List>
      )
    },

    renderTriggerType: function(triggerType) {
      return (
        <ActionTile
          small
          style={{ icon: { background: 'transparent' } }}
          icon={this.props.service.icon}
          onClick={this.select.bind(null, triggerType)}
        >
          {triggerType.name}
        </ActionTile>
      )
    },

    select: function(triggerType) {
      if (this.props.onSelect) {
        this.props.onSelect(triggerType)
      }
    },
  })
)

const triggerStyle = theme => ({
  fontSize: font.size.form,

  icon: {
    color: theme.color.primary.dark,
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/triggers/TriggerTypesDropDownView.js
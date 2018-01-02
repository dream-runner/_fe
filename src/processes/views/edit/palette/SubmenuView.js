import React from 'react'
import createReactClass from 'create-react-class'
import { BaseMixin } from 'commons-mixins'
import Item from 'processes/views/edit/palette/ItemView'

module.exports = createReactClass({
  displayName: 'Submenu',

  mixins: [BaseMixin],

  render: function() {
    return (
      <div className="palette-submenu">
        <i className="fa fa-caret-up" />
        <div className="submenu-container">
          <div className="submenu">
            <ul className="items clearfix">
              {this.props.service.get('actionTypes').map(this.renderActionType)}
            </ul>
          </div>
          <div className="submenu-placeholder" />
        </div>
      </div>
    )
  },

  renderActionType: function(actionType) {
    return (
      <Item
        {...this.props}
        key={actionType.cid}
        model={actionType}
        defaultIcon={this.props.service.get('icon')}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/palette/SubmenuView.js
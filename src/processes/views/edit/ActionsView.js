import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import Router from 'singleton/Router'
import { BaseMixin } from 'commons-mixins'
import ActionsFlow from 'processes/views/edit/ActionsFlowView'

module.exports = createReactClass({
  displayName: 'ProcessActions',

  mixins: [BaseMixin],

  render: function() {
    return (
      <div className="actions">
        <ActionsFlow
          {...this.props}
          model={this.props.model}
          onSelect={this.handleSelect}
          activeItem={this.props.activity}
        />
      </div>
    )
  },

  handleSelect: function(activity, open) {
    var url = Router.reverse('process', {
      id: this.props.model.id,
      tab: 'actions',
      sub: activity && open ? activity.id : undefined,
    })

    Router.navigate(url, { trigger: true })
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/ActionsView.js
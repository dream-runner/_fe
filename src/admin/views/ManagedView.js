import React from 'react'
import createReactClass from 'create-react-class'
import { CSSUtils } from 'commons-utils'
import { BaseMixin } from 'commons-mixins'

module.exports = createReactClass({
  displayName: 'ManagedView',

  mixins: [BaseMixin],

  render: function() {
    var cls = CSSUtils.cls(
      {
        'managed-view': true,
      },
      this.props.className
    )

    return (
      <div className={cls}>
        <div className="row">
          <div className="col-md-3">
            {this.props.filters}
          </div>
          <div className="col-md-9">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/ManagedView.js
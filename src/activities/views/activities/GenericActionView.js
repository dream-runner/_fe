import React from 'react'
import createReactClass from 'create-react-class'
import _ from 'underscore'

import { BaseMixin } from 'commons-mixins'

import ServiceAction from './service'

module.exports = createReactClass({
  displayName: 'GenericActionView',

  mixins: [BaseMixin],

  render: function() {
    let { children, ...rest } = this.props

    return (
      <ServiceAction {...rest}>
        {children}
      </ServiceAction>
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/GenericActionView.js
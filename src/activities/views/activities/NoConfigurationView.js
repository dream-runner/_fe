import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { BaseMixin } from 'commons-mixins'
import { Hint } from 'commons-components'

module.exports = createReactClass({
  displayName: 'NoConfiguraiton',

  mixins: [BaseMixin],

  render: function() {
    return (
      <div className="activity-configuration no-configuration">
        <Hint>
          {i18n(
            'This element needs no further configuration. But you are free to change the name.'
          )}
        </Hint>
      </div>
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/NoConfigurationView.js
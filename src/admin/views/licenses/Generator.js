import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { BaseMixin } from 'commons-mixins'
import FormItem from '../FormItemView'

module.exports = createReactClass({
  displayName: 'Generator',

  mixins: [BaseMixin],

  render: function() {
    return (
      <div className="generator details">
        <FormItem
          label={i18n('Auto assign')}
          description={i18n(
            'If set to YES, every time a new user joins the organisation this generator will create a license for the new user.'
          )}
          field="autoAssign"
          model={this.props.model}
        />
      </div>
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/licenses/Generator.js
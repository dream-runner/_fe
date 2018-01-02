import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'

import { FieldStructure } from '../../../../../packages/fields'

import ServiceAction from '../service'
import { AddresseeSelect } from '../email'

module.exports = createReactClass({
  displayName: 'AddCalendarEvent',

  mixins: [BaseMixin],

  render: function() {
    const { model, readOnly, ...rest } = this.props

    return (
      <ServiceAction
        {...rest}
        model={model}
        readOnly={readOnly}
        bottomChildren={
          <div className="application-configuration">
            <FieldStructure narrowLabel label={i18n('Attendees')}>
              <AddresseeSelect
                parameter="attendee"
                model={model}
                readOnly={readOnly}
                onChange={() => model.save()}
              />
            </FieldStructure>
          </div>
        }
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/google/AddCalendarEvent.js
import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'
import { Icon, Hint } from 'commons-components'
import { Tile } from 'commons-components/tiles'
import { getTheme, utils, padding } from 'commons-style'

import { FieldStructure } from '../../../../../packages/fields'

import Activity from '../../../models/Activity'
import TimespanControl from '../TimespanControl'

const IntermediateTimerEvent = createReactClass({
  displayName: 'IntermediateTimerEvent',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Activity.isRequired),
  },

  getInitialState: function() {
    return {
      active: 'normalTimerEvent',
    }
  },

  render: function() {
    let { model } = this.props

    return (
      <div style={{ backgroundColor: 'white', padding: padding.normal }}>
        <Hint>
          {i18n(
            'When the process reaches this timer event, the execution of the following actions is delayed by the duration configured here.'
          )}
        </Hint>

        <FieldStructure narrowLabel label={i18n('Continue execution after')}>
          <Tile toolbar={this.renderToolbar()}>
            <TimespanControl
              readOnly={this.props.readOnly}
              value={model.get('executionTime')}
              onChange={value =>
                this.handleTimespanChange('executionTime', value)}
            />
          </Tile>
        </FieldStructure>
      </div>
    )
  },

  renderToolbar: function() {
    let { duration } = this.props.model.get('executionTime') || {}

    return (
      <Icon icon="check" style={indicatorStyle(!!duration, this.props.theme)} />
    )
  },

  handleTimespanChange: function(field, value) {
    if (value) {
      value.type = 'after'
    }

    this.props.model.set(field, value)
    this.props.model.save()
  },
})

const indicatorStyle = (isValid, theme) => ({
  backgroundColor: isValid ? theme.color.primary.base : theme.color.mono.middle,

  color: utils.color(
    isValid ? theme.color.primary.base : theme.color.mono.middle
  ),

  opacity: isValid ? 1 : 0.2,

  ...utils.transition(['background-color', 'color']),
})

export default getTheme(IntermediateTimerEvent)



// WEBPACK FOOTER //
// ./src/activities/views/activities/intermediateTimer/IntermediateTimerEvent.js
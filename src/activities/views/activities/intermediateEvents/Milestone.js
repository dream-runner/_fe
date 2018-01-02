//@flow
import React from 'react'
import createReactClass from 'create-react-class'
import { withHandlers } from 'recompose'
import i18n from 'signavio-i18n'

import { Box, BindingsTextInput } from '@signavio/effektif-commons/lib/components'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import Activity from '../../../models/Activity'

import { FieldStructure } from '../../../../../packages/fields'

type PropsT = {
  model: any,
};

type MilestoneEventT = EventT & {
  milestone: string,
};

const Milestone = createReactClass({
  displayName: 'Milestone',

  mixins: [BaseMixin],

  render: function() {
    const { model, readOnly, onBlur, onChange } = this.props

    return(
      <Box white>
        <Hint>
         {i18n(
           'This event marks a milestone once the workflow reaches this point. You can use it later to track the progress of each case in the case view.'
         )}
       </Hint>

       <FieldStructure narrowLabel label={i18n('Milestone description')}>
        <BindingsTextInput
          singleLine
          readOnly={readOnly}
          value={model.get('milestoneDescription')}
          onChange={onChange}
          bindables={model.getProcess().getBindables()}
          onBlur={onBlur}
        /> 
       </FieldStructure>
      </Box>
    )
  },
})

export default withHandlers({
  onChange: ({ model }) => (milestoneDescription) => 
    model.set({milestoneDescription})
  ,
  onBlur: ({ model }) => () => {
    model.save()
  },
})
(Milestone)



// WEBPACK FOOTER //
// ./src/activities/views/activities/intermediateEvents/Milestone.js
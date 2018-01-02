// @flow
import React from 'react'

import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'
import { hintIfDisabled } from '@signavio/effektif-commons/lib/components/higher-order'
import { Feature } from '@signavio/effektif-commons/lib/components'

export type TriggerTypeT = {
  disabledMessage?: string,
  icon: string,
  id: string,
  key: string,
  name: string,
}

type PropsT = {
  readOnly: boolean,
  triggerTypes: Array<TriggerTypeT>,
  onSelect: (triggerType: TriggerTypeT) => void,
}

const CoreTriggerTypes = ({ onSelect, readOnly, triggerTypes }: PropsT) =>
  <div>
    {triggerTypes.map((triggerType: TriggerTypeT) =>
      <Feature key={triggerType.key} feature={triggerType.feature}>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <OptionalIconButton
            {...{ ...triggerType, id: triggerType.key }}
            readOnly={readOnly}
            onSelect={() => onSelect && onSelect(triggerType)}
            disabled={!!triggerType.disabledMessage}
            hint={triggerType.disabledMessage}
          />
        </div>
      </Feature>
    )}
  </div>

const OptionalIconButton = hintIfDisabled({
  small: true,
})(({ id, name, icon, readOnly, disabled, onSelect }) =>
  <div className="trigger-option">
    <IconButton
      block
      light
      onClick={onSelect}
      disabled={readOnly || disabled}
      className={`trigger-type-button trigger-type-${id}`}
      icon={icon}
    >
      {name}
    </IconButton>
  </div>
)

export default CoreTriggerTypes



// WEBPACK FOOTER //
// ./src/processes/views/edit/triggers/CoreTriggerTypes.js
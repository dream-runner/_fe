// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import type { ServiceT } from '@signavio/effektif-api'
import { Feature } from '@signavio/effektif-commons/lib/components'
import { applicationName } from '@signavio/effektif-commons'

import TriggerTypesDropDown from './TriggerTypesDropDownView'

type PropsT = {
  onSelect: (service: ServiceT) => void,
  readOnly: boolean,
  services: Array<ServiceT>,
}

const ExternalTriggerTypes = ({ onSelect, readOnly, services }: PropsT) =>
  <div>
    {services.map((service: ServiceT) =>
      <div className="col-lg-3 col-md-4 col-sm-6" key={service.key}>
        <Feature
          sneakPeek
          feature={service.feature}
          tooltip={i18n(
            'This feature is not included in your version of __applicationName__.',
            { applicationName }
          )}
          key={service.key}
        >
          <div className="trigger-option">
            <TriggerTypesDropDown
              service={service}
              readOnly={readOnly}
              onSelect={onSelect}
            />
          </div>
        </Feature>
      </div>
    )}
  </div>

export default ExternalTriggerTypes



// WEBPACK FOOTER //
// ./src/processes/views/edit/triggers/ExternalTriggerTypes.js
// @flow
import React from 'react'
import { flatten, includes, map } from 'lodash'
import i18n from 'signavio-i18n'

import { connect, types } from '@signavio/effektif-api'
import {
  UserGuideLink,
  Divider,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import type { ServiceT } from '@signavio/effektif-api'
import type { TriggerTypeT } from './triggers/CoreTriggerTypes'

import { CoreTriggerTypes, ExternalTriggerTypes } from './triggers'

type PropsT = {
  fetchServices: {
    pending: boolean,
    rejected: boolean,
    value: Array<ServiceT>,
  },
  model: any,
  onSelect: (triggerType: TriggerTypeT) => void,
  readOnly: boolean,
}

const withTriggerTypes = (service: ServiceT) =>
  service.triggerTypes && service.triggerTypes.length > 0

const isExternal = (service: ServiceT) =>
  !includes(['effektif', 'bpmn-flow'], service.key)

const isInternal = (service: ServiceT) => !isExternal(service)

const getCoreTriggerTypes = (services: Array<ServiceT>) => {
  const coreServices = services.filter(withTriggerTypes).filter(isInternal)

  return flatten(map(coreServices, (service: ServiceT) => service.triggerTypes))
}

const getExternalServices = (services: Array<ServiceT>) =>
  services.filter(withTriggerTypes).filter(isExternal)

const TriggerSelection = ({
  fetchServices,
  model,
  onSelect,
  readOnly,
}: PropsT) => {
  if (fetchServices.rejected) {
    return (
      <Hint danger>
        {i18n('Triggers could not be loaded.')}
      </Hint>
    )
  }

  if (fetchServices.pending) {
    return (
      <Hint loading>
        {i18n('Loading available triggers...')}
      </Hint>
    )
  }

  const coreTriggerTypes = getCoreTriggerTypes(fetchServices.value || [])
  const externalServices = getExternalServices(fetchServices.value || [])

  return (
    <div>
      <Hint>
        <p>
          {model.get('published')
            ? i18n('New cases can be started manually.')
            : i18n(
                'After this process has been published, cases can be created manually.'
              )}
        </p>
        <p>
          {i18n(
            'If you choose to use one of the triggers listed below, new cases will be started automatically on certain events.'
          )}{' '}
          <UserGuideLink chapter="processes" section="triggers">
            {i18n('Learn more')}
          </UserGuideLink>
        </p>
      </Hint>

      <Divider padding="large" />

      <div className="row">
        {coreTriggerTypes.length > 0 &&
          <CoreTriggerTypes
            onSelect={onSelect}
            readOnly={readOnly}
            triggerTypes={coreTriggerTypes}
          />}
        {externalServices.length > 0 &&
          <ExternalTriggerTypes
            onSelect={onSelect}
            readOnly={readOnly}
            services={externalServices}
          />}
      </div>
    </div>
  )
}

export default connect({
  fetchServices: {
    type: types.SERVICES,
  },
})(TriggerSelection)



// WEBPACK FOOTER //
// ./src/processes/views/edit/TriggerSelection.js
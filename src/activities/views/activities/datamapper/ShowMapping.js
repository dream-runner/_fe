// @flow
import React from 'react'

import { Icon } from '@signavio/effektif-commons/lib/components'

import type { VariableT } from '@signavio/effektif-api'

import { Binding } from '../../../../../packages/fields'
import type { BindingT } from '../../../../../packages/fields'

type Props = {
  left: BindingT,
  right: BindingT,
}

export default function Mapping(props: Props) {
  const { left, right } = props

  return (
    <div className="row">
      <div className="col-sm-5">
        <Binding readOnly binding={left} />
      </div>

      <div className="col-sm-2">
        <Icon
          iconSet="fontAwesome"
          icon="angle-right"
          style={{ width: '100%' }}
        />
      </div>

      <div className="col-sm-5">
        <Binding readOnly binding={right} />
      </div>
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/datamapper/ShowMapping.js
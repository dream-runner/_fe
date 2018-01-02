// @flow
import React from 'react'

import { Icon, Disable } from '@signavio/effektif-commons/lib/components'

// relativ path must be changed to @signavio/effektif-fields once this moves to packages
import {
  expressionUtils,
  bindingUtils,
  dataTypeUtils,
  getFieldsContext,
  Binding,
} from '../../../../../packages/fields'

import type { BindingT, VariableT } from '../../../../processes/types'

type PropsT = {
  left: ?BindingT,

  variables: Array<VariableT>,

  onLeftChange: (binding: BindingT) => void,
  onRightChange: (binding: BindingT) => void,
}

const filterBindables = ({ expression }: BindingT) =>
  !expressionUtils.isNested(expression)

const withoutCase = ({ expression }: BindingT) => expression !== 'case'

function Mapping({
  left,
  onLeftChange,
  onRightChange,
  dataTypeDescriptors,
  variables,
}: PropsT) {
  const getType = bindingUtils.getType(dataTypeDescriptors, variables)

  let leftType = left && getType(left)

  if (leftType && dataTypeUtils.isList(leftType)) {
    leftType = leftType.elementType
  }

  return (
    <div className="mapping">
      <div className="row">
        <div className="col-sm-5">
          <Binding
            binding={left}
            filterBindables={withoutCase}
            onChange={onLeftChange}
          />
        </div>

        <div className="col-sm-2">
          <Icon
            iconSet="fontAwesome"
            style={{ width: '100%' }}
            icon="angle-right"
          />
        </div>

        <div className="col-sm-5">
          <Disable disabled={!left}>
            <Binding
              type={leftType}
              filterBindables={filterBindables}
              onChange={onRightChange}
            />
          </Disable>
        </div>
      </div>
    </div>
  )
}

export default getFieldsContext(Mapping)



// WEBPACK FOOTER //
// ./src/activities/views/activities/datamapper/EditMapping.js
// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import Effektif from 'singleton/Effektif'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'
import {
  DropdownSelect,
  Option,
} from '@signavio/effektif-commons/lib/components/forms'

type LicenseTypeT = {
  id: string,
  name: string,
}

type PropsT = {
  allowClear?: boolean,
  onChange: (type: string) => void,
  placeholder?: string,
  readOnly?: boolean,
  value: string,
}

export default function LicenseTypeSelect(props: PropsT) {
  const { allowClear, onChange, placeholder, readOnly, value } = props
  return (
    <DropdownSelect
      onChange={onChange}
      placeholder={placeholder || i18n('Please select a license type')}
      readOnly={readOnly}
      value={value}
    >
      {allowClear &&
        !!value &&
        <Option>
          <RemoveButton light block onClick={() => onChange('')}>
            {i18n('Clear')}
          </RemoveButton>
        </Option>}
      {Effektif.config()
        .get('licenseTypes')
        .toJSON()
        .map((type: LicenseTypeT) =>
          <Option key={type.id} value={type.id} name={type.name} />
        )}
    </DropdownSelect>
  )
}



// WEBPACK FOOTER //
// ./src/admin/views/licenses/TypeSelect.js
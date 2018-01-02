// @flow
import React from 'react'

import { FieldStructure, LabeledField } from '../../../packages/fields'

type PropsT = {
  label: string,
  description?: string,
  field: string,
  readOnly?: boolean,
  required?: boolean,

  children: React$Element<any>,
}

export default function FormItem(props: PropsT) {
  const {
    field,
    label,
    description,
    readOnly,
    required,
    children,
    model,
    ...rest
  } = props

  if (!field) {
    return (
      <FieldStructure
        {...rest}
        label={label}
        description={description}
        readOnly={readOnly}
        required={required}
      >
        {children}
      </FieldStructure>
    )
  }

  const instance = model.field(field).toJSON()

  return (
    <LabeledField
      {...rest}
      value={instance.value}
      type={instance.type}
      onComplete={value => model.field(field).set('value', value)}
      label={label}
      description={description}
      readOnly={readOnly}
      required={required}
    />
  )
}



// WEBPACK FOOTER //
// ./src/admin/views/FormItemView.js
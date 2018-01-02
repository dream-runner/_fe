import React from 'react'

import { Field } from '../../../../packages/fields'
import buffered from './buffered'

const Read = props => <Field readOnly {...props} />

export const text = { Edit: buffered(Field), Read }
export const oid = { Edit: Field, Read }

export const boolean = { Edit: Field, Read }
export const choice = { Edit: Field, Read }
export const fileId = { Edit: Field, Read }
export const link = { Edit: buffered(Field), Read }
export const emailAddress = { Edit: buffered(Field), Read }
export const date = { Edit: buffered(Field), Read }
export const userId = { Edit: Field, Read }
export const number = { Edit: buffered(Field), Read }
export const money = { Edit: buffered(Field), Read }
export const duration = { Edit: Field, Read }
export const connectorReference = { Edit: Field, Read }

export const list = { Edit: Field, Read }
export const dynamicChoice = { Edit: Field, Read }



// WEBPACK FOOTER //
// ./src/forms/views/fields/index.js
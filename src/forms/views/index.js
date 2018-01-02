import { keys } from 'lodash'
import * as allFieldViews from './fields'
export * from './fields'
export const supportedTypes = keys(allFieldViews)

export Field from './FieldView'



// WEBPACK FOOTER //
// ./src/forms/views/index.js
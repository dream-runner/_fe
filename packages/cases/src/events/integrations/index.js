import * as box from './box'
import * as dmn from './dmn'
import * as google from './google'

import email from './Email'
import js from './JavaScript'
import serviceNotConfigured from './ServiceNotConfigured'
import transformToDocumentEvent from './DocumentAdd'
import milestoneProcessEvent from './Milestone'

export * from './box'
export * from './dmn'
export * from './google'

export email from './Email'
export js from './JavaScript'
export serviceNotConfigured from './ServiceNotConfigured'
export transformToDocumentEvent from './DocumentAdd'
export milestoneProcessEvent from './Milestone'

export default {
  ...box,
  ...dmn,
  ...google,

  email,
  js,
  serviceNotConfigured,
  transformToDocumentEvent,
  milestoneProcessEvent,
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/index.js
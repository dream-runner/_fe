export dataMapper from './datamapper'
export emailTask from './email'
export * from './document'
export * from './intermediateEvents'

export {
  AddCalendarEvent as googleAddCalendarEvent,
  AddRow as googleDriveAddRow,
} from './google'

export googleDriveFileUpload from './FileUploadWithNameTemplateView'

export scriptTask from './scripttask'
export productSubProcess from './subprocess'
export userTask from './usertask'
export multiInstanceUserTask from './multiInstance'
export intermediateTimerEvent from './intermediateTimer'
export exclusiveGateway from './exclusiveGateway'

export startEvent from './NoConfigurationView'
export parallelGateway from './NoConfigurationView'
export endEvent from './NoConfigurationView'

export boxFileUpload from './FileUploadWithNameTemplateView'

export dmnRuleTask from './dmnRuleTask'

export genericAction from './GenericActionView'

export CheckConfiguration from './CheckConfiguration'



// WEBPACK FOOTER //
// ./src/activities/views/activities/index.js
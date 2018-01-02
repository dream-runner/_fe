export const DIAGRAM_TOP_MARGIN = 800
export const NAMESPACE = 'http://b3mn.org/stencilset/bpmn2.0#'
export const CANVAS = {
  HEIGHT: 10000,
  HORIZONTAL_MARGIN: 400,
}
export const FIXED_PAGE_WIDTH = 1140
export const NODE_PADDING = 50
export const NODE_TYPES = [
  'Task',
  'BusinessRule',
  'Gateway',
  'StartNoneEvent',
  'EndNoneEvent',
  'CollapsedSubprocess',
  'IntermediateTimerEvent',
  'IntermediateEvent',
  'IntermediateLinkEventThrowing',
]
export const DIMENSIONS = {
  ACTIVITY: {
    width: 100,
    height: 80,
  },
  CONTROL: {
    width: 40,
    height: 40,
  },
  START_EVENT: {
    width: 30,
    height: 30,
  },
  END_EVENT: {
    width: 28,
    height: 28,
  },
}
export const TYPE_TO_SHAPE = {
  exclusiveGateway: 'Exclusive_Databased_Gateway',
  parallelGateway: 'ParallelGateway',
  startEvent: 'StartNoneEvent',
  endEvent: 'EndNoneEvent',
  scriptTask: 'ScriptTask',
  changeState: 'ServiceTask',
  googleDriveFileUpload: 'ServiceTask',
  googleAddCalendarEvent: 'ServiceTask',
  googleCloudPrint: 'ServiceTask',
  boxFileUpload: 'ServiceTask',
  googleDriveAddRow: 'ServiceTask',
  emailTask: 'ServiceTask',
  userTask: 'UserTask',
  dmnRuleTask: 'BusinessRule',
  productSubProcess: 'CollapsedSubprocess',
  intermediateTimerEvent: 'IntermediateTimerEvent',
  milestoneEvent: 'IntermediateEvent',
  setCoreInformation: 'IntermediateEvent',
  throwingIntermediateLinkEvent: 'IntermediateLinkEventThrowing',
}
export const DEFAULT_SHAPE = 'UserTask'
export const SHAPE_TO_TYPE = {
  Exclusive_Databased_Gateway: 'exclusiveGateway',
  ParallelGateway: 'parallelGateway',
  StartNoneEvent: 'startEvent',
  EndNoneEvent: 'endEvent',
  ScriptTask: 'scriptTask',
  UserTask: 'userTask',
  BusinessRule: 'dmnRuleTask',
  CollapsedSubprocess: 'productSubProcess',
  IntermediateTimerEvent: 'intermediateTimerEvent',
  IntermediateEvent: 'milestoneEvent',
}
export const DEFAULT_TYPE = 'userTask'
export const ACTIVITY_TYPE = /(userTask|scriptTask|changeState|googleDriveFileUpload|googleCloudPrint|emailTask|dataMapper|boxFileUpload|googleDriveAddRow|productSubProcess|googleAddCalendarEvent|dmnRuleTask)/i
export const CONTROL_TYPE = /(exclusiveGateway|parallelGateway)/i
export const START_EVENT_TYPE = /(startEvent)/i
export const END_EVENT_TYPE = /(endEvent)/i
export const INTERMEDIATE_EVENT_TYPE = /(intermediateTimerEvent|milestoneEvent|setCoreInformation|throwingIntermediateLinkEvent)/i



// WEBPACK FOOTER //
// ./src/processes/models/diagram/__EditorStatics__.js
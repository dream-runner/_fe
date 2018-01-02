import { StringUtils, VariableUtils } from 'commons-utils'
import { compact, difference, filter, includes } from 'lodash'
import VariableType from '../models/VariableType'
import Group from '../../users/models/Group'

export const provideId = VariableUtils.provideId

export function getCandidatesExpanded(type) {
  let { candidateIds = [], candidateGroupIds = [] } = type
  return [
    ...candidateIds,
    ...candidateGroupIds.reduce(
      (result, groupId) => [
        ...result,
        ...new Group({ id: groupId }).toJSON().userIds,
      ],
      []
    ),
  ]
}

export function isPrimitive(type) {
  return isList(type)
    ? isPrimitive(type.elementType)
    : !!getDescriptor(type).get('isPrimitive')
}

export function isList(type) {
  return type.name === 'list'
}

export function getDescriptor(type) {
  var VariableTypeDescriptor = require('processes/models/VariableTypeDescriptor')
  var descriptorId = compact([type.name, type.id]).join('_')

  return new VariableTypeDescriptor({ dynamicId: descriptorId })
}

export function getNewItemType(value, type) {
  if (!type || type.name !== 'list') {
    throw new Error('getNewItemField() is only applicable for list type fields')
  }

  let { elementType } = type

  // TODO: consider extracting the following type specific special handling to separate mixins

  // special handling for user list field:
  // only suggest users that are not already in the list
  if (elementType.name === 'userId') {
    let candidateIds = getCandidatesExpanded(elementType)
    let currentItems = (value || []).map(({ id }) => id)

    return new VariableType({
      name: 'userId',
      candidateIds: difference(candidateIds, currentItems),
    })
  }

  // special handling choice-list fields: exclude already added options from the list
  if (elementType.name === 'choice') {
    return new VariableType({
      name: 'choice',
      options: filter(elementType.options, opt => !includes(value, opt.id)),
    })
  }

  return new VariableType(elementType)
}



// WEBPACK FOOTER //
// ./src/processes/utils/Variable.js
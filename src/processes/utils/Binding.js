import { find } from 'lodash'
import i18n from 'signavio-i18n'

function findVarById(variables, id) {
  variables.find()
}

function unnamedIndex(variable, variables) {
  let unnamedIndex = 0
  for (let l = variables.length, i = 0; i < l; ++i) {
    if (!variables[i].name && variables[i].type.name === variable.type.name) {
      unnamedIndex++
    }
    if (variables[i] === variable) {
      return unnamedIndex
    }
  }
}

function varName(variable, variables, variableTypeDescriptors) {
  if (variable.name) {
    return variable.name
  }

  let variableTypeDescriptor = find(variableTypeDescriptors, {
    key: variable.type.name,
    id: variable.type.descriptorId,
  })
  let index = unnamedIndex(variable, variables)
  return i18n('Unnamed __type__', {
    type: variableTypeDescriptor ? variableTypeDescriptor.name : '',
  }) +
    index >
    1
    ? ' ' + index
    : ''
}

export function findDescriptorForType(type, variableTypeDescriptors) {
  if (!type) {
    throw new Error('Cannot find descriptor without type.')
  }

  return find(
    variableTypeDescriptors,
    ({ key, id }) => key === type.name && id === type.id
  )
}

export function resolveName(expression, variables, variableTypeDescriptors) {
  const [id, ...fields] = expression.split('.')

  const variable = find(variables, { id })

  if (!variable) {
    throw new Error(
      `Could not find variable ${id} while looking up name for expression ${expression}`
    )
  }

  const variableTypeDescriptor = findDescriptorForType(
    variable.type,
    variableTypeDescriptors
  )

  if (!variableTypeDescriptor) {
    throw new Error(
      `Could not find type descriptor for type ${variable.type.name}`
    )
  }

  return [
    varName(variable, variables, variableTypeDescriptors),
    ...fields.map((field, index) => {
      if (index === 0) {
        return find(variableTypeDescriptor.fields, { key: field }).name
      }

      const type = resolveType(
        [id, ...fields.slice(0, index)].join('.'),
        variables,
        variableTypeDescriptors
      )
      const descriptor = findDescriptorForType(type, variableTypeDescriptors)

      if (!descriptor) {
        throw new Error(`Could not find descriptor for type ${type}`)
      }

      return find(descriptor.fields, { key: field }).name
    }),
  ].join(' / ')
}

export function resolveType(expression, variables, variableTypeDescriptors) {
  let [id, ...fields] = expression.split('.')
  let { type } = find(variables, { id: id })

  for (var i = 0, l = fields.length; i < l; ++i) {
    let descriptor = findDescriptorForType(type, variableTypeDescriptors)
    type = find(descriptor.fields, { key: fields[i] }).type
  }

  if (!type) {
    throw new Error('Type not found for binding #' + this.get('expression'))
  }

  return type
}



// WEBPACK FOOTER //
// ./src/processes/utils/Binding.js
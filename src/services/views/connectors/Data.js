// @flow

import React from 'react'
import i18n from 'signavio-i18n'
import { isEmpty } from 'lodash'

import { List, Divider } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import { VariableUtils } from 'processes/utils'

import {
  LabeledField,
  connectorReferenceType,
  connectorValueType,
} from '../../../../packages/fields'

import type { VariableType } from '../../../processes/types'
import type { ConnectorDescriptorT, DescriptorT } from '../../types'

import NestedStructure from './NestedStructure'

type PropsT = {
  descriptor: ConnectorDescriptorT,
}

export default function Data({ descriptor }: PropsT) {
  if (
    !descriptor ||
    !descriptor.typeDescriptors ||
    isEmpty(descriptor.typeDescriptors)
  ) {
    return (
      <Hint info>
        {i18n('This connector does not provide any type information.')}
      </Hint>
    )
  }

  return (
    <div>
      <Divider title={i18n('Provides the following data')} />

      <List>
        {descriptor.typeDescriptors.map((typeDescriptor: DescriptorT) => (
          <div>
            <Descriptor {...typeDescriptor} />

            <Divider />

            <LabeledField
              label={i18n('Example')}
              type={
                typeDescriptor.recordType === 'VALUE'
                  ? connectorValueType({ descriptorId: typeDescriptor.id })
                  : connectorReferenceType({ descriptorId: typeDescriptor.id })
              }
            />
          </div>
        ))}
      </List>
    </div>
  )
}

type DescriptorPropsT = {
  name: string,
  fields: Array<DescriptorT | VariableType>,
}

export function Descriptor(props: DescriptorPropsT) {
  const { fields } = props

  if (fields) {
    return <Complex {...props} />
  }

  return <Simple {...props} />
}

type ComplexPropsT = {
  name: string,
  fields: Array<DescriptorT | VariableType>,
}

function Complex({ name, fields, ...rest }: ComplexPropsT) {
  return (
    <NestedStructure {...rest} icon="lines" title={name}>
      {fields.map(descriptor => <Descriptor {...descriptor} />)}
    </NestedStructure>
  )
}

type SimplePropsT = {
  name: string,
  type: VariableType,
}

function Simple({ type, name, ...rest }: SimplePropsT) {
  if (!type) {
    return (
      <TextTile {...rest} icon="warning">
        {i18n(`No type information available for **${name}**`, {
          markdown: true,
        })}
      </TextTile>
    )
  }

  return (
    <TextTile
      {...rest}
      icon={VariableUtils.getDescriptor(type).getIcon()}
      subtitle={type.name}
    >
      {name || <Hint inline>{i18n('No name available')}</Hint>}
    </TextTile>
  )
}



// WEBPACK FOOTER //
// ./src/services/views/connectors/Data.js
//@flow
import React from 'react'
import createReactClass from 'create-react-class'
import { withHandlers, compose } from 'recompose'
import i18n from 'signavio-i18n'
import { Link } from 'react-router-dom'
import { omit } from 'lodash'

import { prependOrg } from '@signavio/effektif-api'

import { Box, Disable } from '@signavio/effektif-commons/lib/components'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import type { DataTypeDescriptorT, VariableT } from '@signavio/effektif-api'

import type { BindingT, FieldDefinitionT } from '../../../../../packages/fields'
import {
  expressionUtils,
  getFieldsContext,
} from '../../../../../packages/fields'

import Input from './Input'

type PropsT = {
  model: any,
  readOnly: boolean,
  variables: Array<VariableT>,
  dataTypeDescriptors: Array<DataTypeDescriptorT>,
  onChange: (binding: BindingT, expression: string) => void,
}

const CoreInformation = createReactClass({
  displayName: 'CoreInformation',

  mixins: [BaseMixin],

  render: function() {
    const {
      model,
      readOnly,
      onChange,
      variables,
      dataTypeDescriptors,
    } = this.props

    const coreInformation = model.getProcess().get('coreInformation')

    if (!coreInformation) {
      return (
        <Box white>
          <Hint info>
            {i18n(
              'Core information can be used to set key values inside a workflow. To use this task open the __detailsLink__ tab and select which information is most important.',
              {
                detailsLink: (
                  <Link to={prependOrg(`/process/${model.getProcess().id}`)}>
                    {i18n('Details')}
                  </Link>
                ),
              }
            )}
          </Hint>
        </Box>
      )
    }

    const fieldDefinitions = coreInformation.fields
    const inputs = model.get('inputs').toJSON()

    return (
      <Box white>
        <Hint>
          {fieldDefinitions.length
            ? i18n(
                "Use this event to set values to the workflow's core information. " +
                  'If you leave a field empty, its value will not be changed.'
              )
            : i18n(
                "You haven't defined any core information yet. Go to the Details tab above to define them."
              )}
        </Hint>

        {fieldDefinitions.map((fieldDefinition: FieldDefinitionT) => {
          const { binding: { expression }, name } = fieldDefinition

          const type = expressionUtils.resolveType(
            dataTypeDescriptors,
            variables,
            expression
          )

          const value = inputs[expression]
          const isNested = expressionUtils.isNested(expression)

          return (
            <Disable
              disabled={isNested}
              hint={isNested && i18n('This field cannot be updated.')}
            >
              <Input
                value={value}
                variableId={expression}
                key={expression}
                type={type}
                readOnly={readOnly || isNested}
                label={name}
                onChange={onChange}
              />
            </Disable>
          )
        })}
      </Box>
    )
  },
})

export default compose(
  getFieldsContext,
  withHandlers({
    onChange: ({ model, dataTypeDescriptors, variables }) => (
      variableId: string,
      binding: ?BindingT
    ) => {
      const inputs = model.get('inputs').toJSON()

      if (!binding) {
        model.set('inputs', null)
        model.set('inputs', omit(inputs, variableId))
      } else {
        model.set('inputs', {
          ...inputs,
          [variableId]: binding,
        })
      }

      model.save()
    },
  })
)(CoreInformation)



// WEBPACK FOOTER //
// ./src/activities/views/activities/intermediateEvents/CoreInformation.js
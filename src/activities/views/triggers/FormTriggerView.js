// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, mapProps, withState, withHandlers } from 'recompose'
import { filter, includes } from 'lodash'

import type { DataTypeDescriptorT } from '@signavio/effektif-api'

import { Tab, TabBar } from '@signavio/effektif-commons/lib/components/tabs'
import {
  Box,
  ContextHelp,
  BindingsTextInput,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { getFieldsContext, bindingUtils } from '../../../../packages/fields'

import { FormEditor } from '../components'
import Description from '../Description'

type PropsT = {
  publicForm?: boolean,
  dataTypeDescriptors: Array<DataTypeDescriptorT>,
  model: any,
  readOnly: boolean,
}

type StatePropsT = {
  tab: string,
  setTab: (tab: string) => void,
}

const FormTrigger = ({
  dataTypeDescriptors,
  model,
  publicForm,
  readOnly,
  tab,
  setTab,
}: PropsT & StatePropsT) => {
  let content

  if (tab === 'form') {
    content = (
      <div>
        {publicForm && (
          <Hint>
            {i18n(
              'Some field types have been removed because they are not available for public users.'
            )}
          </Hint>
        )}
        <div className="row">
          <div className="col-sm-8">
            <Description
              value={model.get('description')}
              onChange={(value: string) => model.set('description', value)}
              readOnly={readOnly}
              onBlur={() => !readOnly && model.save()}
            />
          </div>
        </div>
        <FormEditor
          model={model.get('form')}
          activity={model}
          readOnly={readOnly}
          variableCollection={model.getProcess().get('variables')}
          reuseNestedFields={false}
          dataTypeDescriptors={filterTypeDescriptors(
            publicForm,
            dataTypeDescriptors
          )}
          publicForm={publicForm}
          variables={model
            .getProcess()
            .get('variables')
            .map(variable => variable.toJSON())}
        />
      </div>
    )
  } else if (tab === 'feedbackMessage') {
    content = (
      <Box white>
        <Hint>
          {i18n(
            'Enter a message here to show as a confirmation after starting a new case.'
          )}
          <ContextHelp>
            <p>
              {i18n(
                'Use this for processes where the case creator will not work on the case, ' +
                  'or will start several cases one after the other.'
              )}
            </p>
            <p>
              {i18n(
                'If you leave the textarea empty, the case creator will be redirected to the ' +
                  'case view right away.'
              )}
            </p>
          </ContextHelp>
        </Hint>
        <BindingsTextInput
          style={{
            input: {
              mentions: {
                '&multiLine': {
                  input: {
                    minHeight: 250,
                  },
                },
              },
            },
          }}
          readOnly={readOnly}
          value={model.parent.get('caseCreatedMessage')}
          onChange={(value: string) =>
            model.parent.set('caseCreatedMessage', value)}
          bindables={getBindables(model.parent)}
          onBlur={() => model.save()}
          infoText={i18n(
            'Type __key__ to insert placeholders for trigger form fields, ' +
              'or case information such as the new case’s name',
            {
              key: <kbd>#</kbd>,
            }
          )}
        />
      </Box>
    )
  }

  return (
    <div>
      <TabBar>
        <Tab {...getTabProps(tab, 'form', setTab)}>{i18n('Form')}</Tab>
        <Tab {...getTabProps(tab, 'feedbackMessage', setTab)}>
          {i18n('Confirmation Message')}
        </Tab>
      </TabBar>
      <div className="configuration-content">{content}</div>
    </div>
  )
}

const getTabProps = (
  currentTab: string,
  tabName: string,
  setTab: (tab: string) => void
) => ({
  active: currentTab === tabName,
  onClick: () => setTab(tabName),
})

const getBindables = model => {
  const trigger = model.get('trigger')
  const caseVariable = model.getProcess().getCaseVariable()
  const baseBindables = (caseVariable && caseVariable.getBindables()) || []

  const triggerBindables = trigger ? trigger.getBindables() : []

  return triggerBindables.concat(baseBindables)
}

const NOT_AVAILABLE_IN_PUBLIC_FORM = ['userId', 'connectorReference']

const filterTypeDescriptors = (publicForm, dataTypeDescriptors) => {
  if (!publicForm) {
    return dataTypeDescriptors
  }

  return filter(
    dataTypeDescriptors,
    dataTypeDescriptor =>
      !includes(NOT_AVAILABLE_IN_PUBLIC_FORM, dataTypeDescriptor.key)
  )
}

const isPublicFormAllowedType = type => {
  if (type.name === 'list') {
    return type.elementType && type.elementType.name !== 'userId'
  }

  return type.name !== 'userId'
}

export default compose(
  withState('tab', 'setTab', 'form'),
  mapProps(({ tab, setTab, ...rest }: PropsT & StatePropsT) => ({
    ...rest,
    tab,
    setTab,
  })),
  getFieldsContext,
  withHandlers({
    canReuseField: ({
      publicForm,
      dataTypeDescriptors,
      variables,
    }) => bindable => {
      if (!publicForm) {
        return true
      }

      const type = bindingUtils.getType(
        dataTypeDescriptors,
        variables,
        bindable
      )

      return isPublicFormAllowedType(type)
    },
  })
)(FormTrigger)



// WEBPACK FOOTER //
// ./src/activities/views/triggers/FormTriggerView.js
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withHandlers } from 'recompose'

import {
  Feature,
  BindingsTextInput,
  Box,
} from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import {
  getFieldsContext,
  ProvideFieldsContext,
} from '../../../../../packages/fields'

import { FormEditor } from '../../components'

function Form({
  dataTypeDescriptors,
  model,
  variableCollection,
  readOnly,
  variables,
  onTemplateChange,
  onBlur,
  style,
}) {
  return (
    <ProvideFieldsContext variables={variables}>
      <div {...style}>
        <div className="row">
          <div className="col-sm-8">
            <Box white style={style('description')}>
              <h5>
                {i18n('Description')}
              </h5>

              <BindingsTextInput
                readOnly={readOnly}
                value={model.get('description')}
                onChange={onTemplateChange}
                bindables={model.getProcess().getBindables()}
                onBlur={onBlur}
                infoText={i18n(
                  'Press __key__ to insert values from form fields in the description.',
                  {
                    key: <kbd>#</kbd>,
                  }
                )}
              />
            </Box>
          </div>
        </div>

        <Feature sneakPeek feature="Component.Forms">
          <FormEditor
            readOnly={readOnly}
            model={model.get('form')}
            activity={model}
            variableCollection={variableCollection}
            variables={variables}
            dataTypeDescriptors={dataTypeDescriptors}
          />
        </Feature>
      </div>
    </ProvideFieldsContext>
  )
}

export default compose(
  getFieldsContext,
  withHandlers({
    onTemplateChange: ({ model }) => description => {
      model.set({ description })
    },
    onBlur: ({ readOnly, model }) => () => {
      if (readOnly) {
        return
      }
      model.save()
    },
  }),
  defaultStyle(({ padding }) => ({
    description: {
      marginBottom: padding.normal,
    },
  }))
)(Form)



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/Form.js
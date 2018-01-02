import React from 'react'
import i18n from 'signavio-i18n'
import createReactClass from 'create-react-class'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { Box } from '@signavio/effektif-commons/lib/components'

import { LabeledField, fileType } from '../../../../../packages/fields'
import DynamicMappingsContainer from '../DynamicMappingsContainer'

const DocumentTemplate = createReactClass({
  displayName: 'DocumentTemplate',

  mixins: [BaseMixin],

  getInitialState() {
    return { saveOutstanding: false }
  },

  setTemplateFileId(value) {
    const { model } = this.props
    this.setState({ saveOutstanding: true })

    model.set('templateFileId', value)

    const proc = model.getProcess()

    proc.once('sync', () => this.setState({ saveOutstanding: false }))

    if (value === null) {
      model.set({
        inputs: {},
        outputs: {},
      })
    }

    model.save()
  },

  render() {
    const { model, readOnly } = this.props
    return (
      <div>
        <Box white>
          <LabeledField
            readOnly={readOnly}
            value={model.get('templateFileId')}
            label={i18n('Document template (docx)')}
            description={i18n(
              'This action creates a new file from a document template.'
            )}
            type={fileType}
            onChange={this.setTemplateFileId}
          />
        </Box>

        {!model.get('templateFileId') &&
          <Hint>
            {i18n(
              'You will be able to map fields of this process to fields of the template once you have selected one.'
            )}
          </Hint>}

        {model.get('templateFileId') &&
          !this.state.saveOutstanding &&
          <DynamicMappingsContainer
            readOnly={readOnly}
            model={model}
            refresh={model.get('templateFileId')}
          />}

        {this.state.saveOutstanding &&
          <Hint loading>
            {i18n('Waiting for configuration to be saved')}
          </Hint>}
      </div>
    )
  },
})

export default DocumentTemplate



// WEBPACK FOOTER //
// ./src/activities/views/activities/document/DocumentTemplate.js
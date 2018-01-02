import React from 'react'

import createReactClass from 'create-react-class'

import i18n from 'signavio-i18n'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import {
  MarkdownInput,
  List,
  Divider,
} from '@signavio/effektif-commons/lib/components'

import Details from './DetailsView'
import Controls from './ControlsView'
import FormItem from './FormItemView'

export default createReactClass({
  displayName: 'ReleaseDetails',

  mixins: [BaseMixin],

  render() {
    const { model, ...rest } = this.props

    return (
      <Details model={model}>
        <List>
          <FormItem model={model} field={'version'} label={i18n('Version')} />

          <FormItem model={model} field={'title'} label={i18n('Title')} />

          <FormItem
            model={model}
            field={'releaseDate'}
            label={i18n('Release date')}
          />

          <Divider title={i18n('Notes')} />

          <MarkdownInput
            value={model.get('notes')}
            onChange={ev => model.set('notes', ev.target.value)}
          />
        </List>

        <Controls
          model={model}
          deleteWarning={i18n('Are you sure you want to remove this release?')}
          {...rest}
        />
      </Details>
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/ManageReleaseDetails.js
// @flow
import React from 'react'
import i18n from 'i18n'
import { compose, withHandlers, withProps } from 'recompose'
import Router from 'singleton/Router'

import { List } from '@signavio/effektif-commons/lib/components'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import AuthQuery from '../models/params/AuthQuery'
import LogQuery from '../models/params/LogQuery'

import DisableEntity from './DisableEntityView'

type PropsT = {
  model: Object,
  name: string,
  onLicenseClick: () => void,
  onLogsClick: () => void,
}

function Toolbar({ model, name, onLicenseClick, onLogsClick }: PropsT) {
  return (
    <List direction="horizontal">
      <IconButton light icon="license" onClick={onLicenseClick}>
        {i18n('Licenses')}
      </IconButton>
      <IconButton light icon="lines" onClick={onLogsClick}>
        {i18n('Logs')}
      </IconButton>
      <DisableEntity model={model} name={name} />
    </List>
  )
}

const enhance = compose(
  withProps(({ category, model }) => ({
    name: category === 'user' ? model.name() : model.get('name'),
  })),
  withHandlers({
    onLicenseClick: ({ category, model }) => () => {
      const query = new AuthQuery()
      query.set(category, model)
      const url = Router.reverse('admin_auth', {
        tab: 'licenses',
      })
      Router.navigate(url, {
        search: `?${query.toString()}`,
      })
    },
    onLogsClick: ({ category, model }) => () => {
      const query = new LogQuery()
      query.set(category, model)
      const url = Router.reverse('admin_logs')
      Router.navigate(url, {
        search: `?${query.toString()}`,
      })
    },
  })
)

export default enhance(Toolbar)



// WEBPACK FOOTER //
// ./src/admin/views/Toolbar.js
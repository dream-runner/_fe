// @flow
import React from 'react'
import i18n from 'i18n'
import { withState, withHandlers, compose } from 'recompose'

import Router from 'singleton/Router'

import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Hint } from '@signavio/effektif-commons/lib/components'
import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'

import RemoveModal from './RemoveModal'
import Organization from '../../models/Organization'

type PropsT = {
  model: typeof Organization,
  confirmRemove: boolean,
  onHideModal: () => void,
  onShowModal: () => void,
  onRemove: () => void,
  setConfirmRemove: () => void,

  description?: string,
  buttonText?: string,
}

function DangerZone(props: PropsT) {
  const {
    confirmRemove,
    model,
    onHideModal,
    onShowModal,
    onRemove,
    description,
    buttonText,
    style,
  } = props

  const warning = i18n(
    'Are you sure? Deleting an organization is permanent and cannot be undone!'
  )

  return (
    <div {...style}>
      <TextTile {...style('tile')}>
        {i18n('Danger zone')}
      </TextTile>
      <div {...style('body')}>
        <div className="row">
          <div className="col-sm-9">
            {description || i18n('Delete this organization')}
            <Hint className="col-sm-12" inline>
              {warning}
            </Hint>
          </div>
          <div className="col-sm-3">
            <TextButton {...style('button')} onClick={onShowModal}>
              {buttonText || i18n('Delete organization')}
            </TextButton>
          </div>
        </div>
      </div>
      {confirmRemove &&
        <RemoveModal
          model={model}
          onHide={onHideModal}
          onRemove={onRemove}
          warning={warning}
        />}

    </div>
  )
}

const styled = defaultStyle(theme => ({
  tile: {
    backgroundColor: theme.color.status.danger,
    color: utils.color(theme.color.status.danger),
  },
  body: {
    paddingLeft: theme.padding.normal,
    paddingRight: theme.padding.normal,
    paddingTop: theme.padding.normal,
    paddingBottom: theme.padding.normal,
    ...utils.borderBottom('1px', 'solid', theme.color.mono.light),
    ...utils.borderLeft('1px', 'solid', theme.color.mono.light),
    ...utils.borderRight('1px', 'solid', theme.color.mono.light),
  },
  button: {
    float: 'right',
  },
}))

export default compose(
  withState('confirmRemove', 'setConfirmRemove', false),
  withHandlers({
    onShowModal: ({ setConfirmRemove }) => () => setConfirmRemove(true),
    onHideModal: ({ setConfirmRemove }) => () => setConfirmRemove(false),
    onRemove: () => () =>
      Router.navigate(Router.reverse('admin_organizations')),
  }),
  styled
)(DangerZone)



// WEBPACK FOOTER //
// ./src/admin/views/organizations/DangerZone.js
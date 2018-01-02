import React from 'react'
import { omit } from 'lodash/fp'
import { withHandlers, mapProps, compose } from 'recompose'

import i18n from 'signavio-i18n'

import { moment } from '@signavio/effektif-commons/lib/extensions'

import { CSSUtils } from '@signavio/effektif-commons/lib/utils'
import { Popover, Icon } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import Router from 'singleton/Router'
import Effektif from 'singleton/Effektif'

import Header from './Header'

const omitProps = compose(mapProps, omit)

function AuthItem({
  isSelectable,
  isSelected,
  model,
  query,
  onClick,
  ...rest
}) {
  const cls = CSSUtils.cls({
    'auth-item': true,
    'auth-item-active': isSelected,
  })

  const expirationDate = model.get('expirationDate')
  const user = model.get('user')

  return (
    <TextTile
      {...rest}
      className={cls}
      header={
        <Header
          user={user && user.toJSON()}
          invitee={model.get('invitee')}
          onSelect={onClick}
          isSelected={isSelected}
          isGenerator={model.isGenerator()}
          isSelectable={isSelectable}
        />
      }
      subtitle={model.get('organization').get('name')}
      toolbar={
        <div className="validity">
          <div className="label">
            {moment(model.get('creationDate')).format('LL')}
          </div>

          {expirationDate
            ? <div className="label label-warning">
                {moment(expirationDate).format('LL')}
              </div>
            : <div className="label label-info">
                {i18n('Does not expire')}
              </div>}
        </div>
      }
    >
      <a
        href={Router.reverse('admin_auth', {
          tab: model.getCategory(),
          id: model.id,
          query: query && query.toString(),
        })}
      >
        {Effektif.config().getLicenseType(model.get('type')).get('name')}
      </a>
    </TextTile>
  )
}

export default compose(
  mapProps(({ onDeselect, onSelect, ...rest }) => ({
    isSelectable: !!(onSelect && onDeselect),
    onDeselect,
    onSelect,
    ...rest,
  })),
  withHandlers({
    onClick: ({ isSelected, model, onSelect, onDeselect }) => () => {
      if (!onSelect || !onDeselect) {
        return
      }

      if (isSelected) {
        onDeselect(model)
      } else {
        onSelect(model)
      }
    },
  }),
  omitProps(['onSelect', 'onDeselect'])
)(AuthItem)



// WEBPACK FOOTER //
// ./src/admin/views/licenses/components/Item.js
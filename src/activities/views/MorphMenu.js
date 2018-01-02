import PropTypes from 'prop-types'
import React from 'react'
import { keys } from 'lodash'
import { compose } from 'recompose'

import { List, Divider, Feature } from 'commons-components'
import { IconButton } from 'commons-components/buttons'
import { defaultStyle, utils } from 'commons-style'
import {
  Dropdown as BaseDropdown,
  dropdownEnhancers,
} from '@signavio/react-forms'
import { ActionTile } from 'commons-components/tiles'

const { uncontrolled, toggleOnClick, closeOnClickNode } = dropdownEnhancers
const Dropdown = compose(uncontrolled, toggleOnClick, closeOnClickNode)(
  BaseDropdown
)

function MorphMenu({ type, services, onMorph, style }) {
  const { effektif, ['bpmn-flow']: bpmn, ...rest } = services.groupBy(service =>
    service.get('key')
  )
  const thirdParty = keys(rest)
    .sort()
    .reduce((result, key) => [...result, ...rest[key]], [])

  if (bpmn[0].get('actionTypes').includes(type)) {
    return (
      <Dropdown
        node={
          <div {...style('dropdown')}>
            <ServiceActions
              actions={bpmn[0].get('actionTypes')}
              onSelect={onMorph}
            />
          </div>
        }
      >
        <IconButton icon={type.getIcon()} />
      </Dropdown>
    )
  }

  return (
    <Dropdown
      node={
        <div {...style('dropdown')}>
          <ServiceActions
            actions={effektif[0].get('actionTypes')}
            onSelect={onMorph}
          />

          {thirdParty.map(service =>
            <ServiceActions
              key={service.id}
              title={service.get('name')}
              actions={service.get('actionTypes')}
              onSelect={onMorph}
            />
          )}
        </div>
      }
    >
      <IconButton icon={type.getIcon()} />
    </Dropdown>
  )
}

export default defaultStyle(({ color, padding }) => ({
  dropdown: {
    paddingTop: padding.small,
    paddingBottom: padding.small,
    paddingLeft: padding.small,
    paddingRight: padding.small,
    backgroundColor: 'white',
    ...utils.popover(color),
  },
}))(MorphMenu)

MorphMenu.propTypes = {
  type: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired,

  onMorph: PropTypes.func,
}

function ServiceActions({ title, actions, onSelect }) {
  const visibleActions = actions.filter(
    action => !action.get('isComingSoon') && action.get('key') !== 'dmnRuleTask'
  )

  if (visibleActions.length === 0) {
    return null
  }

  return (
    <div>
      {title && <Divider title={title} />}

      <List>
        {visibleActions.map(action =>
          <div key={action.id}>
            <Feature sneakPeek tooltip feature={action.get('feature')}>
              <ActionTile
                icon={action.getIcon()}
                onClick={() => onSelect(action)}
              >

                {action.get('name')}
              </ActionTile>
            </Feature>
          </div>
        )}
      </List>
    </div>
  )
}

ServiceActions.propTypes = {
  onSelect: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,

  title: PropTypes.string,
}



// WEBPACK FOOTER //
// ./src/activities/views/MorphMenu.js
// @flow

import React from 'react'
import i18n from 'i18n'

import { defaultStyle } from 'commons-style'
import { DropDown, List } from 'commons-components'
import { Tile, ActionTile } from 'commons-components/tiles'

type PropsT = {
  children: React$Element,

  onRemove: () => void,
  onReload: () => void,
}

function ConnectorHeader({ children, onRemove, onReload, ...rest }: PropsT) {
  return (
    <Tile
      {...rest}
      toolbar={
        <DropDown pushRight closeOnClick toggleIcon="ellipsis">
          <List>
            <ActionTile icon="trash" onClick={onRemove}>
              {i18n('Delete connector')}
            </ActionTile>
            <ActionTile icon="reload" onClick={onReload}>
              {i18n('Reload connector')}
            </ActionTile>
          </List>
        </DropDown>
      }
    >

      {children}
    </Tile>
  )
}

export default defaultStyle({
  backgroundColor: null,

  content: {
    paddingLeft: 0,
  },
})(ConnectorHeader)



// WEBPACK FOOTER //
// ./src/services/views/connectors/ConnectorHeader.js
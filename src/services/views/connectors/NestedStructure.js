// @flow

import React, { Children } from 'react'
import i18n from 'i18n'

import { defaultStyle, variables, utils } from 'commons-style'
import { List } from 'commons-components'
import { TextTile } from 'commons-components/tiles'

type PropsT = {
  children: React$Element,

  title: string,
  icon: string,
}

function NestedStructure({ children, title, icon, style, toolbar }: PropsT) {
  return (
    <div {...style}>
      <TextTile
        style={style('title')}
        icon={icon}
        subtitle={i18n('Complex')}
        toolbar={toolbar}
      >
        {title}
      </TextTile>

      <List>
        {Children.map(children, child => (
          <Entry style={style('entry')}>{child}</Entry>
        ))}
      </List>
    </div>
  )
}

const entryStyle = theme => ({
  marginLeft: variables.lineHeight.block / 2,

  ...utils.borderLeft('1px', 'solid', theme.color.mono.light),

  content: {
    overflow: 'hidden',
  },

  marker: {
    float: 'left',

    width: variables.lineHeight.block / 2,
    height: variables.lineHeight.block / 2,

    ...utils.borderBottom('1px', 'solid', theme.color.mono.light),
  },
})

const Entry = defaultStyle(entryStyle)(({ children, ...rest }) => (
  <div {...rest.style}>
    <div {...rest.style('marker')} />

    <div {...rest.style('content')}>{children}</div>
  </div>
))

export default defaultStyle(theme => ({
  title: {
    marginBottom: 1,
  },
}))(NestedStructure)



// WEBPACK FOOTER //
// ./src/services/views/connectors/NestedStructure.js
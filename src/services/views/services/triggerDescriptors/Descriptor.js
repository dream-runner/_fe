import React from 'react'
import i18n from 'i18n'
import { omit } from 'lodash'

import { defaultStyle, padding } from 'commons-style'
import { Collapsible } from 'commons-components'

import Header from './Header'
import Configuration from './Configuration'

function Descriptor({
  descriptor,
  icon,
  expanded,
  onChange,
  onRemove,
  style,
  ...rest
}) {
  return (
    <Collapsible
      {...rest}
      expanded={expanded}
      {...style}
      header={
        <Header
          expanded={expanded}
          icon={icon}
          value={descriptor.name}
          onRemove={onRemove}
          onChange={name => onChange({ name })}
        />
      }
    >

      <div style={style('content')}>
        <Configuration descriptor={descriptor} onChange={onChange} />
      </div>
    </Collapsible>
  )
}

export default defaultStyle(theme => ({
  content: {
    backgroundColor: theme.color.mono.ultralight,

    padding: padding.normal,
  },
}))(Descriptor)



// WEBPACK FOOTER //
// ./src/services/views/services/triggerDescriptors/Descriptor.js
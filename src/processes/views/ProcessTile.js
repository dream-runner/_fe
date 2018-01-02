// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Popover } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import { Avatar } from '../../../packages/organizations'
import { userUtils } from '@signavio/effektif-api'

import Effektif from '../../singleton/Effektif'

import type { ProcessT } from '../types'

type PropsT = {
  proc: ProcessT,

  children: React$Element,
}

function ProcessTile({ children, proc, ...rest }: PropsT) {
  const { owner } = proc

  return (
    <TextTile
      {...rest}
      {...getIcon(proc)}
      header={
        owner && (
          <Popover
            small
            popover={i18n('Owner: __user__', { user: userUtils.name(owner) })}
          >
            <Avatar
              user={owner}
              style={{
                verticalAlign: 'top',
                float: 'right',
              }}
            />
          </Popover>
        )
      }
    >
      {children}
    </TextTile>
  )
}

const enhance = defaultStyle({
  icon: {
    float: 'left',
  },
})

export default enhance(ProcessTile)

const getIcon = (proc: ProcessT) => {
  const { trigger } = proc

  if (!trigger) {
    return {
      iconSet: 'fontAwesome',
      icon: 'cogs',
    }
  }

  const icon = Effektif.list('services').reduce((finalIcon, service) => {
    if (finalIcon) {
      return finalIcon
    }

    return service.get('triggerTypes').reduce((icon, type) => {
      if (icon) {
        return icon
      }

      if (type.get('key') === trigger.type) {
        return type.get('icon')
      }
    }, null)
  }, null)

  return { icon }
}



// WEBPACK FOOTER //
// ./src/processes/views/ProcessTile.js
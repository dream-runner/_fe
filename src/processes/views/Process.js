// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import i18n from 'signavio-i18n'
import { get } from 'lodash'

import {
  defaultStyle,
  padding,
  font,
  variables,
} from '@signavio/effektif-commons/lib/styles'
import { Popover, Icon, List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import Login from '../../singleton/Login'
import Router from '../../singleton/Router'

import { getRights } from '../../../packages/access'
import type { AccessT } from '../../../packages/access'

import { getName } from '../../users/utils'

import { isApprovalWorkflow, isPublished } from '../utils'
import type { CompactProcessT } from '../types'

import ProcessTile from './ProcessTile'
import ProcessLabels from './ProcessLabels'

type PropsT = {
  proc: CompactProcessT,
}
/**
 * A view for items in a listing of processes
 *
 */
function Process({ proc, ...rest }: PropsT) {
  const rights = getRights(proc.access, 'edit', 'view', 'start')
  const startable = isStartable(proc, rights)

  return (
    <ProcessTile
      {...rest}
      proc={proc}
      subtitle={getLockHint(proc) || getLabelList(proc)}
      toolbar={
        <List direction="horizontal">
          <TemplateIndicator isTemplate={proc.template} />

          {!startable && (
            <Hint inline style={rest.style('hint')}>
              {getStartHint(proc, rights)}
            </Hint>
          )}

          {startable && (
            <NewCaseButton proc={proc}>{i18n('Start new case')}</NewCaseButton>
          )}
        </List>
      }
    >
      {rights.view ? (
        <ProcessLink proc={proc}>
          <ProcessName name={proc.name} />
        </ProcessLink>
      ) : (
        <ProcessName name={proc.name} />
      )}
    </ProcessTile>
  )
}

const getModifiers = ({ proc }) => ({
  '&withLabels': proc.labels && proc.labels.length > 0,
})

export default compose(
  pure,
  defaultStyle(
    theme => ({
      hint: {
        paddingLeft: padding.normal,
        paddingRight: padding.normal,

        fontSize: font.size.form,
        float: 'left',
        lineHeight: `${variables.lineHeight.block}px`,

        '&inline': {
          paddingLeft: padding.normal,
          paddingRight: padding.normal,
        },
      },

      '&withLabels': {
        subtitle: {
          height: 14, // matches TextTile lineHeight and keep ProcessTile with 42px height
          overflow: 'visible',
        },
      },
    }),
    getModifiers
  )
)(Process)

const getLockHint = ({ editor }: CompactProcessT): ?string => {
  if (editor == null) {
    return ''
  }

  if (editor.id === Login.user().id) {
    return i18n('You are working on this process in another window.')
  }

  return i18n('__user__ is currently working on this process.', {
    user: getName(editor),
  })
}

const getLabelList = ({ labels }: CompactProcessT) => {
  if (!labels || !labels.length) {
    return null
  }

  return <ProcessLabels labels={labels} />
}

const getStartHint = (proc: CompactProcessT, rights: AccessT): string => {
  if (!rights.start) {
    return i18n('You cannot start this process.')
  }

  if (isApprovalWorkflow(proc)) {
    return i18n('Can only be started from Process Manager')
  }

  if (!isPublished(proc)) {
    return i18n('No published version')
  }

  if (isEmailTrigger(proc)) {
    return i18n('This process can only be started via email')
  }

  return ''
}

const isStartable = (proc: CompactProcessT, rights: AccessT): boolean => {
  if (!rights.start) {
    return false
  }

  if (isApprovalWorkflow(proc)) {
    return false
  }

  if (!isPublished(proc)) {
    return false
  }

  if (isEmailTrigger(proc)) {
    return false
  }

  return true
}

const isEmailTrigger = (proc: CompactProcessT): boolean =>
  get(proc, 'trigger.type') === 'email'

export function TemplateIndicator({ isTemplate }: { isTemplate: boolean }) {
  if (!isTemplate) {
    return null
  }

  return (
    <Popover
      key="template"
      placement="top"
      popover={i18n('This process is available as an example.')}
    >
      <Icon icon="template" />
    </Popover>
  )
}

TemplateIndicator.propTypes = {
  isTemplate: PropTypes.bool,
}

export function ProcessName({ name }: { name: string }) {
  if (!name || !name.trim()) {
    return <Hint inline>{i18n('Unnamed')}</Hint>
  }

  return <span>{name}</span>
}

export function ProcessLink({
  proc,
  children,
}: {
  proc: CompactProcessT,
  children?: React$Element,
}) {
  return <a href={Router.reverse('process', { id: proc.id })}>{children}</a>
}

export function NewCaseButton({
  proc,
  children,
}: {
  proc: CompactProcessT,
  children?: React$Element,
}) {
  return (
    <TextButton
      href={Router.reverse('create_case', { id: proc.id })}
      style={{ display: 'block' }}
    >
      {children}
    </TextButton>
  )
}



// WEBPACK FOOTER //
// ./src/processes/views/Process.js
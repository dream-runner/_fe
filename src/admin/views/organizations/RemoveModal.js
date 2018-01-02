// @flow

import React from 'react'
import i18n from 'i18n'
import { withState, withHandlers, compose } from 'recompose'

import Organization from '../../models/Organization'
import { applicationName } from '@signavio/effektif-commons'
import { Confirm } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  model: typeof Organization,

  onHide: () => void,
  onDeleteOrganization: () => void,
  onKeyDown: () => void,
  onChange: () => void,

  isValid: boolean,
  confirmationText: string,
}

function RemoveModal(props: PropsT) {
  const {
    isValid,
    confirmationText,
    onHide,
    onDeleteOrganization,
    onKeyDown,
    onChange,
    model,
    warning,
    style,
  } = props

  return (
    <Confirm
      danger
      disabled={!isValid}
      confirmText={i18n('Delete')}
      title={i18n('Delete organization: __organization__', {
        organization: model.get('name'),
      })}
      onCancel={onHide}
      onConfirm={onDeleteOrganization}
      {...style}
    >

      <div className="content">
        <h4>{`${i18n('Warning!')} ${warning}`}</h4>
        <div>
          <Hint warning>
            <label>{i18n('Also delete')}</label>
            <ul>
              <li>{i18n('this organization’s workflows')}</li>
              <li>{i18n('this organization’s open and closed cases')}</li>
              <li>
                {i18n('files that are stored within __applicationName__', {
                  applicationName,
                })}
              </li>
              <li>
                {i18n('users that do not belong to any other organization')}
              </li>
            </ul>
          </Hint>
        </div>
        <p>
          {i18n(
            'If you are sure you want to delete this organization, type __word__ to confirm:',
            {
              word: (
                <code>
                  {model.get('name').toLowerCase() || i18n('unnamed')}
                </code>
              ),
            }
          )}
        </p>

        <input
          {...style('input')}
          autoFocus
          type="text"
          value={confirmationText}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>

    </Confirm>
  )
}

const styled = defaultStyle(() => ({
  input: {
    width: '100%',
  },
}))

export default compose(
  withState('confirmationText', 'setConfirmationText', ''),
  withState('isValid', 'setValidState', false),
  withHandlers({
    onDeleteOrganization: (props: PropsT) => () => {
      props.model.destroy()
      props.onRemove()
      props.onHide()
    },
  }),
  withHandlers({
    onKeyDown: ({ onDeleteOrganization, isValid }: PropsT) => ({ keyCode }) => {
      if (keyCode === 13 && isValid) {
        onDeleteOrganization()
      }
    },
    onChange: ({ setConfirmationText, model, setValidState }) => ({
      target,
    }) => {
      setConfirmationText(target.value)
      const isValid =
        target.value === (model.get('name') || i18n('unnamed')).toLowerCase()
      setValidState(isValid)
    },
  }),
  styled
)(RemoveModal)



// WEBPACK FOOTER //
// ./src/admin/views/organizations/RemoveModal.js
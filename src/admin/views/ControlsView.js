// @flow
import React from 'react'
import { compose, defaultProps, setDisplayName, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'
import DeleteButton from 'eff-admin/views/DeleteButtonView'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  deleteWarning?: string,
  enableDelete: boolean,
  model: any,
  onDelete?: (model: any) => void,
  onDiscard?: (model: any) => void,
  onSave: (model: any) => void,
}

const AuthControls = ({
  deleteWarning,
  enableDelete,
  model,
  onDelete,
  onDiscard,
  onSave,
  style,
}: PropsT) =>
  <div className="form-controls" {...style}>
    <IconButton icon="check" onClick={onSave} primary>
      {i18n('Save')}
    </IconButton>

    <IconButton icon="times" light onClick={onDiscard} style={style('discard')}>
      {i18n('Discard')}
    </IconButton>

    {enableDelete &&
      !model.isNew() &&
      <DeleteButton
        className="pull-right"
        message={deleteWarning}
        onDelete={onDelete}
      />}
  </div>

export default compose(
  setDisplayName('AuthControls'),
  defaultProps({ enableDelete: true }),
  withHandlers({
    onDelete: ({ model, onDelete }: PropsT) => () =>
      onDelete && onDelete(model),
    onDiscard: ({ model, onDiscard }: PropsT) => () =>
      onDiscard && onDiscard(model),
    onSave: ({ model, onSave }: PropsT) => () => onSave(model),
  }),
  defaultStyle(({ padding }) => ({
    discard: {
      marginLeft: padding.normal,
    },
  }))
)(AuthControls)



// WEBPACK FOOTER //
// ./src/admin/views/ControlsView.js
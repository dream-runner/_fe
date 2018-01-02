// @flow
import { compose, withHandlers, withState } from 'recompose'

import {
  connect,
  types,
  withUser,
  withUserPreferences,
} from '@signavio/effektif-api'

import { utils } from '@signavio/effektif-commons/lib/styles'

export default compose(
  withUserPreferences,
  withUser,
  connect(({ user }) => ({
    updatePreferences: {
      id: user.id,
      type: types.USER_PREFERENCE,
      method: 'update',
    },
  })),
  withState(
    'panel',
    'setPanel',
    ({ userPreferences }) =>
      window.matchMedia(`(max-width: ${utils.media.smMax}px)`).matches
        ? null
        : userPreferences.showCaseInfo
  ),
  withHandlers({
    onPanelChange: ({
      updatePreferences,
      userPreferences,
      setPanel,
      panel,
    }) => (item: string) => {
      // user clicked on the category that is actually active but hidden
      // because we're in a mobile environment
      if (!panel && item === userPreferences.showCaseInfo) {
        setPanel(item)

        return
      }

      const showCaseInfo = item === userPreferences.showCaseInfo ? null : item

      setPanel(showCaseInfo)

      updatePreferences({
        ...userPreferences,
        showCaseInfo,
      })
    },
  })
)



// WEBPACK FOOTER //
// ./packages/cases/src/components/higher-order/withPanelHandling.js
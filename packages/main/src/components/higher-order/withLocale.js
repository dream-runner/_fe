// @flow
import * as React from 'react'
import { compose, lifecycle, withHandlers, branch } from 'recompose'
import { withRouter } from 'react-router'
import i18n, {
  locale,
  setLocale,
  onChangeLocale,
  offChangeLocale,
} from 'signavio-i18n'

import {
  connect,
  types,
  fulfillRequestThen,
  withUser,
  withOrganization,
} from '@signavio/effektif-api'

import { omitProps } from '@signavio/effektif-commons/lib/components'

import Waiting from '../Waiting'

type HistoryT = {
  replace: (path: string) => void,
}

type ApiPropsT = {
  history: HistoryT,
  location: Location,
}

export default function withLocaleHOC(
  WrappedComponent: React.ComponentType<*>
) {
  const withLocale = ({ fetchPreferences, ...rest }) => {
    if (fetchPreferences && fetchPreferences.pending) {
      return <Waiting message={i18n('Loading user settings...')} />
    }

    return <WrappedComponent {...rest} />
  }

  return compose(
    withUser,
    withOrganization,
    withRouter,
    withHandlers({
      onLocaleUpdate: ({ history, location }: ApiPropsT) => () => {
        // in order to force a full re-render when the locale changes
        // we apply this ugly hack. Not pretty, but does the job.
        if (location.search) {
          history.replace(
            `${location.pathname}${location.search}#locale=${locale()}`
          )
        } else {
          history.replace(`${location.pathname}#locale=${locale()}`)
        }

        history.replace(location.pathname + location.search)
      },
    }),
    lifecycle({
      componentWillMount() {
        const { onLocaleUpdate } = this.props

        onChangeLocale(onLocaleUpdate)
      },

      componentWillUnmount() {
        const { onLocaleUpdate } = this.props

        offChangeLocale(onLocaleUpdate)
      },
    }),
    branch(
      ({ user }) => user,
      compose(
        connect(({ user, organization }) => ({
          fetchPreferences: {
            id: user.id,
            type: types.USER_PREFERENCE,
            refresh: organization.key,
          },
          updatePreferences: {
            id: user.id,
            type: types.USER_PREFERENCE,
            method: 'update',
          },
        })),
        fulfillRequestThen({
          fetchPreferences: ({ fetchPreferences, updatePreferences }) => {
            const preferences = fetchPreferences.value

            if (preferences.language) {
              if (locale() !== preferences.language) {
                // ensure language settings
                setLocale(preferences.language)
              }
            } else {
              // ensure user settings reflect language
              updatePreferences({ language: locale() })
            }
          },
        })
      )
    ),
    omitProps(['onLocaleUpdate'])
  )(withLocale)
}



// WEBPACK FOOTER //
// ./packages/main/src/components/higher-order/withLocale.js
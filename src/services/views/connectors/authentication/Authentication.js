// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { List, ContextHelp } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { LabeledField } from '../../../../../packages/fields'

import type { AuthenticationT } from '../../../types'

import Details from './Details'

type Props = {
  authentication: AuthenticationT,
  onChange: (authentication: AuthenticationT) => void,
}

function Authentication({ authentication, onChange, ...rest }: Props) {
  return (
    <List {...rest} style={rest.style('container')}>
      <LabeledField
        label={i18n('Authentication')}
        placeholder={i18n('None')}
        description={
          <ContextHelp
            chapter="integration/connectors"
            section="authentication"
          >
            {i18n(
              `A connector can use *None* or one of the following authentication mechanisms:

* HTTP Basic authentication
  * enter a username and password
* HTTP request header
  * enter a custom name and value
  * name and value can only contain a limited set of characters
* URL query parameter
  * enter a custom name and value
  * name and value will be URL encoded
            `,
              {
                markdown: true,
              }
            )}
          </ContextHelp>
        }
        type={getAuthenticationChoiceType()}
        value={authentication ? authentication.type : null}
        onChange={type => (type === null ? onChange(null) : onChange({ type }))}
      />

      {authentication &&
        <Details
          {...rest}
          {...rest.style('details')}
          onChange={onChange}
          authentication={authentication}
        />}
    </List>
  )
}

function getAuthenticationChoiceType() {
  return {
    name: 'choice',
    options: [
      {
        id: 'basic',
        name: i18n('HTTP Basic authentication'),
      },
      {
        id: 'header',
        name: i18n('HTTP request header'),
      },
      {
        id: 'parameter',
        name: i18n('URL query parameter'),
      },
    ],
  }
}

const styled = defaultStyle(theme => ({
  container: {
    marginBottom: 1,
  },
  details: {
    marginTop: 1,
  },
}))

export default styled(Authentication)



// WEBPACK FOOTER //
// ./src/services/views/connectors/authentication/Authentication.js
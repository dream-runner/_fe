import React, { Children } from 'react'
import i18n from 'i18n'

import { Disable, Popover } from 'commons-components'
import { Hint } from 'commons-components/hints'

export default function CheckConfiguration({
  isMisconfigured,
  service,
  asTooltip,
  children,
}) {
  let warning = (
    <Hint warning>
      {i18n(
        'This activity cannot be executed, because __service__ is not configured properly. Please, contact your system administrator.',
        {
          service,
        }
      )}
    </Hint>
  )

  if (isMisconfigured) {
    if (asTooltip) {
      return (
        <Popover popover={warning}>
          <div>
            <Disable>
              {children}
            </Disable>
          </div>
        </Popover>
      )
    }

    return (
      <div>
        {warning}

        <Disable>
          {children}
        </Disable>
      </div>
    )
  }

  return Children.only(children)
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/CheckConfiguration.js
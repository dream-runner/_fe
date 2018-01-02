// @flow
import React from 'react'
import { compose } from 'recompose'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'

function MainContainer({ children, panel, toolbar, style }) {
  return (
    <div {...style}>
      <div {...style('content')}>{children}</div>

      {panel && (
        <div {...style('panelContainer')}>
          <div {...style('toolbarContainer')}>
            <div {...style('toolbar')}>{toolbar}</div>
          </div>

          <div {...style('panel')}>{panel}</div>
        </div>
      )}
    </div>
  )
}

const styled = defaultStyle(
  ({ font, lineHeight, padding, color }) => {
    const headerHeight = utils.calculateHeight(
      font.size.normal,
      lineHeight,
      padding.normal
    )

    const smTopPadding = headerHeight + padding.large

    return {
      content: {
        position: 'fixed',

        top: headerHeight,
        left: 0,

        height: `calc(100vh - ${headerHeight}px)`,
        width: '100%',

        overflowY: 'auto',

        // in order for the done button to not
        // stick to the bottom border of the page
        paddingBottom: 200,

        ...utils.transition(['width', 'filter']),
      },

      panelContainer: {
        position: 'fixed',

        top: headerHeight,
        right: 0,

        height: `calc(100vh - ${headerHeight}px)`,

        width: '0%',
        overflowY: 'auto',

        ...utils.transition('width'),

        ...utils.media.sm({
          ...utils.transition('height'),

          bottom: 0,
          left: 0,

          right: 'initial',
          top: 'initial',
        }),
      },

      toolbarContainer: {
        position: 'fixed',

        right: padding.normal,

        top: headerHeight + padding.large,

        ...utils.transition('right'),

        ...utils.media.sm({
          right: 0,
          top: 'auto',
          bottom: 0,

          backgroundColor: color.mono.ultralight,

          width: '100%',

          paddingTop: padding.normal,
          paddingLeft: padding.normal,
          paddingRight: padding.normal,
          paddingBottom: padding.normal,

          transition: 'initial',

          ...utils.borderTop(1, 'solid', color.mono.light),
        }),
      },

      toolbar: {
        ...utils.media.sm({
          display: 'inline-block',

          marginLeft: '50%',

          transform: 'translate(-50%, 0)',
        }),
      },

      '&withPanel': {
        content: {
          width: '70%',

          ...utils.media.md(
            {
              width: '60%',
            },
            { strict: true }
          ),

          ...utils.media.sm({
            width: 'auto',

            filter: 'blur(5px)',
          }),
        },

        panelContainer: {
          width: '30%',

          ...utils.borderLeft(1, 'solid', color.mono.light),

          ...utils.media.sm({
            width: '100%',
            height: `calc(90vh - ${smTopPadding}px)`,

            backgroundColor: 'white',
            bosmhadow: '0 0 40px rgba(0 ,0, 0, 0.2)',

            paddingTop: 0,

            ...utils.borderTop(1, 'solid', color.mono.light),
            ...utils.borderLeft(0),
          }),

          ...utils.media.md(
            {
              width: '40%',
            },
            { strict: true }
          ),
        },

        toolbarContainer: {
          position: 'absolute',

          top: padding.large,
          left: padding.normal,
          right: null,

          transform: null,

          ...utils.media.md(
            {
              right: '40%',
            },
            {
              strict: true,
            }
          ),

          ...utils.media.sm({
            position: 'fixed',

            top: `calc(10% + ${smTopPadding / 2}px)`,
            right: '50%',
            bottom: 'auto',
            left: 'auto',

            transform: 'translate(50%, 0)',

            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingTop: padding.normal,

            width: 'auto',
            backgroundColor: 'transparent',

            zIndex: 1,

            ...utils.borderTop(0),
          }),
        },

        toolbar: {
          ...utils.media.sm({
            marginLeft: 'auto',

            transform: 'initial',
          }),
        },

        panel: {
          paddingLeft: padding.normal,
          paddingRight: padding.normal,
          paddingBottom: padding.normal,
          paddingTop: 2 * padding.large + padding.normal,

          ...utils.media.sm({
            position: 'relative',

            zIndex: 0,

            paddingTop: padding.large,
          }),
        },
      },
    }
  },
  ({ showPanel }) => ({
    '&withPanel': showPanel,
  })
)

export default styled(MainContainer)



// WEBPACK FOOTER //
// ./packages/cases/src/components/MainContainer.js
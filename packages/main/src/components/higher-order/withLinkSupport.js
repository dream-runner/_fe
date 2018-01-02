// @flow
import { withHandlers, lifecycle, compose } from 'recompose'
import { withRouter } from 'react-router'
import { omitProps } from '@signavio/effektif-commons/lib/components'

const findAnchorElement = (target: EventTarget): ?HTMLAnchorElement => {
  let currentTarget = target

  while (currentTarget !== null && currentTarget.nodeName !== 'A') {
    if (currentTarget) {
      currentTarget = currentTarget.parentNode
    }
  }

  return currentTarget
}

export default compose(
  withRouter,
  withHandlers({
    onExternalClick: () => (
      event: Event,
      anchorElement: ?HTMLAnchorElement
    ) => {
      if (!anchorElement) {
        return false
      }

      window.open(anchorElement.href)
      event.preventDefault()

      return true
    },
    onInternalClick: ({ history }) => (
      event: Event,
      anchorElement: ?HTMLAnchorElement
    ) => {
      if (!anchorElement) {
        return false
      }

      const href = anchorElement.href.replace(window.location.origin, '')

      // intercept and do nothing if href is undefined or `#`
      if (!href || href === '#') {
        event.preventDefault()
        return false
      }

      const absoluteUrlRegex = new RegExp('^(?:[a-z]+:)?//', 'i')

      // handle CTRL while clicking the link
      if (absoluteUrlRegex.test(href) || event.metaKey || event.ctrlKey) {
        window.open(href)

        event.preventDefault()
        return true
      }

      // do not intercept mailto:, and anchor URLs
      if (href.indexOf('mailto:') === 0 || href.indexOf('#') === 0) {
        return false
      }

      // intercept and navigate router
      event.preventDefault()
      history.push(href)

      return true
    },
  }),
  withHandlers({
    onDocumentClick: ({ onInternalClick, onExternalClick }) => (
      event: Event
    ) => {
      const anchorElement = findAnchorElement(event.target)

      if (anchorElement && anchorElement.rel === 'ignore') {
        return false
      }

      if (anchorElement && anchorElement.rel === 'external') {
        return onExternalClick(event, anchorElement)
      }

      return onInternalClick(event, anchorElement)
    },
  }),
  lifecycle({
    componentWillMount() {
      const { onDocumentClick } = this.props

      // check for ci
      if (window.location.href.indexOf('ci.effektif.com') !== -1) {
        if (document.body) {
          document.body.className += 'ci'
        }
      }

      document.addEventListener('click', onDocumentClick)
    },

    componentWillUnmount() {
      const { onDocumentClick } = this.props

      document.removeEventListener('click', onDocumentClick)
    },
  }),
  omitProps([
    'match',
    'location',
    'history',
    'staticContext',
    'onExternalClick',
    'onInternalClick',
    'onDocumentClick',
  ])
)



// WEBPACK FOOTER //
// ./packages/main/src/components/higher-order/withLinkSupport.js
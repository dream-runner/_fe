import React, { Component } from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'

import { User, Organization } from '@signavio/effektif-commons/lib/propTypes'

import ContextProvider from './ContextProvider'
import Waiting from './Waiting'

export default class Loading extends Component {
  static propTypes = {
    progress: PropTypes.number,

    user: User,
    organization: Organization,
  }

  componentDidMount() {
    NProgress.configure({
      showSpinner: false,
    })

    NProgress.start()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      NProgress.set(this.props.progress / 100)
    }
  }

  componentWillUnmount() {
    NProgress.done()
  }

  render() {
    return (
      <ContextProvider>
        <Waiting message={this.props.message || this.props.children} />
      </ContextProvider>
    )
  }
}



// WEBPACK FOOTER //
// ./packages/main/src/components/Loading.js
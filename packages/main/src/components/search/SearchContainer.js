// @flow
import React from 'react'
import { lifecycle, withState, withHandlers, compose } from 'recompose'

import { Container } from '@signavio/effektif-commons/lib/components'
import { prependOrg, getBaseUrl } from '@signavio/effektif-api'
import { withToken } from '@signavio/workflow-organizations'

import { ResultsT } from '../../types'

import Search from './Search'

type PropsT = {
  loading: boolean,
  results: ResultsT,
  history: Object,
}

const SearchContainer = ({ match, loading, results, onSearch }: PropsT) => (
  <Container>
    <Search
      loading={loading}
      results={results}
      query={match.params.query}
      onSubmit={onSearch}
    />
  </Container>
)

export default compose(
  withState('results', 'setResults'),
  withState('loading', 'setLoading'),
  withToken,
  withHandlers({
    onSearch: ({ setLoading, setResults, history, token }) => query => {
      history.push(prependOrg(`/search/${query}`))

      const url = `${getBaseUrl()}search?searchText=${query}`
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }

      setLoading(true)
      setResults(undefined)

      fetch(url, options)
        .then(res => res.json())
        .then(json => {
          setLoading(false)
          setResults(json)
        })
    },
  }),
  lifecycle({
    componentDidMount() {
      const { match } = this.props
      this.props.onSearch(match.params.query)
    },
  })
)(SearchContainer)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/SearchContainer.js
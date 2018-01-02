// @flow
import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'
import { trim, values } from 'lodash'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { PrimaryHeader } from '@signavio/effektif-commons/lib/components/headers'

import type { ResultsT } from '../../types'

import SearchResults from './SearchResults'

type PropsT = {
  query: string,
  loading: boolean,
  results: ResultsT,
  onKeyDown: (value: string) => void,
  onChange: (value: string) => void,
}

function Search({ loading, results, query, onKeyDown, onChange }: PropsT) {
  const hasResults = totalLength(results) > 0

  return (
    <div className="view search">
      <div className="view-header">
        <PrimaryHeader
          autoFocus
          noBlurOnEnter
          value={query}
          placeholder={i18n('Type to search...')}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>

      <Hint inline>
        {i18n('Press __key__ to search.', {
          key: (
            <kbd key="0" title={i18n('Enter')}>
              &crarr;
            </kbd>
          ),
        })}
      </Hint>

      <div className="view-content">
        {loading && (
          <Hint loading>
            {i18n('Searching for *__query__*...', {
              markdown: true,
              query,
            })}
          </Hint>
        )}

        {!loading && !hasResults && <Hint>{i18n('No results found')}</Hint>}

        {hasResults && <SearchResults results={results} />}
      </div>
    </div>
  )
}

const totalLength = (results: ResultsT = {}) =>
  values(results)
    .map(val => val.length)
    .reduce((acc, cur) => acc + cur, 0)

export default compose(
  withState('query', 'setQuery', ({ query }) => query || ''),
  withHandlers({
    onChange: ({ setQuery }) => ({ target }: SyntheticInputEvent) =>
      setQuery(target.value),
    onKeyDown: ({ onSubmit }) => ({
      keyCode,
      target,
    }: SyntheticInputEvent & SyntheticKeyboardEvent) => {
      const value = trim(target.value)

      if (keyCode === 13 && value !== '') {
        onSubmit(value)
      }
    },
  })
)(Search)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/Search.js
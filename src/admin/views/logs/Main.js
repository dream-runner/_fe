import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'

import Router from 'singleton/Router'

import {
  NewInfiniteScroll as InfiniteScroll,
  AsAccordion,
  PaginatedCollection,
} from 'commons-components'
import { Hint } from 'commons-components/hints'

import LogQuery from '../../models/params/LogQuery'

import LogGroup from './Group'
import LogOptions from './Options'

const getUrl = activeItem =>
  activeItem
    ? Router.reverse('admin_logs', {
        id: activeItem.id,
      })
    : Router.reverse('admin_logs')

const pageSize = 25

function Logs(props) {
  const {
    activeItem,
    query,
    collection,
    offset,
    page,
    onToggle,
    onNext,
    onReset,
  } = props

  const isEmpty = collection.length === 0
  const isLoaded = collection.meta('size') === collection.length

  return (
    <div className="row">
      <div className="col-md-3">
        <LogOptions
          model={query}
          onChange={() => {
            if (
              Router.currentPage().indexOf(Router.reverse('admin_logs')) === -1
            ) {
              // when navigating away from the logs the fields are saved which
              // would result in another redirect. fucked up
              return
            }

            Router.navigate(getUrl(activeItem), {
              search: `?${query.toString()}`,
            })

            onReset()
          }}
        />
      </div>
      <div className="col-md-9">
        <InfiniteScroll
          isLoaded={isLoaded}
          isLoading={collection.isSyncing}
          loadingMessage={i18n('Loading log entries...')}
          onPageEnd={() => onNext(query.print())}
        >
          {collection.map(entry => (
            <LogGroup
              key={entry.id}
              expanded={entry === activeItem}
              onSelect={onToggle}
              model={entry}
            />
          ))}

          {isLoaded && isEmpty && <Hint>{i18n('No logs found')}</Hint>}
        </InfiniteScroll>
      </div>
    </div>
  )
}

Logs.propTypes = {
  query: PropTypes.instanceOf(LogQuery).isRequired,
}

export default AsAccordion(PaginatedCollection({ pageSize })(Logs))



// WEBPACK FOOTER //
// ./src/admin/views/logs/Main.js
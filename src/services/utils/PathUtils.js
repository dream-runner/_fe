import _ from 'underscore'
import { HttpUtils, FileUtils } from 'commons-utils'
import $ from 'jquery'

const getRepresentation = (parent, children) => {
  let { id, title, mimeType } = parent

  return {
    [id]: {
      ...parent,
      isLeaf: !FileUtils.isFolder(parent.mimeType),
      children: children.map(({ object }) => ({
        ...object,
        isLeaf: !FileUtils.isFolder(object.mimeType),
      })),
    },
  }
}

const fetchReferences = (account, params) => {
  return $.ajax({
    type: 'GET',
    url: account.url() + '/references/?' + HttpUtils.queryString(params),
    contentType: 'application/json',
  })
}

const load = (account, references, types, data = {}) => {
  if (!references || references.length === 0) {
    return data
  }

  let { object } = references.shift()

  return fetchReferences(account, {
    q: types,
    parent: object.id,
  }).then(children => {
    return load(account, references, types, {
      ...data,

      ...getRepresentation(object, children),
    })
  })
}

export function fetchChild(account, child, types) {
  return fetchReferences(account, {
    q: types,
    parent: child.id,
  }).then(references => {
    return getRepresentation(child, references)
  })
}

export function hierarchy(account, entry) {
  return fetchReferences(account, {
    pathTo: entry || 'root',
  }).then(references => {
    let path = references.map(({ object }) => object.id)

    return { path, references }
  })
}

export function prefetch(account, references = [], types) {
  return load(account, [...references], types)
}



// WEBPACK FOOTER //
// ./src/services/utils/PathUtils.js
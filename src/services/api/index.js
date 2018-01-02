import $ from 'jquery'

import { LoginUtils } from 'commons-utils'

export function getConnectors(organization) {
  return new Promise((resolve, reject) => {
    $.get(LoginUtils.makeUrl('connectors', organization))
      .then(connectors => {
        resolve(connectors)
      })
      .fail(error => {
        reject(error)
      })
  })
}

export function createConnector(url, organization) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: LoginUtils.makeUrl('connectors', organization),
      method: 'post',
      data: JSON.stringify({
        url,
      }),
    })
      .then(connector => resolve(connector))
      .fail(error => reject(error))
  })
}

export function removeConnector(connector, organization) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: LoginUtils.makeUrl(`connectors/${connector.id}`, organization),
      method: 'delete',
    })
      .then(() => resolve())
      .fail(error => reject(error))
  })
}

export function saveConnector(connector, organization) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: LoginUtils.makeUrl(`connectors/${connector.id}`, organization),
      method: 'put',
      data: JSON.stringify(connector),
    })
      .then(() => resolve())
      .fail(error => reject(error))
  })
}

export function reloadConnector(connector, organization) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: LoginUtils.makeUrl(
        `connectors/${connector.id}/actions/reload`,
        organization
      ),
      method: 'post',
    })
      .then(changes => resolve(changes))
      .fail(error => reject(error))
  })
}



// WEBPACK FOOTER //
// ./src/services/api/index.js
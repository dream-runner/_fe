// @flow

import i18n from 'signavio-i18n'
import { moment } from '@signavio/effektif-commons/lib/extensions'
import { filter, reduce, sortBy } from 'lodash'

import Effektif from '../../singleton/Effektif'

import type { LicenseT } from '../types'

const DEFAULT_PRIORITY = 100

export function getTitle(type: string): string {
  const license = Effektif.config().getLicenseType(type)

  if (license) {
    return license.get('name')
  }

  return ''
}

export function defaultPriority(): number {
  return DEFAULT_PRIORITY
}

export function getPriority(type: string): number {
  const license = Effektif.config().getLicenseType(type)

  if (license && license.get('priority')) {
    return license.get('priority')
  }

  // default priority
  return DEFAULT_PRIORITY
}

export function getCompositeId(licenseInfo: LicenseT): string {
  let id = ''
  if (licenseInfo.isGenerator) {
    id += '+'
  }
  id += licenseInfo.type
  if (licenseInfo.packages) {
    id += ';' + licenseInfo.packages.join('+')
  }
  if (licenseInfo.expirationDate) {
    // it is important to use the date in UTC, otherwise the right license cannot be found in some timezones
    id += ';' + moment(licenseInfo.expirationDate).utc().format('DD-MM-YYYY')
  }
  return id
}

export function parseCompositeId(compositeId: string): LicenseT {
  // the null values are important when the license info object is used in a React state
  let info = {
    packages: null,
    expirationDate: null,
    isGenerator: null,
  }

  if (compositeId.indexOf('+') == 0) {
    compositeId = compositeId.substr(1)
    info.isGenerator = true
  }

  let parts = compositeId.split(';')
  info.type = parts[0]

  if (parts.length == 2) {
    // first check whether the second part is a date
    let date = moment.utc(parts[1], 'DD-MM-YYYY')
    if (date.isValid()) {
      info.expirationDate = date.toDate()
    } else {
      // otherwise it's a list of packages
      info.packages = parts[1].split('+')
    }
  } else if (parts.length == 3) {
    info.packages = parts[1].split('+')
    let date = moment.utc(parts[2], 'DD-MM-YYYY')

    if (date.isValid()) {
      info.expirationDate = date.toDate()
    }
  }
  return info
}

export function licenseInfoMatches(
  infoOne: LicenseT,
  infoTwo: LicenseT
): boolean {
  if (infoOne && infoTwo) {
    return this.getCompositeId(infoOne) === this.getCompositeId(infoTwo)
  }

  return false
}

export function filterUnusedInfos(
  licenseInfos: Array<LicenseT>
): Array<LicenseT> {
  return filter(licenseInfos, info => {
    if (info.expirationDate && moment(info.expirationDate).isBefore(moment())) {
      return false
    }

    return !!info.invitationAllowed && (!!info.unused || !!info.isGenerator)
  })
}

export function getUnusedLicenses(licenses: Array<LicenseT>): Array<LicenseT> {
  return filterUnusedInfos(licenses)
}

export function getUnusedCount(licenseInfos: Array<LicenseT>, type: string) {
  return reduce(
    licenseInfos,
    (result, license) => {
      if (license.type === type && Number.isFinite(result)) {
        if (license.isGenerator) {
          return Number.POSITIVE_INFINITY
        }

        const number = license.unused || 0
        return result + number
      }
      return result
    },
    0
  )
}

export function getLicenseForUser(licenses: Array<LicenseT>, user) {
  if (!user) {
    return null
  }

  var userLicenses = filter(licenses, ({ userId }) => userId === user.id)

  if (userLicenses.length === 0) {
    return null
  }

  if (userLicenses.length === 1) {
    return userLicenses[0]
  }

  userLicenses = sortBy(userLicenses, l => {
    var prio = getPriority(l.type)

    return -1 * (defaultPriority() - prio)
  })

  var max = getPriority(userLicenses[0].type)

  userLicenses = filter(userLicenses, l => {
    return max === getPriority(l.type)
  })

  userLicenses = sortBy(userLicenses, l => {
    var exp
    if (l.expirationDate) {
      exp = moment(l.expirationDate).valueOf()
    } else {
      exp = Number.MAX_VALUE || 0
    }
    return -1 * exp
  })

  return userLicenses[0]
}

export function expiresSoon(license: LicenseT) {
  if (license.expirationDate) {
    return moment().add(2, 'months').isAfter(license.expirationDate)
  }

  return false
}



// WEBPACK FOOTER //
// ./src/organizations/utils/LicenseUtil.js
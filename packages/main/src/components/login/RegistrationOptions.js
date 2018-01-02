// @flow
import { sortBy } from 'lodash'

import i18n, { locale } from 'signavio-i18n'

type OptionT = {
  id: string,
  value: string,
}

function sortAndAddOther(options: Array<OptionT>): Array<OptionT> {
  return [...sortBy(options, ({ value }) => value.toLowerCase()), other()]
}

const other = (): OptionT => ({
  id: 'Other',
  value: i18n('Other'),
})

export function businessCategories(): Array<OptionT> {
  return sortAndAddOther([
    {
      id: 'Academic Institutions',
      value: i18n('Academic Institutions'),
    },
    {
      id: 'Banking',
      value: i18n('Banking'),
    },
    {
      id: 'Government',
      value: i18n('Government'),
    },
    {
      id: 'Health Care',
      value: i18n('Health Care'),
    },
    {
      id: 'Insurance',
      value: i18n('Insurance'),
    },
    {
      id: 'Life Sciences',
      value: i18n('Life Sciences'),
    },
    {
      id: 'Logistics',
      value: i18n('Logistics'),
    },
    {
      id: 'Manufacturing',
      value: i18n('Manufacturing'),
    },
    {
      id: 'Oil & Gas',
      value: i18n('Oil & Gas'),
    },
    {
      id: 'Retail',
      value: i18n('Retail'),
    },
    {
      id: 'Software & Internet',
      value: i18n('Software & Internet'),
    },
    {
      id: 'Telecommunications',
      value: i18n('Telecommunications'),
    },
    {
      id: 'Transportation',
      value: i18n('Transportation'),
    },
    {
      id: 'Utilities',
      value: i18n('Utilities'),
    },
  ])
}

export function salutations(): Array<OptionT> {
  const options = [
    {
      id: 'Mr.',
      value: i18n('Mr.'),
    },
    {
      id: 'Mrs.',
      value: i18n('Mrs.'),
    },
  ]
  if (locale().startsWith('en')) {
    // for english we offer the third option as well
    options.push({
      id: 'Ms.',
      value: i18n('Ms.'),
    })
  }
  return options
}

export function numberOfEmployees(): Array<OptionT> {
  return [
    {
      id: '1-50',
      value: i18n('1-50'),
    },
    {
      id: '51-200',
      value: i18n('51-200'),
    },
    {
      id: '201-500',
      value: i18n('201-500'),
    },
    {
      id: '501-1000',
      value: i18n('501-1000'),
    },
    {
      id: '1001-2500',
      value: i18n('1001-2500'),
    },
    {
      id: '2501-10000',
      value: i18n('2501-10000'),
    },
    {
      id: '10000+',
      value: i18n('10000+'),
    },
  ]
}

export function departments(): Array<OptionT> {
  return sortAndAddOther([
    {
      id: 'Accounting',
      value: i18n('Accounting'),
    },
    {
      id: 'Compliance',
      value: i18n('Compliance'),
    },
    {
      id: 'IT',
      value: i18n('IT'),
    },
    {
      id: 'Management',
      value: i18n('Management'),
    },
    {
      id: 'Marketing',
      value: i18n('Marketing'),
    },
    {
      id: 'Operations',
      value: i18n('Operations'),
    },
    {
      id: 'Process Improvement',
      value: i18n('Process Improvement'),
    },
    {
      id: 'Project/Product Management',
      value: i18n('Project / Product Management'),
    },
    {
      id: 'Supply Chain',
      value: i18n('Supply Chain'),
    },
  ])
}

export function seniorityLevels(): Array<OptionT> {
  return [
    {
      id: 'CXO',
      value: i18n('CXO'),
    },
    {
      id: 'Partner',
      value: i18n('Partner'),
    },
    {
      id: 'Owner',
      value: i18n('Owner'),
    },
    {
      id: 'VP',
      value: i18n('VP'),
    },
    {
      id: 'Director',
      value: i18n('Director'),
    },
    {
      id: 'Manager',
      value: i18n('Manager'),
    },
    {
      id: 'Senior',
      value: i18n('Senior'),
    },
    {
      id: 'Entry',
      value: i18n('Entry'),
    },
    {
      id: 'Student',
      value: i18n('Student'),
    },
  ]
}



// WEBPACK FOOTER //
// ./packages/main/src/components/login/RegistrationOptions.js
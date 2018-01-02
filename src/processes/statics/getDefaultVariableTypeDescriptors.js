import i18n from 'i18n'
import _ from 'underscore'

import User from 'users/models/User'
import Group from 'users/models/Group'
import File from 'container/models/File'
import Mail from 'container/models/Mail'

import baseConfigs, { isBoundToNestedField } from './baseConfigs'

export default function getDefaultVariableTypeDescriptors() {
  /**
     * Static properties for variable type models
     *
     * README: Whenever adding, editing or removing a variable type
     * from this file, please don't forget to make the same changes on:
     *      packages/fields/src/dataTypes/getDefaultVariableTypeDescriptors.js
     * For now, it's necessary to have both files duplicated until we get rid of backbone.
     */
  return [
    {
      key: 'text',
      name: i18n('Text'),
      namePlural: i18n('Texts'),
      icon: 'icon-align-left',
      isPrimitive: true,
      isInPalette: true,
      configs: {
        ...baseConfigs(),

        multiLine: {
          target: 'type',
          label: i18n('Multi-line'),
          type: { name: 'boolean' },
          disabled: isBoundToNestedField,
          position: 5,
        },
      },
    },

    {
      key: 'boolean',
      name: i18n('Yes/No Checkbox'),
      icon: 'icon-square-check',
      isPrimitive: true,
      isInPalette: true,
      noListSupport: true,
      configs: baseConfigs(),
    },

    {
      key: 'choice',
      name: i18n('Choice'),
      namePlural: i18n('Choices'),
      icon: 'icon-layers',
      isPrimitive: true,
      isInPalette: true,
      configs: {
        ...baseConfigs(),

        options: {
          target: 'type',
          label: i18n('Options'),
          type: {
            name: 'list',
            unique: true,
            elementType: {
              name: 'text',
            },
          },
          transform: {
            toEdit: value =>
              value &&
              value.map(item => {
                return item && (item.name || item.id)
              }),
            fromEdit: value =>
              value &&
              value.map(item => {
                return { id: item, name: item }
              }),
          },
          disabled: isBoundToNestedField,
          position: 5,
        },
      },
    },
    {
      key: 'dynamicChoice',
      name: i18n('Choice'),
      namePlural: i18n('Choices'),
      icon: 'icon-layers',
      isPrimitive: true,
      isInPalette: false,
    },

    {
      key: 'fileId',
      name: i18n('File'),
      namePlural: i18n('Files'),
      icon: 'icon-file',
      isInPalette: true,
      referenceModel: File,
      fields: [
        {
          key: 'id',
          type: { name: 'oid' },
          name: i18n('ID'),
        },
        {
          key: 'name',
          type: { name: 'text' },
          name: i18n('File name'),
        },
        {
          key: 'contentType',
          type: { name: 'text' },
          name: i18n('Content type'),
        },
        {
          key: 'ownerId',
          type: { name: 'userId' },
          name: i18n('Owner'),
        },
      ],
      configs: baseConfigs(),
    },

    {
      key: 'link',
      name: i18n('Link'),
      namePlural: i18n('Links'),
      icon: 'icon-ribbon',
      isPrimitive: true,
      isInPalette: true,
      configs: baseConfigs(),
    },

    {
      key: 'emailAddress',
      name: i18n('Email address'),
      namePlural: i18n('Email addresses'),
      icon: 'icon-at',
      isPrimitive: true,
      isInPalette: true,
      configs: baseConfigs(),
    },

    {
      key: 'date',
      name: i18n('Date/Time'),
      icon: 'icon-calendar',
      isPrimitive: true,
      isInPalette: true,
      kind: 'datetime', // default for date field
      configs: {
        ...baseConfigs(),

        kind: {
          target: 'type',
          label: i18n('Date/time'),
          type: {
            name: 'choice',
            notNull: true,
            options: [
              { id: 'date', name: i18n('date only') },
              { id: 'datetime', name: i18n('date and time') },
              { id: 'time', name: i18n('time only') },
            ],
          },
          disabled: isBoundToNestedField,
          position: -1,
        },
      },
    },

    {
      key: 'duration',
      name: i18n('Duration'),
      icon: 'icon-clock',
      isPrimitive: true,
      isInPalette: true,
    },

    {
      key: 'userId',
      name: i18n('User'),
      namePlural: i18n('Users'),
      icon: 'icon-user',
      isInPalette: true,
      referenceModel: User,
      fields: [
        {
          key: 'id',
          type: { name: 'oid' },
          name: i18n('ID'),
        },
        {
          key: 'emailAddress',
          type: { name: 'emailAddress' },
          name: i18n('Email address'),
        },
        {
          key: 'firstName',
          type: { name: 'text' },
          name: i18n('First name'),
        },
        {
          key: 'lastName',
          type: { name: 'text' },
          name: i18n('Last name'),
        },
      ],
      configs: {
        ...baseConfigs(),

        candidates: {
          target: 'type',
          label: i18n('Candidates'),
          hasWidget: true,
          disabled: isBoundToNestedField,
          position: 5,
        },
      },
    },

    {
      key: 'groupId',
      name: i18n('Group'),
      icon: 'icon-group',
      referenceModel: Group,
    },

    {
      key: 'number',
      name: i18n('Number'),
      namePlural: i18n('Numbers'),
      icon: 'icon-calculator',
      isPrimitive: true,
      isInPalette: true,
      configs: baseConfigs(),
    },

    {
      key: 'money',
      name: i18n('Money'),
      icon: 'icon-money',
      isInPalette: true,
      isMutable: true,
      fields: [
        {
          key: 'amount',
          type: { name: 'number' },
          name: i18n('Amount'),
        },
        {
          key: 'currency',
          type: {
            name: 'choice',
            options: [
              'EUR',
              'USD',
              'JPY',
              'BGN',
              'CZK',
              'DKK',
              'GBP',
              'HUF',
              'LTL',
              'PLN',
              'RON',
              'SEK',
              'CHF',
              'NOK',
              'HRK',
              'RUB',
              'TRY',
              'AUD',
              'BRL',
              'CAD',
              'CNY',
              'HKD',
              'IDR',
              'ILS',
              'INR',
              'KRW',
              'MXN',
              'MYR',
              'NZD',
              'PHP',
              'SGD',
              'THB',
              'ZAR',
            ],
          },
          name: i18n('Currency'),
        },
      ],
      configs: baseConfigs(),
    },

    {
      key: 'oid',
      name: i18n('Object ID'),
      icon: 'icon-id',
      isPrimitive: true,
      configs: baseConfigs(),
    },

    {
      key: 'list',
      icon: 'icon-layers',
    },

    {
      key: 'serviceSelect',
      name: i18n('Choice'),
      icon: 'icon-layers',
      isPrimitive: true,
    },

    //
    // Types that do not have a form field representation
    //

    {
      key: 'emailId',
      name: i18n('Email'),
      namePlural: i18n('Emails'),
      icon: 'icon-envelope',
      referenceModel: Mail,
      fields: [
        {
          key: 'id',
          type: { name: 'oid' },
          name: i18n('ID'),
        },
        {
          key: 'from',
          type: { name: 'list', elementType: { name: 'emailAddress' } },
          name: i18n('From'),
        },
        {
          key: 'fromName',
          type: { name: 'text' },
          name: i18n('From name'),
        },
        {
          key: 'to',
          type: { name: 'list', elementType: { name: 'emailAddress' } },
          name: i18n('To'),
        },
        {
          key: 'cc',
          type: { name: 'list', elementType: { name: 'emailAddress' } },
          name: i18n('CC'),
        },
        {
          key: 'replyTo',
          type: { name: 'list', elementType: { name: 'emailAddress' } },
          name: i18n('Reply to'),
        },
        {
          key: 'subject',
          type: { name: 'text' },
          name: i18n('Subject'),
        },
        {
          key: 'bodyText',
          type: { name: 'text', multiLine: true },
          name: i18n('Body text'),
        },
        {
          key: 'bodyHtml',
          type: { name: 'text', multiLine: true },
          name: i18n('Body HTML'),
        },
        {
          key: 'attachmentIds',
          type: { name: 'list', elementType: { name: 'fileId' } },
          name: i18n('Attachments'),
        },
      ],
    },

    {
      key: 'caseId',
      name: i18n('Case'),
      namePlural: i18n('Cases'),
      icon: 'icon-close-case',
      // referenceModel : Case,
      fields: [
        {
          key: 'id',
          type: { name: 'oid' },
          name: i18n('ID'),
        },
        {
          key: 'name',
          type: { name: 'text' },
          name: i18n('Name'),
        },
        {
          key: 'caseNumber',
          type: { name: 'number' },
          name: i18n('Number'),
        },
        {
          key: 'creatorId',
          type: { name: 'userId' },
          name: i18n('Creator'),
        },
        {
          key: 'createTime',
          type: { name: 'date', kind: 'datetime' },
          name: i18n('Start date'),
        },
        {
          key: 'closeTime',
          type: { name: 'date', kind: 'datetime' },
          name: i18n('End date'),
        },
        {
          key: 'duration',
          type: { name: 'duration' },
          name: i18n('Cycle time'),
        },
        {
          key: 'dueDate',
          type: { name: 'date', kind: 'datetime' },
          name: i18n('Due date'),
        },
        {
          key: 'link',
          type: { name: 'link' },
          name: i18n('Link'),
        },
        {
          key: 'comments',
          type: {
            name: 'list',
            elementType: {
              name: 'text',
              multiLine: true,
            },
          },
          name: i18n('Comments'),
        },
        {
          key: 'priority',
          type: {
            name: 'choice',
            options: [
              { id: '0', name: i18n('High') },
              { id: '1', name: i18n('Medium') },
              { id: '2', name: i18n('Normal') },
              { id: '3', name: i18n('Low') },
            ],
          },
          name: i18n('Priority'),
        },
        {
          key: 'milestone',
          type: { name: 'text' },
          name: i18n('Milestone'),
        },
      ],
    },
  ]
}



// WEBPACK FOOTER //
// ./src/processes/statics/getDefaultVariableTypeDescriptors.js
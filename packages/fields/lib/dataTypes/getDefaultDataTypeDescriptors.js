'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getDefaultVariableTypeDescriptors;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _baseConfigs = require('./baseConfigs');

var _baseConfigs2 = _interopRequireDefault(_baseConfigs);

var _CandidatesEdit = require('../components/CandidatesEdit');

var _CandidatesEdit2 = _interopRequireDefault(_CandidatesEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefaultVariableTypeDescriptors() {
  /**
   * Static properties for variable type models
   *
   * README: Whenever adding, editing or removing a variable type
   * from this file, please don't forget to make the same changes on:
   *      src/processes/statics/getDefaultVariableTypeDescriptors.js
   * For now, it's necessary to have both files duplicated until we get rid of backbone.
   */
  return [{
    key: 'text',
    name: (0, _signavioI18n2.default)('Text'),
    namePlural: (0, _signavioI18n2.default)('Texts'),
    icon: 'align-left',
    isPrimitive: true,
    isInPalette: true,
    configs: (0, _extends3.default)({}, (0, _baseConfigs2.default)(), {

      multiLine: {
        target: 'type',
        label: (0, _signavioI18n2.default)('Multi-line'),
        type: { name: 'boolean' },
        disabled: _baseConfigs.isBoundToNestedField,
        regularBoolean: true,
        position: 5
      }
    })
  }, {
    key: 'boolean',
    name: (0, _signavioI18n2.default)('Yes/No Checkbox'),
    icon: 'square-check',
    isPrimitive: true,
    isInPalette: true,
    noListSupport: true,
    configs: (0, _baseConfigs2.default)()
  }, {
    key: 'choice',
    name: (0, _signavioI18n2.default)('Choice'),
    namePlural: (0, _signavioI18n2.default)('Choices'),
    icon: 'layers',
    isPrimitive: true,
    isInPalette: true,
    configs: (0, _extends3.default)({}, (0, _baseConfigs2.default)(), {

      options: {
        target: 'type',
        label: (0, _signavioI18n2.default)('Options'),
        type: {
          name: 'list',
          unique: true,
          elementType: {
            name: 'text'
          }
        },
        transform: {
          toEdit: function toEdit(value) {
            return value && value.map(function (item) {
              return item && (item.name || item.id);
            });
          },
          fromEdit: function fromEdit(value) {
            return value && value.map(function (item) {
              return { id: item, name: item };
            });
          }
        },
        disabled: _baseConfigs.isBoundToNestedField,
        position: 5
      }
    })
  }, {
    key: 'dynamicChoice',
    name: (0, _signavioI18n2.default)('Choice'),
    namePlural: (0, _signavioI18n2.default)('Choices'),
    icon: 'layers',
    isPrimitive: true,
    isInPalette: false
  }, {
    key: 'fileId',
    name: (0, _signavioI18n2.default)('File'),
    namePlural: (0, _signavioI18n2.default)('Files'),
    icon: 'file',
    isInPalette: true,
    fields: [{
      key: 'id',
      type: { name: 'oid' },
      name: (0, _signavioI18n2.default)('ID')
    }, {
      key: 'name',
      type: { name: 'text' },
      name: (0, _signavioI18n2.default)('File name')
    }, {
      key: 'contentType',
      type: { name: 'text' },
      name: (0, _signavioI18n2.default)('Content type')
    }, {
      key: 'ownerId',
      type: { name: 'userId' },
      name: (0, _signavioI18n2.default)('Owner')
    }],
    configs: (0, _baseConfigs2.default)()
  }, {
    key: 'link',
    name: (0, _signavioI18n2.default)('Link'),
    namePlural: (0, _signavioI18n2.default)('Links'),
    icon: 'ribbon',
    isPrimitive: true,
    isInPalette: true,
    configs: (0, _baseConfigs2.default)()
  }, {
    key: 'emailAddress',
    name: (0, _signavioI18n2.default)('Email address'),
    namePlural: (0, _signavioI18n2.default)('Email addresses'),
    icon: 'at',
    isPrimitive: true,
    isInPalette: true,
    configs: (0, _baseConfigs2.default)()
  }, {
    key: 'date',
    name: (0, _signavioI18n2.default)('Date/Time'),
    icon: 'calendar',
    isPrimitive: true,
    isInPalette: true,
    kind: 'datetime', // default for date field
    configs: (0, _extends3.default)({}, (0, _baseConfigs2.default)(), {

      kind: {
        target: 'type',
        label: (0, _signavioI18n2.default)('Date/time'),
        type: {
          name: 'choice',
          notNull: true,
          options: [{ id: 'date', name: (0, _signavioI18n2.default)('date only') }, { id: 'datetime', name: (0, _signavioI18n2.default)('date and time') }, { id: 'time', name: (0, _signavioI18n2.default)('time only') }]
        },
        disabled: _baseConfigs.isBoundToNestedField,
        position: -1
      }
    })
  }, {
    key: 'duration',
    name: (0, _signavioI18n2.default)('Duration'),
    icon: 'clock',
    isPrimitive: true,
    isInPalette: true,
    configs: (0, _extends3.default)({}, (0, _baseConfigs2.default)())
  }, {
    key: 'userId',
    name: (0, _signavioI18n2.default)('User'),
    namePlural: (0, _signavioI18n2.default)('Users'),
    icon: 'user',
    isInPalette: true,
    // referenceModel: User,
    fields: [{
      key: 'id',
      type: { name: 'oid' },
      name: (0, _signavioI18n2.default)('ID')
    }, {
      key: 'emailAddress',
      type: { name: 'emailAddress' },
      name: (0, _signavioI18n2.default)('Email address')
    }, {
      key: 'firstName',
      type: { name: 'text' },
      name: (0, _signavioI18n2.default)('First name')
    }, {
      key: 'lastName',
      type: { name: 'text' },
      name: (0, _signavioI18n2.default)('Last name')
    }],
    configs: (0, _extends3.default)({}, (0, _baseConfigs2.default)(), {

      candidates: {
        target: 'type',
        label: (0, _signavioI18n2.default)('Candidates'),
        widget: function widget() {
          return _CandidatesEdit2.default;
        },
        hasWidget: true,
        disabled: _baseConfigs.isBoundToNestedField,
        position: 5
      }
    })
  }, {
    key: 'groupId',
    name: (0, _signavioI18n2.default)('Group'),
    icon: 'group'
    // referenceModel: Group,
  }, {
    key: 'number',
    name: (0, _signavioI18n2.default)('Number'),
    namePlural: (0, _signavioI18n2.default)('Numbers'),
    icon: 'calculator',
    isPrimitive: true,
    isInPalette: true,
    configs: (0, _baseConfigs2.default)()
  }, {
    key: 'money',
    name: (0, _signavioI18n2.default)('Money'),
    icon: 'money',
    isInPalette: true,
    isMutable: true,
    fields: [{
      key: 'amount',
      type: { name: 'number' },
      name: (0, _signavioI18n2.default)('Amount')
    }, {
      key: 'currency',
      type: {
        name: 'choice',
        options: ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'LTL', 'PLN', 'RON', 'SEK', 'CHF', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR']
      },
      name: (0, _signavioI18n2.default)('Currency')
    }],
    configs: (0, _baseConfigs2.default)()
  }, {
    key: 'oid',
    name: (0, _signavioI18n2.default)('Object ID'),
    icon: 'id',
    isPrimitive: true,
    configs: (0, _baseConfigs2.default)()
  }, {
    key: 'list',
    icon: 'layers'
  }, {
    key: 'serviceSelect',
    name: (0, _signavioI18n2.default)('Choice'),
    icon: 'layers',
    isPrimitive: true
  },

  //
  // Types that do not have a form field representation
  //

  {
    key: 'emailId',
    name: (0, _signavioI18n2.default)('Email'),
    namePlural: (0, _signavioI18n2.default)('Emails'),
    icon: 'envelope',
    // referenceModel: Mail,
    fields: [{
      key: 'id',
      type: { name: 'oid' },
      name: (0, _signavioI18n2.default)('ID')
    }, {
      key: 'from',
      type: { name: 'list', elementType: { name: 'emailAddress' } },
      name: (0, _signavioI18n2.default)('From')
    }, {
      key: 'fromName',
      type: { name: 'text' },
      name: (0, _signavioI18n2.default)('From name')
    }, {
      key: 'to',
      type: { name: 'list', elementType: { name: 'emailAddress' } },
      name: (0, _signavioI18n2.default)('To')
    }, {
      key: 'cc',
      type: { name: 'list', elementType: { name: 'emailAddress' } },
      name: (0, _signavioI18n2.default)('CC')
    }, {
      key: 'replyTo',
      type: { name: 'list', elementType: { name: 'emailAddress' } },
      name: (0, _signavioI18n2.default)('Reply to')
    }, {
      key: 'subject',
      type: { name: 'text' },
      name: (0, _signavioI18n2.default)('Subject')
    }, {
      key: 'bodyText',
      type: { name: 'text', multiLine: true },
      name: (0, _signavioI18n2.default)('Body text')
    }, {
      key: 'bodyHtml',
      type: { name: 'text', multiLine: true },
      name: (0, _signavioI18n2.default)('Body HTML')
    }, {
      key: 'attachmentIds',
      type: { name: 'list', elementType: { name: 'fileId' } },
      name: (0, _signavioI18n2.default)('Attachments')
    }]
  }, {
    key: 'caseId',
    name: (0, _signavioI18n2.default)('Case'),
    namePlural: (0, _signavioI18n2.default)('Cases'),
    icon: 'close-case',
    // referenceModel: Case,
    fields: [{
      key: 'id',
      type: { name: 'oid' },
      name: (0, _signavioI18n2.default)('ID')
    }, {
      key: 'name',
      type: { name: 'text' },
      name: (0, _signavioI18n2.default)('Name')
    }, {
      key: 'caseNumber',
      type: { name: 'number' },
      name: (0, _signavioI18n2.default)('Number')
    }, {
      key: 'creatorId',
      type: { name: 'userId' },
      name: (0, _signavioI18n2.default)('Creator')
    }, {
      key: 'createTime',
      type: { name: 'date', kind: 'datetime' },
      name: (0, _signavioI18n2.default)('Start date')
    }, {
      key: 'closeTime',
      type: { name: 'date', kind: 'datetime' },
      name: (0, _signavioI18n2.default)('End date')
    }, {
      key: 'duration',
      type: { name: 'duration' },
      name: (0, _signavioI18n2.default)('Cycle time')
    }, {
      key: 'dueDate',
      type: { name: 'date', kind: 'datetime' },
      name: (0, _signavioI18n2.default)('Due date')
    }, {
      key: 'link',
      type: { name: 'link' },
      name: (0, _signavioI18n2.default)('Link')
    }, {
      key: 'comments',
      type: {
        name: 'list',
        elementType: {
          name: 'text',
          multiLine: true
        }
      },
      name: (0, _signavioI18n2.default)('Comments')
    }, {
      key: 'priority',
      type: {
        name: 'choice',
        options: [{ id: '0', name: (0, _signavioI18n2.default)('High') }, { id: '1', name: (0, _signavioI18n2.default)('Medium') }, { id: '2', name: (0, _signavioI18n2.default)('Normal') }, { id: '3', name: (0, _signavioI18n2.default)('Low') }]
      },
      name: (0, _signavioI18n2.default)('Priority')
    }]
  },

  //
  // Connectors
  //

  {
    key: 'connectorReference',
    icon: 'cloud',
    configs: (0, _baseConfigs2.default)()
  }, {
    key: 'connectorValue',
    icon: 'cloud',
    configs: (0, _baseConfigs2.default)()
  }];
}


// WEBPACK FOOTER //
// ./packages/fields/lib/dataTypes/getDefaultDataTypeDescriptors.js
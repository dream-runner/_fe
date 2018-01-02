'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _fpLogic = require('@signavio/effektif-commons/lib/utils/fpLogic');

var _effektifFields = require('@signavio/effektif-fields');

var _EditColumn = require('./EditColumn');

var _EditColumn2 = _interopRequireDefault(_EditColumn);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasShowComponentSupport = _effektifFields.bindingUtils.hasShowComponentSupport;


var EditTableColumns = function EditTableColumns(_ref) {
  var columns = _ref.columns,
      onAdd = _ref.onAdd,
      _onRemove = _ref.onRemove,
      onReplace = _ref.onReplace,
      onReorder = _ref.onReorder,
      reportId = _ref.reportId,
      selectionId = _ref.selectionId,
      headerButtons = _ref.headerButtons,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['columns', 'onAdd', 'onRemove', 'onReplace', 'onReorder', 'reportId', 'selectionId', 'headerButtons']);
  return _react2.default.createElement(
    'div',
    rest.style,
    _react2.default.createElement(_Header2.default, {
      status: (0, _signavioI18n2.default)('Configuring table columns'),
      reportId: reportId,
      selectionId: selectionId,
      buttons: headerButtons
    }),
    _react2.default.createElement(
      _components.Hint,
      null,
      (0, _signavioI18n2.default)('Configure the columns to show in the results table'),
      _react2.default.createElement(
        _components.ContextHelp,
        null,
        (0, _signavioI18n2.default)('Remove unnecessary columns from the table or add additional data columns. ' + 'You can also change the order of columns and edit individual column titles.')
      )
    ),
    _react2.default.createElement(
      _components.Sortable,
      {
        component: 'div',
        childComponent: 'div',
        handle: '.draggable-handle',
        onSort: onReorder
      },
      columns.map(function (column, i) {
        return _react2.default.createElement(_EditColumn2.default, (0, _extends3.default)({}, column, {
          key: column.id,
          onRemove: function onRemove() {
            return _onRemove(i);
          },
          onChange: function onChange(_ref2) {
            var name = _ref2.name;
            return onReplace(i, (0, _extends3.default)({}, column, { name: name }));
          }
        }));
      })
    ),
    _react2.default.createElement(AddColumn, { columns: columns, onAdd: onAdd, style: rest.style('add') })
  );
};

exports.default = (0, _styles.defaultStyle)(function (theme) {
  return {
    add: (0, _extends3.default)({}, _styles.utils.borderTop(1, 'solid', theme.color.mono.lighter), {
      paddingTop: _styles.padding.xsmall,
      marginTop: _styles.padding.xsmall
    })
  };
})(EditTableColumns);


var enabledColumns = function enabledColumns(columns) {
  return function (expression, dataTypeDescriptors, variables) {
    return (0, _fpLogic.passesEvery)(hasShowComponentSupport(dataTypeDescriptors, variables), function (exp) {
      return undefined === (0, _lodash.find)(columns, function (col) {
        return col.binding.expression === exp.expression;
      });
    })(expression);
  };
};

var AddColumn = function AddColumn(_ref3) {
  var columns = _ref3.columns,
      onAdd = _ref3.onAdd,
      style = _ref3.style;
  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: 'add-new-column' }, style),
    _react2.default.createElement(_effektifFields.Binding, {
      placeholder: (0, _signavioI18n2.default)('Click to add an additional column to the table'),
      filterBindables: enabledColumns(columns),
      onChange: function onChange(binding) {
        return onAdd({ binding: binding });
      }
    })
  );
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/EditColumns.js
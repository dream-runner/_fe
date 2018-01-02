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

var _recompose = require('recompose');

var _lodash = require('lodash');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _utils = require('../../../../utils');

var _higherOrder = require('../../higher-order');

var _number = require('../number');

var _currencies = require('./currencies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCurrencyOptions = function getCurrencyOptions() {
  return (0, _lodash.sortBy)((0, _lodash.map)((0, _currencies.getCurrencies)(), function (value, key) {
    return {
      id: key,
      name: key,
      description: value
    };
  }), ['name']);
};

function Edit(props) {
  var onCompleteAmount = props.onCompleteAmount,
      onChangeAmount = props.onChangeAmount,
      onChangeCurrency = props.onChangeCurrency,
      value = props.value,
      style = props.style,
      rest = (0, _objectWithoutProperties3.default)(props, ['onCompleteAmount', 'onChangeAmount', 'onChangeCurrency', 'value', 'style']);


  return _react2.default.createElement(
    _tiles.Tile,
    {
      toolbar: _react2.default.createElement(
        _forms.DropdownSelect,
        {
          value: value.currency,
          onChange: onChangeCurrency,
          style: style('dropdown')
        },
        getCurrencyOptions().map(function (_ref) {
          var id = _ref.id,
              name = _ref.name,
              description = _ref.description;
          return _react2.default.createElement(_forms.Option, {
            key: id,
            value: name,
            name: name,
            subtitle: description
          });
        })
      )
    },
    _react2.default.createElement(_number.Edit, (0, _extends3.default)({}, (0, _lodash.omit)(rest, 'type'), {
      noClear: true,
      onComplete: onCompleteAmount,
      onChange: onChangeAmount,
      value: value.amount
    }))
  );
}

exports.default = (0, _recompose.compose)((0, _recompose.defaultProps)({
  onClick: function onClick(e) {
    // prevent default label behaviour
    e.stopPropagation();
    e.preventDefault();
  }
}), (0, _recompose.mapProps)(function (_ref2) {
  var value = _ref2.value,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['value']);
  return (0, _extends3.default)({}, rest, {

    value: {
      amount: value && value.amount,
      currency: value ? value.currency : (0, _utils.getDefaultCurrency)()
    }
  });
}), (0, _recompose.withHandlers)({
  onChangeAmount: function onChangeAmount(_ref3) {
    var value = _ref3.value,
        onChange = _ref3.onChange;
    return function (amount) {
      if (!onChange) {
        return;
      }

      if (amount == null) {
        onChange(null);

        return;
      }

      onChange((0, _extends3.default)({}, value, { amount: amount }));
    };
  },
  onCompleteAmount: function onCompleteAmount(_ref4) {
    var value = _ref4.value,
        onComplete = _ref4.onComplete;
    return function (amount) {
      if (!onComplete) {
        return;
      }

      if (amount == null) {
        onComplete(null);

        return;
      }

      onComplete((0, _extends3.default)({}, value, { amount: amount }));
    };
  },
  onChangeCurrency: function onChangeCurrency(props) {
    return function (currency) {
      var value = props.value,
          onChange = props.onChange,
          onComplete = props.onComplete;


      var newValue = (0, _extends3.default)({}, value, {
        currency: currency
      });

      if (onChange) {
        onChange(newValue);
      }

      if (onComplete) {
        onComplete(newValue);
      }
    };
  }
}), (0, _higherOrder.createClearable)({ triggerOnComplete: true }), (0, _styles.defaultStyle)({
  dropdown: {
    widget: {
      maxHeight: 350,
      outline: 'none',
      overflowY: 'auto'
    }
  }
}))(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/money/Edit.js
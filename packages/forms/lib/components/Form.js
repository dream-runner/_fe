'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _effektifFields = require('@signavio/effektif-fields');

var _transitions = require('./transitions');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Form(_ref) {
  var fields = _ref.fields,
      readOnly = _ref.readOnly,
      errors = _ref.errors,
      hideDoneButton = _ref.hideDoneButton,
      narrowLabels = _ref.narrowLabels,
      submitText = _ref.submitText,
      onComplete = _ref.onComplete,
      onSubmit = _ref.onSubmit,
      onDone = _ref.onDone,
      pending = _ref.pending;

  var buttonsField = (0, _lodash.find)(fields, function (field) {
    return field.asButtons;
  });

  return _react2.default.createElement(
    _effektifFields.ProvideFieldsContext,
    null,
    _react2.default.createElement(
      'div',
      null,
      errors && _react2.default.createElement(
        _hints.Hint,
        { warning: true },
        (0, _signavioI18n2.default)('The entered form data is invalid. Please check the fields highlighted in red.')
      ),
      _react2.default.createElement(
        _TransitionGroup2.default,
        null,
        _react2.default.createElement(
          _components.List,
          null,
          (0, _lodash.without)(fields, buttonsField).map(function (field) {
            return errors && errors[field.id] ? _react2.default.createElement(_effektifFields.ValidatedField, (0, _extends4.default)({}, field, {
              label: field.name || _react2.default.createElement(
                _hints.Hint,
                { inline: true },
                (0, _signavioI18n2.default)('Unnamed')
              ),
              narrowLabel: narrowLabels,
              onComplete: onComplete,
              validationErrors: errors && errors[field.id],
              readOnly: readOnly || field.readOnly
            })) : _react2.default.createElement(
              _transitions.FadeTransition,
              {
                key: field.id,
                required: field.required,
                visible: (0, _lodash.isUndefined)(field.visible) || field.visible
              },
              _react2.default.createElement(_effektifFields.LabeledField, (0, _extends4.default)({}, field, {
                label: field.name || _react2.default.createElement(
                  _hints.Hint,
                  { inline: true },
                  (0, _signavioI18n2.default)('Unnamed')
                ),
                narrowLabel: narrowLabels,
                onComplete: onComplete,
                readOnly: readOnly || field.readOnly
              }))
            );
          })
        )
      ),
      (buttonsField || !hideDoneButton) && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_components.Divider, null),
        buttonsField ? _react2.default.createElement(_effektifFields.Field, (0, _extends4.default)({}, buttonsField, {
          onComplete: onSubmit,
          readOnly: readOnly || buttonsField.readOnly || hideDoneButton
        })) : !hideDoneButton && _react2.default.createElement(
          _buttons.TextButton,
          {
            primary: true,
            block: true,
            onClick: onDone,
            disabled: pending || readOnly
          },
          submitText || (0, _signavioI18n2.default)('Done')
        )
      )
    )
  );
}


var updateFields = function updateFields(fields, value, id) {
  return (0, _utils.replaceField)(fields, (0, _extends4.default)({}, (0, _lodash.find)(fields, { id: id }), {
    value: value
  }));
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('errors', 'setErrors', null), (0, _recompose.withHandlers)({
  onComplete: function onComplete(_ref2) {
    var errors = _ref2.errors,
        fields = _ref2.fields,
        onChange = _ref2.onChange,
        setErrors = _ref2.setErrors;
    return function (value, id) {
      if (!onChange) {
        return;
      }

      if (errors) {
        setErrors(null);
      }

      var newFields = updateFields(fields, value, id);
      var changedField = (0, _lodash.find)(newFields, { id: id });

      onChange(newFields, changedField);
    };
  }
}), (0, _recompose.withHandlers)({
  onSubmit: function (_onSubmit) {
    function onSubmit(_x) {
      return _onSubmit.apply(this, arguments);
    }

    onSubmit.toString = function () {
      return _onSubmit.toString();
    };

    return onSubmit;
  }(function (_ref3) {
    var fields = _ref3.fields,
        setErrors = _ref3.setErrors,
        onComplete = _ref3.onComplete,
        onSubmit = _ref3.onSubmit,
        taskId = _ref3.taskId;
    return function (decision, id) {
      var _reduce = (0, _lodash.reduce)(
      // do not validate the decision because it has not been set
      // but will be set onSubmit after the form itself is valid
      (0, _lodash.reject)(fields, function (field) {
        return field.asButtons;
      }), function (result, field) {
        var _validateField = (0, _effektifFields.validateField)(field),
            isValid = _validateField.isValid,
            errors = _validateField.errors;

        return {
          isValid: result.isValid && isValid,
          errors: (0, _extends4.default)({}, result.errors, (0, _defineProperty3.default)({}, field.id, errors))
        };
      }, { isValid: true }),
          isValid = _reduce.isValid,
          errors = _reduce.errors;

      if (!isValid) {
        setErrors(errors);

        return;
      }

      if (decision) {
        onComplete(decision, id);
      }

      onSubmit(taskId, updateFields(fields, decision, id));
    };
  })
}), (0, _recompose.withHandlers)({
  onDone: function onDone(_ref4) {
    var onSubmit = _ref4.onSubmit;
    return function () {
      return onSubmit();
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref5) {
    var nextDefaultFields = _ref5.defaultFields,
        nextFields = _ref5.fields;

    // Legacy TaskView sends undefined fields on submit
    // This line can be removed once we migrate to the new Case/Task view
    if (!this.props.fields) {
      return;
    }

    if (!(0, _lodash.isEqual)(this.props.defaultFields, nextDefaultFields)) {
      return;
    }

    var _props = this.props,
        defaultFields = _props.defaultFields,
        fields = _props.fields;


    var shouldReset = false;
    var resetFields = (defaultFields || []).map(function (defaultField, index) {
      if ((0, _utils.shouldResetToDefaultValue)(defaultField, fields[index], nextFields[index])) {
        shouldReset = true;
        return defaultField;
      }

      return nextFields[index];
    });

    if (shouldReset) {
      this.props.onChange(resetFields);
    }
  }
}))(Form);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/Form.js
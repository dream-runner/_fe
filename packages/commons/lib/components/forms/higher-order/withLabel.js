'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = withLabel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _styles = require('../../../styles');

var _higherOrder = require('../../higher-order');

var _Clearfix = require('../../Clearfix');

var _Clearfix2 = _interopRequireDefault(_Clearfix);

var _Label = require('../Label');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withLabel(WrappedComponent) {
  var Labeled = function Labeled(props) {
    var hover = props.hover,
        inline = props.inline,
        onMouseOver = props.onMouseOver,
        onMouseOut = props.onMouseOut,
        label = props.label,
        labelId = props.labelId,
        description = props.description,
        style = props.style,
        rest = (0, _objectWithoutProperties3.default)(props, ['hover', 'inline', 'onMouseOver', 'onMouseOut', 'label', 'labelId', 'description', 'style']);


    if (!label) {
      return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, rest, style));
    }

    if (inline) {
      return _react2.default.createElement(
        'div',
        style,
        _react2.default.createElement(
          _Label2.default,
          {
            style: style('label'),
            htmlFor: labelId,
            title: label,
            description: description
          },
          label
        ),
        _react2.default.createElement(
          'div',
          style('control'),
          _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, rest, style('input'), { labelId: labelId }))
        )
      );
    }

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, style, { onMouseOver: onMouseOver, onMouseOut: onMouseOut }),
      _react2.default.createElement(
        _Label2.default,
        {
          style: style('label'),
          htmlFor: labelId,
          focus: hover,
          title: label,
          description: description
        },
        label
      ),
      _react2.default.createElement(
        'div',
        style('control'),
        _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, rest, style('input'), { labelId: labelId }))
      ),
      _react2.default.createElement(_Clearfix2.default, null)
    );
  };

  return (0, _recompose.compose)((0, _recompose.withState)('labelId', 'setLabelId'), (0, _recompose.lifecycle)({
    componentWillMount: function componentWillMount() {
      var setLabelId = this.props.setLabelId;


      setLabelId((0, _lodash.uniqueId)('l'));
    }
  }), (0, _recompose.withState)('hover', 'setHover', false), (0, _recompose.withHandlers)({
    onMouseOver: function onMouseOver(_ref) {
      var setHover = _ref.setHover;
      return function () {
        return setHover(true);
      };
    },
    onMouseOut: function onMouseOut(_ref2) {
      var setHover = _ref2.setHover;
      return function () {
        return setHover(false);
      };
    }
  }), (0, _styles.defaultStyle)({
    control: {
      float: 'left',
      width: '60%'
    },

    label: {
      float: 'left',

      width: '40%'
    },

    '&narrowLabel': {
      control: {
        width: '75%'
      },

      label: {
        width: '25%'
      }
    },

    '&inline': {
      control: {
        float: null,
        width: null
      },

      label: {
        float: null,
        width: null,

        height: null,

        textAlign: 'left',

        content: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0
        }
      }
    }
  }, function (_ref3) {
    var narrowLabel = _ref3.narrowLabel,
        inline = _ref3.inline;
    return {
      '&narrowLabel': narrowLabel,
      '&inline': inline
    };
  }), (0, _higherOrder.omitProps)(['setLabelId', 'setHover', 'narrowLabel']))(Labeled);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/higher-order/withLabel.js
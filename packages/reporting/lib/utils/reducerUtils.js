'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.combineReducersArray = combineReducersArray;
exports.selectPropertyReduce = selectPropertyReduce;
exports.selectElementReduce = selectElementReduce;

var _shallowEqual = require('react-redux/lib/utils/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OBJECT_TYPE = Object.prototype.toString({});
var ARRAY_TYPE = Object.prototype.toString([]);

// This module provides higher-order reducers (transducers?)

function combineReducersArray(arrayOfReducerFunction) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    var type = Object.prototype.toString(state);
    (0, _invariant2.default)(type === ARRAY_TYPE, 'Tried to apply combineReducersArray reducer on an object of type ' + type + ', ' + ('expected type ' + ARRAY_TYPE + '.'));

    var result = arrayOfReducerFunction.map(function (reducer, index) {
      return reducer(state[index], action);
    });
    return (0, _shallowEqual2.default)(result, state) ? state : result;
  };
}

/**
 * For an incoming action, select a property key of the state object
 * and apply the passed reducer on that propery's value.
 * @param selectPropertyKey func: (object, action) => keyInObject
 */
function selectPropertyReduce(selectPropertyKey, reducer) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var propKey = selectPropertyKey(state, action);
    if (!propKey) return state;

    var type = Object.prototype.toString(state);
    (0, _invariant2.default)(type === OBJECT_TYPE, 'Tried to apply selectPropertyReduce reducer on an object of type ' + type + ', ' + ('expected type ' + OBJECT_TYPE + '.'));

    var propValue = state[propKey];
    var newPropValue = reducer(propValue, action);
    if (propValue === newPropValue) return state;

    return propValue === newPropValue ? state : (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, propKey, newPropValue));
  };
}

/**
 * For an incoming action, select an element index of the state array
 * and apply the passed reducer on that element.
 * @param selectElementIndex func: (array, action) => indexInArray
 */
function selectElementReduce(selectElementIndex, reducer) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    var elementIndex = selectElementIndex(state, action);
    if (!elementIndex) return state;

    var type = Object.prototype.toString(state);
    (0, _invariant2.default)(type === ARRAY_TYPE, 'Tried to apply selectElementReduce reducer on an object of type ' + type + ', ' + ('expected type ' + ARRAY_TYPE + '.'));

    var element = state[elementIndex];
    var newElement = reducer(element, action);
    if (element === newElement) return state;

    return element === newElement ? state : state.splice(elementIndex, 1, newElement);
  };
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/utils/reducerUtils.js
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = function (WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    (0, _inherits3.default)(WithUserQuery, _Component);

    function WithUserQuery() {
      (0, _classCallCheck3.default)(this, WithUserQuery);

      var _this = (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));

      _this.state = { query: null };
      return _this;
    }

    WithUserQuery.prototype.componentWillMount = function componentWillMount() {
      var organization = this.context.organization;


      this.setState({
        query: new _models.QueryContainer(new _models.UserQuery(organization))
      });
    };

    WithUserQuery.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState, nextContext) {
      var organization = this.context.organization;


      if (nextContext.organization === organization) {
        return;
      }

      this.setState({
        query: new _models.QueryContainer(new _models.UserQuery(nextContext.organization))
      });
    };

    WithUserQuery.prototype.render = function render() {
      var query = this.state.query;


      return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.props, { userQuery: query }));
    };

    return WithUserQuery;
  }(_react.Component), _class.contextTypes = {
    organization: _propTypes.Organization.isRequired
  }, _temp;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _models = require('../models');

var _propTypes = require('../propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


// WEBPACK FOOTER //
// ./packages/commons/lib/components/WithUserQuery.js
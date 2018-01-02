'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _BaseMixin = require('../mixins/BaseMixin');

var _BaseMixin2 = _interopRequireDefault(_BaseMixin);

var _hints = require('./hints');

var _lodash = require('lodash');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createReactClass2.default)({
  displayName: 'InfiniteScroll',

  mixins: [_BaseMixin2.default],

  propTypes: {
    collection: _propTypes2.default.object.isRequired,

    className: _propTypes2.default.string,
    loadingMessage: _propTypes2.default.string,
    emptyMessage: _propTypes2.default.string,
    pageSize: _propTypes2.default.number,
    threshold: _propTypes2.default.number,
    clearOnInitialLoad: _propTypes2.default.bool,
    resetOnInitialLoad: _propTypes2.default.bool,
    requestData: _propTypes2.default.object,
    requestOptions: _propTypes2.default.object,

    onPageEnd: _propTypes2.default.func,
    onPageLoad: _propTypes2.default.func,

    children: _propTypes2.default.node
  },

  getInitialState: function getInitialState() {
    return {
      loading: false,
      completed: false,
      length: 0,
      page: 0
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      threshold: 250,
      pageSize: 25
    };
  },

  componentWillMount: function componentWillMount() {
    this.requestData();

    this.props.collection.on('reset', this.resetPage, this);
  },

  componentDidMount: function componentDidMount() {
    (0, _jquery2.default)(window).scroll(this.checkForUpdate);
    (0, _jquery2.default)(window).resize(this.checkForUpdate);
  },

  componentWillUnmount: function componentWillUnmount() {
    (0, _jquery2.default)(window).off('scroll', this.checkForUpdate);
    (0, _jquery2.default)(window).off('resize', this.checkForUpdate);

    this.props.collection.off(null, null, this);
  },

  needsReset: function needsReset(nextProps, nextState) {
    if (this.state.completed && !nextState.completed) {
      return true;
    }

    if (!(0, _lodash.isEqual)(this.props.requestData, nextProps.requestData)) {
      return true;
    }

    return false;
  },

  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (!this.needsReset(nextProps, nextState)) {
      return;
    }

    this.resetPage();
  },

  resetPage: function resetPage() {
    this.setState({
      page: 0,
      length: 0,
      completed: false
    });
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (prevProps.collection !== this.props.collection) {
      this.resetPage();

      return;
    }

    if (this.state.completed) {
      return;
    }

    this.checkForUpdate();
  },

  requestData: function requestData() {
    if (this.state.loading) {
      return;
    }

    if (this.state.completed) {
      return;
    }

    this.setState({
      loading: true
    });

    if (this.props.onPageEnd) {
      this.props.onPageEnd();
    }

    this.fetchPage();
  },

  fetchPage: function fetchPage() {
    this.props.collection.once('sync', this.handlePageLoad, this);

    var data = (0, _lodash.assignIn)({
      offset: this.state.page * this.props.pageSize,
      pagesize: this.props.pageSize
    }, this.props.requestData);

    this.props.collection.fetch((0, _lodash.assignIn)({}, this.getOptions(), {
      data: data
    }));
  },

  getOptions: function getOptions() {
    return (0, _lodash.assignIn)({}, {
      reset: this.state.page === 0 && this.props.resetOnInitialLoad,
      clear: this.state.page === 0 && this.props.clearOnInitialLoad,
      remove: this.state.page === 0
    }, this.props.requestOptions);
  },

  isComplete: function isComplete() {
    if (this.props.collection.meta('size')) {
      return this.props.collection.meta('size') === this.props.collection.length;
    }

    return this.state.length >= this.props.collection.length;
  },

  handlePageLoad: function handlePageLoad() {
    var completed = this.isComplete();

    this.setState({
      loading: false,
      completed: completed,
      length: this.props.collection.length,
      page: this.nextPage(completed)
    });

    if (this.props.onPageLoad) {
      this.props.onPageLoad(this.state.page, this.props.pageSize);
    }
  },

  nextPage: function nextPage(completed) {
    if (completed) {
      return this.state.page;
    }

    return this.state.page + 1;
  },

  checkForUpdate: function checkForUpdate() {
    var el = _reactDom2.default.findDOMNode(this);

    var offset = (0, _jquery2.default)(el).offset().top + (0, _jquery2.default)(el).height();
    var scrollTop = (0, _jquery2.default)(document).scrollTop();

    if (offset - scrollTop - window.innerHeight > this.props.threshold) {
      return;
    }

    this.requestData();
  },

  render: function render() {
    var cls = _utils.CSSUtils.cls({
      'infinite-scroll': true
    }, this.props.className);

    return _react2.default.createElement(
      'div',
      { className: cls },
      this.props.children,
      this.renderLoading(),
      this.renderEmpty()
    );
  },

  renderEmpty: function renderEmpty() {
    if (!this.state.completed) {
      return;
    }

    if (this.props.collection.length > 0) {
      return;
    }

    return _react2.default.createElement(
      _hints.Hint,
      null,
      this.props.emptyMessage || (0, _signavioI18n2.default)('Nothing to show.')
    );
  },

  renderLoading: function renderLoading() {
    if (this.state.completed) {
      return;
    }

    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      this.props.loadingMessage || (0, _signavioI18n2.default)('Loading additional contents...')
    );
  }
});


// WEBPACK FOOTER //
// ./packages/commons/lib/components/InfiniteScroll.js
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _utils = require('../utils');

var _models = require('../models');

var _AutocompleteSuggestions = require('./AutocompleteSuggestions');

var _AutocompleteSuggestions2 = _interopRequireDefault(_AutocompleteSuggestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createReactClass2.default)({
  displayName: 'Autocomplete',

  propTypes: {
    query: _propTypes2.default.instanceOf(_models.QueryContainer),

    autoFocus: _propTypes2.default.bool,
    hideTrigger: _propTypes2.default.bool,
    inline: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readOnly: _propTypes2.default.bool,
    resetOnComplete: _propTypes2.default.bool,
    resetOnBlur: _propTypes2.default.bool,
    static: _propTypes2.default.bool,

    onQuery: _propTypes2.default.func,
    onResult: _propTypes2.default.func,
    onReady: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    onComplete: _propTypes2.default.func.isRequired,
    renderItem: _propTypes2.default.func.isRequired,

    children: _propTypes2.default.node,
    controls: _propTypes2.default.node,

    minLength: _propTypes2.default.number,
    defaultSelectionIndex: _propTypes2.default.number,

    value: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,

    data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
      type: _propTypes2.default.string,
      entity: _propTypes2.default.object,
      id: _propTypes2.default.string
    })),

    fetchOptions: _propTypes2.default.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      minLength: 0
    };
  },

  getInitialState: function getInitialState() {
    return {
      items: [],
      query: this.props.query,
      queryString: this.props.value,

      loading: false,

      position: this.getDefaultSelectionIndex(),
      hasFocus: this.props.autoFocus || false
    };
  },

  componentWillMount: function componentWillMount() {
    if (this.state.query) {
      // query has been set from the outside
      return;
    }

    this.setState({
      query: new _models.QueryContainer(new _models.DefaultQuery(this.props.data))
    });
  },

  componentWillUpdate: function componentWillUpdate(nextProps) {
    if (nextProps.query && nextProps.query !== this.state.query) {
      this.setState({
        query: nextProps.query
      });
    }

    if (nextProps.data !== this.props.data) {
      this.setState({
        query: new _models.QueryContainer(new _models.DefaultQuery(nextProps.data))
      });
    }
  },

  componentDidMount: function componentDidMount() {
    this.debouncedFetchSuggestions = (0, _lodash.debounce)(this.fetchSuggestions, 300);

    if (this.props.static || this.props.autoFocus) {
      this.fetchSuggestions();
    }

    if (!this.props.autoFocus) {
      return;
    }

    this.refs.input.focus();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (this.shouldFetchSuggestions(prevState)) {
      this.fetchSuggestions();
    }

    if (prevState.queryString !== this.state.queryString) {
      this.debouncedFetchSuggestions();
    }

    if (prevState.loading && !this.state.loading) {
      if (this.props.static || this.state.hasFocus) {
        if (this.props.onReady) {
          this.props.onReady();
        }
      }
    }
  },

  shouldFetchSuggestions: function shouldFetchSuggestions(prevState) {
    if (prevState.loading && !this.state.loading) {
      return this.state.lastQuery !== this.state.queryString;
    }

    if (!prevState.hasFocus && this.state.hasFocus) {
      return !this.props.static;
    }

    return false;
  },

  render: function render() {
    var _this = this;

    var cls = _utils.CSSUtils.cls({
      autocomplete: true,
      'hide-toggle': this.props.hideTrigger,
      inline: this.props.inline,
      disabled: this.props.disabled
    }, this.props.containerClass);

    if (this.props.static) {
      return _react2.default.createElement(
        'div',
        { className: cls, ref: 'autocomplete' },
        this.renderControls(),
        this.renderSuggestions()
      );
    }

    return _react2.default.createElement(
      _Overlay2.default,
      {
        visible: this.state.hasFocus,
        overlay: this.renderSuggestions(),
        onOutsideClick: function onOutsideClick(ev) {
          return _this.handleDocumentClick(ev);
        }
      },
      _react2.default.createElement(
        'div',
        { className: cls, ref: 'autocomplete' },
        this.renderControls()
      )
    );
  },

  handleQuery: function handleQuery() {
    if (this.props.onQuery) {
      this.props.onQuery(this.state.queryString);
    }
  },

  handleResult: function handleResult(result) {
    if (!this.isMounted()) {
      return;
    }

    if (this.props.onResult) {
      this.props.onResult(result, function (transform) {
        result = transform;
      }.bind(this), this.state.queryString);
    }

    this.setState({
      loading: false,
      loadingGroup: null,
      items: result,
      position: this.getDefaultSelectionIndex()
    });
  },

  handleDocumentClick: function handleDocumentClick(ev) {
    this.setState({
      hasFocus: false
    });

    this.onBlur(ev);
  },

  renderSuggestions: function renderSuggestions() {
    return _react2.default.createElement(
      _AutocompleteSuggestions2.default,
      (0, _extends3.default)({}, this.props, {
        loading: this.state.loading,
        loadingGroup: this.state.loadingGroup,
        position: this.state.position,
        style: this.suggestionsStyle(),
        groups: this.state.query.getGroups(),
        items: this.state.items,
        onNextPage: this.handleNextPage,
        onLeave: this.resetPosition,
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut,
        onClick: this.handleItemClick
      }),
      this.renderAddOns()
    );
  },

  handleNextPage: function handleNextPage(group) {
    var _this2 = this;

    this.setState({
      loadingGroup: group.id
    });

    this.state.query.next(group.id, this.props.fetchOptions).then(function (results) {
      _this2.handleResult(results);
    });
  },

  handleItemClick: function handleItemClick(item, ev) {
    this.select(item, ev);

    this.refs.input.blur();

    this.setState({
      hasFocus: false
    });
  },

  resetPosition: function resetPosition() {
    this.setState({
      position: this.getDefaultSelectionIndex()
    });
  },

  suggestionsStyle: function suggestionsStyle() {
    if (this.props.static) {
      return;
    }

    return {
      minWidth: (0, _jquery2.default)(this.refs.input).outerWidth(),
      maxWidth: (0, _jquery2.default)(this.refs.autocomplete).outerWidth()
    };
  },

  handleMouseOver: function handleMouseOver(index) {
    this.setState({
      position: index
    });
  },

  handleMouseOut: function handleMouseOut(index) {
    this.setState({
      position: index
    });
  },

  fetchSuggestions: function fetchSuggestions() {
    var _this3 = this;

    if (this.state.loading || !this.isMounted()) {
      return;
    }

    if (this.props.minLength && this.state.queryString.length < this.props.minLength) {
      this.setState({
        loading: false
      });

      return;
    }

    this.handleQuery();

    this.setState({
      loading: true,
      lastQuery: this.state.queryString
    });

    this.state.query.fetch(this.state.queryString, this.props.fetchOptions).then(function (results) {
      _this3.handleResult(results);
    }).catch(function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_this3.props.onError) {
        var _props;

        (_props = _this3.props).onError.apply(_props, args);
      } else {
        console.error(args);
      }
    });
  },

  getDefaultSelectionIndex: function getDefaultSelectionIndex() {
    if ((0, _lodash.isNumber)(this.props.defaultSelectionIndex)) {
      return this.props.defaultSelectionIndex;
    }

    return -1;
  },

  focus: function focus() {
    this.setState({
      hasFocus: true
    });

    this.refs.input.focus();
    this.fetchSuggestions();
  },

  renderControls: function renderControls() {
    return _react2.default.createElement(
      'div',
      { className: 'autocomplete-controls', ref: 'controls' },
      this.renderInput(),
      this.renderControlAddOns()
    );
  },

  renderControlAddOns: function renderControlAddOns() {
    if (!this.props.controls) {
      return;
    }

    return _react2.default.createElement(
      'div',
      { className: 'control-add-ons' },
      this.props.controls
    );
  },

  hasChildren: function hasChildren() {
    return _react.Children.toArray(this.props.children).filter(function (child) {
      return !(0, _lodash.isUndefined)(child);
    }).length > 0;
  },

  renderAddOns: function renderAddOns() {
    if (!this.hasChildren()) {
      return;
    }

    return _react2.default.createElement(
      'div',
      { className: 'add-ons' },
      this.props.children
    );
  },

  renderInput: function renderInput() {
    return _react2.default.createElement('input', {
      ref: 'input',
      type: 'text',
      placeholder: this.props.placeholder,
      disabled: this.state.loadingGroup,
      value: this.state.queryString,
      onChange: this.handleQueryChange,
      readOnly: this.props.readOnly,
      autoComplete: 'off',
      onClick: this.handleClick,
      onKeyUp: this.handleKeyUp,
      onKeyDown: this.handleKeyDown,
      onFocus: this.handleFocus
    });
  },

  handleQueryChange: function handleQueryChange() {
    this.setState({
      queryString: this.refs.input.value
    });
  },

  handleClick: function handleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  },

  activate: function activate(item, position) {
    if (!item) {
      return;
    }

    this.setState({
      position: position
    });
  },

  select: function select(item, ev) {
    if (!item) {
      return;
    }

    this.props.onComplete(item);

    if (this.props.resetOnComplete) {
      this.state.query.reset();
      this.setState({
        queryString: ''
      });
    }

    this.refs.input.focus();

    if (this.props.blurOnComplete) {
      this.onBlur(ev);

      return;
    }

    this.fetchSuggestions();

    this.setState({
      position: this.getDefaultSelectionIndex(),
      hasFocus: true
    });
  },

  computePosition: function computePosition(step) {
    var items = this.state.items;

    if (items.length === 0) {
      return 0;
    }

    if (!this.canMoveCursor()) {
      return this.getDefaultSelectionIndex();
    }

    var position = this.state.position;

    if (step < 0 && position === -1) {
      // when first action is up we simulate the
      // previous position to be after the last element
      position = items.length;
    }

    var newPosition = this.generatePosition(position, step);

    return this.alignPosition(newPosition, step);
  },

  generatePosition: function generatePosition(position, step) {
    return Math.max(0, (this.state.items.length + position + step) % this.state.items.length);
  },

  alignPosition: function alignPosition(position, step) {
    while (this.state.items[position].disabled) {
      position = this.generatePosition(position, step);
    }

    return position;
  },

  canMoveCursor: function canMoveCursor() {
    return (0, _lodash.find)(this.state.items, function (item) {
      return !item.disabled;
    });
  },

  // Tab must be handled in keydown listeners because keyUp event
  // is already not fired anymore on this component
  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode === 9) {
      // tab
      this.onBlur(event);
    }
  },

  handleKeyUp: function handleKeyUp(event) {
    if (this.props.readOnly) {
      return;
    }

    var items = this.state.items;
    var position;

    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }

    if (_utils.KeyUtils.isEnter(event)) {
      // enter
      event.preventDefault();
      event.stopPropagation();

      this.select(items[this.state.position], event);

      return;
    }

    if (_utils.KeyUtils.isArrowDown(event)) {
      // arrow down
      event.preventDefault();

      position = this.computePosition(1);

      this.activate(items[position], position);

      return;
    }

    if (_utils.KeyUtils.isArrowUp(event)) {
      // arrow up
      event.preventDefault();

      position = this.computePosition(-1);

      this.activate(items[position], position);

      return;
    }

    if (_utils.KeyUtils.isEsc(event)) {
      // esc

      this.onBlur(event);

      return;
    }

    this.setState({
      position: this.getDefaultSelectionIndex()
    });
  },

  handleFocus: function handleFocus(event) {
    if (this.props.readOnly) {
      return;
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    this.setState({
      hasFocus: true,
      position: this.getDefaultSelectionIndex()
    });
  },

  onBlur: function onBlur(ev) {
    if (this.isMounted()) {
      this.setState({
        hasFocus: false,
        position: this.getDefaultSelectionIndex()
      });
    }

    if (this.props.resetOnBlur) {
      this.state.query.reset();
    }

    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  }
});


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Autocomplete.js
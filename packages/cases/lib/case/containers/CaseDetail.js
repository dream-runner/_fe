'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _reactRouter = require('react-router');

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _workflowAccess = require('@signavio/workflow-access');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _components2 = require('../../components');

var _components3 = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CaseDetailContainer = function CaseDetailContainer(_ref) {
  var style = _ref.style,
      fetchCase = _ref.fetchCase,
      onChange = _ref.onChange,
      onNameChange = _ref.onNameChange,
      onCloseCase = _ref.onCloseCase,
      onDeleteCase = _ref.onDeleteCase,
      onRefresh = _ref.onRefresh;

  var caze = fetchCase.value;

  var rights = (0, _workflowAccess.getRights)(caze.access, 'edit');

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(_components.DocumentTitle, { title: (0, _signavioI18n2.default)('Case - __name__', { name: caze.name }) }),
    _react2.default.createElement(
      _components.Container,
      { fullWidth: true },
      _react2.default.createElement(
        'div',
        style('header'),
        _react2.default.createElement(
          'div',
          style('sourceInfo'),
          caze.sourceWorkflow && _react2.default.createElement(
            'div',
            style('processNameContainer'),
            _react2.default.createElement(
              _tiles.TextTile,
              {
                small: true,
                transparent: true,
                style: style('processName'),
                icon: 'cogs',
                iconSet: 'fontAwesome'
              },
              caze.sourceWorkflow.name
            )
          ),
          _react2.default.createElement(_components3.Header, {
            readOnly: !rights.edit,
            value: caze.name,
            onChange: onNameChange
          })
        )
      ),
      _react2.default.createElement(
        'div',
        style('cockpit'),
        _react2.default.createElement(
          'div',
          style('details'),
          _react2.default.createElement(_components3.Details, { readOnly: !rights.edit, caze: caze, onChange: onChange })
        ),
        rights.edit && _react2.default.createElement(
          'div',
          style('caseActions'),
          _react2.default.createElement(_components3.CaseActions, {
            small: true,
            caze: caze,
            onCloseCase: onCloseCase,
            onDeleteCase: onDeleteCase
          })
        )
      ),
      rights.edit && _react2.default.createElement(
        'div',
        { className: 'visible-xs' },
        _react2.default.createElement(_components3.CaseActions, {
          direction: 'horizontal',
          caze: caze,
          onCloseCase: onCloseCase,
          onDeleteCase: onDeleteCase
        })
      ),
      _react2.default.createElement(_components.Clearfix, null)
    ),
    _react2.default.createElement(
      'div',
      style('switchView'),
      _react2.default.createElement(_components2.SwitchViewHeader, { caseId: caze.id })
    ),
    _react2.default.createElement(
      _components.Container,
      { fullWidth: true },
      _react2.default.createElement(_components3.CaseDetail, { caze: caze, onRequestRefresh: onRefresh })
    )
  );
};
exports.default = (0, _recompose.compose)(_reactRouter.withRouter, (0, _effektifApi.connect)(function (_ref2) {
  var caseId = _ref2.caseId;
  return {
    fetchCase: {
      id: caseId,
      type: _effektifApi.types.CASE
    },
    deleteCase: {
      id: caseId,
      method: 'remove',
      type: _effektifApi.types.CASE
    },
    deleteCaseCascade: {
      method: 'remove',
      type: _effektifApi.types.CASE,
      query: {
        id: caseId,
        cascadeDelete: true
      }
    },
    closeCase: {
      id: caseId,
      method: 'create',
      type: _effektifApi.types.CASE_CANCEL_ACTION
    },
    updateCase: {
      id: caseId,
      method: 'update',
      type: _effektifApi.types.CASE
    }
  };
}), (0, _components2.withPeriodicAction)(function (_ref3) {
  var fetchCase = _ref3.fetchCase;
  return fetchCase();
}), (0, _effektifApi.withRequestMessages)({
  fetchCase: {
    isPending: function isPending(_ref4) {
      var fetchCase = _ref4.fetchCase;
      return fetchCase.pending && !fetchCase.value;
    },
    pending: function pending() {
      return (0, _signavioI18n2.default)('Loading case information...');
    },
    rejected: function rejected(_ref5) {
      var fetchCase = _ref5.fetchCase;
      return (0, _signavioI18n2.default)('There was an error loading the case: __reason__', {
        reason: fetchCase.reason
      });
    }
  }
}), (0, _recompose.withHandlers)({
  onCloseCase: function onCloseCase(_ref6) {
    var caseId = _ref6.caseId,
        closeCase = _ref6.closeCase;
    return function (reason) {
      closeCase({ id: caseId, body: { reason: reason } });
    };
  },
  onDeleteCase: function onDeleteCase(_ref7) {
    var fetchCase = _ref7.fetchCase,
        deleteCase = _ref7.deleteCase,
        deleteCaseCascade = _ref7.deleteCaseCascade,
        history = _ref7.history;
    return function (cascadeDelete) {
      if (cascadeDelete) {
        deleteCaseCascade();
      } else {
        deleteCase();
      }

      history.push((0, _effektifApi.prependOrg)('/cases/' + fetchCase.value.sourceWorkflowId));
    };
  },
  onChange: function onChange(_ref8) {
    var updateCase = _ref8.updateCase;
    return function (newCase) {
      return updateCase(newCase);
    };
  },

  onNameChange: function onNameChange(_ref9) {
    var fetchCase = _ref9.fetchCase,
        updateCase = _ref9.updateCase;
    return function (name) {
      return updateCase((0, _extends3.default)({}, fetchCase.value, { name: name }));
    };
  },

  onRefresh: function onRefresh(_ref10) {
    var fetchCase = _ref10.fetchCase;
    return function () {
      return fetchCase();
    };
  }
}), (0, _effektifApi.fulfillRequestThen)({
  closeCase: function closeCase(_ref11) {
    var fetchCase = _ref11.fetchCase;
    return fetchCase();
  }
}), (0, _effektifApi.requestRejectedThen)({
  fetchCase: function fetchCase(_ref12) {
    var history = _ref12.history;
    return history.replace((0, _effektifApi.prependOrg)('/cases'));
  }
}), (0, _styles.defaultStyle)(function (_ref13) {
  var color = _ref13.color,
      padding = _ref13.padding;
  return {
    paddingTop: padding.large,

    details: {
      paddingTop: padding.normal
    },

    sourceInfo: (0, _extends3.default)({
      overflow: 'hidden',
      paddingRight: padding.large
    }, _styles.utils.media.xs({
      overflow: 'visible',
      paddingRight: 0
    })),

    processNameContainer: {
      opacity: 0.5
    },

    processName: {
      icon: {
        backgroundColor: null
      }
    },

    cockpit: {
      position: 'relative'
    },

    caseActions: (0, _extends3.default)({
      position: 'absolute',

      top: padding.normal,
      right: 0

    }, _styles.utils.media.xs({
      display: 'none'
    })),

    switchView: (0, _extends3.default)({
      textAlign: 'right'

    }, _styles.utils.media.xs({
      textAlign: 'center',

      paddingBottom: padding.normal,
      paddingTop: padding.normal
    })),

    toolbar: {
      right: padding.normal,
      paddingLeft: padding.large
    }
  };
}))(CaseDetailContainer);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/containers/CaseDetail.js
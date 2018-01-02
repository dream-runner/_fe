'use strict';

exports.canUpdate = function (component) {
  if (!component.isMounted()) {
    return false;
  }

  if (component._compositeLifeCycleState === 'RECEIVING_STATE') {
    return false;
  }

  if (component._compositeLifeCycleState === 'UNMOUNTING') {
    return false;
  }

  return true;
};


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/StateUtils.js
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  if (!Array.isArray(actions)) {
    return;
  }

  for (const action of actions) {
    if (!action || typeof action.type !== 'string') {
      continue;
    }

    if (action.type === 'addProperties') {
      if (
        action.extraData &&
        Object.prototype.toString.call(action.extraData) === '[object Object]'
      ) {
        currentState = { ...currentState, ...action.extraData };
      }
      history.push(currentState);
    } else if (action.type === 'removeProperties') {
      if (!Array.isArray(action.keysToRemove)) {
        continue;
      }

      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
      history.push(currentState);
    } else if (action.type === 'clear') {
      currentState = {};
      history.push(currentState);
    }
  }

  return history;
}

module.exports = transformStateWithClones;

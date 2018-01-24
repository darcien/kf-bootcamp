// @flow

import initialState from './initialState';
import eventHandlers from './eventHandlers';
import renderApp from './App';

let state = initialState;

global.emitEvent = (eventName, additionalArgs) => {
  let eventHandler = eventHandlers[eventName];
  if (eventHandler) {
    state = eventHandler(state, additionalArgs);
  }
  render();
};

function render() {
  let html = renderApp(state);
  if (document.body) {
    document.body.innerHTML = html;
  }
}

render();

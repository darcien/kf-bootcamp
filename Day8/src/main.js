// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {getState} from './state';

let div = document.createElement('div');
if (document.body) {
  document.body.appendChild(div);
}

export function render() {
  let state = getState();
  ReactDOM.render(
    <App state={state} />,
    // React.createElement(App, {state: state}),
    div,
  );
}

render();

// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import Contact from './Contact';

let div = document.createElement('div');
if (document.body) {
  document.body.appendChild(div);
}

ReactDOM.render(<Contact />, div);

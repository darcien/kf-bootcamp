// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import ContactList from './ContactList';

let div = document.createElement('div');
if (document.body) {
  document.body.appendChild(div);
}

ReactDOM.render(<ContactList />, div);

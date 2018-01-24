// @flow
// react is universal
import React from 'react';
// dealing with browers with dom
import ReactDOM from 'react-dom';
// for mobile, use react-native

import App from './App';

// createElement takes 3 args or more
// 1. The type, li, p, div, or even App and Todo
// 2. The props, onClick, isWrong, etc...
// 3. The children, could be another createElement or just a string, haha

let body = document.body;

if (body) {
  function render() {
    ReactDOM.render(<App state={state} />, body);
  }
  render();
}

let state = {
  todoItems: [
    {id: '4', content: 'Buy oreos', isDone: true},
    {id: '5', content: 'Eat oreos', isDone: false},
    {id: '7', content: 'Buy more oreos', isDone: true},
  ],
};

export function set() {}

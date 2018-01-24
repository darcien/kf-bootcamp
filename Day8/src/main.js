// @flow

import {createElement} from 'react';
import {render} from 'react-dom';
import App from './App';

let todoItems = [
  {id: '4', content: 'Buy oreos', isDone: true},
  {id: '5', content: 'Eat oreos', isDone: false},
  {id: '7', content: 'Buy more oreos', isDone: true},
];

// createElement takes 3 args or more
// 1. The type, li, p, div, or even App and Todo
// 2. The props, onClick, isWrong, etc...
// 3. The children, could be another createElement or just a string, haha
render(createElement(App, {todoItems}), document.body);

let el = {
  type: App,
  props: 'todoitems',
};

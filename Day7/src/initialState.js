// @flow

import type {State} from './types/State';

let initialState: State = {
  todoItems: [
    {id: '4', content: 'Buy oreos', isDone: true},
    {id: '5', content: 'Eat oreos', isDone: false},
    {id: '7', content: 'Buy more oreos', isDone: true},
  ],
  newTask: '',
};

export default initialState;

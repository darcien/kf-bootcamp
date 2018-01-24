//@flow

import type {State, Todo} from './types/State';

type UpdateFunction = (State, ?mixed) => State;

type EventHandlerObject = {
  [eventName: string]: UpdateFunction,
};

let eventHandlers: EventHandlerObject = {
  toggleDone: (oldState, id) => {
    let newTodoItems = oldState.todoItems.map((item) => {
      if (item.id === id) {
        return {...item, isDone: !item.isDone};
      } else {
        return item;
      }
    });

    return {...oldState, todoItems: newTodoItems};
  },
  inputChanged: (oldState, inputValue) => {
    if (inputValue) {
      return {...oldState, newTask: String(inputValue)};
    }
    return oldState;
  },
  addTask: (oldState) => {
    let {todoItems, newTask} = oldState;
    let newTodo: Todo = {
      id: Math.random().toString(10),
      content: newTask,
      isDone: false,
    };
    let newTodoItems = [...todoItems, newTodo];
    return {...oldState, todoItems: newTodoItems, newTask: ''};
  },
};

export default eventHandlers;

//@flow

import type {State, Todo} from './types/State';

type UpdateFunction = (State) => State;

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
      return {...oldState, newTask: inputValue};
    }
    return oldState;
  },
  addTask: (oldState) => {
    let {todoItems, newTask} = oldState;
    if (newTask) {
      console.log(newTask);
      let newTodo: Todo = {
        id: Math.random().toString(10),
        content: newTask,
        isDone: false,
      };
      todoItems.push(newTodo);
    }
    return {...oldState, newTask: ''};
  },
};

export default eventHandlers;

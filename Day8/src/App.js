// @flow
import React from 'react';
import TodoItem from './TodoItem';
import {setState} from './state';

import type {State} from './state';

type Props = {
  state: State,
};

export default function App(props: Props) {
  let {state} = props;
  let {todoItems} = state;
  let toggleDone = (id) => {
    let newTodoItems = state.todoItems.map((item) => {
      if (item.id === id) {
        return {...item, isDone: !item.isDone};
      } else {
        return item;
      }
    });
    setState({
      ...state,
      todoItems: newTodoItems,
    });
  };

  let textChanged = (event) => {
    let newTextInput = event.target.value;
    setState({
      ...state,
      textInput: newTextInput,
    });
  };

  let addNewTask = () => {
    let newTask = {
      id: Math.random().toString(10),
      content: state.textInput,
      isDone: false,
    };

    let newTodoItems = [...todoItems, newTask];
    // Clear the textInput after adding to todoItems
    let newTextInput = '';
    setState({...state, todoItems: newTodoItems, textInput: newTextInput});
  };

  let removeTask = (id) => {
    let newTodoItems = state.todoItems.filter((item) => {
      return item.id !== id;
    });
    setState({
      ...state,
      todoItems: newTodoItems,
    });
  };

  return (
    <div>
      <ul>
        {todoItems.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            toggleDone={toggleDone}
            removeTask={removeTask}
          />
        ))}
      </ul>
      <input type="text" value={state.textInput} onInput={textChanged} />
      <button onClick={addNewTask}>Save</button>
    </div>
  );
}

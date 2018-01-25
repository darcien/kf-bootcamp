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
    let newInput = state.textInput;

    let newTask = {
      id: Math.random().toString(10),
      content: newInput,
      isDone: false,
    };

    // Clear the textInput after adding to todoItems
    let newTextInput = '';
    setState({
      ...state,
      todoItems: [...todoItems, newTask],
      textInput: newTextInput,
    });
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

  let notDoneItems = todoItems.filter((item) => !item.isDone);
  let doneItems = todoItems.filter((item) => item.isDone);

  let newTodoItems = [...notDoneItems, ...doneItems];

  return (
    <table>
      {newTodoItems.map((item) => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            toggleDone={toggleDone}
            removeTask={removeTask}
          />
        );
      })}

      <input type="text" value={state.textInput} onInput={textChanged} />
      <button onClick={addNewTask}>Save</button>
    </table>
  );
}

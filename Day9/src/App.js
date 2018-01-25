// @flow
import React, {Component} from 'react';
import TodoItem from './TodoItem';
import NewItemForm from './NewItemForm';

import type {State} from './state';

type Props = {};

class App extends Component<Props, State> {
  state = {
    todoItems: [
      {id: '100', content: 'Buy Apples', isDone: false},
      {id: '120', content: 'Wash Car', isDone: false},
    ],
    searchValue: '',
    inputValue: '',
  };

  _onSearchChange = (event: Object) =>
    this.setState({searchValue: event.target.value});

  _onToggleDone = (id: string) => {
    let newItems = this.state.todoItems.map(
      (item) => (item.id === id ? {...item, isDone: !item.isDone} : item),
    );
    this.setState({
      todoItems: newItems,
    });
  };

  _addItem = (content: string) => {
    let {todoItems} = this.state;
    let newItem = {
      id: Math.random().toString(),
      content,
      isDone: false,
    };
    this.setState({
      todoItems: [...todoItems, newItem],
    });
  };

  _onChange = (e: Object) => {
    this.setState({inputValue: e.target.value});
  };

  _clickClear = () => {
    this.setState({inputValue: ''});
  };

  render() {
    let {todoItems, searchValue, inputValue} = this.state;
    let filteredTodoItems = todoItems.filter((item) =>
      item.content.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={this._onSearchChange}
        />
        <ul>
          {filteredTodoItems.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              toggleDone={this._onToggleDone}
            />
          ))}
        </ul>
        <button onClick={this._clickClear}>Clear</button>
        <NewItemForm
          onChange={this._onChange}
          onAddItem={this._addItem}
          inputValue={inputValue}
        />
      </div>
    );
  }
}

export default App;

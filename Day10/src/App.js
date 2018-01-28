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
      {id: '180', content: 'Do Laundry', isDone: false},
      {id: '190', content: 'Teach Class', isDone: false},
    ],
    selectedIndex: 0,
    searchValue: '',
    inputValue: '',
  };

  componentDidMount() {
    document.addEventListener('keypress', this._handleKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this._handleKeypress);
  }

  _handleKeypress = (event: Object) => {
    const keyName = event.key;
    let {todoItems, selectedIndex} = this.state;
    let newSelectedIndex = selectedIndex;
    if (keyName === 'ArrowDown') {
      newSelectedIndex = Math.min(selectedIndex + 1, todoItems.length - 1);
    }
    if (keyName === 'ArrowUp') {
      newSelectedIndex = Math.max(selectedIndex - 1, 0);
    }
    if (newSelectedIndex !== selectedIndex) {
      this.setState({
        selectedIndex: newSelectedIndex,
      });
    }
    if (keyName === ' ' && document.activeElement === document.body) {
      let selectedId = todoItems[selectedIndex].id;
      this._onToggleDone(selectedId);
    }
  };

  _onToggleDone = (id: string) => {
    let newItems = this.state.todoItems.map(
      (item) => (item.id === id ? {...item, isDone: !item.isDone} : item),
    );
    this.setState({
      todoItems: newItems,
    });
  };

  _addItem = () => {
    let {todoItems, inputValue} = this.state;
    if (inputValue.trim() !== '') {
      return;
    }

    let newItem = {
      id: Math.random().toString(),
      content: inputValue,
      isDone: false,
    };
    this.setState({
      todoItems: [...todoItems, newItem],
      inputValue: '',
    });
  };

  _onTextChange = (newValue: string) => {
    this.setState({inputValue: newValue});
  };

  render() {
    let {todoItems, inputValue, searchValue, selectedIndex} = this.state;
    let onSearchChange = (event) => {
      this.setState({searchValue: event.target.value});
    };
    let filteredTodoItems;
    if (searchValue === '') {
      filteredTodoItems = todoItems;
    } else {
      let lowerSearchValue = searchValue.toLowerCase();
      filteredTodoItems = todoItems.filter((item) => {
        return item.content.toLowerCase().includes(lowerSearchValue);
      });
    }
    return (
      <div>
        <input
          type="text"
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search..."
        />
        <ul style={{listStyle: 'none', padding: 0}}>
          {filteredTodoItems.map((item, index) => (
            <TodoItem
              key={item.id}
              item={item}
              isSelected={index === selectedIndex}
              toggleDone={this._onToggleDone}
            />
          ))}
        </ul>
        <NewItemForm
          inputValue={inputValue}
          onTextChange={this._onTextChange}
          onAddItem={this._addItem}
        />
      </div>
    );
  }
}

export default App;

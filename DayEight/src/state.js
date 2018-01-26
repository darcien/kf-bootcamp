// @flow

type TodoItem = {
  id: string,
  content: string,
  isDone: boolean,
};

export type State = {
  todoItems: Array<TodoItem>,
  selectedIndex: number,
  searchValue: string,
  inputValue: string,
};

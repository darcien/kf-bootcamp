//@flow
export type Todo = {
  id: string,
  content: string,
  isDone: boolean,
};

export type State = {
  todoItems: Array<Todo>,
  newTask: string,
};

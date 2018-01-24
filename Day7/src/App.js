//@flow
import type {State, Todo} from './types/State';

function renderTodo(todo: Todo) {
  let {id, content, isDone} = todo;

  let newContent = isDone ? `<s>${content}</s>` : `${content}`;

  return `<li id="${id}" onClick="emitEvent('toggleDone','${id}')">${newContent}</li>`;
}

function renderTodoList(list: Array<Todo>) {
  let html = `<ul>`;
  list.forEach((item) => {
    html += renderTodo(item);
  });
  html += `</ul>`;
  return html;
}

function renderButton(name: string) {
  return `<button onClick="emitEvent('${name}',this)">${name}</button>`;
}

function renderAddTask(currentInput: string) {
  return `<p>New task: <input type="text" value="${currentInput}" name="newTask" onInput="emitEvent('inputChanged', this.value)">
  <button name='addTask' onClick="emitEvent('addTask')">Add task</button></p>`;
  // ${renderButton('addTask')}</p>`;
}

function renderApp(state: State) {
  return `<p>
    Hello World</p>
    <p>${renderTodoList(state.todoItems)}</p>
    ${renderAddTask(state.newTask)}`;
  // return `<p>Hello World</p>`;
}

export default renderApp;

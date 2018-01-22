//@flow

type Todo = {
  id: string,
  content: string,
};

let thingsTodo = [
  {id: '1', content: 'ZXC'},
  {id: '2', content: 'A'},
  {id: '3', content: 'B'},
];

function renderButton(string, onclickProp) {
  let button = `<button onClick=${onclickProp}>${string}</button>`;

  return button;
}

function renderTodoItem(todo: Todo, style: string = '') {
  let {content} = todo;
  return `<li style="${style}">${content}</li>`;
}

function renderListItem(list: Array<Todo>, fn: Function, style: string = '') {
  let html = `<ul>`;
  list.map((todo) => {
    html += fn(todo, style);
  });
  html += '</ul>';

  console.log(html);
  return html;
}

function render() {
  if (document.body != null) {
    // document.body.innerHTML =
    //   renderListItem &&
    //   renderListItem(
    //     thingsTodo,
    //     renderTodoItem,
    //     'color:red; background-color:black',
    //   );
    let buttonProp = 'alert("dor")';
    document.body.innerHTML =
      renderButton && renderButton('Click me', buttonProp);
  }
}

render();

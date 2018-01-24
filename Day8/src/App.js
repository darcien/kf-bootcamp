//@flow

import React, {createElement} from 'react';

function Todo(props) {
  let {item} = props;

  // JSX
  // Use curly braces to wrap any js thing like variable and function
  // You dont need any for regular old string
  return <li onClick={() => console.log('clicked')}>{item.content}</li>;
  // Equivalent to this
  // return createElement(
  //   'li',
  //   {
  //     onClick: () => console.log('clicked'),
  //   },
  //   item.content,
  // );
}

function App(props: Object) {
  let {todoItems} = props;
  return createElement(
    'ul',
    {},
    todoItems.map((item) => {
      return createElement(Todo, {item});
    }),
  );
}

export default App;

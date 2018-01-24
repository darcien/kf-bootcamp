//@flow

import React, {createElement} from 'react';

// Rewrite all createElement with JSX - Done

type ItemProps = {};

function TodoItem(props: ItemProps) {
  let {item} = props;

  // JSX
  // Use curly braces to wrap any js thing like variable and function
  // You dont need any for regular old string
  return (
    <li
      onClick={() => {
        item.isDone = !item.isDone;
        console.log(item);
      }}
    >
      {item.isDone ? <s>{item.content}</s> : item.content}
    </li>
  );
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

  return (
    <ul>
      {todoItems.map((item) => {
        //  return createElement(Todo, {item});
        return <Todo key={item.id} item={item} />;
      })}
    </ul>
  );
}

export default App;

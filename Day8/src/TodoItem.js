// @flow
import React from 'react';

type Props = {
  item: Object,
  toggleDone: (id: string) => void,
  removeTask: (id: string) => void,
};

export default function TodoItem(props: Props) {
  let {item, toggleDone, removeTask} = props;
  let content = item.isDone ? <s>{item.content}</s> : item.content;
  return (
    // <li onClick={() => toggleDone(item.id)}>
    <li>
      {content}
      <button onClick={() => toggleDone(item.id)}>Toggle Done</button>
      <button onClick={() => removeTask(item.id)}>✖</button>
    </li>
  );
}

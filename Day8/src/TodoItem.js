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
    <tr>
      <td>{content}</td>
      <td>
        <button onClick={() => toggleDone(item.id)}>Toggle Done</button>
      </td>
      <td>
        <button onClick={() => removeTask(item.id)}>✖</button>
      </td>
    </tr>
  );
}

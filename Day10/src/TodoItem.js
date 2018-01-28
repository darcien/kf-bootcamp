// @flow
import React from 'react';

type Props = {
  item: Object,
  toggleDone: (id: string) => void,
  isSelected: boolean,
};

const commonStyle = {
  margin: 0,
  padding: 3,
};
const unselectedStyle = {
  ...commonStyle,
  backgroundColor: 'transparent',
  color: 'black',
};
const selectedStyle = {
  ...commonStyle,
  backgroundColor: '#008000',
  color: 'white',
};

export default function TodoItem(props: Props) {
  let {item, toggleDone, isSelected} = props;
  let content = item.isDone ? <s>{item.content}</s> : item.content;
  let style = isSelected ? selectedStyle : unselectedStyle;
  return (
    <li style={style} onClick={() => toggleDone(item.id)}>
      {content}
    </li>
  );
}

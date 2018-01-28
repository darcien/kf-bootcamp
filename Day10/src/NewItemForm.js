// @flow
import React from 'react';

type Props = {
  inputValue: string,
  onTextChange: (text: string) => void,
  onAddItem: () => void,
};

function NewItemForm(props: Props) {
  let {inputValue, onTextChange, onAddItem} = props;
  let onChange = (event) => {
    onTextChange(event.target.value);
  };
  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={onAddItem}>Submit</button>
    </div>
  );
}

export default NewItemForm;

// @flow
import React from 'react';

type Props = {
  inputValue: string,
  onAddItem: (content: string) => void,
  onChange: (e: Object) => void,
};

function NewItemForm(props: Props) {
  let {onAddItem, onChange, inputValue} = props;

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={onAddItem}>Submit</button>
    </div>
  );
}
export default NewItemForm;

import React from 'react';

import {shallow} from 'enzyme';

// import App from '../App';
import NewItemForm from '../NewItemForm';

it('should render a form', () => {
  let inputValue = '';
  let onChange = () => {};
  let onAddItem = () => {};

  let wrapper = shallow(
    <NewItemForm
      onChange={onChange}
      onAddItem={onAddItem}
      inputValue={inputValue}
    />,
  );

  expect(
    wrapper.contains(
      <div>
        <input type="text" value={inputValue} onChange={onChange} />
        <button onClick={onAddItem}>Submit</button>
      </div>,
    ),
  ).toEqual(true);
});
// it('should return NewItemForm', () => {
//   let wrapper = shallow(<App />);
//   expect(wrapper.find(NewItemForm)).toHaveLength(1);
// });

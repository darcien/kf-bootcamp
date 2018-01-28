// @flow
import React from 'react';
import {shallow} from 'enzyme';

import NewItemForm from '../NewItemForm';

it('should render a form', () => {
  let onChange = () => {};
  let onAddItem = () => {};
  let wrapper = shallow(
    <NewItemForm
      inputValue=""
      onTextChange={onChange}
      onAddItem={onAddItem}
    />
  );
  expect(
    wrapper.matchesElement(
      <div>
        <input type="text" value="" />
        <button onClick={onAddItem}>Submit</button>
      </div>
    )
  ).toEqual(true);
});

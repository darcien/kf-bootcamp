// @flow

import React from 'react';

import type {Contact} from './types/State';

type Props = {
  contact: Contact,
  onSelectContact: (contact: Contact) => void,
  isSelected: boolean,
};

const commonStyle = {
  margin: 0,
  padding: 3,
  borderBottom: '1px solid black',
};

const selectedStyle = {
  ...commonStyle,
  paddingLeft: 6,
  margin: 6,
  backgroundColor: 'lightblue',
  borderBottom: '1px dashed blue',
};

const unselectedStyle = {
  ...commonStyle,
  backgroundColor: 'transparent',
  color: 'black',
};

export default function ContactItem(props: Props) {
  let {contact, onSelectContact, isSelected} = props;
  let {id, name, phoneNumber} = contact;

  return (
    <li
      style={isSelected ? selectedStyle : unselectedStyle}
      onClick={() => onSelectContact(contact)}
    >
      <div className="list-name">{name}</div>
      <div className="list-phoneNumber">{phoneNumber}</div>
    </li>
  );
}

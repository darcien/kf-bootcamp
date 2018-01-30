// @flow

import React from 'react';

import type {Contact} from './types/State';

type Props = {
  contact: Contact,
  onSelectContact: (id: string) => void,
  isSelected: boolean,
  contactID: string,
};

const commonStyle = {
  margin: 0,
  padding: 10,
  borderBottom: '1px solid black',
};

const selectedStyle = {
  ...commonStyle,
  padding: 13,
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
  let {contact, contactID, onSelectContact, isSelected} = props;
  let {name, phoneNumber} = contact;

  return (
    <li
      key={contactID}
      style={isSelected ? selectedStyle : unselectedStyle}
      onClick={() => onSelectContact(contactID)}
    >
      <div className="list-name">{name}</div>
      <div className="list-phoneNumber">{phoneNumber}</div>
    </li>
  );
}

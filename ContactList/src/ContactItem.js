// @flow

import React from 'react';

import type {Contact} from './types/State';

type Props = {
  contact: Contact,
};

export default function ContactItem(props: Props) {
  let {contact, style} = props;
  let {name, phoneNumber} = contact;

  // let style
  // TODO Check for isSelected first before render
  return (
    <li>
      <div className="list-name">{name}</div>
      <div className="list-phoneNumber">{phoneNumber}</div>
    </li>
  );
}

// @flow

import React from 'react';

import type {Contact} from './types/State';

type Props = {
  selectedIndex: number,
  selectedContact: Contact,
};

export default function DetailView(props: Props) {
  let {selectedContact} = props;
  let {name, phoneNumber} = selectedContact;

  return (
    <div>
      <div className="detail-header">
        <h1>Details:</h1>
      </div>
      <div className="detail-name">{name}</div>
      <div className="detail-phoneNumber">{phoneNumber}</div>
    </div>
  );
}

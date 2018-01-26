// @flow
import React, {Component} from 'react';
import ListView from './ListView';
import DetailView from './DetailView';

import initialContactList from './initialContactList';

import type {Contact, State} from './types/State';

type Props = {};

class ContactList extends Component<Props, State> {
  emptyContact: Contact = {
    id: '-1',
    name: 'Bleep',
    phoneNumber: '',
  };

  state = {
    contacts: initialContactList,
    selectedIndex: 0,
    searchValue: '',
    selectedContact: this.emptyContact,
  };

  initialStyle = {
    display: 'flex',
    backgroundColor: 'grey',
    justifyContent: 'space-around',
  };

  _onSelectContact = (contact: Contact) => {
    this.setState({selectedContact: contact});
  };

  render() {
    let {contacts, selectedIndex, searchValue, selectedContact} = this.state;

    return (
      <div style={this.initialStyle}>
        <ListView
          contacts={contacts}
          selectedIndex={selectedIndex}
          searchValue={searchValue}
        />
        <DetailView
          selectedIndex={selectedIndex}
          selectedContact={selectedContact}
        />
      </div>
    );
  }
}

export default ContactList;

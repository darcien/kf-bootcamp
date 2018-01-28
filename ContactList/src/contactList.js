// @flow
import React, {Component} from 'react';
import ListView from './ListView';
import DetailView from './DetailView';

import initialContactList from './initialContactList';

import type {Contact, State} from './types/State';

type Props = {};

const appStyle = {
  display: 'flex',
  backgroundColor: 'grey',
  justifyContent: 'space-between',
  padding: 6,
};

class ContactList extends Component<Props, State> {
  emptyContact: Contact = {
    id: '-1',
    name: '',
    phoneNumber: '',
    githubUsername: '',
  };

  state = {
    contacts: initialContactList,
    selectedIndex: 0,
    searchValue: '',
    selectedContact: this.emptyContact,
  };

  _onSelectContact = (contact: Contact) => {
    let {contacts, searchValue} = this.state;

    let filteredContacts;
    if (searchValue === '') {
      filteredContacts = contacts;
    } else {
      let lowerSearchValue = searchValue.toLowerCase();
      filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(lowerSearchValue);
      });
    }

    for (let i = 0; i < filteredContacts.length; i++) {
      if (filteredContacts[i].id === contact.id) {
        this.setState({selectedIndex: i, selectedContact: contact});
      }
    }
  };

  _onSearchChange = (event: Object) => {
    this.setState({
      selectedIndex: 0,
      searchValue: event.target.value,
      selectedContact: this.emptyContact,
    });
  };

  _onRemoveContact = (id: string) => {
    let {contacts} = this.state;

    let newContacts = contacts.filter((contact) => contact.id !== id);

    this.setState({
      contacts: newContacts,
      selectedContact: this.emptyContact,
    });
  };

  render() {
    let {contacts, selectedContact, selectedIndex, searchValue} = this.state;

    return (
      <div style={appStyle}>
        <ListView
          contacts={contacts}
          onSearchChange={this._onSearchChange}
          onSelectContact={this._onSelectContact}
          selectedIndex={selectedIndex}
          searchValue={searchValue}
        />
        <DetailView
          onRemoveContact={this._onRemoveContact}
          selectedContact={selectedContact}
        />
      </div>
    );
  }
}

export default ContactList;

// @flow
import React, {Component} from 'react';
import ListView from './ListView';
import DetailView from './DetailView';

import initialContactList from './initialContactList';

import type {Contact, State} from './types/State';

import style from './styles/ContactList.css';

type Props = {};

const appStyle = {
  display: 'flex',
  backgroundColor: '#ffe5e5',
  justifyContent: 'space-between',
  padding: 6,
  overflow: 'hidden',
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

  componentDidMount() {
    document.addEventListener('keypress', this._handleKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this._handleKeypress);
  }

  // Still having issues with wrong detail view when selecting contact with
  // keyboard.
  // Posstible solution, save filtered contacts in state, performance degradation?
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
    let {contacts} = this.state;
    let newSelectedContact = this.emptyContact;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name.includes(event.target.value)) {
        newSelectedContact = contacts[i];
        break;
      }
    }

    this.setState({
      selectedIndex: 0,
      searchValue: event.target.value,
      selectedContact: newSelectedContact,
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

  _handleKeypress = (event: Object) => {
    const keyName = event.key;

    let {contacts, selectedIndex} = this.state;
    let newSelectedIndex = selectedIndex;

    if (keyName === 'ArrowDown') {
      newSelectedIndex = Math.min(selectedIndex + 1, contacts.length - 1);
    }
    if (keyName === 'ArrowUp') {
      newSelectedIndex = Math.max(selectedIndex - 1, 0);
    }
    if (newSelectedIndex !== selectedIndex) {
      this.setState({
        selectedIndex: newSelectedIndex,
        selectedContact: contacts[newSelectedIndex],
      });
    }
  };

  render() {
    let {contacts, selectedContact, selectedIndex, searchValue} = this.state;

    return (
      <div className="container" style={appStyle}>
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

// @flow
import React, {Component} from 'react';
import ListView from './ListView';
import DetailView from './DetailView';
import NewContactForm from './NewContactForm';

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
  state = {
    contacts: initialContactList,
    selectedIndex: 0,
    selectedID: null,
    searchValue: '',
    selectedContact: null,
  };

  componentDidMount() {
    document.addEventListener('keypress', this._handleKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this._handleKeypress);
  }

  _onAddContact = (newContact: Contact) => {
    let {contacts} = this.state;

    let newID = Math.random().toString(10);
    let newContacts = {...contacts, [newID]: newContact};

    this.setState({contacts: newContacts});
  };

  // Still having issues with wrong detail view when selecting contact with
  // keyboard.
  // Should I disable keyboard nav when filtering or store the filtered contacts
  // instead?
  // Removed keyboard handling instead...
  _onSelectContact = (id: string) => {
    let {contacts} = this.state;

    let newSelectedContact;

    if (contacts.hasOwnProperty(id)) {
      newSelectedContact = contacts[id];
    } else {
      newSelectedContact = null;
    }

    this.setState({selectedID: id, selectedContact: newSelectedContact});
  };

  _onSearchChange = (event: Object) => {
    let newSelectedContact = null;

    this.setState({
      selectedIndex: 0,
      searchValue: event.target.value,
      selectedContact: newSelectedContact,
    });
  };

  _onRemoveContact = (id: ?string) => {
    let {contacts} = this.state;

    let newContacts = contacts;

    if (id && contacts.hasOwnProperty(id)) {
      delete newContacts[id];
    }

    this.setState({
      contacts: newContacts,
      selectedContact: null,
    });
  };

  _handleKeypress = (event: Object) => {
    const keyName = event.key;
  };

  render() {
    let {contacts, selectedContact, selectedID, searchValue} = this.state;

    return (
      <div className="container" style={appStyle}>
        <ListView
          contacts={contacts}
          onSearchChange={this._onSearchChange}
          onSelectContact={this._onSelectContact}
          selectedID={selectedID}
          searchValue={searchValue}
        />
        <DetailView
          key={selectedID}
          selectedID={selectedID}
          onRemoveContact={this._onRemoveContact}
          selectedContact={selectedContact}
        />
        <NewContactForm onAddContact={this._onAddContact} />
      </div>
    );
  }
}

export default ContactList;

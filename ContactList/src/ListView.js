// @flow

import React, {Component} from 'react';
import type {Contact} from './types/State';
import ContactItem from './ContactItem';

type Props = {
  contacts: ?{[string]: Contact},
  selectedID: ?string,
  onSearchChange: (event: Object) => void,
  onSelectContact: (id: string) => void,
  searchValue: string,
};

const listViewStyle = {
  flex: '0 0 400px',
  margin: 6,
  padding: 6,
  border: '1px solid black',
  overflow: 'hidden',
  display: 'box',
};

const searchStyle = {
  fontSize: '1em',
  width: '100%',
  padding: '12px 15px',
  margin: '10px 0',
  boxSizing: 'border-box',
  backgroundColor: '#f1e5f9',
};

const listStyle = {
  minHeight: '400px',
  maxHeight: '400px',
  overflowY: 'scroll',
};

const commonStyle = {
  listStyle: 'none',
  padding: 0,
};

class ListView extends Component<Props> {
  render() {
    let {
      contacts,
      onSearchChange,
      onSelectContact,
      selectedID,
      searchValue,
    } = this.props;

    let contactList = [];

    if (contacts) {
      let contactsID = Object.keys(contacts);

      let filteredContacts = {};
      if (searchValue === '') {
        filteredContacts = contacts;
      } else {
        let lowerSearchValue = searchValue.toLowerCase();
        for (let id of contactsID) {
          if (contacts[id].name.toLowerCase().includes(lowerSearchValue)) {
            filteredContacts[id] = contacts[id];
          }
        }
      }

      let filteredContactsID = Object.keys(filteredContacts);

      for (let id of filteredContactsID) {
        contactList.push(
          <ContactItem
            isSelected={selectedID === id}
            onSelectContact={onSelectContact}
            key={id}
            contactID={id}
            contact={filteredContacts[id]}
          />,
        );
      }
    }

    return (
      <div style={listViewStyle}>
        <input
          style={searchStyle}
          type="text"
          placeholder="Search contact..."
          onChange={onSearchChange}
        />
        <div style={listStyle}>
          <ul style={commonStyle} className="contact-list">
            {contactList}
          </ul>
        </div>
      </div>
    );
  }
}

export default ListView;

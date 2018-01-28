// @flow

import React, {Component} from 'react';
import type {Contact} from './types/State';
import ContactItem from './ContactItem';

type Props = {
  contacts: Array<Contact>,
  selectedIndex: number,
  onSearchChange: (event: Object) => void,
  onSelectContact: (contact: Contact) => void,
  searchValue: string,
};

const listViewStyle = {
  flex: '1 0 200px',
  margin: 6,
  padding: 6,
  border: '1px solid black',
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
      selectedIndex,
      searchValue,
    } = this.props;

    let filteredContacts;
    if (searchValue === '') {
      filteredContacts = contacts;
    } else {
      let lowerSearchValue = searchValue.toLowerCase();
      filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(lowerSearchValue);
      });
    }

    return (
      <div style={listViewStyle}>
        <input
          type="text"
          placeholder="Search contact..."
          onChange={onSearchChange}
        />
        <ul style={commonStyle} className="contact-list">
          {filteredContacts.map((item, index) => (
            <ContactItem
              isSelected={selectedIndex === index}
              onSelectContact={onSelectContact}
              key={item.id}
              contact={item}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ListView;

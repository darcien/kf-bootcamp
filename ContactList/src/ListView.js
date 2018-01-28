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
          style={searchStyle}
          type="text"
          placeholder="Search contact..."
          onChange={onSearchChange}
        />
        <div style={listStyle}>
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
      </div>
    );
  }
}

export default ListView;

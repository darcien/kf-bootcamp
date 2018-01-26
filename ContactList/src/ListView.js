// @flow

import React, {Component} from 'react';
import type {Contact} from './types/State';
import ContactItem from './ContactItem';

type Props = {
  contacts: Array<Contact>,
  selectedIndex: number,
  searchValue: string,
};

class ListView extends Component<Props> {
  commonStyle = {
    listStyle: 'none',
    padding: 0,
  };

  render() {
    let {contacts, selectedIndex, searchValue} = this.props;

    return (
      <div>
        This is a List
        <ul style={this.commonStyle} className="contact-list">
          {contacts.map((item, index) => (
            <ContactItem
              style={this.commonStyle}
              key={item.id}
              contact={item}
              // TODO try passing isSelected instead of id
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ListView;

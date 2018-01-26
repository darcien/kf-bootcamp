// @flow
import React, {Component} from 'react';
import ListView from './ListView';
import DetailView from './DetailView';

import contactList from './contactList';

import type {State} from './types/State';

type Props = {};

class Contact extends Component<Props, State> {
  state = {
    contacts: contactList,
    selectedIndex: 0,
    searchValue: '',
  };

  render() {
    return <div />;
  }
}

export default Contact;

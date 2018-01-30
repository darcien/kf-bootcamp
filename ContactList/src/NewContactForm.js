// @flow

import React, {Component} from 'react';

import type {Contact} from './types/State';

type Props = {
  onAddContact: (Contact) => void,
};

type State = {
  newContact: Contact,
};

export default class NewContactForm extends Component<Props, State> {
  state = {
    newContact: {
      name: '',
      phoneNumber: '',
      githubUsername: null,
      email: null,
      googleUserID: null,
    },
  };

  _onInputChange = (event: Object) => {
    let input = event.target;

    let {newContact: oldContact} = this.state;

    if (input) {
      let newContact = {...oldContact, [input.id]: input.value};

      this.setState({newContact});
    }
  };

  render() {
    let {onAddContact} = this.props;

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  name="newContact"
                  id="name"
                  onChange={(event) => this._onInputChange(event)}
                />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                <input
                  type="email"
                  name="newContact"
                  id="email"
                  onChange={(event) => this._onInputChange(event)}
                />
              </td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>
                <input
                  type="text"
                  name="newContact"
                  id="phoneNumber"
                  onChange={(event) => this._onInputChange(event)}
                />
              </td>
            </tr>
            <tr>
              <td>Github username:</td>
              <td>
                <input
                  type="text"
                  name="newContact"
                  id="githubUsername"
                  onChange={(event) => this._onInputChange(event)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={() => onAddContact(this.state.newContact)}>
                  Add Contact
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

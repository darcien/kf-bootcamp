// @flow

import React, {Component} from 'react';

import type {Contact} from './types/State';

import {githubClientID, githubClientSecret} from './secret.js';

type Props = {
  onAddContact: (Contact) => void,
};

type State = {
  newContact: Contact,
  githubUsernameValid: boolean,
  errorMessage: ?string,
};

const formStyle = {
  flex: '1 0 auto',
  backgroundColor: '#75b9c7',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
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
    githubUsernameValid: false,
    errorMessage: null,
  };

  componentDidMount() {
    console.log('New Contact Mounted');
  }
  componentWillUnmount() {
    console.log('New Contact Unmounted');
  }

  // A delay identifier for checking new github username
  delay: any;

  _onInputChange = (event: Object) => {
    let input = event.target;

    let {newContact: oldContact} = this.state;

    clearTimeout(this.delay);

    if (input) {
      if (input.id === 'githubUsername') {
        // Pretty sure github allows single char username, but whatever
        if (input.value.trim().length > 4) {
          // Add delay to make sure user finished typing before spamming fetch
          this.delay = setTimeout(() => {
            this._checkGithubUsernameValidity(input.value);
          }, 700);
        }
      }
      let newContact = {...oldContact, [input.id]: input.value.trim()};
      this.setState({newContact});
    }
  };

  _checkGithubUsernameValidity = (username: string) => {
    let githubOAuth = `?client_id=${githubClientID}&client_secret=${githubClientSecret}`;
    let fetchUrl = 'https://api.github.com/users/' + username;

    fetch(fetchUrl + githubOAuth)
      .then((response) => {
        if (!response.ok) {
          let {status, statusText} = response;
          return Promise.reject({status, statusText});
        }
        return response.json();
      })
      .then(() => {
        this.setState({githubUsernameValid: true, errorMessage: null});
      })
      .catch((response) => {
        let {status, statusText} = response;

        this.setState({
          errorMessage: `> ${status} : Username ${statusText}`,
          githubUsernameValid: false,
        });
      });
  };

  render() {
    let {onAddContact} = this.props;
    let {errorMessage, githubUsernameValid} = this.state;

    let warning;

    if (errorMessage) {
      warning = (
        <tr style={{backgroundColor: 'red', color: 'white'}}>
          <td colSpan="2">{errorMessage}</td>
        </tr>
      );
    } else {
      warning = null;
    }

    return (
      <div style={formStyle}>
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
            {warning}
            <tr>
              <td>
                <button
                  disabled={!githubUsernameValid}
                  onClick={() => onAddContact(this.state.newContact)}
                >
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

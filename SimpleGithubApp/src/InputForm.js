// @flow

import React, {Component} from 'react';

type Props = {
  isUsernameValid: boolean,
  username: string,
  onChange: (string) => void,
  onClick: (void) => void,
  isChecking: boolean,
};

type State = {};

const formStyle = {
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
};

const lightPink = {
  backgroundColor: 'lightpink',
};

const lightGreen = {
  backgroundColor: 'lightgreen',
};

export default class InputForm extends Component<Props, State> {
  componentDidMount() {
    let {isChecking} = this.props;

    // Check the username here, or not...
  }

  render() {
    let {onChange, onClick, username, isUsernameValid, isChecking} = this.props;

    let usernameTips;

    if (username) {
      if (isChecking) {
        usernameTips = 'Now loading...';
      } else {
        switch (isUsernameValid) {
          case true:
            usernameTips = 'Valid username.';
            break;
          case false:
            usernameTips = 'Invalid username.';
            break;
        }
      }
    }

    return (
      <div style={formStyle}>
        <div>
          <input
            type="text"
            value={username}
            placeholder="Username..."
            onChange={(event) => {
              onChange(event.target.value);
            }}
            style={
              username && !isChecking
                ? isUsernameValid ? lightGreen : lightPink
                : {}
            }
          />
          <button disabled={!isUsernameValid} onClick={onClick}>
            Submit
          </button>
        </div>
        <div>{usernameTips}</div>
      </div>
    );
  }
}

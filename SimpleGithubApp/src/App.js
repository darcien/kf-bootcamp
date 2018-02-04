// @flow

import React, {Component} from 'react';

import InputForm from './InputForm';
import MainDisplay from './MainDisplay';

import Github from './API/Github';

type State = {
  isUsernameValid: boolean,
  username: string,
  delayID: ?TimeoutID,
  isChecking: boolean,
};

type Props = {};

export default class App extends Component<Props, State> {
  state = {
    isUsernameValid: false,
    username: '',
    delayID: null,
    isChecking: false,
  };

  _onInputChange = (username: string) => {
    let trimmedUsername = username.trim();

    let {delayID} = this.state;

    if (delayID) {
      clearTimeout(delayID);
    }

    if (trimmedUsername) {
      this.setState({
        username: trimmedUsername,
        delayID: setTimeout(() => {
          Github.checkUser(trimmedUsername).then((isValid) => {
            this.setState({
              isUsernameValid: isValid,
              isChecking: false,
            });
          });
        }, 1000),
        isChecking: true,
      });
    }
  };

  _onUserSubmit = () => {};

  render() {
    let {username, isUsernameValid, isChecking} = this.state;

    return (
      <div>
        <InputForm
          username={username}
          isUsernameValid={isUsernameValid}
          isChecking={isChecking}
          onChange={this._onInputChange}
          onClick={this._onUserSubmit}
        />
        {/* <MainDisplay /> */}
      </div>
    );
  }
}

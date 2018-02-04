// @flow

import React, {Component} from 'react';

import InputForm from './InputForm';
import MainDisplay from './MainDisplay';

import Github from './API/Github';

type State = {
  isUsernameValid: boolean,
  userInput: string,
  delayID: ?TimeoutID,
  isChecking: boolean,
  username: string,
};

type Props = {};

export default class App extends Component<Props, State> {
  state = {
    isUsernameValid: false,
    userInput: '',
    delayID: null,
    isChecking: false,
    username: '',
  };

  _onInputChange = (userInput: string) => {
    let trimmedUsername = userInput.trim();

    let {delayID} = this.state;

    if (delayID) {
      clearTimeout(delayID);
    }

    if (trimmedUsername) {
      this.setState({
        userInput: trimmedUsername,
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

  _onUserSubmit = () => {
    let {userInput} = this.state;

    console.log('userInput', userInput);

    this.setState({username: userInput});
  };

  render() {
    let {username, userInput, isUsernameValid, isChecking} = this.state;

    return (
      <div>
        <InputForm
          username={userInput}
          isUsernameValid={isUsernameValid}
          isChecking={isChecking}
          onChange={this._onInputChange}
          onClick={this._onUserSubmit}
        />
        <MainDisplay key={username.length} username={username} />
      </div>
    );
  }
}

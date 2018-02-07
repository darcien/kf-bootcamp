// @flow

/* eslint-disable no-console*/
import React, {Component} from 'react';

import HomeScene from './HomeScene';
import SearchScene from './SearchScene';
import FavoriteScene from './FavoriteScene';

import type {Route} from './types/Route';

type Props = {};

type State = {
  currentScene: Route,
};

let AllRoutes = {
  HOME: HomeScene,
  SEARCH: SearchScene,
  FAVORITE: FavoriteScene,
};

export default class App extends Component<Props, State> {
  state = {
    currentScene: 'HOME',
  };

  _history = [this.state.currentScene];

  _navigator = {
    goBack: () => {
      if (this._history.length) {
        let newScene = this._history.pop();
        this.setState({currentScene: newScene});
      }
    },
    goTo: (newScene: Route) => {
      this._history.push(newScene);
      this.setState({currentScene: newScene});
    },
  };

  render() {
    let {currentScene} = this.state;

    let Scene = AllRoutes[currentScene];

    if (Scene) {
      return <Scene navigator={this._navigator} />;
    } else {
      return <HomeScene navigator={this._navigator} />;
    }
  }
}

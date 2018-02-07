// @flow

/* eslint-disable no-console*/
import React, {Component} from 'react';

import HomeScene from './HomeScene';
import SearchScene from './SearchScene';
import FavoriteScene from './FavoriteScene';

import type {Route} from './types/Route';

type FavoriteSet = Set<Object>;

type Props = {};

type State = {
  currentScene: Route,
  favorites: FavoriteSet,
};

let AllRoutes = {
  HOME: HomeScene,
  SEARCH: SearchScene,
  FAVORITE: FavoriteScene,
};

const EMPTY_SET: Set<Object> = new Set();

export default class App extends Component<Props, State> {
  state = {
    currentScene: 'HOME',
    favorites: EMPTY_SET,
  };

  _history = [];

  favs = {
    add: (image: Object) => {
      let newFavorites = new Set(this.state.favorites);
      newFavorites.add(image);
      this.setState({favorites: newFavorites});
    },
    remove: (image: Object) => {
      let newFavorites = new Set(this.state.favorites);
      newFavorites.delete(image);
      this.setState({favorites: newFavorites});
    },
  };

  _navigator = {
    goBack: () => {
      if (this._history.length) {
        let newScene = this._history.pop();
        this.setState({currentScene: newScene});
      }
    },
    goTo: (newScene: Route) => {
      this._history.push(this.state.currentScene);
      this.setState({currentScene: newScene});
    },
  };

  render() {
    let {currentScene} = this.state;

    let Scene = AllRoutes[currentScene];

    if (Scene) {
      return <Scene favs={this.favs} navigator={this._navigator} />;
    } else {
      return <HomeScene navigator={this._navigator} />;
    }
  }
}

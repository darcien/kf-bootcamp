// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import StackNavigator from './Route';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return <StackNavigator />;
  }
}

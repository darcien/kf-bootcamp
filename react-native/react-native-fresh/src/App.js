// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.introText}>Good Morning BootCamp 4!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introText: {
    color: 'red',
  },
});

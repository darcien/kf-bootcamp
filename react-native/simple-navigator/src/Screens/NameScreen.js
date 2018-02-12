// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  navigation: Object,
};

export default class NameScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#ccc'}}>
          <Text>Hi</Text>
        </View>
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

// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {NavigationActions} from 'react-navigation';

type Props = {
  navigation: Object,
};

export default class DetailScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>Go back!</Text>
          </View>
        </TouchableOpacity>
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
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    backgroundColor: 'rgb(19, 28, 20)',
  },
  loginText: {
    color: 'rgb(171, 133, 203)',
  },
});

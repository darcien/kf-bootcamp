// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type Props = {};

export default class SummaryScreen extends Component<Props> {
  render() {
    //
    let {navigation: {state: {params}}} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Detail');
          }}
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>Go to detail!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    backgroundColor: 'rgb(81, 176, 95)',
  },
  loginText: {
    color: 'rgb(55, 28, 78)',
  },
});

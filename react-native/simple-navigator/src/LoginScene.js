// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type Props = {};

export default class LoginScene extends Component<Props> {
  render() {
    //
    let {navigation: {state: {params}}} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            console.log('Login');
            this.props.navigation.navigate('Home');
          }}
        >
          <View style={{width: 200, height: 200, backgroundColor: 'red'}}>
            <Text style={styles.introText}>Login!</Text>
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
  introText: {
    color: 'blue',
  },
});

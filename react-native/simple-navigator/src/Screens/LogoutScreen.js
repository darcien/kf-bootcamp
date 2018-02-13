// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  navigation: Object,
};

export default class LogoutScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            // this.props.navigation.navigate('Login', {isLoggedIn: false});
            this.props.navigation.popToTop();
          }}
        >
          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout!</Text>
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
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    backgroundColor: 'rgb(19, 28, 20)',
  },
  logoutText: {
    color: 'rgb(171, 133, 203)',
  },
});

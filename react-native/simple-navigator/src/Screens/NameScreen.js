// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {NavigationActions} from 'react-navigation';

type Props = {
  navigation: Object,
};

export default class NameScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    let {params} = navigation.state;

    return {
      title: params ? params.title : 'Insert title jokes here',
    };
  };

  render() {
    let {navigation: {state: {params}}} = this.props;

    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#ccc'}}>
          <Text>Hi {params.name}</Text>
        </View>
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

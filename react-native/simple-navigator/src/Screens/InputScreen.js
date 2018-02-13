// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

type Props = {};
type State = {
  name: string,
};

export default class SummaryScreen extends Component<Props, State> {
  state = {
    name: '',
  };

  _onChangeText = (name: string) => {
    this.setState({name});
  };

  render() {
    let {name} = this.state;
    let {navigation: {state: {params}}} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Input your name here..."
            value={name}
            onChangeText={(name) => {
              this._onChangeText(name);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Name', {name, title: name});
          }}
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>Submit name!</Text>
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
  inputContainer: {
    borderWidth: 1,
    padding: 4,
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

// @flow

import React from 'react';

import {
  Button,
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

type Props = {
  navigator: Object,
};

export default function HomeScene(props: Props) {
  let {navigator} = props;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Image(not)ur</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigator.goTo('SEARCH')} title="SEARCH" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigator.goTo('FAVORITE')} title="FAVORITES" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    marginVertical: 50,
    alignSelf: 'stretch',
    backgroundColor: '#fff3',
    alignItems: 'center',
    borderRadius: 20,
  },
  header: {
    fontSize: 30,
    color: '#fff',
  },
  buttonContainer: {
    margin: 20,
    backgroundColor: '#fff1',
  },
});

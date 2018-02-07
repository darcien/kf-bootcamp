// @flow

import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
} from 'react-native';

type Props = {
  navigator: Object,
  favs: Object,
};

export default class FavoriteScene extends Component<Props> {
  render() {
    let {navigator} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={() => navigator.goBack()}>
            <View style={styles.back}>
              <Text>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigator.goTo('SEARCH')}>
            <View style={styles.home}>
              <Text>Search</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {/* <ImageGrid imageList={fetchedGallery} /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#0005',
    alignItems: 'stretch',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  scrollContainer: {
    backgroundColor: '#ffb6c9',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    flex: 1,
  },
  buttonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 4,
  },
  back: {
    flex: 1,
    backgroundColor: '#f55',
    borderWidth: 2,
    padding: 2,
    alignItems: 'center',
  },
  home: {
    flex: 1,
    backgroundColor: '#55f',
    borderWidth: 2,
    padding: 2,
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 3,
    backgroundColor: '#fff2',
  },
  imageContentContainer: {
    padding: 3,
    flexDirection: 'row',
    backgroundColor: '#eff0f1',
  },
  imageTitleContainer: {
    padding: 3,
  },
  imageTitle: {
    fontSize: 20,
    color: 'blue',
  },
  image: {
    margin: 6,
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  imageDescriptionContainer: {
    flexDirection: 'row',
    // Wrapping with flex -1 instead.
    flex: -1,
  },
  imageDescription: {
    // Wrap doesn't seem to have any effect.
    // flexWrap: 'wrap',
  },
});

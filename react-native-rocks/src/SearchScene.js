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
import PropTypes from 'prop-types';

import ImageGrid from './ImageGrid';

import {clientId} from './secrets.js';

type Props = {
  navigator: Object,
  favs: Object,
};

type State = {
  query: string,
  fetchedGallery: Array<Object>,
};

export default class SearchScene extends Component<Props, State> {
  getChildContext() {
    return {styles};
  }

  state = {
    query: 'coffee',
    fetchedGallery: [],
  };

  _onTextChange = (query: string) => {
    this.setState({query});
  };

  _onSubmit = () => {
    console.log('Now fetching', this.state.query);

    fetch(`https://api.imgur.com/3/gallery/search/?q=${this.state.query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Client-ID ${clientId}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      // Not album version, image link is in 'link' directly instead of 'images'
      .then((result) => {
        return result.data.filter((gallery) => {
          return (
            !gallery.is_album && gallery.type.includes('image') && !gallery.nsfw
          );
        });
      })
      .then((filteredResult) => {
        return filteredResult.map((gallery) => {
          let {id, title, description, link} = gallery;
          return {key: id, id, title, description, link};
        });
      })
      .then((fetchedGallery) => {
        this.setState({fetchedGallery});
      });
  };

  render() {
    let {navigator} = this.props;
    let {query, fetchedGallery} = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={query}
          onChangeText={(query) => this._onTextChange(query)}
        />
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={() => navigator.goBack()}>
            <View style={styles.back}>
              <Text>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this._onSubmit}>
            <View style={styles.submit}>
              <Text>Submit</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigator.goTo('FAVORITE')}>
            <View style={styles.favs}>
              <Text>Favs</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <ImageGrid imageList={fetchedGallery} />
        </ScrollView>
      </View>
    );
  }
}

SearchScene.childContextTypes = {
  styles: PropTypes.object,
};

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
  textInput: {
    borderStyle: 'solid',
    padding: 6,
    backgroundColor: '#ccc',
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
  submit: {
    flex: 2,
    backgroundColor: '#5f5',
    borderWidth: 2,
    padding: 2,
    alignItems: 'center',
  },
  favs: {
    flex: 1,
    backgroundColor: '#ff3',
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

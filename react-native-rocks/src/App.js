// @flow

/* eslint-disable no-console*/
import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  View,
} from 'react-native';

type Props = {};

type State = {
  query: string,
  fetchedGallery: Array<Array<string>>,
};

export default class App extends Component<Props, State> {
  state = {
    query: '',
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
        Authorization: 'Client-ID fc3a9c55f0028e9',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result.data.filter((gallery) => {
          return gallery.is_album;
        });
      })
      .then((filteredResult) => {
        return filteredResult.map((gallery) => {
          // console.log('Gallery', Array.isArray(gallery.images));
          if (!Array.isArray(gallery.images) && typeof gallery === 'object') {
            console.log('This one isnt an array', gallery);
          }

          let filteredGallery = gallery.images.filter((image) => {
            return image.type.includes('image');
          });

          return filteredGallery.map((image) => {
            let imgUrl = image.link.replace('\\', '');
            // console.log('Url:', imgUrl);
            return imgUrl;
          });
        });
      })
      .then((fetchedGallery) => {
        //galleryUrl is an array of array of the url
        this.setState({fetchedGallery});
      });
  };

  render() {
    let {fetchedGallery, query} = this.state;

    let content = [];

    if (fetchedGallery.length) {
      let flattenedGallery = fetchedGallery.reduce((prev, curr) => {
        return prev.concat(curr);
      });

      let i = 0;

      for (let image of flattenedGallery) {
        console.log(image);
        content.push(
          <Image key={i} style={styles.image} source={{uri: image}} />,
        );
        i += 1;
        if (i > 20) {
          break;
        }
      }

      // flattenedGallery.forEach((image, index) => {
      //   // console.log(index, image);
      //   content.push(
      //     <Image
      //       key={index}
      //       style={{width: 100, height: 100}}
      //       source={{uri: image}}
      //     />,
      //   );
      // });
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={query}
          onChangeText={(query) => this._onTextChange(query)}
        />
        {/* <Text style={styles.introText}>Good Morning BootCamp 4!</Text> */}
        <TouchableWithoutFeedback onPress={this._onSubmit}>
          <View style={styles.submit}>
            <Text>Submit</Text>
          </View>
        </TouchableWithoutFeedback>
        <ScrollView>
          <View style={styles.images}>{content}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  introText: {
    color: 'red',
  },
  textInput: {
    margin: 6,
    borderStyle: 'solid',
    padding: 6,
    width: 200,
    backgroundColor: '#aaa',
  },
  submit: {
    backgroundColor: 'lightblue',
    borderWidth: 2,
    margin: 6,
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  image: {
    margin: 6,
    width: 100,
    height: 100,
  },
});

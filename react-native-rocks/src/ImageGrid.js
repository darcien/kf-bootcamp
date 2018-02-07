// @flow

import React, {Component} from 'react';

import {FlatList, View} from 'react-native';

import PropTypes from 'prop-types';

import ImageContainer from './ImageContainer';

type Props = {
  imageList: Array<Object>,
};

export default class ImageGrid extends Component<Props> {
  render() {
    let {imageList} = this.props;

    return (
      <View>
        <FlatList
          data={imageList}
          renderItem={({item}) => (
            <ImageContainer
              id={item.id}
              key={item.id}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          )}
        />
      </View>
    );
  }
}
ImageGrid.contextTypes = {
  styles: PropTypes.object,
};

// @flow

import React from 'react';

import {Image, View, Text} from 'react-native';

import PropTypes from 'prop-types';

type Props = {
  id: string,
  title: string,
  description: string,
  link: string,
};

export default function ImageContainer(props: Props, context: Object) {
  let {id, title, description, link} = props;
  let {styles} = context;

  // console.log('Inside image container :', link);

  return (
    <View style={styles.imageContainer} key={id}>
      <View style={styles.imageTitleContainer}>
        <Text style={styles.imageTitle}>{title.trim()}</Text>
      </View>
      <View style={styles.imageContentContainer}>
        <Image style={styles.image} source={{uri: link}} />
        <View style={styles.imageDescriptionContainer}>
          <Text style={styles.imageDescription}>
            {/* Trim excess description */}
            {description && description.length > 140
              ? description.substr(0, 140) + ' ...'
              : description}
          </Text>
        </View>
      </View>
    </View>
  );
}

ImageContainer.contextTypes = {
  styles: PropTypes.object,
};

// @flow
import React, {Component} from 'react';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';

import {Entypo, Feather} from '@expo/vector-icons';

import burgerImg from '../assets/burger.png';

type Props = {};

const PROFILE_IMAGE_SIZE = 128;

const PROFILE_NAME = 'Bon Budi';

const TIME = new Date();

const postList = [
  {
    key: 1,
    name: PROFILE_NAME,
    date: TIME.toDateString(),
    content: 'Hi',
  },
  {
    key: 2,
    name: PROFILE_NAME,
    date: TIME.toDateString(),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget est nulla. Fusce vitae quam eu nibh dictum pellentesque. Proin eu lectus neque. Phasellus vitae viverra erat, non pulvinar felis. Morbi maximus egestas tempor. Proin viverra, eros ac ornare rutrum, orci ex varius ligula, eget congue tortor nibh imperdiet lorem. Aliquam varius risus a pellentesque convallis. Suspendisse potenti. Mauris fermentum sit amet libero at sagittis. Nulla at enim sed eros egestas aliquam et ac nibh. Donec sed consequat est.',
  },
  {
    key: 3,
    name: PROFILE_NAME,
    date: TIME.toDateString(),
    content: 'Having fun at BluePay',
  },
  {
    key: 4,
    name: PROFILE_NAME,
    date: TIME.toDateString(),
    content:
      'Morbi sit amet volutpat sapien. Integer porta blandit sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sodales semper pharetra. Nullam sit amet convallis augue. Sed mattis fermentum augue eu finibus. Pellentesque vestibulum magna at pharetra pharetra. Vivamus scelerisque nisl nunc, sit amet fringilla lorem fringilla eget. Nam vitae tellus hendrerit, gravida justo ac, hendrerit ante. Aliquam sit amet cursus magna. Integer quis libero ac metus ultricies pharetra sed quis urna. Morbi pretium malesuada mi et scelerisque. Ut sit amet elit tristique, porta felis ac, dapibus elit. Sed hendrerit finibus vulputate. Integer pharetra nibh in nisi suscipit vehicula. Suspendisse aliquet tempus quam sed tincidunt.',
  },
];

export default class App extends Component<Props> {
  _renderItem = ({item}) => (
    <View style={styles.postItemContainer}>
      <View style={styles.postHeader}>
        <View style={styles.postProfileImage}>
          <Image style={styles.postProfileImage} source={burgerImg} />
        </View>
        <View style={styles.postNameContainer}>
          <Text style={styles.postName}>{item.name}</Text>
          <Text style={styles.postDate}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.postContentContainer}>
        <Text style={styles.postContent}>{item.content}</Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <Feather name="arrow-left" size={20} style={styles.backIcon} />
          <Text style={styles.header}>Profile</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.coverContainer}>
            <Image style={styles.coverImage} source={burgerImg} />
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.profileHeaderContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{PROFILE_NAME}</Text>
              </View>
              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} source={burgerImg} />
              </View>
            </View>
            <View style={styles.interactionContainer}>
              <View style={styles.circle}>
                <Entypo
                  style={styles.interactionIcon}
                  name="add-user"
                  size={20}
                />
              </View>
              <View style={styles.circle}>
                <Entypo
                  style={styles.interactionIcon}
                  name="message"
                  size={20}
                />
              </View>
              <View style={styles.circle}>
                <Entypo
                  style={styles.interactionIcon}
                  name="heart-outlined"
                  size={20}
                />
              </View>
            </View>
            <View style={styles.postContainer}>
              <View style={styles.sideBarContainer}>
                <View style={styles.topSidebar}>
                  <View style={styles.sideBar}>
                    <Text style={styles.sideBarText}>Posts</Text>
                  </View>
                  <View style={styles.sideBar}>
                    <Text style={styles.sideBarText}>Friends</Text>
                  </View>
                  <View style={styles.sideBar}>
                    <Text style={styles.sideBarText}>Photos</Text>
                  </View>
                </View>
                <View style={styles.bottomSidebar}>
                  <View style={[styles.sideBar, styles.logout]}>
                    <Text style={styles.sideBarText}>Logout</Text>
                  </View>
                </View>
              </View>
              <View style={styles.timelineContainer}>
                <FlatList data={postList} renderItem={this._renderItem} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
  },
  headerContainer: {
    // borderWidth: 1,
    height: 40,
    backgroundColor: '#947CB0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
    color: '#fff',
  },
  header: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  coverContainer: {
    backgroundColor: '#913d88',
    height: 120,
    alignItems: 'center',
  },
  coverImage: {
    resizeMode: 'repeat',
  },
  profileContainer: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  profileImageContainer: {
    height: PROFILE_IMAGE_SIZE,
    width: PROFILE_IMAGE_SIZE,
    backgroundColor: 'orange',
    borderRadius: PROFILE_IMAGE_SIZE / 4,
    alignSelf: 'center',
    marginTop: -45 - PROFILE_IMAGE_SIZE,
    marginBottom: 45,
  },
  profileImage: {
    height: PROFILE_IMAGE_SIZE,
    width: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / 4,
    alignSelf: 'center',
  },
  profileHeaderContainer: {},
  nameContainer: {
    backgroundColor: '#DCC6E0',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  interactionContainer: {
    // borderWidth: 2,
    backgroundColor: '#E08283',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#ccf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  interactionIcon: {
    color: '#D2527F',
  },
  postContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sideBarContainer: {
    width: 70,
    padding: 10,
    backgroundColor: '#9B59B6',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topSidebar: {
    justifyContent: 'center',
  },
  bottomSidebar: {
    justifyContent: 'center',
  },
  sideBar: {
    // backgroundColor: 'yellow',
  },
  sideBarText: {
    color: '#223450',
  },
  timelineContainer: {
    flex: 1,
    backgroundColor: '#E26A6A',
  },
  logout: {},
  postItemContainer: {
    backgroundColor: '#BE90D4',
    // height: 120,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#013243',
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  postProfileImageContainer: {
    width: 30,
    height: 30,
  },
  postProfileImage: {
    backgroundColor: 'orange',
    width: 30,
    height: 30,
    borderRadius: 30 / 4,
  },
  postNameContainer: {
    paddingHorizontal: 10,
  },
  postDate: {
    fontSize: 12,
    color: '#67809F',
  },
  postContent: {
    textAlign: 'justify',
  },
});

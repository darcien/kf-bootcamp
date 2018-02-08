// @flow
import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Props = {};

type State = {
  activeTab: Tab,
  query: string,
};

type Tab = 'ALL' | 'MAIN' | 'DESSERT';

const menuType = {
  MAIN: 'Main Course',
  DESSERT: 'Dessert',
};

const imageList = {
  SALAD: require('../assets/salad.png'),
  CHICKEN: require('../assets/roast-chicken.png'),
  BURGER: require('../assets/burger.png'),
  SPAGUETTI: require('../assets/spaguetti.png'),
};

const menuList = [
  {
    key: 1,
    name: 'Secret Recipe: Salad with fresh salad',
    type: 'MAIN',
    price: 150,
    image: 'SALAD',
  },
  {
    key: 2,
    name: 'Secret Recipe blabla2',
    type: 'DESSERT',
    price: 99,
    image: 'CHICKEN',
  },
  {
    key: 3,
    name: 'Queen Burger',
    type: 'MAIN',
    price: 120,
    image: 'BURGER',
  },
  {
    key: 4,
    name: 'Sphagetti Code',
    type: 'MAIN',
    price: 120,
    image: 'SPAGUETTI',
  },
  {
    key: 5,
    name: 'Burger (meat not included)',
    type: 'MAIN',
    price: 10,
    image: 'BURGER',
  },
];

export default class App extends Component<Props, State> {
  state = {
    activeTab: 'ALL',
    query: '',
  };
  filteredMenuList: Array<Object> = [];

  _goTo = (newTab: Tab) => {
    // console.log('Changed tab to', newTab);
    this.setState({activeTab: newTab});
  };

  render() {
    let {activeTab, query} = this.state;

    //TODO Put the content of the tab to it's own component instead of copy
    // pasting like this...

    // NVM, I filtered in the switch instead.

    switch (activeTab) {
      case 'ALL':
        this.filteredMenuList = menuList.filter((menu) => {
          return menu.name.toLowerCase().includes(query.toLowerCase());
        });
        break;
      case 'MAIN':
        this.filteredMenuList = [];
        menuList.forEach((menu) => {
          if (
            menu.type === 'MAIN' &&
            menu.name.toLowerCase().includes(query.toLowerCase())
          ) {
            this.filteredMenuList.push(menu);
          }
        });
        break;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Menu List</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <Image
              style={styles.searchIcon}
              source={require('../assets/search-icon.jpeg')}
            />
            <TextInput
              style={styles.search}
              underlineColorAndroid="transparent"
              placeholder="Find Menu Here"
              value={query}
              onChangeText={(query) => {
                this._onChangeText(query);
              }}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.tabContainer}>
          <TouchableWithoutFeedback onPress={() => this._goTo('ALL')}>
            <View
              style={
                activeTab === 'ALL'
                  ? styles.selectedTabTextContainer
                  : styles.tabTextContainer
              }
            >
              <Text
                style={
                  activeTab === 'ALL' ? styles.selectedTabText : styles.tabText
                }
              >
                Not All Menus
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this._goTo('MAIN')}>
            <View
              style={
                activeTab === 'MAIN'
                  ? styles.selectedTabTextContainer
                  : styles.tabTextContainer
              }
            >
              <Text
                style={
                  activeTab === 'MAIN' ? styles.selectedTabText : styles.tabText
                }
              >
                Main Course
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.menusContainer}>
          <FlatList
            data={this.filteredMenuList}
            renderItem={({item}) => (
              <View style={[styles.menu]}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={imageList[item.image]} />
                </View>
                <View style={styles.menuDescContainer}>
                  <View style={styles.menuNameContainer}>
                    <Text style={styles.menuName}>{item.name}</Text>
                  </View>
                  <View style={styles.menuTypeContainer}>
                    <Text style={styles.menuType}>{menuType[item.type]}</Text>
                  </View>
                  <View style={styles.menuPriceContainer}>
                    <Text style={styles.menuPrice}>${item.price}.00</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.navContainer}>
          <View style={styles.nav}>
            <Image
              style={styles.navImg}
              source={require('../assets/button1.jpeg')}
            />
          </View>
          <View style={styles.nav}>
            <Image
              style={styles.navImg}
              source={require('../assets/button2.jpeg')}
            />
          </View>
          <View style={styles.nav}>
            <Image
              style={styles.navImg}
              source={require('../assets/button3.jpeg')}
            />
          </View>
        </View>
      </View>
    );
  }

  _onChangeText = (query: string) => {
    this.setState({query});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ed7d0',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
  },
  introText: {
    color: 'red',
  },
  searchContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  searchIconContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#eee',
    // backgroundColor: '#000',
  },
  searchIcon: {
    resizeMode: 'contain',
    width: 30,
    marginHorizontal: 10,
  },
  search: {
    color: '#000',
    flex: 1,
    minHeight: 42,
    // borderWidth: 1,
    // borderRadius: 3,
    // borderColor: '#eee',
  },
  separator: {
    flex: 0.4,
    padding: 1,
    backgroundColor: '#eee',
  },
  tabContainer: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  tabTextContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    // borderWidth: 1,
  },
  selectedTabTextContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: '#7ed7d0',
  },
  tabText: {
    color: '#555',
    paddingVertical: 10,
  },
  selectedTabText: {
    color: 'black',
    paddingVertical: 10,
    // borderWidth: 3,
  },
  menusContainer: {
    flex: 20,
    // borderWidth: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  menu: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  imageContainer: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
    borderColor: '#ccc',
  },
  image: {
    height: 80,
    width: 80,
  },
  menuDescContainer: {
    padding: 10,
    flexDirection: 'column',
    flex: 2,
    // borderWidth: 1,
  },

  menuNameContainer: {
    flex: 2,
  },
  menuName: {},
  menuTypeContainer: {
    flex: 1,
  },
  menuType: {
    color: '#aaa',
  },
  menuPriceContainer: {
    flex: 1,
  },
  menuPrice: {},

  navContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  nav: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
  },
  navImg: {
    resizeMode: 'contain',
    height: 25,
  },
});

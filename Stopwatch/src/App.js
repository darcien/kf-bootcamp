// @flow
import React, {Component} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Font} from 'expo';
import Monoid from '../assets/fonts/Monoid-Retina.ttf';

type Lap = {
  key: number,
  elapsedTime: number,
};

type Props = {};
type State = {
  startTime: ?number,
  currentTime: number,
  fontLoaded: boolean,
};

const INTERVAL = 33;
const LAP_HEIGHT = 38;

async function loadFont() {
  return await Font.loadAsync({
    'monoid-retina': Monoid,
  });
}

export default class App extends Component<Props, State> {
  state = {
    startTime: null,
    currentTime: Date.now(),
    fontLoaded: false,
  };

  _lapList: Array<Lap> = [];

  _timerID: number;

  componentDidMount() {
    loadFont().then(() => {
      this.setState({fontLoaded: true});
    });
  }

  componentWillUnmount() {
    clearTimeout(this._timerID);
  }

  _updateCurrentTime = () => {
    this.setState({currentTime: Date.now()});
  };

  _start = () => {
    if (this._lapList.length) {
      this.refs.flatList.scrollToIndex({
        index: 0,
        viewOffset: 0,
      });
    }
    this._lapList = [];
    this.setState({startTime: Date.now()}, this._updateCurrentTime());
  };

  _stop = () => {
    clearTimeout(this._timerID);
    this.setState({startTime: null});
  };

  _addLap = (elapsedTime: number) => {
    // let {lapList} = this.state;
    let newLap = {
      key: this._lapList.length + 1,
      elapsedTime,
    };
    this._lapList = [...this._lapList, newLap];
    setTimeout(() => this.refs.flatList.scrollToEnd(), 0);
  };

  _renderItem = ({item}) => (
    <View style={styles.lapContainer}>
      <View>
        <Text style={styles.lap}>Lap {item.key}</Text>
      </View>
      <View>
        {this.state.fontLoaded ? (
          <Text style={[styles.lap, {fontFamily: 'monoid-retina'}]}>
            {this._msToHumanReadable(item.elapsedTime)}
          </Text>
        ) : null}
      </View>
    </View>
  );

  _renderLapListFooter = () => {
    let lapNum = this._lapList.length;
    let placeholderLapNum = 5 - lapNum;
    let listFooterComponent = [];
    for (let i = 0; i < placeholderLapNum; i++) {
      listFooterComponent.push(
        <View key={lapNum + i} style={styles.lapContainer} />,
      );
    }
    return listFooterComponent;
  };

  _msToHumanReadable = (ms: number) => {
    let minutes = Math.floor(ms / 60);
    let seconds = ms % 60;
    return (
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds.toFixed(2) : seconds.toFixed(2))
    );
  };

  render() {
    let {startTime, currentTime} = this.state;
    let isStarted = startTime || startTime === 0;
    let elapsedTime = startTime ? (currentTime - startTime) / 1000 : 0;

    if (isStarted) {
      this._timerID = setTimeout(() => {
        this._updateCurrentTime();
      }, INTERVAL);
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Stopwatch</Text>
        </View>
        <View style={styles.timerContainer}>
          {this.state.fontLoaded ? (
            <Text style={[styles.timer, {fontFamily: 'monoid-retina'}]}>
              {this._msToHumanReadable(elapsedTime)}
            </Text>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <View style={[styles.circle, styles.addLapContainer]}>
            <TouchableOpacity
              onPress={
                isStarted
                  ? () => {
                      this._addLap(elapsedTime);
                    }
                  : () => {}
              }
            >
              <View style={styles.circleBorder}>
                <Text style={styles.addLap}>Lap</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.indicatorContainer}>
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
          </View>
          <View
            style={[
              styles.circle,
              isStarted ? styles.stopContainer : styles.startContainer,
            ]}
          >
            <TouchableOpacity onPress={isStarted ? this._stop : this._start}>
              <View style={styles.circleBorder}>
                <Text style={[isStarted ? styles.stop : styles.start]}>
                  {isStarted ? 'Stop' : 'Start'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lapListContainer}>
          <FlatList
            ref="flatList"
            data={this._lapList}
            renderItem={this._renderItem}
            ListFooterComponent={this._renderLapListFooter}
            getItemLayout={(data, index) => ({
              length: LAP_HEIGHT,
              offset: LAP_HEIGHT * index,
              index,
            })}
          />
        </View>
        <View style={styles.navContainer}>
          <View style={styles.nav}>
            <Text style={styles.navText}>World Clock</Text>
          </View>
          <View style={styles.nav}>
            <Text style={styles.navText}>Alarm</Text>
          </View>
          <View style={styles.nav}>
            <Text style={styles.navText}>Bedtime</Text>
          </View>
          <View style={styles.nav}>
            <Text style={[styles.navText, styles.activeNavText]}>
              Stopwatch
            </Text>
          </View>
          <View style={styles.nav}>
            <Text style={styles.navText}>Timer</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
  },
  introText: {
    color: 'black',
  },
  headerContainer: {
    // borderWidth: 1,
    height: 40,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  header: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timerContainer: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  timer: {
    fontSize: 60,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#000',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  circle: {
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBorder: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addLapContainer: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  addLap: {
    color: '#fff',
  },
  startContainer: {
    backgroundColor: 'rgba(80,200,100,0.3)',
  },
  start: {
    color: 'rgb(80,200,100)',
  },
  stopContainer: {
    backgroundColor: 'rgba(210,60,60,0.3)',
  },
  stop: {
    color: 'rgb(210,60,60)',
  },
  indicatorContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  indicator: {
    backgroundColor: '#444',
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  lapListContainer: {
    // borderWidth: 1,
    height: 160,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 13,
    backgroundColor: '#000',
  },
  lapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: LAP_HEIGHT,
    borderTopWidth: 1,
    borderColor: '#222',
  },
  lap: {
    color: '#fff',
  },
  navContainer: {
    backgroundColor: '#111',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nav: {},
  navText: {
    color: '#888',
  },
  activeNavText: {
    color: 'rgb(255,149,38)',
  },
});

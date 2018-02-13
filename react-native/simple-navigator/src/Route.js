//@flow

//$FlowFixMe
import {TabNavigator, StackNavigator} from 'react-navigation';

// import HomeScrene from './HomeScene';
import LoginScreen from './Screens/LoginScreen';
import SummaryScreen from './Screens/SummaryScreen';
import InputScreen from './Screens/InputScreen';
import DetailScreen from './Screens/DetailScreen';
import NameScreen from './Screens/NameScreen';
import LogoutScreen from './Screens/LogoutScreen';

// const DetailStack = StackNavigator(
//   {
//     Summary: {
//       screen: SummaryScreen,
//     },
//     Detail: {
//       screen: DetailScreen,
//     },
//   },
//   {initialRouteName: 'Summary'},
// );

const Tabs = TabNavigator(
  {
    Tab1: {screen: SummaryScreen},
    Tab2: {screen: InputScreen},
    Tab3: {screen: LogoutScreen},
  },
  {
    order: ['Tab1', 'Tab2', 'Tab3'],
    animationEnabled: true,
  },
);

export default StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: Tabs,
    },
    Detail: {
      screen: DetailScreen,
    },
    Name: {
      screen: NameScreen,
    },
  },
  {initialRouteName: 'Login'},
);

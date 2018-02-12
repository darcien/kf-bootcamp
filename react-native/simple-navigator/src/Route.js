//@flow

//$FlowFixMe
import {TabNavigator, StackNavigator} from 'react-navigation';

// import HomeScrene from './HomeScene';
import LoginScreen from './Screens/LoginScreen';
import DetailScreen from './Screens/DetailScreen';
import NameScreen from './Screens/NameScreen';
import LogoutScreen from './Screens/LogoutScreen';

const Tabs = TabNavigator(
  {
    Detail: {screen: DetailScreen},
    Name: {screen: NameScreen},
    Logout: {screen: LogoutScreen},
  },
  {
    order: ['Detail', 'Name', 'Logout'],
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
  },
  {initialRouteName: 'Login'},
);

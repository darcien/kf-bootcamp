//@flow

//$FlowFixMe
import {TabNavigator, StackNavigator} from 'react-navigation';

// import HomeScrene from './HomeScene';
import LoginScene from './LoginScene';
import DetailScene from './DetailScene';
import NameScene from './NameScene';
import LogoutScene from './LogoutScene';

const Tabs = TabNavigator(
  {
    Detail: {screen: DetailScene},
    Name: {screen: NameScene},
    Logout: {screen: LogoutScene},
  },
  {
    order: ['Detail', 'Name', 'Logout'],
    animationEnabled: true,
  },
);

export default StackNavigator(
  {
    Login: {
      screen: LoginScene,
    },
    Home: {
      screen: Tabs,
    },
  },
  {initialRouteName: 'Login'},
);

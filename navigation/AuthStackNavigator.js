import { StackNavigator } from 'react-navigation';

import AuthScreen from '../screens/initial/AuthScreen';
import SignUpScreen from '../screens/initial/SignUpScreen';
import SignUpUserBioScreen from '../screens/initial/SignUpUserBioScreen';
import SignUpUsernameScreen from '../screens/initial/SignUpUsernameScreen';
export default StackNavigator ({
  Autho: {
    screen: AuthScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },
  SignUpBio: {
    screen: SignUpUserBioScreen,
  },
  SignUpUsername: {
    screen: SignUpUsernameScreen,
  },
}, {
    header: null,
    headerMode: 'none',
    navigationOptions: {
      header: null
    },
    lazy: true
});

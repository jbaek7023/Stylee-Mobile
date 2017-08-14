import { StackNavigator } from 'react-navigation';

import AuthScreen from '../screens/initial/AuthScreen';
import SigninScreen from '../screens/initial/SigninScreen';

export default StackNavigator ({
  Autho: {
    screen: AuthScreen,
  },
  Signin: {
    screen: SigninScreen,
  },
});

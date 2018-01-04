import { StackNavigator } from 'react-navigation';

import AuthScreen from '../screens/initial/AuthScreen';
import SignUpScreen from '../screens/initial/SignUpScreen';
import SignUpUserBioScreen from '../screens/initial/SignUpUserBioScreen';
import SignUpUsernameScreen from '../screens/initial/SignUpUsernameScreen';
import PrivacyPolicyScreen from '../screens/menu/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '../screens/menu/TermsAndConditionsScreen';

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
  PrivacyOne: {
    screen: PrivacyPolicyScreen
  },
  Terms: {
    screen: TermsAndConditionsScreen
  }
}, {
    header: null,
    headerMode: 'none',
    navigationOptions: {
      header: null
    },
    lazy: true
});

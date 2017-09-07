import { StackNavigator } from 'react-navigation';

import ChangePasswordScreen from '../screens/menu/ChangePasswordScreen';
import MenuScreen from '../screens/menu/MenuScreen';

export default StackNavigator ({
  Menuo: {
    screen: MenuScreen,
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
  },
}, {
    // header: null,
    // headerMode: 'none',
    // navigationOptions: {
    //   header: null
    // },
    lazy: true
});

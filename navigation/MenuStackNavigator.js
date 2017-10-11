import { StackNavigator } from 'react-navigation';

import ChangePasswordScreen from '../screens/menu/ChangePasswordScreen';
import MenuScreen from '../screens/menu/MenuScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import OutfitDetail from '../screens/stylebook/OutfitDetail';

export default StackNavigator ({
  Menuo: {
    screen: MenuScreen,
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
  },
  Profile: {
    screen: UserProfileScreen,
  },
  OutfitDetail: {
    screen: OutfitDetail
  }
}, {
    // header: null,
    // headerMode: 'none',
    // navigationOptions: {
    //   header: null
    // },
    lazy: true
});

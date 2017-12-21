import { StackNavigator, NavigationActions } from 'react-navigation';

import ChangePasswordScreen from '../screens/menu/ChangePasswordScreen';
import MenuScreen from '../screens/menu/MenuScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import FollowerScreen from '../screens/profile/FollowerScreen';
import FollowingScreen from '../screens/profile/FollowingScreen';
import UserCategoryScreen from '../screens/profile/UserCategoryScreen';
import UserWardrobeScreen from '../screens/profile/UserWardrobeScreen';
import OutfitDetail from '../screens/stylebook/OutfitDetail';
import EditProfileScreen from '../screens/menu/EditProfileScreen';

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
  },
  EditProfile: {
    screen: EditProfileScreen
  },
  FollowerList: {
    screen: FollowerScreen
  },
  FollowingList: {
    screen: FollowingScreen
  },
  UserCategoryList: {
    screen: UserCategoryScreen
  },
  UserWardrobe: {
    screen: UserWardrobeScreen
  }
}, {
  navigationOptions:({navigation, screenProps})=>({
    tabBarOnPress: ({jumpToIndex, scene}) => {
      jumpToIndex(scene.index);
      if(scene.focused) {
        navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Menuo' }) // go to first screen of the StackNavigator
          ]
        }))
      }
    }
  }),
  lazy: true
});

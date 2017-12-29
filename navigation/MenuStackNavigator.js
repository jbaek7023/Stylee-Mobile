import { StackNavigator, NavigationActions } from 'react-navigation';

// Menu Wrapping
import MenuScreen from '../screens/menu/MenuScreen';

// only for Menu
import ChangePasswordScreen from '../screens/menu/ChangePasswordScreen';
import EditProfileScreen from '../screens/menu/EditProfileScreen';

// COMMON
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import FollowerScreen from '../screens/profile/FollowerScreen';
import FollowingScreen from '../screens/profile/FollowingScreen';
import UserCategoryScreen from '../screens/profile/UserCategoryScreen';
import UserWardrobeScreen from '../screens/profile/UserWardrobeScreen';
import EditOutfitScreen from '../screens/stylebook/EditOutfitScreen';
import EditClothScreen from '../screens/wardrobe/EditClothScreen';
import CommentDetail from '../screens/comment/CommentDetail';
import OutfitDetail from '../screens/stylebook/OutfitDetail';
import CategoryDetail from '../screens/stylebook/CategoryDetail';
import ClothDetail from '../screens/wardrobe/ClothDetail';
import CommentsScreen from '../screens/comment/Comments';

export default StackNavigator ({
  Menuo: {
    screen: MenuScreen,
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
  },
  EditProfile: {
    screen: EditProfileScreen
  },
  // COMMON
  Profile: {
    screen: UserProfileScreen,
  },
  CommentDetail: {
    screen: CommentDetail
  },
  Comments: {
    screen: CommentsScreen
  },
  OutfitDetail: {
    screen: OutfitDetail
  },
  CategoryDetail: {
    screen: CategoryDetail
  },
  ClothDetail: {
    screen: ClothDetail
  },
  EditOutfit: {
    screen: EditOutfitScreen
  },
  EditCloth: {
    screen: EditClothScreen
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
  },
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

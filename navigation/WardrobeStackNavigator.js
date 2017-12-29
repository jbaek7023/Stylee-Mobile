import { StackNavigator, NavigationActions } from 'react-navigation';

// Wardrobe Wrapping
import WardrobeWrappingScreen from '../screens/wardrobe/WardrobeWrappingScreen';

// Add Clothes
import AddClothScreen from '../screens/camera/AddClothScreen';
import TagStyleScreen from '../screens/camera/TagStyleScreen';
import OpenWardrobe from '../screens/camera/OpenWardrobe';
import FABs from '../components/common/FABs';
import TagFromPhoto from '../screens/camera/TagFromPhoto';

// COMMON SCREEN
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
  Wardrobeo: {
    screen: WardrobeWrappingScreen,
  },
  AddClotho: {
    screen: AddClothScreen
  },
  TagStyle: {
    screen: TagStyleScreen
  },
  OpenWardrobe: {
    screen: OpenWardrobe
  },
  FABs: {
    screen: FABs
  },
  TagFromPhoto: {
    screen: TagFromPhoto
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
            NavigationActions.navigate({ routeName: 'Wardrobeo' }) // go to first screen of the StackNavigator
          ]
        }))
      }
    }
  }),
  lazy: true
});

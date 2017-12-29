import { StackNavigator, NavigationActions } from 'react-navigation';

// Stylebook Wrapping Screen
import StylebookWrappingScreen from '../screens/stylebook/StylebookWrappingScreen';

// Stylebook Add
import AddStyleScreen from '../screens/camera/AddStyleScreen';
import TagFromPhoto from '../screens/camera/TagFromPhoto';
import EditTaggedItem from '../screens/camera/EditTaggedItem';
import TagStyleScreen from '../screens/camera/TagStyleScreen';
import OpenWardrobe from '../screens/camera/OpenWardrobe';

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

// ETC
import FABs from '../components/common/FABs';

export default StackNavigator ({
  Stylebooko: {
    screen: StylebookWrappingScreen,
  },
  AddStyleo: {
    screen: AddStyleScreen
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
  EditTaggedItem: {
    screen: EditTaggedItem
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
              NavigationActions.navigate({ routeName: 'Stylebooko' }) // go to first screen of the StackNavigator
            ]
          }))

        }
      }
    }),
    lazy: true
});

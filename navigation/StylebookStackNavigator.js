import { StackNavigator } from 'react-navigation';

import StylebookWrappingScreen from '../screens/stylebook/StylebookWrappingScreen';
import OutfitDetail from '../screens/stylebook/OutfitDetail';
import CategoryDetail from '../screens/stylebook/CategoryDetail';
import ClothDetail from '../screens/wardrobe/ClothDetail';
import CommentsScreen from '../screens/comment/Comments';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import CommentDetail from '../screens/comment/CommentDetail';
import AddStyleScreen from '../screens/camera/AddStyleScreen';
import AddClothScreen from '../screens/camera/AddClothScreen';
import TagStyleScreen from '../screens/camera/TagStyleScreen';
import OpenWardrobe from '../screens/camera/OpenWardrobe';

export default StackNavigator ({
  Stylebooko: {
    screen: StylebookWrappingScreen,
  },
  OutfitDetail: {
    screen: OutfitDetail
  },
  ClothDetail: {
    screen: ClothDetail
  },
  CategoryDetail: {
    screen: CategoryDetail
  },
  Comments: {
    screen: CommentsScreen
  },
  Profile: {
    screen: UserProfileScreen,
  },
  CommentDetail: {
    screen: CommentDetail
  },
  AddStyleo: {
    screen: AddStyleScreen
  },
  AddClotho: {
    screen: AddClothScreen
  },
  TagStyle: {
    screen: TagStyleScreen
  },
  OpenWardrobe: {
    screen: OpenWardrobe
  }
}, {
    lazy: true
});

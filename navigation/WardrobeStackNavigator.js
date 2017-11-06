import { StackNavigator } from 'react-navigation';

import WardrobeWrappingScreen from '../screens/wardrobe/WardrobeWrappingScreen';
import ClothDetail from '../screens/wardrobe/ClothDetail';
import OutfitDetail from '../screens/stylebook/OutfitDetail';
import TagStyleScreen from '../screens/camera/TagStyleScreen';
import OpenWardrobe from '../screens/camera/OpenWardrobe';

export default StackNavigator ({
  Wardrobeo: {
    screen: WardrobeWrappingScreen,
  },
  ClothDetail: {
    screen: ClothDetail
  },
  OutfitDetail: {
    screen: OutfitDetail
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

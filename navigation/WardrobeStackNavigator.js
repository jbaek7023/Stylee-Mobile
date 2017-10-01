import { StackNavigator } from 'react-navigation';

import WardrobeScreen from '../screens/wardrobe/WardrobeScreen';
import ClothDetail from '../screens/wardrobe/ClothDetail';
import OutfitDetail from '../screens/stylebook/OutfitDetail';

export default StackNavigator ({
  Wardrobeo: {
    screen: WardrobeScreen,
  },
  ClothDetail: {
    screen: ClothDetail
  },
  OutfitDetail: {
    screen: OutfitDetail
  }
}, {
    lazy: true
});

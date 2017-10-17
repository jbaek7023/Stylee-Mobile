import { StackNavigator } from 'react-navigation';

import WardrobeWrappingScreen from '../screens/wardrobe/WardrobeWrappingScreen';
import ClothDetail from '../screens/wardrobe/ClothDetail';
import OutfitDetail from '../screens/stylebook/OutfitDetail';

export default StackNavigator ({
  Wardrobeo: {
    screen: WardrobeWrappingScreen,
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

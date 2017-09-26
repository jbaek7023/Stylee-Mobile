import { StackNavigator } from 'react-navigation';

import WardrobeScreen from '../screens/wardrobe/WardrobeScreen';
import ClothDetail from '../screens/wardrobe/ClothDetail';

export default StackNavigator ({
  Wardrobeo: {
    screen: WardrobeScreen,
  },
  ClothDetail: {
    screen: ClothDetail
  }
}, {
    lazy: true
});

import { StackNavigator } from 'react-navigation';

import WardrobeScreen from '../screens/wardrobe/WardrobeScreen';
import StylebookWrappingScreen from '../screens/stylebook/StylebookWrappingScreen';
import OutfitDetail from '../screens/stylebook/OutfitDetail';

export default StackNavigator ({
  Stylebooko: {
    screen: StylebookWrappingScreen,
  },
  Wardrobe: {
    screen: WardrobeScreen,
  },
  OutfitDetail: {
    screen: OutfitDetail
  }
}, {
    lazy: true
});

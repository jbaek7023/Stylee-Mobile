import { StackNavigator } from 'react-navigation';

import StylebookWrappingScreen from '../screens/stylebook/StylebookWrappingScreen';
import OutfitDetail from '../screens/stylebook/OutfitDetail';
import CategoryDetail from '../screens/stylebook/CategoryDetail';

export default StackNavigator ({
  Stylebooko: {
    screen: StylebookWrappingScreen,
  },
  OutfitDetail: {
    screen: OutfitDetail
  },
  CategoryDetail: {
    screen: CategoryDetail
  }
}, {
    lazy: true
});

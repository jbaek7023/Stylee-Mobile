import { StackNavigator } from 'react-navigation';

import WardrobeScreen from '../screens/wardrobe/WardrobeScreen';

export default StackNavigator ({
  Wardrobeo: {
    screen: WardrobeScreen,
  }
}, {
    lazy: true
});

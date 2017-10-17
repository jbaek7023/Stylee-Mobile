import { StackNavigator } from 'react-navigation';

import FeedScreen from '../screens/feed/FeedScreen';
import SearchScreen from '../screens/feed/SearchScreen';

export default StackNavigator ({
  Feedo: {
    screen: FeedScreen,
  },
  Searcho: {
    screen: SearchScreen,
  }
}, {
    lazy: true
});

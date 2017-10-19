import { StackNavigator } from 'react-navigation';

import FeedWrappingScreen from '../screens/feed/FeedWrappingScreen';
import SearchScreen from '../screens/feed/SearchScreen';
import FeedMainTabNavigator from './FeedMainTabNavigator';

export default StackNavigator ({
  Feedo: {
    screen: FeedWrappingScreen,
  },
  Searcho: {
    screen: SearchScreen,
  }
}, {
    lazy: true
});

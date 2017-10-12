import { StackNavigator } from 'react-navigation';

import FeedScreen from '../screens/feed/FeedScreen';

export default StackNavigator ({
  Feedo: {
    screen: FeedScreen,
  },
}, {
    lazy: true
});

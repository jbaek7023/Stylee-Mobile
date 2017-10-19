import { TabNavigator } from 'react-navigation';

import FeedScreen from '../screens/feed/FeedScreen';
import PopularPostScreen from '../screens/feed/PopularPostScreen';
import SearchScreen from '../screens/feed/SearchScreen';

export default TabNavigator({
  UserFeed: {
    screen: FeedScreen
  },
  PopularPost: {
    screen: PopularPostScreen
  },
}, {
    tabBarOptions: {
      style: {
        backgroundColor: "#6F3AB1",
      },
      activeTintColor: "white",
      inactiveTintColor: "white",
      tabStyle: { width: 120 },
      indicatorStyle: { backgroundColor: 'white' }
    },
    header: {

    }
  }
);

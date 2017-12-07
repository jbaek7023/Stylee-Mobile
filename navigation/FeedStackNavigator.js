import { StackNavigator, NavigationActions } from 'react-navigation';

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
  navigationOptions:({navigation, screenProps})=>({
    tabBarOnPress: ({jumpToIndex, scene}) => {
      jumpToIndex(scene.index);
      navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Feedo' }) // go to first screen of the StackNavigator
        ]
      }))
    }
  }),
  lazy: true
});

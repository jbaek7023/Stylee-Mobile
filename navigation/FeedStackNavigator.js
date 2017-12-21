import { StackNavigator, NavigationActions } from 'react-navigation';

import FeedWrappingScreen from '../screens/feed/FeedWrappingScreen';
import SearchScreen from '../screens/feed/SearchScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';

export default StackNavigator ({
  Feedo: {
    screen: FeedWrappingScreen,
  },
  Searcho: {
    screen: SearchScreen,
  },
  Profile: {
    screen: UserProfileScreen,
  },
}, {
  navigationOptions:({navigation, screenProps})=>({
    tabBarOnPress: ({jumpToIndex, scene}) => {

      jumpToIndex(scene.index);
      if(scene.focused) {
        navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Feedo' }) // go to first screen of the StackNavigator
          ]
        }))
      }
    }
  }),
  lazy: true
});

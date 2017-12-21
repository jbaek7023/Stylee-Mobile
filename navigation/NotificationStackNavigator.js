import { StackNavigator, NavigationActions } from 'react-navigation';

import NotificationScreen from '../screens/notification/NotificationScreen';

export default StackNavigator ({
  Notificationo: {
    screen: NotificationScreen,
  },
}, {
  navigationOptions:({navigation, screenProps})=>({
    tabBarOnPress: ({jumpToIndex, scene}) => {
      jumpToIndex(scene.index);
      if(scene.focused) {
        navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Notificationo' }) // go to first screen of the StackNavigator
          ]
        }))
      }
    }
  }),
  lazy: true
});

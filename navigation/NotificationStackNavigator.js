import { StackNavigator } from 'react-navigation';

import NotificationScreen from '../screens/notification/NotificationScreen';

export default StackNavigator ({
  Notificationo: {
    screen: NotificationScreen,
  },
}, {
    lazy: true
});

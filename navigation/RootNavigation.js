import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import WelcomeScreen from '../screens/initial/WelcomeScreen';

const changeAppNavigator = Navigator => {
      const router = Navigator.router;

      const defaultGetStateForAction = router.getStateForAction;
      router.getStateForAction = (action, state) => {
        if (state && action.type === "RESET_TO_AUTH") {
          return defaultGetStateForAction(NavigationActions.init())
        }
        return defaultGetStateForAction(action, state);
      };
  return Navigator;
};

const RootTabNavigator = changeAppNavigator(TabNavigator ({
    Auth: {
      screen: AuthStackNavigator,
    },
    Welcome: {
      screen: WelcomeScreen,
    },
    Main: {
      screen: MainTabNavigator,
    },
  }, {
    initialRouteName: 'Auth',
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      swipeEnabled: false,
      tabBarVisible: false,
    }),
    swipeEnabled: false,
    backBehavior: 'none',
    lazy: true,
  }
));

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootTabNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  // notification => {origin, data}
  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );

    // Notifications.addListener((notification) => {
      // const { data: {text}, origin} = notification;
      // if(origin === 'received' && text ) {
      // Show Notification
      // {Alert} react-native
      // Alert.aleart({'New Push Notification', notification, [{text: 'Ok.'}]})
    // }
  // })
  };
}

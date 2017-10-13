import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import WelcomeScreen from '../screens/initial/WelcomeScreen';

const RootTabNavigator = TabNavigator ({
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
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      tabBarVisible: false,

    }),
    swipeEnabled: false,
    lazy: true,
  }
);

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

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}

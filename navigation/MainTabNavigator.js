import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import FeedScreen from '../screens/feed/FeedScreen';
import StylebookStackNavigator from './StylebookStackNavigator';
import NotificationScreen from '../screens/notification/NotificationScreen';
import MenuStackNavigator from './MenuStackNavigator';
import WardrobeStackNavigator from './WardrobeStackNavigator';

export default TabNavigator(
  {
    Feed: {
      screen: FeedScreen,
    },
    Stylebook: {
      screen: StylebookStackNavigator,
    },
    Wardrobe: {
      screen: WardrobeStackNavigator,
    },
    Noti: {
      screen: NotificationScreen,
    },
    Menu: {
      screen: MenuStackNavigator,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Feed':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-list-box';
            break;
          case 'Stylebook':
            iconName = Platform.OS === 'ios'
              ? `ios-link${focused ? '' : '-outline'}`
              : 'md-body';
            break;
          case 'Wardrobe':
            iconName = Platform.OS === 'ios'
              ? `ios-link${focused ? '' : '-outline'}`
              : 'md-shirt';
            break;
          case 'Noti':
            iconName = Platform.OS === 'ios'
              ? `ios-options${focused ? '' : '-outline'}`
              : 'md-notifications';
            break;
          case 'Menu':
            iconName = Platform.OS === 'ios'
              ? `ios-options${focused ? '' : '-outline'}`
              : 'md-menu';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    header: null,
    headerMode: 'none',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    backBehavior: 'none',
    tabBarOptions: {
        showLabel: false,
        inactiveTintColor: '#455a64'
    }
  }
);

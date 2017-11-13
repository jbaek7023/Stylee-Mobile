import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import FeedStackNavigator from './FeedStackNavigator';
import StylebookStackNavigator from './StylebookStackNavigator';
import MenuStackNavigator from './MenuStackNavigator';
import WardrobeStackNavigator from './WardrobeStackNavigator';
import NotificationStackNavigator from './NotificationStackNavigator';

export default TabNavigator(
  {
    Feed: {
      screen: FeedStackNavigator,
    },
    Stylebook: {
      screen: StylebookStackNavigator,
    },
    Wardrobe: {
      screen: WardrobeStackNavigator,
    },
    Noti: {
      screen: NotificationStackNavigator,
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
            size={30}
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
        showLabel: true,
        activeTintColor: '#6F3AB1',
        labelStyle: {
          fontSize: 11
        },
        style: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderColor: 'black',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          height: 50
        }
    },
    lazy: true,
  }
);

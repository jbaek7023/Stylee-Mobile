import React from 'react';
import { Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import IconBadge from 'react-native-icon-badge';
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
            if(focused) {
              iconName = 'ios-contacts';
            } else {
              iconName = 'ios-contacts-outline';
            }
            break;
          case 'Stylebook':
            if(focused) {
              iconName = 'ios-body';
            } else {
              iconName = 'ios-body-outline';
            }
            break;
          case 'Wardrobe':
            if(focused) {
              iconName = 'ios-shirt';
            } else {
              iconName = 'ios-shirt-outline';
            }
            break;
          case 'Noti':
            if(focused) {
              iconName = 'ios-notifications';
            } else {
              iconName = 'ios-notifications-outline';
            }
            break;
          case 'Menu':
            if(focused) {
              iconName = 'ios-menu';
            } else {
              iconName = 'ios-menu-outline';
            }
            break;
        }
        // ios-menu, ios-body, ios-notifications, ios-shirt,
        if(iconName == 'ios-notifications-outline') {
          return (
            <IconBadge
              MainElement={
                <Ionicons
                  name={iconName}
                  size={30}
                  style={{ marginBottom: 0 }}
                  color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}/>
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>3</Text>
              }
              IconBadgeStyle={{
                backgroundColor: '#f64e59',
                position: 'absolute',
                right:-10,
                top:0,
                }}
              Hidden={3==0}
            />
          );
        }
        return (
          <Ionicons
            name={iconName}
            size={30}
            style={{ marginBottom: 0 }}
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
        style: {
          backgroundColor: 'white',
          borderTopWidth: 0.5,
          borderColor: 'black',
          height: 45
        }
    },
    lazy: true,
  }
);
//
// const navigator = MainTabNavigator;
// const defaultGetStateForAction = navigator.router.getStateForAction
//
// navigator.router.getStateForAction = (action, state) => {
//   if (action.type === 'MyCompleteReset') {
//      // For your custom action, reset it all
//      return defaultGetStateForAction(NavigationActions.init())
//   }
//   // Handle all other actions with the default handler
//   return defaultGetStateForAction(action, state)
// }

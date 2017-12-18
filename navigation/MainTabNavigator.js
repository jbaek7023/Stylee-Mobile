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
            iconName = 'ios-contacts';
            break;
          case 'Stylebook':
            iconName = 'ios-body';
            break;
          case 'Wardrobe':
            iconName = 'ios-shirt';
            break;
          case 'Noti':
            iconName = 'ios-notifications';
            break;
          case 'Menu':
            iconName = 'ios-menu';
            break;
        }
        // ios-menu, ios-body, ios-notifications, ios-shirt,
        if(iconName == 'ios-notifications') {
          return (
            <IconBadge
              MainElement={
                <Ionicons
                  name={iconName}
                  size={30}
                  style={{ marginBottom: -3 }}
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
          borderTopWidth: 0.5,
          borderColor: 'black',
          height: 50
        }
    },
    lazy: true,
  }
);

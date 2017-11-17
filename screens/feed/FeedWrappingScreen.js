import React, { Component } from 'react';

import { FontAwesome } from '../../assets/icons'
import { View, Text } from 'react-native';
import PopularPostScreen from './PopularPostScreen';
import FeedScreen from './FeedScreen';
import { Tab, Tabs, TabHeading, Icon } from 'native-base';

import { NavBar } from '../../components/navBar';
import {withRkTheme, RkStyleSheet, RkText} from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);

class FeedWrappingScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Feed',
    headerRight: (
        <RkText
          rkType='awesome large'
          style={{color: 'white'}}
          onPress={() => {navigation.navigate('Searcho')}}>{FontAwesome.search}</RkText>
      ),
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  })

  render() {
    return (
      <View style={{flex: 1}}>
        <Tabs initialPage={0}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        >
          <Tab
            heading="Following"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <FeedScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading="Popular"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <PopularPostScreen navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  tabStyle : {
    // backgroundColor: theme.colors.navbar,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: 120,
    height: 40,
  },
  activeTabStyle: {
    backgroundColor: 'white',
    height: 40,
  },
  textStyle: {
    color: "#6d6d6d",
    fontSize: 14
  },
  activeTextStyle: {
    color: theme.colors.navbar,
    fontSize: 14
  },
  tabBarUnderlineStyle: {
    backgroundColor: theme.colors.navbar,
    height: 2
  }
}));

export default FeedWrappingScreen;

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
    title: 'Stylee Feed',
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
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        activeTextStyle={styles.activeTextStyle}
        textStyle={styles.textStyle}
        >
          <Tab
            heading={<TabHeading style={styles.tabStyle}><Text style={styles.textStyle}>Following</Text></TabHeading>}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
            >
            <FeedScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading={<TabHeading style={styles.tabStyle}><Text style={styles.textStyle}>Popular</Text></TabHeading>}
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
    backgroundColor: theme.colors.navbar,
    justifyContent: 'center',
    width: 120
  },
  activeTabStyle: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
  },
  activeTextStyle: {
    color: 'white',
  }
}));

export default FeedWrappingScreen;

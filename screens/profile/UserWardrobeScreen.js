import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FABs from '../../components/common/FABs';
import { Tabs, Tab, TabHeading, ScrollableTab } from 'native-base';
import TopScreen from './TopScreen';
import OutwearScreen from './OutwearScreen';
import BottomScreen from './BottomScreen';
import ShoeScreen from './ShoeScreen';
import EtcScreen from './EtcScreen';
import { RkStyleSheet, RkButton, RkText } from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class UserWardrobeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null
  })

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLayout}>
          <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={() => {
            this.props.navigation.goBack()
          }}>
            <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
          </RkButton>
          <View rkCardHeader style={styles.left}>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <RkText rkType='header3'>Wardrobe</RkText>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }


  render() {
    let { userPk } = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        <View>
          {this._renderHeader()}
        </View>
          <Tabs initialPage={0}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            locked={true}
            renderTabBar={()=> <ScrollableTab style={{height:40}}/>}>
            <Tab
              heading="Top"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}>
              <TopScreen
                navigation={this.props.navigation}
                userPk={userPk}/>
            </Tab>
            <Tab
              heading="Outerwear"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}>
              <OutwearScreen navigation={this.props.navigation} userPk={userPk}/>
            </Tab>
            <Tab
              heading="Bottom"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}>
             <BottomScreen navigation={this.props.navigation} userPk={userPk}/>
            </Tab>
            <Tab
              heading="Shoes"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}>
              <ShoeScreen navigation={this.props.navigation} userPk={userPk}/>
            </Tab>
            <Tab
              heading="Others"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}>
              <EtcScreen navigation={this.props.navigation} userPk={userPk}/>
            </Tab>
          </Tabs>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  tabStyle : {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 40
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
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menu: {
    width: 50
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'center',
  },
  header: {
    height: 55,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
    elevation: 4,
    zIndex: 5,
    overflow: 'visible'
  },
  headerLayout: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white'
  },
}));


function mapStateToProps({auth: {token, hType}}) {
  return { token, hType };
}

export default connect(mapStateToProps, actions)(UserWardrobeScreen);

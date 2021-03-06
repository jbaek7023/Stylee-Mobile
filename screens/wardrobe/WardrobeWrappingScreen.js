import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FABs from '../../components/common/FABs';
import { Tabs, Tab, TabHeading, ScrollableTab } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import TopScreen from './TopScreen';
import OutwearScreen from './OutwearScreen';
import BottomScreen from './BottomScreen';
import ShoeScreen from './ShoeScreen';
import EtcScreen from './EtcScreen';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';
import { NavBar } from '../../components/navBar';
import {withRkTheme, RkText, RkStyleSheet, TouchableOpacity, RkButton } from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);
import { Ionicons } from '@expo/vector-icons';

class WardrobeWrappingScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Wardrobe',
    headerRight: (
      <RkButton
        rkType='clear'
        style={{marginRight: 15}}
        onPress={() => {
          navigation.navigate('AddClotho')
        }}>
        <Ionicons
          name='md-add'
          size={32}
          style={{ marginBottom: -3 }}
          color="white"
        />
      </RkButton>
      ),
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  })

  state = {
    // this is nothing! yet
    isModalVisible: false
  }

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  _renderModal = () => {
    return (
      <CameraImageSelectModal
        hideModal={this._hideModal}
        isModalVisible={this.state.isModalVisible}
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
              <TopScreen navigation={this.props.navigation}/>
            </Tab>
            <Tab
              heading="Outerwear"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}>
              <OutwearScreen navigation={this.props.navigation}/>
            </Tab>
            <Tab
              heading="Bottom"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}>
             <BottomScreen navigation={this.props.navigation}/>
            </Tab>
            <Tab
              heading="Shoes"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}>
              <ShoeScreen navigation={this.props.navigation}/>
            </Tab>
            <Tab
              heading="Others"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}>
              <EtcScreen navigation={this.props.navigation}/>
            </Tab>
          </Tabs>
        {this._renderModal()}
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
  }
}));


function mapStateToProps({auth: {token, hType}}) {
  return { token, hType };
}

export default connect(mapStateToProps, actions)(WardrobeWrappingScreen);

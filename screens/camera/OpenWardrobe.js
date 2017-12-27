import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
import {FontAwesome} from '../../assets/icons';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';

class WardrobeWrappingScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarVisible: false,
  })

  state = {
    isModalVisible: false,
    selectedClothesIds: this.props.navigation.state.params.selectedClothesIds,
  }

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

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
                <RkText rkType='header3'>Tag From Wardrobe</RkText>
              </View>
            </View>
          </View>
          <View style={styles.right}>
              <TouchableOpacity onPress={
                () => {
                  this.props.navigation.state.params.onCheck(this.state.selectedClothesIds);
                  this.props.navigation.goBack();
                }}>
                <RkText rkType="header3">SAVE</RkText>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _handleImagePress = (id) => {
    let ids = this.state.selectedClothesIds
    if(ids == undefined) {
      ids = [];
    }
    if(_.includes(ids, id)) {
      let newSelectedClothesIds = _.filter(ids, (curObject) => {
          return curObject !== id;
      });
      this.setState({selectedClothesIds : newSelectedClothesIds});
    } else {
      let newSelectedClothesIds = [...ids, id];
      this.setState({selectedClothesIds : newSelectedClothesIds});
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this._renderHeader()}
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
              selectedClothesIds={this.state.selectedClothesIds}
              handleImagePress={this._handleImagePress}/>
          </Tab>
          <Tab
            heading="Outerwear"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <OutwearScreen
              navigation={this.props.navigation}
              selectedClothesIds={this.state.selectedClothesIds}
              handleImagePress={this._handleImagePress}/>
          </Tab>
          <Tab
            heading="Bottom"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
           <BottomScreen
            navigation={this.props.navigation}
            selectedClothesIds={this.state.selectedClothesIds}
            handleImagePress={this._handleImagePress}/>
          </Tab>
          <Tab
            heading="Shoes"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <ShoeScreen
              navigation={this.props.navigation}
              selectedClothesIds={this.state.selectedClothesIds}
              handleImagePress={this._handleImagePress}/>
          </Tab>
          <Tab
            heading="Others"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <EtcScreen
              navigation={this.props.navigation}
              selectedClothesIds={this.state.selectedClothesIds}
              handleImagePress={this._handleImagePress}/>
          </Tab>
        </Tabs>
        <View style={styles.footer}>
          <RkText rkType="primary2">{this.state.selectedClothesIds.length} Item Selected</RkText>
        </View>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  footer: {
    padding: 10,
    backgroundColor: theme.colors.screen.alter,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
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
    backgroundColor: theme.colors.screen.base
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  menu: {
    width: 40
  }
}));


function mapStateToProps({auth: {token, hType}}) {
  return { token, hType };
}

export default connect(mapStateToProps, actions)(WardrobeWrappingScreen);

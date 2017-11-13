import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, CheckBox} from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {FontAwesome} from '../../assets/icons';
import { threeImageWidth } from '../../utils/scale';
import _ from 'lodash';
import {UIConstants} from '../../config/appConstants';

import TopScreen from './TopScreen';
import OutwearScreen from './OutwearScreen';
import BottomScreen from './BottomScreen';
import ShoeScreen from './ShoeScreen';
import EtcScreen from './EtcScreen';

import { Tabs, Tab, TabHeading } from 'native-base';

class OpenWardrobe extends Component {
  // normal navigation
  static navigationOptions = ({ navigation }) => ({
    title: 'Tag Your Style',
    gesturesEnabled: false,
    tabBarVisible: false,
    headerStyle: {height: 50},
    headerLeft: (
      <RkButton
        rkType='clear'
        style={{width: 50}}
        onPress={() => {
          navigation.goBack()
        }}>
        <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
      </RkButton>
    ),
    headerRight: (
      <RkButton
        rkType='clear'
        onPress={() => {
          navigation.goBack();
        }}>
        <RkText rkType="header3" style={{marginRight:15, color:'#f64e59'}}>SAVE</RkText>
      </RkButton>
    ),
  })

  render() {
    return (
      <View style={{flex:1}}>
        <Tabs initialPage={0} style={{backgroundColor: '#D5CFF2'}}>
          <Tab heading={<TabHeading style={styles.tabStyle}><Text style={styles.tabHeadingStyle}>상의</Text></TabHeading>}>
            <TopScreen clothes={this.props.tops} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabStyle}><Text style={styles.tabHeadingStyle}>아우터</Text></TabHeading>}>
            <OutwearScreen clothes={this.props.outwears} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabStyle}><Text style={styles.tabHeadingStyle}>하의</Text></TabHeading>}>
           <BottomScreen clothes={this.props.bottoms} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabStyle}><Text style={styles.tabHeadingStyle}>신발</Text></TabHeading>}>
            <ShoeScreen clothes={this.props.shoes} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabStyle}><Text style={styles.tabHeadingStyle}>기타</Text></TabHeading>}>
            <EtcScreen clothes={this.props.etcs} navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </View>
    );


  }

  componentDidMount() {
    this.props.fetchClothesAll(this.props.token, this.props.hType);
  }
};

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1
  },
  rowImage:{
    width: threeImageWidth,
    height: threeImageWidth,
    marginRight: 2,
    marginTop: 2
  },
  footer: {
    padding: 10,
    backgroundColor: theme.colors.screen.alter,
    alignItems: 'center',
    justifyContent: 'center'
  },
  layoutheader: {
    backgroundColor: theme.colors.navbar,
    paddingTop: UIConstants.StatusbarHeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.base
  },
  containerheader: {
    flexDirection: 'row',
    height: UIConstants.AppbarHeight,
  },
  tabHeadingStyle: {
    color: 'white'
  },
  tabStyle : {
    backgroundColor: '#6F3AB1',
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

function mapStateToProps({
    auth: {token, hType},
    wardrobe: { clothesList: {tops, bottoms, outwears, shoes, etcs} }
  }) {
  return { token, hType, tops, outwears, bottoms, shoes, etcs };
}

export default connect(mapStateToProps, actions)(OpenWardrobe);
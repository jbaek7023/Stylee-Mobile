import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FABs } from '../../components/common/FABs';
import { Tabs, Tab, TabHeading } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import TopScreen from './TopScreen';
import OutwearScreen from './OutwearScreen';
import BottomScreen from './BottomScreen';
import ShoeScreen from './ShoeScreen';
import EtcScreen from './EtcScreen';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';

import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);

class WardrobeWrappingScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '옷장',
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  })

  state = {
    isModalVisible: false
  }

  componentWillMount() {
    this.props.fetchClothesAll(this.props.token, this.props.hType);
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
        {this._renderModal()}
        <FABs onFABsPress={this._showModal}/>
      </View>
    )
  }
}
// <FABs
//   active={this.state.active}
//   onPress={this._onFABPress}
// />
const styles = StyleSheet.create({
  tabHeadingStyle: {
    color: 'white'
  },
  tabStyle : {
    backgroundColor: '#7E50CE',
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
});

function mapStateToProps({
    auth: {token, hType},
    wardrobe: { clothesList: {tops, bottoms, outwears, shoes, etcs} }
  }) {
  return { token, hType, tops, outwears, bottoms, shoes, etcs };
}

export default connect(mapStateToProps, actions)(WardrobeWrappingScreen);

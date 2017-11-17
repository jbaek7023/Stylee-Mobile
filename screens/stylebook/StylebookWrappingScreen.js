import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Tab, Tabs, TabHeading, Icon } from 'native-base';
import StylebookAllScreen from './StylebookAllScreen';
import StylebookCategoryScreen from './StylebookCategoryScreen';
import StylebookStarScreen from './StylebookStarScreen';
// Nav Bar
import { NavBar } from '../../components/navBar';
import {withRkTheme, RkText, RkStyleSheet} from 'react-native-ui-kitten';
import FABs from '../../components/common/FABs';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';
let ThemedNavigationBar = withRkTheme(NavBar);
import { FontAwesome } from '../../assets/icons'
import { Ionicons } from '@expo/vector-icons';

class StylebookWrappingScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Stylebook',
    headerRight: (
      <Ionicons
        name='ios-contact'
        size={32}
        style={{ marginBottom: -3 }}
        color="white"
      />
    ),
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  })

  state = {
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
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}>
          <Tab
            heading="Styles"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <StylebookAllScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading="Category"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <StylebookCategoryScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading="Bookmark"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <StylebookStarScreen navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
        <FABs navigation={this.props.navigation}/>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  tabStyle : {
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

export default StylebookWrappingScreen;

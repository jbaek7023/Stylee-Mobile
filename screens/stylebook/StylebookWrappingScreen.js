import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Tab, Tabs, TabHeading, Icon } from 'native-base';
import StylebookAllScreen from './StylebookAllScreen';
import StylebookCategoryScreen from './StylebookCategoryScreen';
import StylebookStarScreen from './StylebookStarScreen';
// Nav Bar
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten';
import FABs from '../../components/common/FABs';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';
let ThemedNavigationBar = withRkTheme(NavBar);

class StylebookWrappingScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Stylebook',
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
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        activeTextStyle={styles.activeTextStyle}
        textStyle={styles.textStyle}
        >
          <Tab
            heading={<TabHeading style={styles.tabStyle}><Text style={styles.textStyle}>All</Text></TabHeading>}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
            >
            <StylebookAllScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading={<TabHeading style={styles.tabStyle}><Text style={styles.textStyle}>Category</Text></TabHeading>}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <StylebookCategoryScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading={<TabHeading style={styles.tabStyle}><Icon style={styles.textStyle} name="star" /></TabHeading>}
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

// {this._renderModal()}

// Tabs: tabBarUnderlineStyle
// <FABs
//   active={this.state.active}
//   onPress={this._onFABPress}
// />
// backgroundColor: '#A478E6',
const styles = StyleSheet.create({
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
})

export default StylebookWrappingScreen;

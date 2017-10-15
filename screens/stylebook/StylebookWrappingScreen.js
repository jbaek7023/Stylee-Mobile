import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tab, Tabs, TabHeading, Icon } from 'native-base';
import StylebookAllScreen from './StylebookAllScreen';
import StylebookCategoryScreen from './StylebookCategoryScreen';
import StylebookStarScreen from './StylebookStarScreen';
// Nav Bar
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten';
import { FABs } from '../../components/common/FABs';

let ThemedNavigationBar = withRkTheme(NavBar);

class StylebookWrappingScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '스타일북',
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  })

  state = {
    active: false,
  }

  _onFABPress = () => {
    this.setState({ active: !this.state.active });
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
            heading={<TabHeading style={styles.tabStyle}><Text style={styles.textStyle}>전체</Text></TabHeading>}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
            >
            <StylebookAllScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading={<TabHeading style={styles.tabStyle}><Text style={styles.textStyle}>카테고리</Text></TabHeading>}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <StylebookCategoryScreen navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={<TabHeading style={styles.tabStyle}><Icon style={styles.textStyle} name="star" /></TabHeading>}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}>
            <StylebookStarScreen navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

// Tabs: tabBarUnderlineStyle
// <FABs
//   active={this.state.active}
//   onPress={this._onFABPress}
// />

const styles = StyleSheet.create({
  tabStyle : {
    backgroundColor: '#A478E6',
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

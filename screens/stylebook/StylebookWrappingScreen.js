import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tab, Tabs, TabHeading, Icon } from 'native-base';
import StylebookAllScreen from './StylebookAllScreen';
import StylebookCategoryScreen from './StylebookCategoryScreen';
import StylebookStarScreen from './StylebookStarScreen';
// Nav Bar
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten'
import { FABs } from '../../components/common/FABs';

let ThemedNavigationBar = withRkTheme(NavBar);

class StylebookWrappingScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Stylebook',
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
        <Tabs initialPage={0}>
          <Tab
            heading={<TabHeading><Icon name="md-square" /></TabHeading>}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            >
            <StylebookAllScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading={<TabHeading><Icon name="md-albums" /></TabHeading>}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}>
            <StylebookCategoryScreen navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={<TabHeading><Icon name="star" /></TabHeading>}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}>
            <StylebookStarScreen navigation={this.props.navigation} />
          </Tab>
        </Tabs>
        <FABs
          active={this.state.active}
          onPress={this._onFABPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabStyle : {
    backgroundColor: 'black',
  },
  activeTabStyle: {
    backgroundColor: 'white',
  },
  tabTextStyle: {
    color: 'gray',
  },
  activeTextStyle: {
    color: 'purple',
  }
})

export default StylebookWrappingScreen;

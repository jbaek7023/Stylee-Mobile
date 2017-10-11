import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tab, Tabs, TabHeading, Icon } from 'native-base';
import StylebookAllScreen from './StylebookAllScreen';
import StylebookCategoryScreen from './StylebookCategoryScreen';
import StylebookStarScreen from './StylebookStarScreen';

import { FABs } from '../../components/common/FABs';

class StylebookWrappingScreen extends Component {
  static navigationOptions = {
    title: 'STYLEBOOK',
    headerStyle: {  },
    headerTitleStyle: { alignSelf: 'center' },
  }

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
    backgroundColor: 'white',
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

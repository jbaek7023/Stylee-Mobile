import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Tab, Tabs } from 'native-base';
import StylebookAllScreen from './StylebookAllScreen';
import StylebookCategoryScreen from './StylebookCategoryScreen';
import { FABs } from '../../components/common/FABs';

class StylebookWrappingScreen extends Component {
  state = {
    active: false,
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Tabs initialPage={1}>
          <Tab heading="All">
            <StylebookAllScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Category">
            <StylebookCategoryScreen />
          </Tab>
          <Tab heading="Favorite">
            <Text>Favorite</Text>
          </Tab>
        </Tabs>
        <FABs
          active={this.state.active}
        />
      </View>
    );
  }
}

export default StylebookWrappingScreen;

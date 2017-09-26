import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Tab, Tabs } from 'native-base';
import StylebookAllScreen from './StylebookAllScreen';
import StylebookCategoryScreen from './StylebookCategoryScreen';
import { FABs } from '../../components/common/FABs';

class StylebookWrappingScreen extends Component {
  static navigationOptions = {
    title: 'Stylebook'
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
          <Tab heading="All">
            <StylebookAllScreen navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Category">
            <StylebookCategoryScreen navigation={this.props.navigation} />
          </Tab>
          <Tab heading="Favorite">
            <Text>Favorite</Text>
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

export default StylebookWrappingScreen;

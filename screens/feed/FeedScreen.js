import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FABs } from '../../components/common/FABs';

class FeedScreen extends Component {
  static navigationOptions = {
    title: 'Feed'
  }

  state = {
    active: false
  }


  _onFABPress = () => {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <Text>Feed Screen</Text>
          <Text>Feed Screen</Text>
          <FABs
            active={this.state.active}
            onPress={this._onFABPress}
          />
        </View>
    )
  }
}

export default FeedScreen;

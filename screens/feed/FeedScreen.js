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

  render() {
    return (
        <View style={{flex: 1, backgroundColor: 'pink'}}>
          <Text>Feed Screen</Text>
          <Text>Feed Screen</Text>
          <FABs
            active={this.state.active}
          />
        </View>
    )
  }
}

export default FeedScreen;

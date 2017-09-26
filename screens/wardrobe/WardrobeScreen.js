import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FABs } from '../../components/common/FABs';

class WardrobeScreen extends Component {
  static navigationOptions = {
    title: 'Wardrobe'
  }

  state = {
    active: false
  }

  render() {
    return (
      <View style={{flex:1}}>
        <FABs
          active={this.state.active}
        />
      </View>
    )
  }
}

export default WardrobeScreen;

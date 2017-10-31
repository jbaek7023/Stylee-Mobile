import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Fab, Icon, Button } from 'native-base';
import { FontAwesome } from '../../assets/icons';
import { RkText } from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { ImagePicker } from 'expo';

import { connect } from 'react-redux';

class FABs extends Component {
  onSave = data => {
    // set the num of length
    console.log(data);
  }

  render() {
    return (
      <ActionButton buttonColor="#6F3AB1">
        <ActionButton.Item
          buttonColor='#3498db'
          title="스타일 올리기"
          onPress={() => {
            this.props.navigation.navigate('AddStyleo', {onSave: this.onSave});
          }}>
          <Icon name="md-body" style={styles.actionStyleButton} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#1abc9c'
          title="옷 올리기"
          onPress={() => {
            this.props.navigation.navigate('AddClotho');
          }}>
          <Icon name="md-shirt" style={styles.actionClothIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }


}


const styles = StyleSheet.create({
  actionStyleButton: {
    fontSize: 31,
    height: 33,
    color: 'white',
  },
  actionClothIcon: {
    fontSize: 27,
    height: 29,
    color: 'white',
  },
});

export default connect(null, null)(FABs);

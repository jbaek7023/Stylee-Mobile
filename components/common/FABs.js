import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Fab, Icon, Button } from 'native-base';
import { FontAwesome } from '../../assets/icons';
import { RkText } from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { ImagePicker } from 'expo';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class FABs extends Component {
  state = {

  }

  componentWillReceiveProps(nextProps) {
    // if we can new cloth,
    // Retrieve wardrobe // fetch Clothes
  }

  render() {
    return (
      <ActionButton buttonColor="#6F3AB1">
        <ActionButton.Item
          buttonColor='#3498db'
          title="Add Style"
          onPress={() => {
            this.props.navigation.navigate('AddStyleo');
          }}>
          <Icon name="md-body" style={styles.actionStyleButton} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#1abc9c'
          title="Add Cloth"
          onPress={() => {
            this.props.navigation.navigate('AddClotho', {onSaveCloth: this.onSaveCloth});
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

function mapStateToProps({auth: {token, hType}}) {
  return {token, hType}
}

export default connect(mapStateToProps, actions)(FABs);

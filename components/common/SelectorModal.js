import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SelectorModal extends Component {
  state = {
    image: undefined,
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  // update state -> render again -> update state :: infinite loop
  _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.props.selectAction(item.value)}>
        <RkText>{item.value}</RkText>
      </TouchableOpacity>
    );
  }

  _handleMultipleItem = (itemId) => {
    let { selectionType } = this.props;
    this.props.seasonSelectAction(itemId);
  }

  _renderItemForMultiple = ({item}) => {
    return (
      <TouchableOpacity onPress={() => {this._handleMultipleItem(item.id)}}>
        <RkText>{item.value}</RkText>
      </TouchableOpacity>
    );
  }

  render() {
    let { isSelectorVisible } = this.props;
    let { multiple } = this.props;
    if(!multiple) {
      return (
        <Modal
          isVisible={isSelectorVisible}
          onBackdropPress = {() => this.props.hideSelector()}>
          <View style={styles.modalContainer}>
            <FlatList
              style={styles.root}
              data={this.props.items}
              ItemSeparatorComponent={this._renderSeparator}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal
          isVisible={isSelectorVisible}
          onBackdropPress = {() => this.props.hideSelector()}>
          <View style={styles.modalContainer}>
            <FlatList
              style={styles.root}
              data={this.props.items}
              ItemSeparatorComponent={this._renderSeparator}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItemForMultiple}/>
          </View>
        </Modal>
      );
    }
  }
};

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16
  },
  modalTitleTextContainer: {
    flexDirection: 'row',
    flex:1
  },
  modalTitleText: {
    fontSize: totalSize(3),
  },
  modalContentTextContainer: {
    flex: 2,
    flexDirection: 'row',
    padding: 10
  },
  modalContentText: {
    fontSize: totalSize(2),
    flex: 1,
    color: '#696969'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    overflow: 'hidden'
  },
  modalButtonText: {
    fontSize: totalSize(2),
    flex: 1
  },
  black: {
    color: 'black'
  },
  seperator: {
    backgroundColor: 'black',
    height: 0.5
  }
}));

export default connect(null, actions)(SelectorModal);

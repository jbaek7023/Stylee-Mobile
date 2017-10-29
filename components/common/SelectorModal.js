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
    // undefined
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  _renderCheck = (id) => {
    let { selectedIds } = this.props;
    console.log(selectedIds);
    if(_.includes(selectedIds, id)) {
      return (<RkText>Check</RkText>);
    }
    return (<RkText> </RkText>);
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => this.props.selectAction(item.value, item.id)}>
        <RkText>{item.value}</RkText>
        { this._renderCheck(item.id) }
      </TouchableOpacity>
    );
  }

  _handleMultipleItem = (itemId) => {
    let { selectionType } = this.props;
    this.props.seasonSelectAction(itemId);
  }

  _renderItemForMultiple = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => {this._handleMultipleItem(item.id)}}>
        <RkText>{item.value}</RkText>
        { this._renderCheck(item.id) }
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
  },
  seperator: {
    backgroundColor: 'black',
    height: 0.5
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5
  }
}));

export default connect(null, actions)(SelectorModal);

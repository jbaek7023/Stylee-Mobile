import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SelectorModal extends Component {

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  _renderCheck = (id, value) => {
      if(this.props.gender===value) {
        return (<RkText>Check</RkText>)
      }
  }

  _renderItem = ({item}) => {
    let {value, id} = item;
    return (
      <View>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => this.props.selectAction(value)}>
          <RkText>{value}</RkText>
          { this._renderCheck(id, value) }

        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let { isSelectorVisible } = this.props;
    return (
      <Modal
        isVisible={isSelectorVisible}
        onBackdropPress = {() => this.props.hideSelector()}
        animationInTiming={1}>
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

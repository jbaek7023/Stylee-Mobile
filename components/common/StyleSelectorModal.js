import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, Radio } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {FontAwesome} from '../../assets/icons';

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
    let checked = (this.props.gender==value) ? true : false;
    return (
      <View>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => this.props.selectAction(value)}>
          <RkText>{value}</RkText>
          <Radio selected={checked} />
        </TouchableOpacity>
      </View>
    );
  }

  _renderHeader = () => {
    return (
      <View style={{height:40, alignItems: 'center'}}>
        <RkText rkType="header3">Gender</RkText>
        <TouchableOpacity style={{position: 'absolute', right:5}} onPress={()=>this.props.hideSelector()}>
          <RkText rkType="awesome modalClose">{FontAwesome.delete}</RkText>
        </TouchableOpacity>
      </View>
    )
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
            ListHeaderComponent={this._renderHeader}
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
    borderRadius: 10,
  },
  seperator: {
    backgroundColor: 'black',
    height: 0.5
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  }
}));

export default connect(null, actions)(SelectorModal);

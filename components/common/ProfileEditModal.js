import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, Radio } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {FontAwesome} from '../../assets/icons';


class ProfileEditModal extends Component {
  state = {

  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  _renderItem = ({item}) => {
    let { value } = item;
    let checked = (this.props.gender===value) ? true : false;

    return (
      <View>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => this.props.selectAction(value)}>
          <RkText rkType="primary3">{value}</RkText>
          <Radio selected={checked} onPress={() => this.props.selectAction(value)}/>
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
    let genders = [
      { id: 1, value: "Female" },
      { id: 2, value: "Male" },
      { id: 3, value: "Undefined" },
    ]
    return (
      <Modal
        isVisible={isSelectorVisible}
        onBackdropPress = {() => this.props.hideSelector()}
        animationInTiming={1}
        >
        <View style={styles.modalContainer}>
          <FlatList
            ListHeaderComponent={this._renderHeader()}
            style={styles.root}
            data={genders}
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
    maxHeight: 332,
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

export default connect(null, actions)(ProfileEditModal);

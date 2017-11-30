import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, CheckBox } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {FontAwesome} from '../../assets/icons';

class CategoryModal extends Component {

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemStyle}>
        <CheckBox style={styles.checkboxStyle} checked={true} color="black"/>
        <RkText rkType="primary1" style={styles.categoryText}>Hello</RkText>
        <RkText style={styles.iconStyle} rkType='awesome large'>{FontAwesome.onlyMe}</RkText>
      </TouchableOpacity>
    );
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    let {isCategoryVisible} = this.props;
    return (
      <Modal
        isVisible={isCategoryVisible}
        onBackdropPress = {() => this.props.hideModal()}>
        <View style={styles.modalContainer}>
          <View style={styles.categoryHeader}>
            <RkText rkType="header3">Add To Category</RkText>
          </View>
          <ScrollView style={styles.scrollViewStyle}>
            <FlatList
              horizontal
              data={this.props.categoryList}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
              extraData={this.props.taggedCategories}
            />
          </ScrollView>
          <View style={styles.categoryAdder}>
            <RkText rkType="header4"> + Create New Category</RkText>
          </View>
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
    // we should set the maximum height here
  },
  categoryHeader: {
    borderColor: '#e6e6ee',
    borderBottomWidth: 1,
    padding:17
  },
  categoryAdder: {
    borderColor: '#e6e6ee',
    borderTopWidth: 1,
    padding:15,
    marginLeft:10
  },
  itemStyle: {
    flex:1,
    flexDirection: 'row',
    height: 43,
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 20
  },
  checkboxStyle: {
    marginLeft: 10
  },
  iconStyle: {
    position: 'absolute',
    right: 20
  },
  scrollViewStyle: {
    maxHeight: height(60)
  }
}));

export default connect(null, actions)(CategoryModal);

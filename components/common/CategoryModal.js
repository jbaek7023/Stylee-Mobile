import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, CheckBox } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton, RkTextInput } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {FontAwesome} from '../../assets/icons';
import {
  RkSwitch
} from '../../components/switch/index';

class CategoryModal extends Component {
  _renderPrivacy = (onlyMe) => {
    if(onlyMe) {
      return (
        <RkText style={styles.iconStyle} rkType='awesome large'>{FontAwesome.onlyMe}</RkText>
      );
    } else {
      return (
        <RkText style={styles.iconStyle} rkType='awesome large'>{FontAwesome.all}</RkText>
      );
    }
  }



  _handleSelectCategory = (categoryId, selected) => {
    if(selected) {
      this.props.unselectCategory(this.props.oid, categoryId)
    } else {
      this.props.selectCategory(this.props.oid, categoryId)
    }
  }

  renderItem = ({item}) => {
    let selected = _.includes(this.props.taggedCategories, item.id)
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.itemStyle}
        onPress={()=>{this._handleSelectCategory(item.id, selected)}}>
        <CheckBox
          onPress={()=>{this._handleSelectCategory(item.id, selected)}}
          style={styles.checkboxStyle} checked={selected} color="black"/>
        <RkText rkType="primary1" style={styles.categoryText}>{item.name}</RkText>
        {this._renderPrivacy(item.only_me)}
      </TouchableOpacity>
    );
  }

  _keyExtractor = (item, index) => item.id;

  _renderContent = () => {
    if(this.props.newScreen) {
      // Create New Category
      return (
        <View style={styles.modalContainer}>
          <View style={styles.categoryHeaderTwo}>
            <RkButton
              rkType='clear'
              style={styles.menu}
              onPress={() => {
                this.props.setToCreateScreen(false)
            }}>
              <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
            </RkButton>
          </View>
          <View style={styles.scrollViewStyle}>
            <View style={[styles.nameContainer, styles.titleRow]}>
              <RkTextInput
                placeholder='New Category Name'
                value={this.props.title}
                onChangeText={(title) => {this.props.setTitle(title)}}/>
            </View>
            <View style={[styles.dContainerTwo, styles.titleRow]}>
              <RkText rkType="header4">Only Me</RkText>
              <RkSwitch
                style={styles.switch}
                value={this.props.onlyMe}
                name="Push"
                onValueChange={() => {
                  this.props.setOnlyMe()
                }}
                />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10, paddingRight: 20}}>
            <TouchableOpacity onPress={()=>this.props.handleCreatePress(this.props.oid)} style={styles.categoryAdder, {marginLeft: 15}}>
              <RkText rkType="header3" style={{color: 'blue'}}>Create</RkText>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.modalContainer}>
          <View style={styles.categoryHeader}>
            <RkText rkType="header4">Categorize</RkText>
            <TouchableOpacity onPress={()=>this.props.hideModal()}>
              <RkText rkType="primary1">Done</RkText>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollViewStyle}>
            <FlatList
              data={this.props.categoryList}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
              extraData={this.props.taggedCategories}
            />
          </ScrollView>
          <View style={styles.addButton}>
            <RkButton
              rkType='clear'
              onPress={()=>this.props.setToCreateScreen(true)}>
              <RkText rkType='primary1'>+ Add To New Category</RkText>
            </RkButton>
          </View>
        </View>
      );
    }
  }

  render() {
    let {isCategoryVisible} = this.props;
    return (
      <Modal
        isVisible={isCategoryVisible}
        onBackdropPress = {() => this.props.hideModal()}>
        {this._renderContent()}
      </Modal>
    );
  }
};

const styles = RkStyleSheet.create(theme => ({
  addButton: {
    padding: 15,
    alignItems: 'flex-end'
  },
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
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryHeaderTwo: {
    borderColor: '#e6e6ee',
    borderBottomWidth: 1,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryHeaderSecond: {
    borderColor: '#e6e6ee',
    borderBottomWidth: 1,
    padding: 5
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
    maxHeight: 237
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dContainer: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 10,
  },
  dContainerTwo: {
    paddingTop: 0,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingLeft:20
  },
  moreDetailStyle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
  },
  menu: {
    width: 30,
  }
}));

export default connect(null, actions)(CategoryModal);

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

class EditCategoryModal extends Component {
  state = {
    onlyMe: this.props.onlyMe,
    title: this.props.categoryName
  }

  _handleEditPress = () => {
    let { token, hType, categoryId } = this.props;
    let { title, onlyMe } = this.state;
    this.props.hideModal();
    this.props.editCategoryDetail(token, hType, categoryId, {name: title, onlyMe});
  }

  _renderContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.categoryHeaderTwo}>
          <RkText rkType='header3'>Edit Category</RkText>
        </View>
        <View style={styles.scrollViewStyle}>
          <View style={[styles.nameContainer, styles.titleRow]}>
            <RkTextInput
              placeholder='New Category Name'
              value={this.state.title}
              onChangeText={(title) => {this.setState({title})}}/>
          </View>
          <View style={[styles.dContainerTwo, styles.titleRow]}>
            <RkText rkType="header4">Only Me</RkText>
            <RkSwitch
              style={styles.switch}
              value={this.state.onlyMe}
              name="Push"
              onValueChange={() => {
                this.setState({onlyMe: !this.state.onlyMe})
              }}/>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10, paddingRight: 20}}>
          <TouchableOpacity onPress={()=>this._handleEditPress()} style={styles.categoryAdder, {marginLeft: 15}}>
            <RkText rkType="header3" style={{color: 'blue'}}>Edit</RkText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    let {isEditVisible} = this.props;
    return (
      <Modal
        isVisible={isEditVisible}
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

function mapStateToProps({auth: {token, hType}}) {
  return { token, hType };
}

export default connect(mapStateToProps, actions)(EditCategoryModal);

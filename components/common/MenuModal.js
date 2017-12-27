import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
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
import SnackBar from 'react-native-snackbar-dialog';

class MenuModal extends Component {
  _deleteThisPost = () => {
    SnackBar.show(('The post is deleted'), { duration: 2500 })
  }

  _handleEditPress = () => {
    this.props.handleClose();
    let { postId } = this.props;
    if(this.props.postType == 1) {
      this.props.navigation.navigate('EditOutfit', {id: postId})
    } else {
      this.props.navigation.navigate('EditCloth', {id: postId})
    }
  }

  // Add this post to REPORT QUEUE. (API-POINT)
  // ID, Delete
  // ID: ad880min3838
  // PASSWORD: CLASSI880FIED383877
  _handleReportPress = () => {
    this.props.handleClose();
    SnackBar.show(('Thanks for your feedback! We will review this post soon'), { duration: 2500 })
  }

  _handleDeletePress = () => {
    this.props.handleClose();
    // this.props.postId
    Alert.alert(
      'Are you sure you want to delete your post?',
      "This action cannot be undone. This will permanently delete the post",
      [
        {text: 'Cancel'},
        {text: 'Delete', onPress: () => this._deleteThisPost()},
      ],
      { cancelable: true }
    )
  }

  _renderChildren = () => {
    if(this.props.isOwner) {
      return (
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={()=>this._handleEditPress()}>
            <View style={styles.modalRow}>
              <RkText rkType='awesome' style={styles.modalIcon}>{FontAwesome.edit}</RkText><RkText style={styles.modalTexto}>Edit</RkText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this._handleDeletePress()}>
            <View style={styles.modalRow}>
              <RkText rkType='awesome' style={styles.modalIcon}>{FontAwesome.delete}</RkText><RkText style={styles.modalTexto}>Delete</RkText>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalRow} onPress={()=>this._handleReportPress()}>
            <RkText rkType='awesome' style={styles.modalIconWarning}>{FontAwesome.warning}</RkText><RkText style={styles.modalTexto}>Report</RkText>
          </TouchableOpacity>
        </View>
      );

    }
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onClosed={()=>this.props.handleClose()}
        style={styles.bottomModal}
        onBackdropPress={()=>this.props.handleClose()}>
          {this._renderChildren()}
      </Modal>
    );
  }
};

const styles = RkStyleSheet.create(theme => ({
  modalIcon: {
    marginTop: 4,
  },
  modalIconWarning:{
    marginTop: 5,
  },
  modalTexto: {
    marginLeft: 13
  },
  modalRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: 300
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
}));

export default connect(null, actions)(MenuModal);

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';

class CommonModal extends Component {
  render() {
    return (
      <Modal isVisible={this.props.isModalVisible} onBackdropPress = {() => this.props._hideModal()}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleTextContainer}>
            <Text style={styles.modalTitleText}>{`Can't Find Account`}</Text>
          </View>
          <View style={styles.modalContentTextContainer}>
            <Text style={styles.modalContentText} numberOfLines={4}>{`It looks like ${this.props.username} doesn't match an existing account. If you don't have a Stylee account, you can create one now `}</Text>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button transparent onPress={()=>this.props._hideModal()}>
              <Text style={[styles.modalText, styles.black]}>Find Account</Text>
            </Button>
            <Button transparent onPress={()=>this.props._hideModal()}>
              <Text style={styles.modalText}>Try Again</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: width(90),
    height: height(30),
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
  }
});

export default CommonModal;

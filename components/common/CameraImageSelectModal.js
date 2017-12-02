import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { ImagePicker } from 'expo';
import { RkText } from 'react-native-ui-kitten';

class CameraImageSelectModal extends Component {
  render() {
    let { isModalVisible } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress = {() => this.props.hideModal()}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={this.props.handleCameraPress} style={styles.modalRow}>
            <Image
              source={require('../../assets/images/camera_icon.png')}
              resizeMode="cover"
              style={styles.thumbImageStyle}
            />
            <RkText style={styles.subMargin} rkType="header3">Open Camera</RkText>
          </TouchableOpacity>
          <View style={styles.separator}/>
          <TouchableOpacity onPress={this.props.handleAlbumPress} style={styles.modalRow}>
            <Image
              source={require('../../assets/images/album_image.png')}
              resizeMode="cover"
              style={styles.thumbImageStyle}
            />
            <RkText style={styles.subMargin} rkType="header3">Open Album</RkText>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
};



const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: width(90),
    height: width(45),
  },
  modalRow: {
    width: width(45),
    height: width(50),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  subMargin: {
    marginTop: 10,
  },
  separator: {
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: width(40),
    backgroundColor: '#DCDCDC'
  },
  thumbImageStyle: {
    paddingBottom: 5,
    width: width(20),
    height: width(20),
  },
});

export default CameraImageSelectModal;

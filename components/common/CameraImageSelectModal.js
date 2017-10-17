import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { ImagePicker } from 'expo';

class CameraImageSelectModal extends Component {
  _handleCameraPress = () => {
    this.props.hideModal();
    this.props.navigation.navigate('CameraTake');
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);

//     result_sample
//     {
//   "cancelled":false,
//   "height":1611,
//   "width":2148,
//   "uri":"file:///data/user/0/host.exp.exponent/cache/cropped1814158652.jpg"
// }
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _handleAlbumPress = async () => {
    this.props.hideModal();
    this._pickImage();
  }



  render() {
    let { isModalVisible } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress = {() => this.props.hideModal()}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleTextContainer}>
            <Text style={styles.modalTitleText}>Hello World</Text>
          </View>
          <View style={styles.modalContentTextContainer}>
            <Text style={styles.modalContentText}></Text>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button transparent onPress={this._handleCameraPress}>
              <Text style={[styles.modalText, styles.black]}>Camera</Text>
            </Button>
            <Button transparent onPress={this._handleAlbumPress}>
              <Text style={styles.modalText}>Open Album</Text>
            </Button>
          </View>
        </View>
      </Modal>

    );
  }
};



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

export default CameraImageSelectModal;

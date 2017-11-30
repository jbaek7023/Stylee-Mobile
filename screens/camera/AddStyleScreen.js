import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { ImageEditor, ImageStore, ScrollView, View, List, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';
import { threeImageWidth } from '../../utils/scale';
import {FontAwesome} from '../../assets/icons';
import CategoryModal from '../../components/common/CategoryModal';
import Modal from 'react-native-modal';
import { Button } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { ImagePicker } from 'expo';

import {
  RkSwitch
} from '../../components/switch/index';
// Header Left goBack'
// Header Title Post your Style
// Header Right POST
import { NavBar } from '../../components/navBar';
import { withRkTheme } from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);

class AddStyleScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Your Style',
    gesturesEnabled: false,
    tabBarVisible: false,
    headerStyle: {height: 50},
    headerLeft: (
      <RkButton
        rkType='clear'
        style={{width: 50}}
        onPress={() => {
          navigation.goBack()
        }}>
        <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
      </RkButton>
    ),
    headerRight: (
      <RkButton
        rkType='clear'
        onPress={() => {
          navigation.goBack()
        }}>
        <RkText rkType="header3" style={{marginRight:15, color:'#f64e59'}}>SAVE</RkText>
      </RkButton>
    ),
  })

  state = {
    isModalVisible: true,
    onlyMe: false,
    myInfo: true,
    text: '',
    textHeight: 0,
    isYou: true,
    image: null,
    width: null,
    height: null
  }
  // END OF CAMEARA
  _setClothImage = (image) => {this.setState({image}); this.props.navigation.setParams({image});}

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })
  _showCategoryModal = () => this.setState({ isCategoryVisible: true });
  _hideCategoryModal = () => this.setState({ isCategoryVisible: false });
  _setWidth = (width) => this.setState({ width })
  _setHeight = (height) => this.setState({ height })

  // CAMERA
  _handleCameraPress = async () => {
    this._hideModal();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 3],
      base64: true
    });

    if (!result.cancelled) {
      // this.setState({ image: result.uri });
      this._setClothImage(result.uri);
      console.log(result);
      console.log(result.height);
      console.log(result.width);
      this._setWidth(result.width);
      this._setHeight(result.height);
      this.props.navigation.setParams({base64: result.base64});
    }
  }

  _handleAlbumPress = async () => {
    this._hideModal();
    this._pickImage();
  }

  _pickImage = async () => {
    this._hideModal();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
      base64: true
    });

    if (!result.cancelled) {
      this._setClothImage(result.uri);
      // console.log(result);
      console.log(result.height);
      console.log(result.width);
      this._setWidth(result.width);
      this._setHeight(result.height);
      this.props.navigation.setParams({base64: result.base64});
    }
  };

  _renderModal = () => {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        onBackdropPress = {() => this._hideModal()}>
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
    )
  }

  _openWardrobe = () => {
    this.props.navigation.navigate('OpenWardrobe');
  }

  _openUserCategory = () => {
    this._showCategoryModal();
  }

  _renderClothImage = () => {
    let {image} = this.state;
    if(!_.isNil(image)) {
      return (
        <Image
          source={{uri: image}}
          style={styles.headImageStyle}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Image
          source={require('../../assets/images/robot-dev.png')}
          resizeMode="cover"
          style={styles.headImageStyle}
        />
      );
    }
  }

  tagFromPhoto = (taggedClothes) => {
    // console.log(taggedClothes);
    // Execute cropImage
    // taggedClothes[0]
    let { left, top, thumbSize } = taggedClothes[0];
    let topData = top - thumbSize/2;
    let leftData = left - thumbSize/2;

    console.log(this.state.height);
    //480 480
    console.log(topData);
    console.log(thumbSize); //347
    console.log(width(100));
    let realThumbSize = thumbSize/width(100)*(this.state.width);
    let realTop = topData/width(100)*(this.state.height);
    let realLeft = leftData/width(100)*(this.state.width);
    console.log(realThumbSize);

    let imageData = {
      offset: {
        x: realLeft,
        y: realTop
      },
      size: {
        width: realThumbSize,
        height: realThumbSize
      },
      resizeMode: 'contain'
    }
    ImageEditor.cropImage(
      this.state.image,
      imageData,
      (successURI) => {
        ImageStore.getBase64ForTag(successURI,
          (base64Data) => {
            // console.log(base64Data);
            // set this base data to the cropped datas
          },
          (failure) => {console.log('failed to load')});
        console.log(successURI);
        let removeResult = ImageStore.removeImageForTag(successURI);
        console.log(removeResult);
      },
      (error) => { console.log('ERROR: ', error)}
    )
    // Saved success uri goes to setState to tagged Clothes.
  }

  _tagFromPhoto = () => {
    let { image } = this.state;
    if(image) {
      this.props.navigation.navigate('TagFromPhoto', {image, tagFromPhoto: this.tagFromPhoto});
    } else {
      this._showModal();
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headContainer}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.imageContainer]}
              onPress={()=>{this.setState({isModalVisible:true})}}>
              {this._renderClothImage()}
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.dContainer, styles.titleRow]}>
          <RkText rkType="header5">Style Title</RkText>
          <TextInput
            multiline
            selectionColor='grey'
            underlineColorAndroid='white'
            placeholder="Special Outfit For Special Day"
            style={[styles.moreDetailStyle]}
            onChangeText={(text)=>{
              this.setState({text})
            }}
            onContentSizeChange={(event) => {
              this.setState({ textHeight: event.nativeEvent.contentSize.height });
            }}
            value={this.state.text}/>
        </View>

        <View style={styles.contextSeperator}/>

        <View style={styles.dContainer}>
          <RkText rkType="header5">Detail</RkText>
        </View>

        <TouchableOpacity style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary3">Gender</RkText><RkText rkType="primary2">Male</RkText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary3">Location</RkText><RkText rkType="primary2">USA</RkText>
        </TouchableOpacity>

        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary3">Is it you in the picture?</RkText>
          <RkSwitch
            style={styles.switch}
            value={this.state.isYou}
            name="Push"
            onValueChange={(isYou) => this.setState({isYou})}/>
        </View>
        <View style={styles.contextSeperator}/>
        <TouchableOpacity
         style={[styles.dContainer, styles.drow]}
         onPress={this._openUserCategory}>
            <RkText rkType="header5">Category</RkText>
            <RkText rkType="header5 primary right">Add To Category</RkText>
        </TouchableOpacity>
        <View style={styles.contextSeperator}/>
        <TouchableOpacity
         style={[styles.dContainer, styles.drow]}
         onPress={this._openWardrobe}>
            <RkText rkType="header5">Tagged Clothes</RkText>
            <RkText rkType="header5 primary right">From Wardrobe</RkText>
        </TouchableOpacity>
        <View style={styles.contextSeperator}/>
        <TouchableOpacity
         style={[styles.dContainer, styles.drow]}
         onPress={this._tagFromPhoto}>
            <RkText rkType="header5">New Clothes</RkText>
            <RkText rkType="header5 primary right">Tag From Photo</RkText>
        </TouchableOpacity>
        <View style={styles.contextSeperator}/>
        <View style={styles.dContainer}>
          <RkText rkType="header5">Privacy</RkText>
        </View>
        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary3">Only Me</RkText>
          <RkSwitch
            style={styles.switch}
            value={this.state.onlyMe}
            name="Push"
            onValueChange={(onlyMe) => this.setState({onlyMe})}/>
        </View>
        <View>
          {this._renderModal()}
        </View>
        <View>
          <CategoryModal
            isCategoryVisible={this.state.isCategoryVisible}
            hideModal={this._hideCategoryModal}
            />
        </View>
      </ScrollView>
    );
  }
}

// <View>
//   <View><Image /></View>
//   <RkTextInput />
// </View>
// <RkText>Clothes in this outfit</RkText>
// <List></List>
// <RkText>DETAIL</RkText>
// <CheckBox
//   style={{flex: 1, padding: 10}}
//   onClick={(myInfo)=>this.setState({myInfo})}
//   isChecked={this.state.myInfo}
//   leftText={'User Info'}
// />
//
// <RkText>Gender</RkText><RkTextInput />
// <RkText>Location</RkText> <RkTextInput />
// <RkText>Only Me </RkText>
// <RkSwitch
//   style={styles.switch}
//   value={this.state.onlyMe}
//   name="Push"/>
// {this._renderModal}

let styles = RkStyleSheet.create(theme => ({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    backgroundColor: theme.colors.screen.base,
  },
  switch: {
    marginVertical: 0
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingLeft:20
  },
  drow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#cfcfd6',
    justifyContent: 'center'
  },
  leftheadContainer: {
    width:90
  },
  imageContainer: {
    margin:10,
    justifyContent: 'center'
  },
  inputStyle: {
    marginTop:10,
    marginBottom:10,
    flex: 1,
    fontSize: 15,
    marginRight: 10
  },
  headImageStyle: {
    width:70,
    height: 70
  },
  rightheadContainer: {
    alignItems: 'stretch',
    flex: 1
  },
  dHeader: {
    color: theme.colors.primary,
  },
  dContainer: {
    padding: 10
  },
  taggedImage: {
    width:threeImageWidth,
    height: threeImageWidth,
    marginRight: 2,
    marginTop: 2,
  },
  contextSeperator: {
    backgroundColor: "#e6e6ee",
    height: 0.5
  },
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
  },
  moreDetailStyle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
  },
}));

export default AddStyleScreen;

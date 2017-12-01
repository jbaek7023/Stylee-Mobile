import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { findNodeHandle, ImageEditor, ImageStore, ScrollView, View, List, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';
import { threeImageWidth } from '../../utils/scale';
import {FontAwesome} from '../../assets/icons';
import CategoryModal from '../../components/common/CategoryModal';
import Modal from 'react-native-modal';
import { Button } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { ImagePicker } from 'expo';
import StyleSelectorModal from '../../components/common/StyleSelectorModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {
  RkSwitch
} from '../../components/switch/index';
// Header Left goBack'
// Header Title Post your Style
// Header Right POST
import { NavBar } from '../../components/navBar';
import { withRkTheme } from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);
import { genders } from '../../utils/menuItems';

class AddStyleScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Your Style',
    gesturesEnabled: false,
    tabBarVisible: false,
    header: null
  })

  state = {
    isModalVisible: true,

    myInfo: true,
    text: '',
    textHeight: 0,

    image: null,
    width: null,
    height: null,

    items: [],

    isSelectorVisible: false,

    gender: 'Unisex',
    location: '',
    isYou: true,
    selectedClothesIds: [],
    taggedCategories: [],
    newClothInstances: [],
    onlyMe: false,

    categoryList: [],
  }
  // END OF CAMEARA
  _setClothImage = (image) => {this.setState({image}); this.props.navigation.setParams({image});}
  _setGender = (gender) => {this.setState({gender})}
  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })
  _showCategoryModal = () => this.setState({ isCategoryVisible: true })
  _hideCategoryModal = () => this.setState({ isCategoryVisible: false })
  _setWidth = (width) => this.setState({ width })
  _setHeight = (height) => this.setState({ height })
  _showSelector = () => this.setState({ isSelectorVisible: true })
  _hideSelector = () => this.setState({ isSelectorVisible: false })
  _setLocation = (location) => this.setState({location})
  _setTaggedCategories = (taggedCategories) => this.setState({taggedCategories})
  _setOnlyMe = () => {
    if(this.state.onlyMe) {
      this.setState({onlyMe: false});
    } else {
      this.setState({onlyMe: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    // onAuthComplete Pass twice. so. it's
    console.log(nextProps.list);
    if ( this.props.list !== nextProps.list) {
      this.setState({categoryList:nextProps.list});
    }
  }
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
      this._setWidth(result.width);
      this._setHeight(result.height);
      this.props.navigation.setParams({base64: result.base64});
    }
  };

  _renderModal = () => {
    return (
      <CameraImageSelectModal
        isModalVisible={this.state.isModalVisible}
        hideModal={this._hideModal}
        handleCameraPress={this._handleCameraPress}
        handleAlbumPress={this._handleAlbumPress}
      />
    )
  }

  _selectAction = (value) => {
    this._setGender(value);
    this._hideSelector();
  }

  onCheck = (selectedClothesIds) => {
    this.setState({selectedClothesIds});
  }

  _openWardrobe = () => {
    let { selectedClothesIds } = this.state;
    this.props.navigation.navigate('OpenWardrobe', {onCheck: this.onCheck, selectedClothesIds});
  }

  _openUserCategory = () => {
    let { token, hType } = this.props;
    this.props.fetchUserCategories(token, hType);
    this._showCategoryModal();
  }

  _renderClothImage = () => {
    let {image} = this.state;
    if(!_.isNil(image)) {
      return (

          <Image
            source={{uri: image}}
            style={styles.headValidStyle}
            resizeMode="cover"
          />
      );
    } else {
      return (
        <View style={{padding: 15}}>
          <Image
            source={require('../../assets/images/add_icon.png')}
            resizeMode="cover"
            style={styles.headImageStyle}
          />
        </View>
      );
    }
  }

  tagFromPhoto = (taggedClothes) => {
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

  // Selector Modal
  _renderStyleSelectorModal = () => {
    return (
      <StyleSelectorModal
        isSelectorVisible={this.state.isSelectorVisible}
        items={this.state.items}
        hideSelector={this._hideSelector}
        selectAction={this._selectAction}
        gender={this.state.gender}
      />
    );
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLayout}>
          <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={() => {
            this.props.navigation.goBack()
          }}>
            <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
          </RkButton>
          <View rkCardHeader style={styles.left}>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <RkText rkType='header3'>Add Your Style</RkText>
              </View>
            </View>
          </View>
          <View style={styles.right}>
              <TouchableOpacity onPress={
                () => {
                  let {image, text, bigType, clothType, selectedSeasonIds,
                    gender, selectedSizeIds, selectedColorIds, selectedStyleIds,
                    brand, location, link, inWardrobe, onlyMe, base64 } = this.state;
                  let {token, hType} = this.props;
                  if(token) {
                    this.props.createStyle(token, hType, {
                      image, text, bigType, clothType, selectedSeasonIds,
                      gender, selectedSizeIds, selectedColorIds, selectedStyleIds,
                      brand, location, link, inWardrobe, onlyMe, base64 });
                  }
                  this.props.navigation.goBack();
                }}>
                <RkText rkType="header3">SAVE</RkText>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _handleDetailPress = () => {
    this.setState({items: genders});
    this._showSelector();
  }

  _scrollToInput = (reactNode: any) => {
    this.scroll.props.scrollToFocusedInput(reactNode)
  }

  _renderTaggedClothes = () => {
    let ids = this.state.selectedClothesIds;
    if(ids.length==0) {
      return (
        <RkText rkType="header5 primary right">Open Wardrobe</RkText>
      );

    } else if(ids.length==1) {
      return (
        <RkText rkType="header5 primary right">{ids.length} Cloth From Wardrobe</RkText>
      );

    } else {
      return (
        <RkText rkType="header5 primary right">{ids.length} Clothes From Wardrobe</RkText>
      );
    }
  }

  _selectCategory = (id) => {
    let { taggedCategories } = this.state;
    if(_.includes(taggedCategories, id)) {
      let newTaggedCategories = _.filter(taggedCategories, (curObject) => {
          return curObject !== id;
      });
      this._setTaggedCategories(newTaggedCategories);
    } else {
      let newTaggedCategories = [...this.state.taggedCategories, id];
      this._setTaggedCategories(newTaggedCategories);
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this._renderHeader()}
        <KeyboardAwareScrollView
          innerRef={ref => {this.scroll = ref}}
          style={styles.container}>
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

          <TouchableOpacity
            onPress={()=>{this._handleDetailPress()}}
            style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Gender</RkText><RkText rkType="primary2">{this.state.gender}</RkText>
          </TouchableOpacity>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Location</RkText>
            <TextInput
              onFocus={(event: Event) => {
                this._scrollToInput(findNodeHandle(event.target))
              }}
              value={this.state.location}
              style={styles.moreDetailStyle}
              underlineColorAndroid='white'
              onChangeText={(location) => this._setLocation(location)}/>
          </View>

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
           onPress={this._openWardrobe}>
              <RkText rkType="header5">Tagged Clothes</RkText>
              {this._renderTaggedClothes()}
          </TouchableOpacity>
          <View style={styles.contextSeperator}/>
          <TouchableOpacity
           style={[styles.dContainer, styles.drow]}
           onPress={this._tagFromPhoto}>
              <RkText rkType="header5">New Clothes</RkText>
              <RkText rkType="header5 primary right">Tag From Photo</RkText>
          </TouchableOpacity>
          <View style={styles.contextSeperator}/>
          <TouchableOpacity
           style={[styles.dContainer, styles.drow]}
           onPress={this._openUserCategory}>
              <RkText rkType="header5">Category</RkText>
              <RkText rkType="header5 primary right">Add To Category</RkText>
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
              onValueChange={() => this._setOnlyMe()}/>
          </View>
          <View>
            {this._renderModal()}
          </View>
          <View>
            <CategoryModal
              isCategoryVisible={this.state.isCategoryVisible}
              hideModal={this._hideCategoryModal}
              taggedCategories={this.state.taggedCategories}
              categoryList={this.state.categoryList}
              selectCategory={this._selectCategory}
              />
          </View>
          <View>
            {this._renderStyleSelectorModal()}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

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
    width:40,
    height: 40,
  },
  headValidStyle: {
    width:70,
    height: 70,
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
    marginTop: 5,
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: width(40),
    backgroundColor: '#DCDCDC'
  },
  thumbImageStyle: {
    paddingBottom: 5,
    width: width(25),
    height: width(25),
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
  header: {
    height: 55,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
    elevation: 4,
    zIndex: 5,
    overflow: 'visible'
  },
  headerLayout: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  menu: {
    width: 50
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'center',
  },
}));

function mapStateToProps({auth: {token, hType}, category: {list}}) {
  return { token, hType, list }
}

export default connect(mapStateToProps, actions)(AddStyleScreen);

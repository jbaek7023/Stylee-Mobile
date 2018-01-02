import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { FlatList, findNodeHandle, ImageEditor, ImageStore, ScrollView, View, List, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
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
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SnackBar from 'react-native-snackbar-dialog';
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
import { items } from '../../utils/items';

class AddStyleScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    tabBarVisible: false,
    header: null
  })

  state = {
    isCategoryVisible: false,
    newScreen: false,
    title: '',
    base64: undefined,
    categoryOnlyMe: false,
    isModalVisible: true,
    name: '',
    textHeight: 0,
    image: null,
    width: null,
    height: null,
    items: [],
    isSelectorVisible: false,
    gender: 'Unisex',
    location: '',
    selectedClothesIds: [],
    taggedCategories: [],
    onlyMe: false,
    categoryList: [],
    description: '',
    taggedClothes: [],
    manualTrigger: true,
    link: '',
  }

  _setTitle = (title) => {this.setState({title})}
  _setCategoryOnlyMe = () => {
    this.setState({categoryOnlyMe: !this.state.categoryOnlyMe})
  }
  _setClothImage = (image) => {this.setState({image});}
  _setGender = (gender) => {this.setState({gender})}
  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })
  _showCategoryModal = () => this.setState({ isCategoryVisible: true })
  _hideCategoryModal = () => this.setState({ isCategoryVisible: false })
  _setWidth = (width) => this.setState({ width })
  _setHeight = (height) => this.setState({ height })
  _showSelector = () => this.setState({ isSelectorVisible: true })
  _hideSelector = () => this.setState({ isSelectorVisible: false })
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
    if ( this.props.list !== nextProps.list) {
      this.setState({categoryList:nextProps.list});
    }

    if(this.props.categoryId !== nextProps.categoryId) {
      this._selectCategory(0, nextProps.categoryId);
      SnackBar.show((nextProps.newName + ' has been creted'), { duration: 2500 })
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
      this._setWidth(result.width);
      this._setHeight(result.height);
      this.setState({base64: result.base64});
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
      this.setState({base64: result.base64});
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

  _renderStyleImage = () => {
    let {image} = this.state;
    if(!_.isNil(image)) {
      return (
          <Image
            fadeDuration={0}
            source={{uri: image}}
            style={styles.headValidStyle}
            resizeMode="cover"
          />
      );
    } else {
      return (
        <View style={{padding: 15}}>
          <Image
            fadeDuration={0}
            source={require('../../assets/images/add_icon.png')}
            resizeMode="cover"
            style={styles.headImageStyle}
          />
        </View>
      );
    }
  }

  tagFromPhoto = (taggedClothes) => {
    let imageDataArray = [];
    let taggedClothesArray = Object.values(taggedClothes);
    let length = taggedClothesArray.length;

    for(var index in taggedClothesArray) {
      let { left, top, thumbSize, id } = taggedClothesArray[index];
      let topData = top - thumbSize/2;
      let leftData = left - thumbSize/2;
      let realThumbSize = thumbSize/width(100)*(this.state.width);
      let realTop = topData/width(100)*(this.state.height);
      let realLeft = leftData/width(100)*(this.state.width);
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
              imageDataArray.push({id:id, image: successURI, base64: base64Data});
              taggedClothesArray = Object.values(taggedClothes);
              // remove!!!
              const merged = taggedClothesArray.map((tagged, i) => {
                return {
                  ...tagged,
                  ...imageDataArray[i]
                };
              });
              this.setState({taggedClothes: merged});
            },
            (failure) => {console.log('failed to load')}
          );
        },
        (error) => { console.log('ERROR: ', error)}
      )
    }
  }

  _tagFromPhoto = () => {
    let { image, taggedClothes } = this.state;
    // send without image and base64.
    taggedClothes = taggedClothes.map((item) => ({
      id:item.id,
      left:item.left,
      top:item.top,
      thumbSize:item.thumbSize,
      bigType: item.bigType,
      clothType: item.clothType,
      selectedSeasonIds: item.selectedSeasonIds,
      selectedSizeIds: item.selectedSizeIds,
      gender: item.gender,
      selectedColorIds: item.selectedColorIds,
      onlyMe: item.onlyme,
      name: item.name,
      link: item.link
    }));
    if(image) {
      this.props.navigation.navigate('TagFromPhoto', {image, tagFromPhoto: this.tagFromPhoto, taggedClothes});
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

  _clearImagesFromImageStore = () => {
    this.state.taggedClothes.forEach((item)=>{
      try {
          ImageStore.removeTagImages(item.image);
      } catch(e) {
        console.log(e);
      }
    });
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLayout}>
          <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={() => {
              this._clearImagesFromImageStore();
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
                  let {
                    name, base64, gender,
                      location, description,
                    selectedClothesIds, taggedClothes, taggedCategories, onlyMe, link } = this.state;
                  let {token, hType} = this.props;
                  if(token) {
                    this.props.createStyle(token, hType, { name, base64, gender,
                      location, description,
                    selectedClothesIds, taggedClothes, taggedCategories, onlyMe, link },
                    () => {this._clearImagesFromImageStore()});
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

  _renderOpenWardrobe = () => {
    let ids = this.state.selectedClothesIds;
    if(ids.length==0) {
      return (
        <RkText rkType="header5 primary right">Open Wardrobe</RkText>
      );

    } else if(ids.length==1) {
      return (
        <RkText rkType="header5 hintColor right">{ids.length} Cloth From Wardrobe</RkText>
      );

    } else {
      return (
        <RkText rkType="header5 hintColor right">{ids.length} Clothes From Wardrobe</RkText>
      );
    }
  }

  _selectCategory = (oid, id) => {
    let { taggedCategories } = this.state;
    if(!_.includes(taggedCategories, id)) {
      let newTaggedCategories = [...this.state.taggedCategories, id];
      this._setTaggedCategories(newTaggedCategories);
    }
  }

  _unselectCategory = (oid, id) => {
    let { taggedCategories } = this.state;
    if(_.includes(taggedCategories, id)) {
      let newTaggedCategories = _.filter(taggedCategories, (curObject) => {
          return curObject !== id;
      });
      this._setTaggedCategories(newTaggedCategories);
    }
  }

  _renderImageFromURI = (image) => {
    // TAGGED CLOTHES
    if(image) {
      return (
        <Image
          fadeDuration={0}
          source={{uri: image}}
          style={styles.headValidStyle}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Image
          fadeDuration={0}
          source={require('../../assets/images/default_profile.png')}
          resizeMode="cover"
          style={styles.headValidStyle}
        />
      );
    }
  }

  _renderSeasons = (seasons) => {
    if(seasons.length==0) {
      return '-'
    }
    let seasonList = seasons.map((season) => {
      return ' '+items[season].value;
    })
    return seasonList
  }

  editTaggedItem = (name, bigType, clothType, selectedSeasonIds, gender, selectedSizeIds, selectedColorIds, inWardrobe, onlyMe, id) => {
    let {taggedClothes} = this.state;
    const index = taggedClothes.findIndex(i=>i.id===id);
    taggedClothes[index].name=name
    taggedClothes[index].bigType = bigType
    taggedClothes[index].clothType = clothType
    taggedClothes[index].selectedSeasonIds = selectedSeasonIds
    taggedClothes[index].gender = gender
    taggedClothes[index].selectedSizeIds = selectedSizeIds
    taggedClothes[index].selectedColorIds = selectedColorIds
    taggedClothes[index].inWardrobe = inWardrobe
    taggedClothes[index].onlyMe = onlyMe
    this.setState({
      taggedClothes,
      manualTrigger: !this.state.manualTrigger
    });
  }

  _handleEditPress = (id) =>{
    let taggedItem = this.state.taggedClothes.find(item => item.id === id);
    if(taggedItem) {
      this.props.navigation.navigate('EditTaggedItem', {editTaggedItem: this.editTaggedItem, taggedItem});
    }
  }

  _handleDeletePress = (id) =>{
    let taggedClothes = _.filter(this.state.taggedClothes, (curObject) => {
        return curObject.id !== id;
    });
    this.setState({ taggedClothes });
  }

  // tagged CLOTHES!!!
  _renderItemForTag = ({item}) => {
    let { id, image, clothType } = item;
    if(image) {
      return (
        <View
          key={id}
          style={styles.headContainer}>
          <View style={styles.aleftheadContainer}>
            <View
              style={styles.aimageContainer}>
              {this._renderImageFromURI(image)}
            </View>
          </View>
          <View style={styles.arightheadContainer}>
            <RkText rkType="header5">{clothType}</RkText>
          </View>
          <View style={styles.editDeleteContainer}>
            <TouchableOpacity
              onPress={()=>{this._handleEditPress(id)}}
              style={styles.editContainer}>
              <RkText rkType='awesome'>{FontAwesome.edit}</RkText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteContainer}
              onPress={()=>{this._handleDeletePress(id)}}>
              <RkText rkType='awesome'>{FontAwesome.delete}</RkText>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      <View style={styles.emptyContainer}>
        <RkText rkType="primary3">Error - Could not save it from the image</RkText>
      </View>
    }

  }

  _keyExtractor = (item, index) => index;
  _renderFlatListForTag = () => {
    return (
      <FlatList
        data={this.state.taggedClothes}
        renderItem={this._renderItemForTag}
        extraData={this.state.manualTrigger}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  _handleCreatePress = () => {
    let { title, categoryOnlyMe } = this.state;
    let { token, hType } = this.props;
    this.props.createNewCategory(token, hType, 0, title, categoryOnlyMe);
    this.setState({newScreen: false, categoryOnlyMe:false, title: ''});
    this._hideCategoryModal();

  }

  _setToCreateScreen = (newScreen) => {
    this.setState({newScreen});
  }

  _renderCategoryModal = () => {
    return (
      <CategoryModal
        newScreen={this.state.newScreen}
        categoryList={this.state.categoryList}
        isCategoryVisible={this.state.isCategoryVisible}
        hideModal={this._hideCategoryModal}
        setToCreateScreen={this._setToCreateScreen}
        handleCreatePress={this._handleCreatePress}
        selectCategory={this._selectCategory}
        unselectCategory={this._unselectCategory}
        title={this.state.title}
        onlyMe={this.state.categoryOnlyMe}
        setTitle={this._setTitle}
        setOnlyMe={this._setCategoryOnlyMe}
        oid={0}
        taggedCategories={this.state.taggedCategories}
        />
    );
  }

  _renderCategoryText = () => {
    let length = this.state.taggedCategories.length;
    if(length==0) {
      return (
        <RkText rkType="header5 primary right">Add To Category</RkText>
      );
    } else if(length==1) {
      return (
        <RkText rkType="header5 hintColor right">Added To 1 Category</RkText>
      );
    } else {
      return (
        <RkText rkType="header5 hintColor right">Added To {length} Categories</RkText>
      );
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
                {this._renderStyleImage()}
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.dContainer, styles.titleRow]}>
            <RkText rkType="header5">Style Name</RkText>
            <TextInput
              multiline
              selectionColor='grey'
              underlineColorAndroid='white'
              placeholder="Special Outfit For Special Day"
              style={[styles.moreDetailStyle]}
              onChangeText={(name)=>{
                this.setState({name})
              }}
              value={this.state.name}/>
          </View>

          <View style={styles.contextSeperator}/>
          <TouchableOpacity
           style={[styles.dContainer, styles.drow]}
           onPress={this._openWardrobe}>
              <RkText rkType="header5">Tagged Clothes</RkText>
              {this._renderOpenWardrobe()}
          </TouchableOpacity>
          <View style={styles.contextSeperator}/>
          <TouchableOpacity
           style={[styles.dContainer, styles.drow]}
           onPress={this._tagFromPhoto}>
              <RkText rkType="header5">New Clothes</RkText>
              <RkText rkType="header5 primary right">Tag From Photo</RkText>
          </TouchableOpacity>
          {this._renderFlatListForTag()}
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
              onChangeText={(location) => this.setState({location})}/>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Link</RkText>
            <TextInput
              onFocus={(event: Event) => {
                this._scrollToInput(findNodeHandle(event.target))
              }}
              value={this.state.link}
              style={styles.moreDetailStyle}
              underlineColorAndroid='white'
              onChangeText={(link) => this.setState({link})}/>
          </View>

          <View style={styles.arightheadContainer}>
            <TextInput
              onFocus={(event: Event) => {
                this._scrollToInput(findNodeHandle(event.target))
              }}
              multiline
              selectionColor='grey'
              underlineColorAndroid='white'
              placeholder="Description"
              style={[styles.inputStyle, {height: Math.max(40, this.state.textHeight), marginLeft: 20}]}
              onChangeText={(description)=>{
                this.setState({ description })
              }}
              onContentSizeChange={(event) => {
                this.setState({ textHeight: event.nativeEvent.contentSize.height });
              }}
              value={this.state.description}/>
          </View>
          <View style={styles.contextSeperator}/>
          <TouchableOpacity
           style={[styles.dContainer, styles.drow]}
           onPress={this._openUserCategory}>
              <RkText rkType="header5">Category</RkText>
              {this._renderCategoryText()}
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
            {this._renderCategoryModal()}
          </View>
          <View>
            {this._renderStyleSelectorModal()}
          </View>
          <KeyboardSpacer />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  emptyContainer: {
    height: 90,
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  aContainer: {
   flexDirection: 'row',
   backgroundColor: theme.colors.screen.base
  },
  aleftheadContainer: {
     width: 90
  },
  editDeleteContainer: {
     flexDirection: 'row',
     paddingRight: 15,
  },
  editContainer: {
     width: 50,
     justifyContent: 'center',
     alignItems: 'center'
  },
  deleteContainer:{
     width: 50,
     alignItems: 'center',
     justifyContent: 'center'
  },
  arightheadContainer: {
     alignItems: 'stretch',
     flex: 1,
     padding: 10
  },
  aimageContainer: {
     margin:10,
     justifyContent: 'center',
     height: 70,
     width: 70
  },
}));

function mapStateToProps({auth: {token, hType}, category: {list, id, name}}) {
  return { token, hType, list, categoryId: id, newName: name }
}

export default connect(mapStateToProps, actions)(AddStyleScreen);

import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { ScrollView, View, List, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';
import { threeImageWidth } from '../../utils/scale';
import {FontAwesome} from '../../assets/icons';
import { ImagePicker } from 'expo';
import Modal from 'react-native-modal';
import { width, height, totalSize } from 'react-native-dimension';
import { Button } from 'native-base';
import {
  RkSwitch
} from '../../components/switch/index';
import SelectorModal from '../../components/common/SelectorModal';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);
import { seasons, genders, outwearType, topType, bigType, topSize, clothColors, bottomSize, shoeSize, bottomType, shoeType, etcType } from '../../utils/menuItems';

import SelectedSeasonsSelector from '../../selectors/selected_seasons';
import SelectedColorsSelector from '../../selectors/selected_colors';
import SelectedSizesSelector from '../../selectors/selected_sizes';
import { connect } from 'react-redux';

class AddClothScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '옷 올리기',
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
        <RkText rkType="header3" style={{marginRight:15, color:'#f64e59'}}>저장</RkText>
      </RkButton>
    ),
  })

  state = {
    isModalVisible: true,
    onlyMe: false,
    myInfo: true,
    text: '',
    textHeight: 0,
    inWardrobe: true,
    image: undefined,
    isSelectorVisible: false,
    items: [],
    bigType: 'Top',
    clothType: 'T-Shirt',

    selectionType: 5,

    selectedSeasonIds: [],
    seasons: seasons,

    selectedSizeIds: [],
    clothSize: topSize,

    selectedColorIds: [],
    clothColor: clothColors,

    gender: 'Unisex',

    multiple: false,
  }

  _showModal = () => this.setState({ isModalVisible: true });
  _hideModal = () => this.setState({ isModalVisible: false });
  _showSelector = () => this.setState({ isSelectorVisible: true });
  _hideSelector = () => this.setState({ isSelectorVisible: false });
  _setBigType = (bigType) => this.setState({bigType});
  _setSeason = (season) => this.setState({season});
  _setGender = (gender) => this.setState({gender});
  _setSize = (clothSize) => this.setState({clothSize});
  _setColor = (clothColor) => this.setState({clothColor});
  _setMultiple = (multiple) => this.setState({multiple});
  _setSelectionType = (selectionType) => this.setState({selectionType});
  _setClothType = (clothType) => this.setState({clothType});

  // CAMERA
  _handleCameraPress = async () => {
    this._hideModal();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  _handleAlbumPress = async () => {
    this._hideModal();
    this._pickImage();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });
    console.log(result);
    this._hideModal();

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  // END OF CAMEARA

  // Camera or Roll mode Modal
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

  _selectAction = (value, id) => {
    // if seasons, genders, bigType, topType, outwearType
    let { selectionType } = this.state;
    if(selectionType===1) {
      // bigType: Top, Outwear, ETC -> Bottom / Shoes
      this._setBigType(value);
      this.setState({selectedSizeIds: []});
      if(value==='Bottoms') {
        this.setState({items:bottomType});
      } else if(value==='Shoes') {
        this.setState({items:shoeType});
      } else if(value==='Top'){
        this.setState({items:topType});
      } else if(value==='ETC') {
        this.setState({items:etcType});
      } else if(value==='Outwear') {
        this.setState({items:outwearType})
      }
      this.setState({selectionType:6});
    } else if(selectionType===2) {
      this._setSeason(value);
      this._hideSelector();
    } else if(selectionType===3) {
      this._setGender(value);
      this._hideSelector();
    } else if(selectionType===4) {
      this._setSize(value);
      this._hideSelector();
    } else if(selectionType===5) {
      this._setColor(value);
      this._hideSelector();
    } else if (selectionType===6) {
      this._setClothType(value);
      this._hideSelector();
    }
  }



  _seasonSelectAction = (id) => {
    // We can optimize this code later

    if(this.state.selectionType===4) {
      if(_.includes(this.state.selectedSizeIds, id)) {
        let newSelectedSizeIds = _.filter(this.state.selectedSizeIds, (curObject) => {
            return curObject !== id;
        });
        this.setState({selectedSizeIds : newSelectedSizeIds});
      } else {
        let newSelectedSizeIds = [...this.state.selectedSizeIds, id];
        this.setState({selectedSizeIds : newSelectedSizeIds});
      }
    } else if (this.state.selectionType===5) {
      if(_.includes(this.state.selectedColorIds, id)) {
        let newSelectedColorIds = _.filter(this.state.selectedColorIds, (curObject) => {
            return curObject !== id;
        });
        this.setState({selectedColorIds : newSelectedColorIds});
      } else {
        let newSelectedColorIds = [...this.state.selectedColorIds, id];
        this.setState({selectedColorIds : newSelectedColorIds});
      }
    } else {
      if(_.includes(this.state.selectedSeasonIds, id)) {
        let newSelectedSeasonIds = _.filter(this.state.selectedSeasonIds, (curObject) => {
            return curObject !== id;
        });
        this.setState({selectedSeasonIds : newSelectedSeasonIds});
      } else {
        let newSelectedSeasonIds = [...this.state.selectedSeasonIds, id];
        this.setState({selectedSeasonIds : newSelectedSeasonIds});
      }
    }
  }

  // Selector Modal
  _renderSelectorModal = () => {
    return (
      <SelectorModal
        isSelectorVisible={this.state.isSelectorVisible}
        multiple={this.state.multiple}
        items={this.state.items}
        hideSelector={this._hideSelector}
        selectAction={this._selectAction}
        seasonSelectAction={this._seasonSelectAction}
        selectionType={this.state.selectionType}
        selectedSeasonIds={this.state.selectedSeasonIds}
        selectedSizeIds={this.state.selectedSizeIds}
        selectedColorIds={this.state.selectedColorIds}
        bigType={this.state.bigType}
        clothType={this.state.clothType}
        gender={this.state.gender}
      />
    );
  }

  _handleDetailPress = (option) => {
    // 3 = Gender
    // { seasons, genders, outwearType, topType, bigType }
    if(option===1) {
      this.setState({items: bigType})
      this._setMultiple(false)
    } else if (option===2) {
      this.setState({items: seasons})
      this._setMultiple(true)
    } else if (option===3) {
      this.setState({items: genders})
      this._setMultiple(false)
    } else if (option===4) {
      if (this.state.bigType === 'Bottoms') {
        this.setState({items: bottomSize})
        this.setState({clothSize: bottomSize})
      } else if (this.state.bigType === 'Shoes') {
        this.setState({items: shoeSize})
        this.setState({clothSize: shoeSize})
      } else {
        this.setState({items: topSize})
        this.setState({clothSize: topSize})
      }
      this._setMultiple(true)
    } else if (option===5) {
      this.setState({items: clothColors})
      this._setMultiple(true)
    }
    this._setSelectionType(option);
    this._showSelector();
  }

  _renderSeasons = () => {
    selectedSeasons = SelectedSeasonsSelector(this.state)
    if(selectedSeasons.length==0) {
      return '-'
    }
    let seasonList = selectedSeasons.map((season) => {
      return ' '+season.value;
    })
    return seasonList
  }

  _renderSizes = () => {
    selectedSeasons = SelectedSizesSelector(this.state)
    if(selectedSeasons.length==0) {
      return '-'
    }
    let seasonList = selectedSeasons.map((season) => {
      return ' '+season.value;
    })

    return seasonList
  }

  _renderColors = () => {
    selectedSeasons = SelectedColorsSelector(this.state)
    if(selectedSeasons.length==0) {
      return '-'
    }
    let seasonList = selectedSeasons.map((season) => {
      return ' '+season.value;
    })
    return seasonList
  }

  _handleTagStylePress = () => {
    this.props.navigation.navigate('TagStyle');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headContainer}>
          <View style={styles.leftheadContainer}>
            <TouchableOpacity
              style={[styles.imageContainer, {height: Math.max(70, this.state.textHeight)}]}
              onPress={()=>{this.setState({isModalVisible:true})}}>
              <Image
                source={require('../../assets/images/robot-dev.png')}
                resizeMode="cover"
                style={styles.headImageStyle}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.rightheadContainer}>
            <TextInput
              multiline
              selectionColor='grey'
              underlineColorAndroid='white'
              placeholder="문구입력..."
              style={[styles.inputStyle, {height: Math.max(70, this.state.textHeight)}]}
              onChangeText={(text)=>{
                this.setState({text})
              }}
              onContentSizeChange={(event) => {
                this.setState({ textHeight: event.nativeEvent.contentSize.height });
              }}
              value={this.state.text}/>
          </View>
        </View>

        <View>
          <View style={styles.dContainer}>
            <RkText rkType="header5">Detail</RkText>
          </View>

          <TouchableOpacity style={[styles.dContainer, styles.row]}
            onPress={() => {this._handleDetailPress(1)}}>
            <RkText rkType="primary3">Type</RkText><RkText rkType="primary2">{this.state.bigType} - {this.state.clothType}</RkText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dContainer, styles.row]}
            onPress={() => {this._handleDetailPress(2)}}>
            <RkText rkType="primary3">Seasons</RkText>
            <RkText rkType="primary2">{this._renderSeasons()}</RkText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dContainer, styles.row]}
            onPress={() => {this._handleDetailPress(3)}}>
            <RkText rkType="primary3">Gender</RkText>
            <RkText rkType="primary2">{this.state.gender}</RkText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dContainer, styles.row]}
            onPress={() => {this._handleDetailPress(4)}}>
            <RkText rkType="primary3">Size</RkText>
            <RkText rkType="primary2">{this._renderSizes()}</RkText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dContainer, styles.row]}
            onPress={() => {this._handleDetailPress(5)}}>
            <RkText rkType="primary3">Color</RkText>
            <RkText rkType="primary2">{this._renderColors()}</RkText>
          </TouchableOpacity>

          <View style={styles.contextSeperator}/>

          <View style={[styles.dContainer, styles.drow]}>
            <RkText rkType="header5">Tagged Styles</RkText>
            <TouchableOpacity onPress={() => this._handleTagStylePress()}>
              <RkText rkType="header5 primary right">Tag Style</RkText>
            </TouchableOpacity>
          </View>
          <View />

          <View style={styles.contextSeperator}/>

          <View style={styles.dContainer}>
            <RkText rkType="header5">More Detail</RkText>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Brand</RkText><RkText rkType="primary2">Nike</RkText>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Location</RkText><RkText rkType="primary2">USA</RkText>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Link</RkText><RkText rkType="primary2">www.naver.com</RkText>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">In Wardrobe</RkText>
            <RkSwitch
              style={styles.switch}
              value={this.state.inWardrobe}
              name="Push"
              onValueChange={(inWardrobe) => this.setState({inWardrobe})}/>
          </View>

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
            {this._renderSelectorModal()}
          </View>
        </View>
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
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
    borderColor: '#cfcfd6'
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
  }
}));

export default connect(null, null)(AddClothScreen);

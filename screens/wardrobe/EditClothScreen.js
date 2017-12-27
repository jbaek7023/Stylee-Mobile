import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { findNodeHandle, ScrollView, View, List, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';
import { threeImageWidth } from '../../utils/scale';
import {FontAwesome} from '../../assets/icons';
import { ImagePicker } from 'expo';
import Modal from 'react-native-modal';
import { width, height, totalSize } from 'react-native-dimension';
import { Button } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  RkSwitch
} from '../../components/switch/index';
import SelectorModal from '../../components/common/SelectorModal';
import { seasons, genders, outwearType, topType, bigType, topSize, clothColors, bottomSize, shoeSize, bottomType, shoeType, etcType } from '../../utils/menuItems';
import SelectedSeasonsSelector from '../../selectors/selected_seasons';
import SelectedColorsSelector from '../../selectors/selected_colors';
import SelectedSizesSelector from '../../selectors/selected_sizes';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions';

class EditClothScreen extends Component {
  static navigationOptions = () => ({
    gesturesEnabled: false,
    tabBarVisible: false,
    header: null
  })

  state = {
    onlyMe: this.props.navigation.state.params.detail.only_me,
    textHeight: 0,
    inWardrobe: true,
    isSelectorVisible: false,
    items: [],
    bigType: this.props.navigation.state.params.detail.big_cloth_type,
    clothType: this.props.navigation.state.params.detail.cloth_type,
    selectionType: 5,
    selectedSeasonIds: this.props.navigation.state.params.detail.detail.seasons,
    seasons: seasons,
    selectedSizeIds: this.props.navigation.state.params.detail.detail.size,
    clothSize: topSize,
    selectedColorIds: this.props.navigation.state.params.detail.detail.color,
    clothColor: clothColors,
    gender: this.props.navigation.state.params.detail.detail.sex,
    name: this.props.navigation.state.params.detail.content,
    selectedStyleIds: [],
  }

  componentWillMount() {
    let { seasons, size, color} = this.props.navigation.state.params.detail.detail;
    if(_.isNull(seasons)) { seasons = [] }
    if(_.isNull(size)) { size = []}
    if(_.isNull(color)) { color = []}
    this.setState({
      selectedSeasonIds: seasons,
      selectedSizeIds: size,
      selectedColorIds: color,
      selectedStyleIds: this.props.navigation.state.params.detail.tagged_outfits.map((item)=>item.id)})
  }

  _showSelector = () => this.setState({ isSelectorVisible: true });
  _hideSelector = () => this.setState({ isSelectorVisible: false });
  _setBigType = (bigType) => {
    this.setState({bigType});
  };
  _setSelectionType = (selectionType) => this.setState({selectionType});
  _setClothType = (clothType) => {this.setState({clothType});}
  _setSelectedStyleIds = (selectedStyleIds) => {
    this.setState({selectedStyleIds});
  }

  _setSelectedSizeIds = (selectedSizeIds) => {
    this.setState({selectedSizeIds});
  }

  _setSelectedColorIds = (selectedColorIds) => {this.setState({selectedColorIds});}
  _setSelectedSeasonIds = (selectedSeasonIds) => {this.setState({selectedSeasonIds});}
  _setGender = (gender) => {this.setState({gender});}
  _setText = (text) => {
    this.setState({text});
  }
  _setBrand = (brand) => {
    this.setState({brand});
  }
  _setLocation = (location) => {
    this.setState({location});
  }
  _setLink = (link) => {
    this.setState({link});
  }
  _setInWardrobe = () => {
    this.setState({inWardrobe: !this.state.inWardrobe});
  }

  _setOnlyMe = () => {
    if(this.state.onlyMe) {
      this.setState({onlyMe: false});
    } else {
      this.setState({onlyMe: true});
    }
  }

  _setClothImage = (image) => {this.setState({image});}

  //  this is single action (selectionType: 1, 3, 6)
  _selectAction = (value, id) => {
    // if seasons, genders, bigType, topType, outwearType
    let { selectionType } = this.state;
    if(selectionType===1) {
      this._setBigType(value);
      this._setSelectedSizeIds([]);
      if(value==='Bottom') {
        this.setState({items:bottomType});
      } else if(value==='Shoes') {
        this.setState({items:shoeType});
      } else if(value==='Top'){
        this.setState({items:topType});
      } else if(value==='ETC') {
        this.setState({items:etcType});
      } else if(value==='Outerwear') {
        this.setState({items:outwearType})
      }
      this.setState({selectionType:6});
    } else if(selectionType===3) {
      this._setGender(value);
      this._hideSelector();
    } else if (selectionType===6) {
      this._setClothType(value);
      this._hideSelector();
    }
  }

  //  this is multiple action (selectionType: 2, 4, 5}
  _seasonSelectAction = (id) => {
    if(this.state.selectionType===4) {
      if(_.includes(this.state.selectedSizeIds, id)) {
        let newSelectedSizeIds = _.filter(this.state.selectedSizeIds, (curObject) => {
            return curObject !== id;
        });
        this._setSelectedSizeIds(newSelectedSizeIds);
      } else {
        let newSelectedSizeIds = [...this.state.selectedSizeIds, id];
        this._setSelectedSizeIds(newSelectedSizeIds);
      }
    } else if (this.state.selectionType===5) {
      if(_.includes(this.state.selectedColorIds, id)) {
        let newSelectedColorIds = _.filter(this.state.selectedColorIds, (curObject) => {
            return curObject !== id;
        });
        this._setSelectedColorIds(newSelectedColorIds);
      } else {
        let newSelectedColorIds = [...this.state.selectedColorIds, id];
        this._setSelectedColorIds(newSelectedColorIds);
      }
    } else if(this.state.selectionType===2){
      if(id==6) {
        if(_.includes(this.state.selectedSeasonIds, id)) {
          this.setState({selectedSeasonIds: []})
        } else {
          this.setState({selectedSeasonIds : [6]});
        }
      } else {
        if(_.includes(this.state.selectedSeasonIds, id)) {
          let newSelectedSeasonIds = _.filter(this.state.selectedSeasonIds, (curObject) => {
              return curObject !== id;
          });
          this._setSelectedSeasonIds(newSelectedSeasonIds);
        } else {
          let newSelectedSeasonIds = [...this.state.selectedSeasonIds, id];
          newSelectedSeasonIds = _.filter(newSelectedSeasonIds, (curObject) => {
            return curObject !== 6;
          });
          this._setSelectedSeasonIds(newSelectedSeasonIds);
        }
      }
    }
  }

  _handleBackdrop = (selectionType) => {
    if (selectionType===6) {
      let { bigType } = this.state;
      if (bigType ==='Top') {
        this._setClothType('Other Top');
      } else if (bigType ==='Outerwear') {
        this._setClothType('Other Outerwear');
      } else if (bigType ==='Bottom') {
        this._setClothType('Other Bottoms');
      } else if (bigType ==='Shoes') {
        this._setClothType('Other Shoes');
      } else if (bigType ==='ETC') {
        this._setClothType('Others');
      }
    }
    this._hideSelector();
  }

  // Selector Modal
  _renderSelectorModal = () => {
    return (
      <SelectorModal
        isSelectorVisible={this.state.isSelectorVisible}
        items={this.state.items}
        hideSelector={this._hideSelector}
        handleBackdrop={this._handleBackdrop}
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
    // clothSize , items: menu Itemds
    if(option===1) {
      this.setState({items: bigType})
    } else if (option===2) {
      this.setState({items: seasons})
    } else if (option===3) {
      this.setState({items: genders})
    } else if (option===4) {
      if (this.state.bigType === 'Bottom') {
        this.setState({items: bottomSize})
        this.setState({clothSize: bottomSize})
      } else if (this.state.bigType === 'Shoes') {
        this.setState({items: shoeSize})
        this.setState({clothSize: shoeSize})
      } else {
        this.setState({items: topSize})
        this.setState({clothSize: topSize})
      }
    } else if (option===5) {
      this.setState({items: clothColors})
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
    selectedSeasons = SelectedColorsSelector(this.state);
    if(selectedSeasons.length==0) {
      return '-'
    }

    let seasonList = selectedSeasons.map((season, index) => {
      if(index==0) {
        return season.name+' ';
      }
      return '/ '+season.name;
    })
    return seasonList
  }




  onCheck = ({selectedStyleIds}) => {
    this.setState({selectedStyleIds});
  }

  _handleTagStylePress = () => {
    this.props.navigation.navigate('TagStyle', {onCheck: this.onCheck, selectedStyleIds: this.state.selectedStyleIds});
  }

  _scrollToInput = (reactNode: any) => {
    this.scroll.props.scrollToFocusedInput(reactNode)
  }

  _renderTagStyleButton = () => {
    let { length } = this.state.selectedStyleIds;
    if (length===0) {
      return (
        <TouchableOpacity onPress={() => this._handleTagStylePress()}>
          <RkText rkType="header5 primary right">Tag Style</RkText>
        </TouchableOpacity>
      );
    } else if (length==1){
      return (
        <TouchableOpacity onPress={() => this._handleTagStylePress()}>
          <RkText rkType="header5 primary right">{length} Style from Stylebook</RkText>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this._handleTagStylePress()}>
          <RkText rkType="header5 primary right">{length} Styles from Stylebook</RkText>
        </TouchableOpacity>
      );
    }
  }

  _renderClothImage = () => {
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
                <RkText rkType='header3'>Edit</RkText>
              </View>
            </View>
          </View>
          <View style={styles.right}>
              <TouchableOpacity onPress={
                () => {
                  let { name, bigType, clothType, selectedSeasonIds, gender,
                    selectedSizeIds, selectedColorIds, inWardrobe, onlyMe, selectedStyleIds } = this.state;
                  let { id } = this.props.navigation.state.params.detail;
                  let { token, hType } = this.props;
                  this.props.editCloth( token, hType,
                    { name, bigType, clothType, selectedSeasonIds, gender,
                    selectedSizeIds, selectedColorIds, inWardrobe, onlyMe, selectedStyleIds, id});
                  this.props.navigation.goBack();
                }}>
                <RkText rkType="header3">SAVE</RkText>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this._renderHeader()}
        <KeyboardAwareScrollView
          innerRef={ref => {this.scroll = ref}}
          style={styles.container}>
          <View>
            <View style={[styles.dContainer, styles.titleRow]}>
              <RkText rkType="header5">Cloth Name</RkText>
              <TextInput
                onFocus={(event: Event) => {
                  this._scrollToInput(findNodeHandle(event.target))
                }}
                placeholder="My Favorite T-Shirt"
                style={[styles.moreDetailStyle]}
                value={this.state.name}
                underlineColorAndroid='white'
                onChangeText={(name) => this.setState({name})}/>
            </View>
            <View style={styles.contextSeperator}/>
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
              {this._renderTagStyleButton()}
            </View>

            <View style={styles.contextSeperator}/>
            <View style={[styles.dContainer, styles.row]}>
              <RkText rkType="primary3">In Wardrobe</RkText>
              <RkSwitch
                style={styles.switch}
                value={this.state.inWardrobe}
                name="Push"
                onValueChange={() => {this._setInWardrobe()}}/>
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
                onValueChange={() => {
                  this._setOnlyMe()
                }}
                />
            </View>
            <View>
              {this._renderSelectorModal()}
            </View>
          </View>

          <KeyboardSpacer />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  switchStyle: {
    width: 52,
    height: 32,
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border.secondary,
    // onColor: theme.colors.primary,
    // offColor: {
    //   android: theme.colors.screen.base,
    //   ios: theme.colors.border.base
    // }
  },
  container: {
    backgroundColor: theme.colors.screen.base,
  },
  switch: {
    marginVertical: 0,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingLeft:20
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: 70,
    justifyContent: 'center'
  },
  inputStyle: {
    marginTop:10,
    marginBottom:10,
    flex: 1,
    fontSize: 15,
    marginRight: 10,
  },
  headValidStyle: {
    width: 70,
    height: 70
  },
  headImageStyle: {
    width:45,
    height: 45
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

function mapStateToProps({auth: {token, hType}}) {
  return {token, hType}
}
export default connect(mapStateToProps, actions)(EditClothScreen);

import React, { Component } from 'react';
import { FlatList, ImageBackground, TouchableWithoutFeedback, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { width, height } from 'react-native-dimension';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import {FontAwesome} from '../../assets/icons';
import {createResponder} from 'react-native-gesture-responder';
import _ from 'lodash';
import CroppedImage from '../../components/CroppedImage';
import SnackBar from 'react-native-snackbar-dialog';

class TagFromPhoto extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    header: null
  });

  state = {
    gestureState: {},
    thumbSize: 100,
    left: width(100) / 2,
    top: height(100) / 2,
    taggedClothes: {
      0: {id:0, left:100, top:100, thumbSize:100, type: 'T-Shirt', seasons: ['Fall', 'Spring'], image: null},
      1: {id:1, left:200, top:200, thumbSize:100, type: 'Coat', seasons: ['Spring', 'Fall'], image: null},
    },
    selectedClothId : 0,
  }

  componentWillMount() {
    this.gestureResponder = createResponder({
      onStartShouldSetResponder: (evt, gestureState) => true,
      onStartShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,
      onResponderGrant: (evt, gestureState) => {

      },
      onResponderMove: (evt, gestureState) => {
        let { taggedClothes } = this.state;
        let tag = taggedClothes[this.state.selectedClothId];

        // pinch
        let thumbSize = tag.thumbSize;
        if (gestureState.pinch && gestureState.previousPinch) {
          thumbSize *= (gestureState.pinch / gestureState.previousPinch)
        }

        let {left, top} = tag;
        left += (gestureState.moveX - gestureState.previousMoveX);
        top += (gestureState.moveY - gestureState.previousMoveY);

        let topbby = top - thumbSize/2;
        let lefty = left - thumbSize/2;
        let righty = left + thumbSize/2;
        let bottomy = top + thumbSize/2;

        if (topbby>=0 && bottomy <= width(100) && righty <= width(100) && lefty >= 0) {
          var deep = _.cloneDeep(tag);
          deep.left = left
          deep.top = top
          deep.thumbSize = thumbSize
          this.setState({
            gestureState: {
              ...gestureState
            },
            taggedClothes: {
              ...taggedClothes,
              [this.state.selectedClothId]: deep
            }
          })
        } else {
          console.log('do nothing')
        }
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: (evt, gestureState) => {
        this.setState({
          gestureState: {
            ...gestureState
          }
        })
      },
      onResponderTerminate: (evt, gestureState) => {},

      onResponderSingleTapConfirmed: (evt, gestureState) => {
        // if x0, y0 in selected?
        let { taggedClothes } = this.state;
        let { x0, y0 } = gestureState;
        y0 -= 80; // subtract the navbar (MUST TEST on MACHINE)
        for (key in taggedClothes) {
          let { left, top, thumbSize } = taggedClothes[key];
          left -= thumbSize/2;
          top -= thumbSize/2;
          let xMatch = (left-20 < x0 && x0 < left+thumbSize+20) ? true: false;
          let yMatch = (top-20 < y0 && y0 < top+thumbSize+20) ? true: false;
          if(xMatch && yMatch) {
            this.setState({selectedClothId: key});
          }
        }
      },
      debug: false
    });
  }

  _renderTags = () => {
    let { taggedClothes } = this.state;
    taggedItems = Object.keys(taggedClothes);
    if(taggedItems.length==0) {
      return <View />
    }

    let output = taggedItems.map((key) => {
      let cloth = taggedClothes[key];
      let thumbSize = cloth.thumbSize;
      let top = cloth.top - thumbSize/2;
      let left = cloth.left - thumbSize/2;
      if(key==this.state.selectedClothId) {
        return (
          <View
            key={key}
            style={{
              position: 'absolute',
              top,
              left,
              height: thumbSize,
              width: thumbSize,
              borderWidth: 2,
              borderColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text style={{color:'yellow', fontWeight: 'bold'}}>Move or Pinch</Text>
          </View>
        );
      } else {
        return (
          <View
            key={key}
            style={{
              position: 'absolute',
              top,
              left,
              height: thumbSize,
              width: thumbSize,
              borderWidth: 2,
              borderColor: 'white'
            }}
          />
        );
      }
    });
    return output;
  }

  _renderTaggedClothImage = (image) => {
    console.log(image)
    let { selectedClothId } = this.state;
    if(selectedClothId) {
      // style={selectedStyle(left, top, thumbSize)}
      let { left, top, thumbSize } = this.state.taggedClothes[this.state.selectedClothId];
      let realTop = top - thumbSize/2;
      let realLeft = left - thumbSize/2;
      // left,
      // top,
      // width:70,
      // height: 70
      return (
        <CroppedImage
          source={{uri: image}}
          cropTop={realTop}
          cropLeft={realLeft}
          cropWidth={thumbSize}
          cropHeight={thumbSize}
          width={width(100)}
          height={width(100)}
          resizeMode="contain" />
      );
    } else {
      return (
        <Image
          source={require('../../assets/images/default_profile.png')}
          resizeMode="cover"
          style={styles.headImageStyle}
        />
      );
    }
  }

  _renderPhotoImage = (image) => {
    return (
      <ImageBackground
        source={{uri: image}}
        style={styles.imageStyle}
        resizeMode="cover">
        <View style={styles.imageStyle}>{this._renderTags()}</View>
      </ImageBackground>
    );
  }

  _createTag = () => {
    let { taggedClothes } = this.state;
    let length = Object.keys(taggedClothes).length;
    if(length>3) {
      SnackBar.show("Sorry we're not allowing more than four clothes to tag", { duration: 2500 })
      return; // break the function
    }
    while(taggedClothes[length]) {
      length++;
    }
    this.setState({
        selectedClothId:length,
        taggedClothes: {
          ...taggedClothes,
          [length]: { id:length, left:200, top:200, thumbSize:100, type: 'Top', seasons: [6], image: null }
        }
    })
  }

  _renderSeasons = (seasons) => {
    if(seasons.length==0) {
      return '-'
    }
    let seasonList = seasons.map((season) => {
      return ' '+season;
    })
    return seasonList
  }

  _renderTaggedItem = (image) => {
    let selectedCloth = this.state.taggedClothes[this.state.selectedClothId]
    if(selectedCloth) {
      return (
        <View
          style={styles.headContainer}>
          <View style={styles.leftheadContainer}>
            <TouchableOpacity
              style={styles.imageContainer}>
              {this._renderTaggedClothImage(image)}
            </TouchableOpacity>
          </View>
          <View style={styles.rightheadContainer}>
            <RkText rkType="header5">{selectedCloth.type}</RkText>
            <RkText rkType="header5">{this._renderSeasons(selectedCloth.seasons)}</RkText>
          </View>
          <View style={styles.editDeleteContainer}>
            <TouchableOpacity style={styles.editContainer}>
              <RkText rkType='awesome'>{FontAwesome.edit}</RkText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteContainer}>
              <RkText rkType='awesome'>{FontAwesome.delete}</RkText>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <RkText rkType="primary3">Press plus sign or tab the image</RkText>
      </View>
    );
  }

  _saveTagging = () => {
    this.props.navigation.state.params.tagFromPhoto(this.state.taggedClothes);
    this.props.navigation.goBack();
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
                <RkText rkType='header3'>Tag From Photo</RkText>
              </View>
            </View>
          </View>
          <View style={styles.right}>
              <TouchableOpacity onPress={()=>{this._saveTagging()}}>
                <RkText rkType="header3">SAVE</RkText>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    let { image } = this.props.navigation.state.params;
    let { thumbSize } = this.state;
    let top = this.state.top - thumbSize/2;
    let left = this.state.left - thumbSize/2;
    let right = this.state.left + thumbSize/2;
    let bottom = this.state.top + thumbSize/2;

    if(image) {
      return (
        <View style={styles.root}>
          {this._renderHeader()}
          <ScrollView>
            <View
              style={styles.imageStyle}
              {... this.gestureResponder}
            >
              {this._renderPhotoImage(image)}
            </View>
            <View style={styles.clothSeparator}/>
            <View style={styles.dContainer}>
              <RkText rkType="header4">Selected Cloth</RkText>
              <TouchableOpacity
                style={[styles.right, {right: 20}]}
                onPress={()=>{this._createTag()}}>
                <RkText rkType="awesome">{FontAwesome.plus}</RkText>
              </TouchableOpacity>
            </View>
            <View>
              {this._renderTaggedItem(image)}
            </View>
          </ScrollView>
        </View>

      );
    } else {
      return (
        <View><Text>This is not supposed to happen (You can send this image to admin)</Text></View>
      );
    }
  }
}

function selectedStyle(left, top, thumbSize) {
  return {
    left,
    top,
    width:70,
    height: 70
  };
}

let styles = RkStyleSheet.create(theme => ({
  emptyContainer: {
    height: 90,
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'center'
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
  root: {
    backgroundColor: "#e6e6ee",
    flex: 1
  },
  clothSeparator: {
    backgroundColor: "#e6e6ee",
    height: 5,
  },
  imageStyle: {
    width: width(100),
    height: width(100)
  },
  headContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.screen.base
  },
  leftheadContainer: {
    width: 90
  },
  imageContainer: {
    margin:10,
    justifyContent: 'center',
    height: 70,
    width: 70
  },
  rightheadContainer: {
    alignItems: 'stretch',
    flex: 1,
    padding: 10
  },
  headImageStyle: {
    width:70,
    height: 70
  },
  dContainer: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.screen.base,
    borderBottomWidth: 1,
    borderColor: '#e6e6ee'
  },
  rightButtons: {
    flexDirection: 'row'
  },
  //header
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

export default TagFromPhoto;

import React, { Component } from 'react';
import { ImageBackground, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { width, height } from 'react-native-dimension';
import { RkStyleSheet, RkText } from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import {FontAwesome} from '../../assets/icons';
import {createResponder} from 'react-native-gesture-responder';
import _ from 'lodash';

class TagFromPhoto extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Tag From Photo',
    tabBarVisible: false
  });

  state = {
    gestureState: {},
    thumbSize: 100,
    left: width(100) / 2,
    top: height(100) / 2,
    taggedClothes: {
      0: {id:0, left:100, top:100, thumbSize:100},
      1: {id:1, left:200, top:200, thumbSize:200},
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
        // console.log(gestureState.x0, gestureState.y0);
        // // if x0, y0 in selected?
        //   // select the item.
        // //
        // console.log(gestureState);
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
      console.log('print--------');
      console.log(key);
      console.log(this.state.selectedClothId);
      if(key==this.state.selectedClothId) {
        return (
          <View
            key={key}
            style={{
              top,
              left,
              height: thumbSize,
              width: thumbSize,
              borderWidth: 2,
              borderColor: 'yellow'
            }}
          />
        );
      } else {
        return (
          <View
            key={key}
            style={{
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

  _renderTaggedClothImage = () => {
    return (
      <Image
        source={require('../../assets/images/robot-dev.png')}
        resizeMode="cover"
        style={styles.headImageStyle}
      />
    );
  }

  _renderPhotoImage = (image) => {
    const thumbSize = this.state.thumbSize;
    return (
      <ImageBackground
        source={{uri: image}}
        style={styles.imageStyle}
        resizeMode="cover">
        <View
          style={{
            position: 'absolute',
            top: this.state.top - thumbSize/2,
            left: this.state.left - thumbSize/2,
            height: thumbSize,
            width: thumbSize,
            borderWidth: 1,
            borderColor: 'white'
          }}
          pointerEvents='none'
        />
        <View style={styles.imageStyle}>{this._renderTags()}</View>
      </ImageBackground>
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
        <ScrollView>
          <View
            style={styles.imageStyle}
            {... this.gestureResponder}
          >
          {this._renderPhotoImage(image)}
          </View>
          <View style={styles.dContainer}>
            <RkText rkType="header4">Tagged Clothes (1)</RkText>
          </View>
          <View>
            <View style={styles.headContainer}>
              <View style={styles.leftheadContainer}>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={()=>{this.setState({isModalVisible:true})}}>
                  {this._renderTaggedClothImage()}
                </TouchableOpacity>
              </View>
              <View style={styles.rightheadContainer}>
                <RkText rkType="header5">T-Shirt (Top)</RkText>
                <RkText rkType="header5">Fall, Spring</RkText>
              </View>
              <View>
                <View>
                  <RkText rkType='awesome tag'>{FontAwesome.edit}</RkText>
                </View>
                <View>
                  <RkText rkType='awesome tag'>{FontAwesome.delete}</RkText>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View><Text>This is not supposed to happen (You can send this image to admin)</Text></View>
      );
    }
  }
}

let styles = RkStyleSheet.create(theme => ({
  imageStyle: {
    width: width(100),
    height: width(100)
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
    justifyContent: 'center',
    height: 70,
    width: 70
  },
  rightheadContainer: {
    alignItems: 'stretch',
    flex: 1
  },
  headImageStyle: {
    width:70,
    height: 70
  },
  dContainer: {
    padding: 10
  }
}));

export default TagFromPhoto;

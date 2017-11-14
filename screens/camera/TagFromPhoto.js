import React, { Component } from 'react';
import { ImageBackground, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { width, height } from 'react-native-dimension';
import { RkStyleSheet, RkText } from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import {FontAwesome} from '../../assets/icons';

class TagFromPhoto extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Tag From Photo',
    tabBarVisible: false
  });

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
    return (
      <ImageBackground
        source={{uri: image}}
        style={styles.imageStyle}
        resizeMode="cover">
        <View
          style={{
            position: 'absolute',
            top: 120,
            left: 100,
            height: 50,
            width: 50,
            borderWidth: 1,
            borderColor: 'white'
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 100,
            left: 150,
            height: 200,
            width: 200,
            borderWidth: 1,
            borderColor: 'white'
          }}
        />
      </ImageBackground>
    );
  }

  render() {
    let { image } = this.props.navigation.state.params;
    if(image) {
      return (
        <ScrollView>
          {this._renderPhotoImage(image)}
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

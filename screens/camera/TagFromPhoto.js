import React, { Component } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { width, height } from 'react-native-dimension';
import { RkStyleSheet, RkText } from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import {FontAwesome} from '../../assets/icons';

class TagFromPhoto extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Tag From Photo',
    tabBarVisible: false
  });

  render() {
    let { image } = this.props.navigation.state.params;
    if(image) {
      return (
        <ScrollView>
          <Image
            source={{uri: image}}
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <View>
            <RkText rkType="header4">Tagged Clothes (1)</RkText>
          </View>
          <View>
            <View>
              <Image />
            </View>
            <View>
              <RkText>T-Shirt (Top)</RkText>
            </View>
            <View>
              <RkText rkType='awesome tag'>{FontAwesome.edit}</RkText>

              <RkText rkType='awesome tag'>{FontAwesome.delete}</RkText>
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
  }
}));

export default TagFromPhoto;

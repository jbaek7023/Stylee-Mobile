import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { width, height, totalSize } from 'react-native-dimension';
import * as actions from '../../actions';
import { RkText } from 'react-native-ui-kitten';

class EtcScreen extends Component {
  _keyExtractor = (item, index) => item.id;

  _handleImagePress = (id) => {
    this.props.navigation.navigate('ClothDetail', {id})
  }

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.id)}>
        <Image
          key={item.id}
          source={{uri: item.cloth_image}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    if(this.props.clothes && this.props.clothes.length==0) {
      return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Image style={styles.imageStyle} source={require('../../assets/images/etc.png')}/>
          <RkText style={styles.imageBottomText} rkType="header5 hintColor">Unsorted clothes will be stored here</RkText>
        </View>
      );
    }
    return (
      <View style={{ flex:1 }}>
        <ScrollView automaticallyAdjustContentInsets={false}>
          <FlatList
            data={this.props.clothes}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={3}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowImage:{
    width:width(33),
    height:width(33),
    borderWidth:.5,
    borderColor:'#fff'
  },
  imageStyle: {
    width: width(30),
    height: width(30),
  },
  imageBottomText: {
    width: width(70),
    marginLeft: 23,
  }
});

export default connect(null, actions)(EtcScreen);

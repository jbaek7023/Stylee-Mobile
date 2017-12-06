import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { width, height, totalSize } from 'react-native-dimension';
import * as actions from '../../actions';
import { CheckBox } from 'native-base';
class OutwearScreen extends Component {
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => {
    let isSelected = _.includes(this.props.selectedClothesIds, item.id);
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.handleImagePress(item.id)}>
        <View style={styles.rowImage}>
          <Image
            fadeDuration={0}
            key={item.id}
            source={{uri: item.cloth_image}}
            style={styles.rowImage}
            resizeMode="cover"
          />
          <View style={{height:32, width:32, position:'absolute', top:0, right:0, marginTop:4, paddingRight:12}}>
            <CheckBox checked={isSelected} color="#f64e59" onPress={() => this.props.handleImagePress(item.id)}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    if(this.props.clothes && this.props.clothes.length==0) {
      return (
        <View style={{ flex:1 }}>
          <Text>`Your Outwear slot is empty. Why don't you add more?`</Text>
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
            extraData={this.props.selectedClothesIds}
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
  }
});

export default connect(null, actions)(OutwearScreen);

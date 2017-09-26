import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { width, height, totalSize } from 'react-native-dimension';
import * as actions from '../../actions';

class BottomScreen extends Component {
  _keyExtractor = (item, index) => item.id;

  _handleImagePress = (id) => {
    this.props.navigation.navigate('OutfitDetail', {id})
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
  }
});

export default connect(null, actions)(BottomScreen);

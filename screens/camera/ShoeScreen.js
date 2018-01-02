import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { width, height, totalSize } from 'react-native-dimension';
import * as actions from '../../actions';
import { CheckBox } from 'native-base';

class ShoeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    tabBarVisible: false,
  })

  componentWillMount() {
    if(this.props.token) {
      this.props.fetchShoesAll(this.props.token, this.props.hType);
    }
  }

  componentWillReceiveProps(nextProps) {

  }

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
    if(this.props.shoes && this.props.shoes.length==0) {
      return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            fadeDuration={0}
            style={styles.imageStyle} source={require('../../assets/images/shoes.png')}/>
          <RkText style={styles.imageBottomText} rkType="header5 hintColor">No top items to show</RkText>
        </View>
      );
    }
    return (
      <View style={{ flex:1 }}>
        <ScrollView automaticallyAdjustContentInsets={false}>
          <FlatList
            data={this.props.shoes}
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
  },
  imageStyle: {
    width: width(30),
    height: width(30),
  },
  imageBottomText: {
    textAlign: 'center'
  }
});

function mapStateToProps({auth: {token, hType}, wardrobe: {shoes}}) {
  return {token, hType, shoes}
}

export default connect(mapStateToProps, actions)(ShoeScreen);

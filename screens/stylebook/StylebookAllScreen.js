import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Fab, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import { threeImageWidth } from '../../utils/scale';
import { RkText } from 'react-native-ui-kitten';

import * as actions from '../../actions';

class StylebookAllScreen extends Component {

  static navigationOptions = {
  //  title:'All'
  }

  componentWillMount() {
    if(this.props.token == undefined) {
      // Auth Screen // set the
    } else {
      this.props.loadOutfitAll(this.props.token, this.props.hType);
    }
  }

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
          source={{uri: item.outfit_img}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  componentWillReceiveProps(nextProps) {
    // retrieve user data // add username and bio to props
    if ( nextProps.token == undefined || _.isNil(nextProps.token) ) {
      nextProps.navigation.navigate('Autho');
    } else {
      // if token is updated, retrieve current logged in user
      if ( this.props.token !== nextProps.token) {
        this.props.loadOutfitAll(this.props.token, this.props.hType);
      }
    }
  }

  render() {
    if(this.props.outfits && this.props.outfits.length==0) {
      return (
        <View style={{flex:1, alignItems: 'center'}}>
          <View style={styles.defaultContainer}>
            <Image style={styles.imageStyle} source={require('../../assets/images/styles.png')}/>
            <RkText style={styles.imageBottomText} rkType="header5 hintColor">Upload your outfit style!</RkText>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex:1 }}>
        <ScrollView automaticallyAdjustContentInsets={false}>
          <FlatList
            data={this.props.outfits}
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
    width:threeImageWidth,
    height:threeImageWidth,
    marginRight:2,
    marginTop:2
  },
  imageStyle: {
    width: width(30),
    height: width(30),
  },
  imageBottomText: {
    textAlign: 'center',
    marginTop: 13,
  },
  defaultContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width(70),
  },
});

// var width = Dimensions.get('window').width;
function mapStateToProps({auth: {token, hType}, outfit: {outfits} }) {
  return {
    token, hType, outfits
  }
}

export default connect(mapStateToProps, actions)(StylebookAllScreen);

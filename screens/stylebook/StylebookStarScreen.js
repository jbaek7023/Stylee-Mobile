import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Fab, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import { threeImageWidth } from '../../utils/scale';
import { RkText } from 'react-native-ui-kitten';
import * as actions from '../../actions';

class StylebookStarScreen extends Component {

  static navigationOptions = {
  //  title:'All'
  }

  componentWillMount() {
    if(this.props.token == undefined) {
      // Auth Screen // set the
    }
    this.props.fetchStarOutfitAll(this.props.token, this.props.hType);
  }

  _keyExtractor = (item, index) => item.id;

  _handleImagePress = (ctype, id) => {
    if(ctype == 26) {
      this.props.navigation.navigate('OutfitDetail', {id})
    } else {
      this.props.navigation.navigate('ClothDetail', {id})
    }

  }

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.content_type, item.object_id)}>
        <Image
          fadeDuration={0}
          key={item.object_id}
          source={{uri: item.mobject.image}}
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
        this.props.fetchStarOutfitAll(this.props.token, this.props.hType);
      }
    }
  }

  render() {
    if(this.props.starOutfits && this.props.starOutfits.length==0) {
      return (
        <View style={{flex:1, alignItems: 'center'}}>
          <View style={styles.defaultContainer}>
            <Image
              fadeDuration={0}
              style={styles.imageStyle} source={require('../../assets/images/bookmark.png')}/>
            <RkText style={styles.imageBottomText} rkType="header5 hintColor">No bookmarked style or clothes yet</RkText>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex:1 }}>
        <ScrollView automaticallyAdjustContentInsets={false}>
          <FlatList
            data={this.props.starOutfits}
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
  defaultContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width(70),
  },
  imageStyle: {
    width: width(30),
    height: width(30),
  },
  imageBottomText: {
    textAlign: 'center',
    marginTop: 5,
  },
});

// var width = Dimensions.get('window').width;
function mapStateToProps({auth: {token, hType}, outfit: { starOutfits} }) {
  return {
    token, hType, starOutfits
  }
}

export default connect(mapStateToProps, actions)(StylebookStarScreen);

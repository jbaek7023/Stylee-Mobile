import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Fab, Icon, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { threeImageWidth } from '../../utils/scale';
import { RkText } from 'react-native-ui-kitten';
import { thresholdLength } from '../../utils/scale';
import * as actions from '../../actions';

class StylebookStarScreen extends Component {

  static navigationOptions = {
  //  title:'All'
  }

  state = {
    isLoading: true,
    nextUri: null,
    refreshing: false,
  }

  componentWillMount() {
    if(this.props.token == undefined) {
      // Auth Screen // set the
    }
    this.props.loadBookmarkAll(this.props.token, this.props.hType);
  }

  componentWillReceiveProps(nextProps) {
    let { token, hType } = this.props;
    // retrieve user data // add username and bio to props
    if ( nextProps.token == undefined || _.isNil(nextProps.token) ) {
      nextProps.navigation.navigate('Autho');
    } else {
      // if token is updated, retrieve current logged in user
      if ( nextProps.token && token !== nextProps.token) {
        this.props.loadBookmarkAll(token, hType);
      }
    }
    if(nextProps.starOutfits && this.props.starOutfits !== nextProps.starOutfits) {
      this.setState({isLoading: false});
    }

    if(nextProps.bookmarked && this.props.bookmarked !== nextProps.bookmarked) {
      this.props.loadBookmarkAll(token, hType);
    }
  }

  _onEndReachedThreshold = () => {
    let { token, hType, nextUri } = this.props;
    if(nextUri) {
      this.props.loadBookmarkNextAll(token, hType, nextUri);
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.loadBookmarkAll(this.props.token, this.props.hType).then((data)=>{
      this.setState({refreshing: false})
    })
  }

  _keyExtractor = (item, index) => (item+index);

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
          key={item.object_id + item.user + item.content_type}
          source={{uri: item.mobject.image}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner color='#6F3AB1'/>
        </View>
      );
    }
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
        <FlatList
          data={this.props.starOutfits}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={3}
          refreshControl={
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh = {()=>this._onRefresh()}
            />
          }
          onEndReachedThreshold={thresholdLength}
          onEndReached = {()=>{
            this._onEndReachedThreshold()
          }}
        />
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
function mapStateToProps({auth: {token, hType}, bookmark: { starOutfits, bookmarked, nextUri } }) {
  return {
    token, hType, starOutfits, bookmarked, nextUri
  }
}

export default connect(mapStateToProps, actions)(StylebookStarScreen);

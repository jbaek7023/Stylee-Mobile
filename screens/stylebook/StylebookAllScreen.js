import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Fab, Icon, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { threeImageWidth, thresholdLength } from '../../utils/scale';
import { RkText } from 'react-native-ui-kitten';

import * as actions from '../../actions';

class StylebookAllScreen extends Component {
  static navigationOptions = {

  }

  state = {
    isLoading: true,
    refreshing: false,
    next: null,
  }

  componentWillMount() {
    if(this.props.token) {
      this.props.loadOutfitAll(this.props.token, this.props.hType);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.token && (this.props.token !== nextProps.token)) {
      this.props.loadOutfitAll(nextProps.token, nextProps.hType);
    }

    if(this.props.created !== nextProps.created) {
      this.props.loadOutfitAll(nextProps.token, nextProps.hType);
      this.props.fetchClothesAll(nextProps.token, nextProps.hType);
    }

    if(this.props.outfits !== nextProps.outfits) {
      // loading순간으로 바꿔야할수도... loading했는데 empty면 얻허게 할꺼야?
      this.setState({isLoading: false});
    }
  }

  _onEndReachedThreshold = () => {
    let { token, hType, nextUri } = this.props;
    if(nextUri) {
      this.props.loadOutfitNextAll(token, hType, nextUri);
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
          fadeDuration={0}
          key={item.id}
          source={{uri: item.outfit_img}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.loadOutfitAll(this.props.token, this.props.hType).then((data)=>{
      this.setState({refreshing: false})
    })
  }



  render() {
    if(this.state.isLoading) {
      return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner color='#6F3AB1'/>
        </View>
      );
    }

    if(this.props.outfits && this.props.outfits.length==0) {
      return (
        <View style={{flex:1, alignItems: 'center'}}>
          <View style={styles.defaultContainer}>
            <Image
              fadeDuration={0}
              style={styles.imageStyle} source={require('../../assets/images/styles.png')}/>
            <RkText style={styles.imageBottomText} rkType="header5 hintColor">Upload your outfit style!</RkText>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex:1 }}>
          <FlatList
            data={this.props.outfits}
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
function mapStateToProps({auth: {token, hType}, outfit: {outfits, created, nextUri} }) {
  return {
    token, hType, outfits, created, nextUri
  }
}

export default connect(mapStateToProps, actions)(StylebookAllScreen);

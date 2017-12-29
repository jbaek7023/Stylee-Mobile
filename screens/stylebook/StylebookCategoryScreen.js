import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList, RefreshControl } from 'react-native';
import { Card, CardItem, Body, Spinner } from 'native-base';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { width, height, totalSize } from 'react-native-dimension';
import { thresholdLength } from '../../utils/scale';
import * as actions from '../../actions';

class StylebookCategoryScreen extends Component {
  static navigationOptions = {
  //  title: 'Category'
  }

  state = {
    isLoading: true,
    refreshing: false,
  }

  componentWillMount() {
    if(this.props.token) {
      this.props.loadCategoryAll(this.props.token, this.props.hType);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.token == undefined || _.isNil(nextProps.token) ) {
      nextProps.navigation.navigate('Autho');
    }
    // if token is updated, retrieve current logged in user
    let condition = (nextProps.token && (this.props.token !== nextProps.token)) ||
      (this.props.added !== nextProps.added) ||
      (this.props.removed !== nextProps.removed ) ||
      (this.props.edited !== nextProps.edited) ||
      (this.props.time !== nextProps.time) ? true : false;
    if ( condition ) {
      this.props.loadCategoryAll(nextProps.token, nextProps.hType);
    }
    if(this.props.categories !== nextProps.categories) {
      this.setState({isLoading:false})
    }
  }

  _onEndReachedThreshold = () => {
      let { token, hType, nextUri } = this.props;
      if(nextUri) {
        this.props.loadCategoryNextAll(token, hType, nextUri);
      }
  }

  _renderImage = (item) => {
    if(item.image) {
      return (
        <Image
          fadeDuration={0}
          key={item.id}
          source={{uri: item.image}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      );
    }
    return (
      <Image
        fadeDuration={0}
        key={item.id}
        source={require('../../assets/images/styles.png')}
        style={styles.rowImage}
        resizeMode="cover"
      />
    );
  }

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleCategoryPress(item.id, item.name)}>
        <View style={styles.rowContainer}>
          {this._renderImage(item)}
          <View style={styles.rowWidth}>
            <RkText rkType="primary3" numberOfLines={1} ellipsizeMode='tail'>{item.name}</RkText>
          </View>
          <RkText rkType="secondary2 hintColor">{item.length} Style</RkText>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => item.id;

  _handleCategoryPress = (id, name) => {
    this.props.navigation.navigate('CategoryDetail', {id, name})
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.loadCategoryAll(this.props.token, this.props.hType).then((data)=>{
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

    if(this.props.categories && this.props.categories.length==0) {
      return (
        <View style={{flex:1, alignItems: 'center'}}>
          <View style={styles.defaultContainer}>
            <Image
              fadeDuration={0}
              style={styles.imageStyle} source={require('../../assets/images/category.png')}/>
            <RkText style={styles.imageBottomText} rkType="header5 hintColor">You can create your own category with your outfit styles</RkText>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex:1 }}>
        <FlatList
          data={this.props.categories}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={2}
          style={{flex: 1, flexDirection: 'row'}}
          contentContainerStyle={{justifyContent: 'center'}}
          refreshControl={
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh = {()=>this._onRefresh()}
            />
          }
          onEndReachedThreshold={thresholdLength}
          onEndReached = {({distanceFromEnd})=>{
            this._onEndReachedThreshold()
          }}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  rowImage:{
    width:width(44),
    height:width(44),
    borderWidth:1,
    borderColor:'#DCDCDC',
  },
  rowWidth: {
    width: width(44)
  },
  rowContainer: {
    marginLeft:width(4),
    marginTop: 12
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

function mapStateToProps({auth: {token, hType}, category: {categories, added, removed, nextUri, edited, categoryRemoved: {time, cateId}}}) {
  return {
    token, hType, categories, added, removed, nextUri, edited, time, cateId
  }
}

export default connect(mapStateToProps, actions)(StylebookCategoryScreen);

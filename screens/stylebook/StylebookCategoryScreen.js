import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList } from 'react-native';
import { Card, CardItem, Body, Spinner } from 'native-base';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { width, height, totalSize } from 'react-native-dimension';
import * as actions from '../../actions';

class StylebookCategoryScreen extends Component {
  static navigationOptions = {
  //  title: 'Category'
  }

  state = {
    isLoading: true,
  }

  componentWillMount() {
    if(this.props.token == undefined) {
      // Auth Screen // set the
    }
    this.props.loadCategoryAll(this.props.token, this.props.hType);
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.token == undefined || _.isNil(nextProps.token) ) {
      nextProps.navigation.navigate('Autho');
    } else {
      // if token is updated, retrieve current logged in user
      if ( this.props.token !== nextProps.token) {
        this.props.loadCategoryAll(this.props.token, this.props.hType);
      }
    }

    if(this.props.categories !== nextProps.categories) {
      this.setState({isLoading:false})
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
          <RkText rkType="primary3">{item.name}</RkText>
          <RkText rkType="secondary2 hintColor">{item.length} Style</RkText>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => item.id;

  _handleCategoryPress = (id, name) => {
    this.props.navigation.navigate('CategoryDetail', {id, name})
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
        <ScrollView automaticallyAdjustContentInsets={false}>
          <FlatList
            data={this.props.categories}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={2}
            style={{flex: 1, flexDirection: 'row'}}
            contentContainerStyle={{justifyContent: 'center'}}
          />
        </ScrollView>
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

function mapStateToProps({auth: {token, hType}, outfit: {categories}}) {
  return {
    token, hType, categories
  }
}

export default connect(mapStateToProps, actions)(StylebookCategoryScreen);

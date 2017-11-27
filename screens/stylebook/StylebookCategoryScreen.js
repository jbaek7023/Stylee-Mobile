import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
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
  }

  _renderImage = (item) => {
    if(item.image) {
      return (
        <Image
          key={item.id}
          source={{uri: item.image}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      );
    }
    return (
      <Image
        key={item.id}
        source={require('../../assets/images/robot-dev.png')}
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
          <RkText rkType="secondary2 hintColor">3 Styles</RkText>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => item.id;

  _handleCategoryPress = (id, name) => {
    this.props.navigation.navigate('CategoryDetail', {id, name})
  }

  render() {
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
    }
});

function mapStateToProps({auth: {token, hType}, outfit: {categories}}) {
  return {
    token, hType, categories
  }
}

export default connect(mapStateToProps, actions)(StylebookCategoryScreen);

import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList } from 'react-native';
import { Card, CardItem, Body } from 'native-base';

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
        onPress={() => this._handleCategoryPress(item.id)}
        style={styles.rowImage}>
        <Card>
          <CardItem cardBody>
          {this._renderImage(item)}
          </CardItem>
          <CardItem>
            <Body>
              <Text>{item.name}</Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => item.id;

  _handleCategoryPress = (id) => {
    this.props.navigation.navigate('CategoryDetail', {id})
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
          />
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewRow:{
      flexDirection:'row',
    },
    rowImage:{
      width:width(49),
      height:width(49),
      borderWidth:.5,
      borderColor:'#fff'
    }
});

function mapStateToProps({auth: {token, hType}, outfit: {categories}}) {
  return {
    token, hType, categories
  }
}

export default connect(mapStateToProps, actions)(StylebookCategoryScreen);

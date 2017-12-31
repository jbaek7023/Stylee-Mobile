import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { width, height, totalSize } from 'react-native-dimension';
import * as actions from '../../actions';
import { RkText } from 'react-native-ui-kitten';
import { thresholdLength } from '../../utils/scale';

import { Spinner } from 'native-base';

class EtcScreen extends Component {
  state = {
    isLoading: true,
    refreshing: false,
    etcs: [],
    nextUri: null,
    isLoadError: false,
  }

  componentWillMount() {
    let { token, hType, userPk } = this.props;
    if(token) {
      this.props.fetchUserClothesAll(
        token,
        hType,
        userPk,
        5,
        (etcs, nextUri) => {
          this.setState({etcs, nextUri, isLoading: false});
        },
        () => {
          this.setState({isLoadError: true, isLoading: false});
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  _onEndReachedThreshold = () => {
    let { token, hType, nextUri } = this.props;
    if(nextUri) {
      this.props.fetchUserClothesNextAll(
        token,
        hType,
        nextUri,
        (etcs, nextUri) => {
          this.setState({etcs, nextUri, isLoading: false});
        },
        () => {

        },
      );
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    let { token, hType, userPk } = this.props;
    if(this.props.token) {
      this.props.fetchUserClothesAll(
        token,
        hType,
        userPk,
        5,
        (etcs, nextUri) => {
          this.setState({etcs, nextUri, isLoading: false, refreshing: false});
        },
        () => {
          this.setState({isLoadError: true, isLoading: false, refreshing: false});
        }
      );
    }
  }

  _keyExtractor = (item, index) => item.id;

  _handleImagePress = (id) => {
    this.props.navigation.navigate('ClothDetail', {id})
  }

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.id)}>
        <Image
          fadeDuration={0}
          key={item.id}
          source={{uri: item.cloth_image}}
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

    if(this.state.etcs && this.state.etcs.length==0) {
      return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            fadeDuration={0}
            style={styles.imageStyle} source={require('../../assets/images/etc.png')}/>
          <RkText style={styles.imageBottomText} rkType="header5 hintColor">No other types of items to show</RkText>
        </View>
      );
    }
    return (
      <View style={{ flex:1 }}>
        <FlatList
          data={this.state.etcs}
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

function mapStateToProps({auth: {token, hType}}) {
  return { token, hType }
}

export default connect(mapStateToProps, actions)(EtcScreen);

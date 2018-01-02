import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList, RefreshControl } from 'react-native';
import { Card, CardItem, Body, Spinner } from 'native-base';
import {
  RkText,
  RkCard, RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { width, height, totalSize } from 'react-native-dimension';
import { thresholdLength } from '../../utils/scale';
import {FontAwesome} from '../../assets/icons';
import * as actions from '../../actions';

class UserCategoryScreen extends Component {
  static navigationOptions = () => ({
    gesturesEnabled: false,
    header: null
  })


  state = {
    isLoading: true,
    refreshing: false,
    categoryList: [],
    nextUri: null
  }

  componentWillMount() {
    let { token, hType } = this.props;
    let { userPk } = this.props.navigation.state.params;
    if(token) {
      this.props.fetchUserCategoriesById(
        token,
        hType,
        userPk,
        (categoryList, nextUri) => {
          this.setState({categoryList, nextUri, isLoading: false});
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    // if token is updated, retrieve current logged in user
    let condition = (nextProps.token && (this.props.token !== nextProps.token)) ||
      (this.props.added !== nextProps.added) ||
      (this.props.removed !== nextProps.removed ) ? true : false;
    if ( condition ) {
      this.props.fetchUserCategoriesById(nextProps.token, nextProps.hType);
    }
  }

  _onEndReachedThreshold = () => {
    let { token, hType } = this.props;
    if(this.state.nextUri) {
      this.props.fetchUserNextCategoriesById(
        token, hType, this.state.nextUri,
        (categoryList, nextUri)=>{
          this.setState({categoryList: this.state.categoryList.concat(categoryList), nextUri});
        }
      );
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

  _renderPrivacy = (onlyMe) => {
    if(onlyMe) {
      return (
        <RkText rkType="awesome hintColor" style={{marginTop:1, paddingRight:5}}>{FontAwesome.onlyMe}</RkText>
      );
    } else {
      return (
        <RkText rkType="awesome hintColor" style={{marginTop:1, paddingRight:5}}>{FontAwesome.all}</RkText>
      );
    }
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RkText rkType="secondary2 hintColor">{item.length} Style</RkText>
            {this._renderPrivacy(item.only_me)}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => item.id;

  _handleCategoryPress = (id, name) => {
    this.props.navigation.navigate('CategoryDetail', {id, name})
  }

  _onRefresh = () => {
    let { token, hType } = this.props;
    let { userPk } = this.props.navigation.state.params;

    this.setState({refreshing: true});
    this.props.fetchUserCategoriesById(
      token,
      hType,
      userPk,
      (categoryList, nextUri) => {
        this.setState({categoryList, nextUri, isLoading: false, refreshing: false});
      }
    );
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLayout}>
          <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={() => {
            this.props.navigation.goBack()
          }}>
            <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
          </RkButton>
          <View rkCardHeader style={styles.left}>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <RkText rkType='header3'>Category</RkText>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex:1}}>
          <View>
            {this._renderHeader()}
          </View>
          <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner color='#6F3AB1'/>
          </View>
        </View>
      );
    }

    if(this.state.categoryList && this.state.categoryList.length==0) {
      return (
        <View style={{flex:1}}>
          <View>
            {this._renderHeader()}
          </View>
          <View style={{flex:1, alignItems: 'center'}}>
            <View style={styles.defaultContainer}>
              <Image
                fadeDuration={0}
                style={styles.imageStyle} source={require('../../assets/images/category.png')}/>
              <RkText style={styles.imageBottomText} rkType="header5 hintColor">No category yet</RkText>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex:1, backgroundColor: 'white' }}>
        <View>
          {this._renderHeader()}
        </View>
        <FlatList
          data={this.state.categoryList}
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
    width: width(44),
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
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menu: {
    width: 50
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'center',
  },
  header: {
    height: 55,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
    elevation: 4,
    zIndex: 5,
    overflow: 'visible'
  },
  headerLayout: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white'
  },
});

function mapStateToProps({auth: {token, hType}}) {
  return {
    token, hType
  }
}

export default connect(mapStateToProps, actions)(UserCategoryScreen);

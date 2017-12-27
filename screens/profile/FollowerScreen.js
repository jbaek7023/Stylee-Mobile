import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { findNodeHandle, ScrollView, View, List, Image, TouchableOpacity, StyleSheet, TextInput, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {FontAwesome} from '../../assets/icons';
import * as actions from '../../actions';
import { thresholdLength } from '../../utils/scale';
import { Avatar } from '../../components/Avatar';
import { Spinner } from 'native-base';

class FollowerScreen extends Component {
  static navigationOptions = () => ({
    gesturesEnabled: false,
    header: null
  })

  state = {
    followers: [],
    isLoading: true,
    followers: [],
    nextUri: null,
    noInternetConnection: false,
  }

  componentDidMount() {
    let { token, hType } = this.props;
    let { userPk } = this.props.navigation.state.params;
    this.props.retrieveFollowersByUser(
      token, hType, userPk, (followers, nextUri) => {
        this.setState({followers, nextUri, isLoading: false});
      },
      () => {
        this.setState({isLoading: false, noInternetConnection: true});
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
                <RkText rkType='header3'>Follower</RkText>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _onEndReachedThreshold = () => {
    if(this.state.nextUri) {
      this.props.retrieveNextFollowByUser(
        token, hType, this.state.nextUri, (followers, nextUri) => {
          let newFollowers = this.state.followers.concat(followers);
          this.setState({followers: newFollowers, nextUri, isLoading: false});
        }
      );
    }
  }

  _keyExtractor = (item, index) => item.id;

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' img={require('../../assets/images/default_profile.png')}/>)
    }
    return (
      <Avatar rkType='circle' img={{uri}}/>
    );
  }

  _renderName = (name, username) => {
    if(name) {
      return (
        <RkText rkType='secondary2 hintColor'>{name}</RkText>
      );
    }
    return (
      <RkText rkType='secondary2 hintColor'>{username}</RkText>
    );
  }

  _renderItem = ({item}) => {
    let { image, name, username, id} = item.target;
    return (
      <TouchableOpacity
        style={styles.headerLayout}
        onPress={() => this.props.navigation.navigate('Profile', {userPk: id})}>
        <View rkCardHeader style={styles.left}>
          <View>
            {this._renderAvatar(image)}
          </View>
          <View
            style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{username}</RkText>
              {this._renderName(name, username)}

            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex:1}}>
          {this._renderHeader()}
          <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner color='#6F3AB1'/>
          </View>
        </View>
      );
    }
    return (
      <View style={{flex:1}}>
        {this._renderHeader()}
        <FlatList
          data={this.state.followers}
          renderItem={ this._renderItem }
          keyExtractor={this._keyExtractor}
          numColumns={1}
          onEndReachedThreshold={thresholdLength}
          onEndReached = {()=>{
            this._onEndReachedThreshold()
          }}
        />
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  imageContainer: {
    margin:10,
    height: 70,
    justifyContent: 'center'
  },
  inputStyle: {
    marginTop:10,
    marginBottom:10,
    flex: 1,
    fontSize: 15,
    marginRight: 10,
  },
  headValidStyle: {
    width: 70,
    height: 70
  },
  headImageStyle: {
    width:45,
    height: 45
  },
  dHeader: {
    color: theme.colors.primary,
  },
  dContainer: {
    padding: 10
  },
  contextSeperator: {
    backgroundColor: "#e6e6ee",
    height: 0.5
  },
  modalTitleTextContainer: {
    flexDirection: 'row',
    flex:1
  },
  modalContentTextContainer: {
    flex: 2,
    flexDirection: 'row',
    padding: 10
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    overflow: 'hidden'
  },
  black: {
    color: 'black'
  },
  moreDetailStyle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
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
    backgroundColor: theme.colors.screen.base,
    padding: 10,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  menu: {
    width: 50
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
}));

function mapStateToProps({auth: {token, hType}}) {
  return {token, hType}
}
export default connect(mapStateToProps, actions)(FollowerScreen);

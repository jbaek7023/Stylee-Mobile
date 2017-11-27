import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Left, Body, Thumbnail } from 'native-base';
import { ScrollView, TouchableOpacity, View, AsyncStorage, StyleSheet, Button } from 'react-native';

import { connect } from 'react-redux';
import { LogOutConfirmationModal } from '../../components/common/LogOutConfirmationModal';
import _ from 'lodash';
import * as actions from '../../actions';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkButton,
} from 'react-native-ui-kitten';

import {FontAwesome} from '../../assets/icons';
import { Avatar } from '../../components/Avatar';

import {
  RkSwitch
} from '../../components/switch/index';

import {
  FindFriends,
} from '../../components/FindFriends';
// Nav Bar
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);

class MenuScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Menu',
    gesturesEnabled: false,
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    }
  })

  state = {
    isModalVisible: false,
    sendPush: true,
    shouldRefresh: false,
    twitterEnabled: true,
    googleEnabled: false,
    facebookEnabled: true
  }

  componentWillMount() {
    // retrieve user data // add username and bio to props
    this.props.retrieveCurrentUser(this.props.token, this.props.hType);
  }

  componentWillReceiveProps(nextProps) {
    // retrieve user data // add username and bio to props
    if ( nextProps.token == undefined || _.isNil(nextProps.token) ) {
      nextProps.navigation.navigate('Autho');
    } else {
      // if token is updated, retrieve current logged in user
      if ( this.props.token !== nextProps.token) {
        this.props.retrieveCurrentUser(nextProps.token, this.props.hType);
      }
    }
  }

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  _drawModal = () => {
    return (
      <LogOutConfirmationModal
        title='Log Out of Stylee?'
        _hideModal={this._hideModal}
        isModalVisible={this.state.isModalVisible}
        _doLogOut={this._doLogOut}
      />
    );
  }

  _doLogOut = () => {
    // remove stylee token, close modal, set all props null.
    AsyncStorage.removeItem('stylee_token');
    AsyncStorage.removeItem('fb_token');
    this.setState({ isModalVisible: false })
    this.props.setToken(undefined, undefined, undefined);
  }

  _changePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  }

  _renderProfile = () => {
    // https://www.iconfinder.com/search/?q=user
    if(this.props.currentUser) {
      return (
        <ListItem onPress={() => this._handleProfilePress(this.props.currentUser.id)}>
          <Avatar rkType='circle'
            style={styles.avatar}
            img={{ uri: this.props.currentUser.image }}/>
            <View>
              <RkText rkType='header4'>{this.props.currentUser.username}</RkText>
              <RkText rkType='secondary2 hintColor'>View Profile</RkText>
            </View>
        </ListItem>
      );
    }
    return (<ListItem><Text>Not Found</Text></ListItem>);
  }

  _handleProfilePress = (id) => {
    this.props.navigation.navigate('Profile', {userPk: id});
  }

  _handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>{this._renderProfile()}</View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>PROFILE SETTINGS</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton} onPress={this._handleEditProfile}>
              <RkText rkType='header6'>Edit Profile</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton} onPress={this._changePassword}>
              <RkText rkType='header6'>Change Password</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Language Setting</RkText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>SUPPORT</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Help</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Privacy Policy</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Terms & Conditions</RkText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>ACCOUNT</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton} onPress={this._showModal}>
              <RkText rkType='header6'>Logout</RkText>
            </TouchableOpacity>
          </View>
        </View>
        {this._drawModal()}
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  item: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    paddingHorizontal: 16
  },
  list: {
    backgroundColor: theme.colors.screen.base,
  },
  icon: {
    width: 34,
    textAlign: 'center',
    marginRight: 16
  },
  avatar: {
    marginRight: 16
  },
  container: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    paddingVertical: 25
  },
  section: {
    marginVertical: 15
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24
  },
  switch: {
    marginVertical: 0
  },
}));

function mapStateToProps({ auth: { token, hType }, menu:{ currentUser }}) {
  return {
    token, hType, currentUser
  }
}

export default connect(mapStateToProps, actions)(MenuScreen);

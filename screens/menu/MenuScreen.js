import React, { Component } from 'react';
import { Container, Content, List, Text, Left, Body, Thumbnail } from 'native-base';
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
import { NavigationActions } from 'react-navigation';
import MainTabNavigator from '../../navigation/MainTabNavigator';
import {FontAwesome} from '../../assets/icons';
import { Avatar } from '../../components/Avatar';
import { WebBrowser } from 'expo';
import {
  RkSwitch
} from '../../components/switch/index';

import {
  FindFriends,
} from '../../components/FindFriends';
import SnackBar from 'react-native-snackbar-dialog';
// Nav Bar
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);
import { Spinner } from 'native-base';

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
  }

  componentWillMount() {
    // retrieve user data // add username and bio to props
    let {token, hType} = this.props;
    if(token) {
        this.props.retrieveCurrentUser(token, hType);
    }
  }

  componentWillReceiveProps(nextProps) {
    let condition = ( nextProps.token && this.props.token !== nextProps.token) || (this.props.imageCreated !== nextProps.imageCreated)
    if ( condition ) {
      this.props.retrieveCurrentUser(nextProps.token, nextProps.hType);
    }
  }

  _doLogOut = () => {
    // remove stylee token, close modal, set all props null.
    // AsyncStorage.removeItem('stylee_token');
    // AsyncStorage.removeItem('fb_token');
    AsyncStorage.clear();
    this.setState({ isModalVisible: false })
    this.props.setToken(
      undefined,
      undefined,
      () => this.props.navigation.dispatch({type: "RESET_TO_AUTH"})
    );
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

  _changePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  }

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/default_profile.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _renderProfile = () => {
    // https://www.iconfinder.com/search/?q=user
    if(this.props.currentUser) {
      return (
        <TouchableOpacity style={styles.viewProfile} onPress={() => this._handleProfilePress(this.props.currentUser.id)}>
            {this._renderAvatar(this.props.currentUser.image)}
            <View>
              <RkText rkType='header4'>{this.props.currentUser.username}</RkText>
              <RkText rkType='secondary2 hintColor'>View Profile</RkText>
            </View>
        </TouchableOpacity>
      );
    }
    return (<TouchableOpacity style={styles.viewProfile}><Spinner color='#6F3AB1'/></TouchableOpacity>);
  }

  _handleProfilePress = (id) => {
    this.props.navigation.navigate('Profile', {userPk: id});
  }

  _handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile')
  }

  _handleLanguagePress = () => {
    SnackBar.show('We will consider additional languages for the Stylee app soon :)', { duration: 2500 })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>{this._renderProfile()}</View>
        <View style={styles.separator}/>
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
            <TouchableOpacity style={styles.rowButton} onPress={()=>{this._handleLanguagePress()}}>
              <RkText rkType='header6'>Language Setting</RkText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator}/>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>SUPPORT</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton} onPress={()=> WebBrowser.openBrowserAsync('https://www.facebook.com/Stylee-Help-Center-365392553871519/')}>
              <RkText rkType='header6'>Help</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton} onPress={()=>this.props.navigation.navigate('Privacyo')}>
              <RkText rkType='header6'>Privacy Policy</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton} onPress={()=>this.props.navigation.navigate('TAndCondition')}>
              <RkText rkType='header6'>Terms & Conditions</RkText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator}/>
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
  viewProfile: {
    padding:10,
    flexDirection: 'row'
  },
  separator: {
    backgroundColor: '#F0EEF4',
    height: 10,
  },
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
    marginVertical: 13
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
    paddingVertical: 13
  },
  switch: {
    marginVertical: 0
  },
}));

function mapStateToProps({ auth: { token, hType, changed }, menu:{ currentUser, imageCreated }}) {
  return {
    token, hType, currentUser, imageCreated, changed
  }
}

export default connect(mapStateToProps, actions)(MenuScreen);

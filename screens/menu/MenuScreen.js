import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Left, Body, Thumbnail } from 'native-base';
import { View, AsyncStorage, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { LogOutConfirmationModal } from '../../components/common/LogOutConfirmationModal';
import _ from 'lodash';
import * as actions from '../../actions';
import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {FontIcons} from '../../assets/icons';

class MenuScreen extends Component {
  static navigationOptions = {
    title: 'MENU',
  }

  state = {
    isModalVisible: false
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
    this.props.setToken(undefined, undefined);
  }

  _changePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  }

  _renderProfile = () => {
    // https://www.iconfinder.com/search/?q=user
    if(this.props.currentUser) {
      return (
        <ListItem onPress={this._handleProfilePress}>
          <Left>
            <Thumbnail source={{ uri: this.props.currentUser.image }} />
          </Left>
          <Body>
            <Text>{this.props.currentUser.username}</Text>
          </Body>
        </ListItem>
      );
    }
    return (<ListItem><Text>Not Found</Text></ListItem>);
  }

  _handleProfilePress = () => {
    this.props.navigation.navigate('Profile');
  }

  _handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile')
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Content style={styles.list}>
          <List>
            {this._renderProfile()}
            <ListItem onPress={this._handleEditProfile}>
              <View style={styles.item}>
                <View style={styles.container}>
                <RkText style={styles.icon}
                  rkType='primary moon xxlarge'>{FontIcons.login}</RkText>
                  <RkText>Edit Profile</RkText>
                </View>
              </View>
            </ListItem>
            <ListItem onPress={this._changePassword}>
              <View style={styles.item}>
                <View style={styles.container}>
                <RkText style={styles.icon}
                  rkType='primary moon xxlarge'>{FontIcons.login}</RkText>
                  <RkText>Change Password</RkText>
                </View>
              </View>
            </ListItem>
            <ListItem>
              <View style={styles.item}>
                <View style={styles.container}>
                <RkText style={styles.icon}
                  rkType='primary moon xxlarge'>{FontIcons.login}</RkText>
                  <RkText>!Language Setting</RkText>
                </View>
              </View>
            </ListItem>
            <ListItem onPress={this._showModal}>
              <View style={styles.item}>
                <View style={styles.container}>
                <RkText style={styles.icon}
                  rkType='primary moon xxlarge'>{FontIcons.login}</RkText>
                  <RkText>Logout</RkText>
                </View>
              </View>
            </ListItem>
          </List>
        </Content>
        {this._drawModal()}
      </View>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 34,
    textAlign: 'center',
    marginRight: 16
  }
}));

function mapStateToProps({ auth: { token, hType }, menu:{ currentUser }}) {
  return {
    token, hType, currentUser
  }
}

export default connect(mapStateToProps, actions)(MenuScreen);

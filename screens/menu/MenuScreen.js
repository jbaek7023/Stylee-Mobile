import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Left, Body, Thumbnail } from 'native-base';
import { View, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import { LogOutConfirmationModal } from '../../components/common/LogOutConfirmationModal';
import _ from 'lodash';
import * as actions from '../../actions';

class MenuScreen extends Component {
  static navigationOptions = {
    title: 'Menu',
    header: null,
    headerMode: 'none',
    navigationOptions: {
      header: null
    },
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
        <ListItem avatar style={{marginLeft: -15, paddingLeft: 15}} >
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

  render() {
    return (
      <View style={{flex:1}}>
        <Content>
          <List>
            {this._renderProfile()}
            <ListItem style={{marginLeft: -15, paddingLeft: 15}}>
              <Left>
                <Text>! Edit Profile</Text>
              </Left>
            </ListItem>
            <ListItem style={{marginLeft: -15, paddingLeft: 15}} onPress={this._changePassword}>
              <Left>
                <Text>Change Password </Text>
              </Left>
            </ListItem>

            <ListItem style={{marginLeft: -15, paddingLeft: 15}}>
              <Left>
                <Text>! Language Setting</Text>
              </Left>
            </ListItem>

            <ListItem style={{marginLeft: -15, paddingLeft: 15}} onPress={this._showModal}>
              <Left>
                <Text>Logout</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
        {this._drawModal()}
      </View>
    );
  }
}

function mapStateToProps({ auth: { token, hType }, menu:{ currentUser }}) {
  return {
    token, hType, currentUser
  }
}

export default connect(mapStateToProps, actions)(MenuScreen);

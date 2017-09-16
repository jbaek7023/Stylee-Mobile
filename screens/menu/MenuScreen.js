import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
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
    return (
      <ListItem>
        <Text>{this.props.username}</Text>
        <Text>{this.props.bio}</Text>
      </ListItem>
    );

  }

  render() {
    return (
      <Container>
        <List>
          {this._renderProfile()}
          <ListItem>
            <Text>! Edit Profile</Text>
          </ListItem>
          <ListItem onPress={this._changePassword}>
            <Text>Change Password </Text>
          </ListItem>

          <ListItem>
            <Text>! Language Setting</Text>
          </ListItem>
          <ListItem>
            <Text>! Q&A</Text>
          </ListItem>
          <ListItem>
            <Text>! Calendar</Text>
          </ListItem>
          <ListItem onPress={this._showModal}>
            <Text>Logout</Text>
          </ListItem>
        </List>
        {this._drawModal()}
        <Text></Text>
      </Container>
    );
  }
}

function mapStateToProps({ auth: { token, hType }, menu:{ username, bio }}) {
  return {
    token, username, bio, hType
  }
}

export default connect(mapStateToProps, actions)(MenuScreen);

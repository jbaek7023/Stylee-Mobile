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
    }
  }

  state = {
    isModalVisible: false
  }

  componentWillMount() {
    // retrieve user data // add username and bio to props
    this.props.retrieveCurrentUser(this.props.token);

  }

  componentWillReceiveProps(nextProps) {
    // retrieve user data // add username and bio to props
    if ( nextProps.token == undefined || _.isNil(nextProps.token) ) {
      nextProps.navigation.navigate('Auth');
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
    this.setState({ isModalVisible: false })
    this.props.setToken();

  }

  render() {
    return (
      <Container>
        <List>
          <ListItem>
            <Text>{this.props.username}</Text>
            <Text>{this.props.bio}</Text>
          </ListItem>
          <ListItem>
            <Text>Find Password</Text>
          </ListItem>
          <ListItem>
            <Text>Change Password</Text>
          </ListItem>
          <ListItem>
            <Text>Q&A</Text>
          </ListItem>
          <ListItem>
            <Text>Find Password</Text>
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

function mapStateToProps({ auth: { token }, menu:{ username, bio }}) {
  return {
    token, username, bio
  }
}

export default connect(mapStateToProps, actions)(MenuScreen);

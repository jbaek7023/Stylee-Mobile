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
    AsyncStorage.removeItem('stylee_token');
    this.setState({ isModalVisible: false })
    // Set props.token == null
    this.setDefaultAll;
    if ( this.props.token == undefined ) {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    var items = ['John Baek','Language', 'Calendar','Logout'];
    return (
      <Container>
        <List>
          <ListItem>
            <Text>jbaek7023</Text>
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
      </Container>
    );

  }
}

export default connect(null, actions)(MenuScreen);

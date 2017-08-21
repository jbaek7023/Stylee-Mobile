import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Button, Text, Form, Input, Label, Item } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
// import DjangoCSRFToken from 'django-react-csrftoken';

import * as actions from '../../actions';

import { AuthFieldInput } from '../../components/common/AuthFieldInput';

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Authentication'
  }

  state = {
    username: '',
    password: '',
    error: ''
  }

  componentWillMount() {
    // debugging purpose
    console.log('willMount')
    AsyncStorage.removeItem('stylee_token');
    this.onAuthComplete(this.props);
  }

  componentDidMount() {

  }

  // When we rerender,
  componentWillReceiveProps(nextProps) {
    console.log('received props');
    this.onAuthComplete(nextProps);
  }

  async onAuthComplete(props) {
    let token = await AsyncStorage.getItem('stylee_token');
    console.log('token?');
    console.log(token);
    console.log('end token');
    if(!_.isNull(token)) {
      this.props.setToken(token);
    }
    if (props.token) {
      console.log('navigating');
      this.props.navigation.navigate('Main');
    }
  }

  authClicked = () => {
    this.props.doAuthLogin(this.state.username, this.state.password);
  }

  fbClicked = () => {
    // Call the FacebookAction
    this.props.facebookLogin();
  }

  render() {
    return (
      <Container style={styles.container}>
      <Content>
        <Form>
          <AuthFieldInput
            placeholder="Username or Email"
            value={this.state.username}
            onChangeText={username => this.setState({username})}
          />
          <AuthFieldInput
            placeholder="Password"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            secureTextEntry
          />
        </Form>
        <Button block style={styles.buttonStyle} onPress={this.authClicked}>
          <Text>Log in</Text>
        </Button>
        <Button block style={styles.buttonStyle} onPress={this.fbClicked}>
          <Text>Log in with the Facebook</Text>
        </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonStyle: {
    marginTop: 10,
  }
});

function mapStateToProps({ auth }) {
  return { token: auth.token };
}
export default reduxForm({
  form: 'SignInUserForm',
  fields: ['username', 'password']
})(
  connect(mapStateToProps, actions)(AuthScreen)
)

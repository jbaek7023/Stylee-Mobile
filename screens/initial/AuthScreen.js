import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Button, Text, Form, Input, Label, Item } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Authentication'
  }

  // componentWillMount() {
  //   this.onAuthComplete(this.props);
  // }

  componentDidMount() {
    // debugging purpose
    AsyncStorage.setItem('fb_token', null);

  }

  // When we rerender,
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Main');
    }
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
          <Item floatingLabel>
            <Label>Username or Email</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
        </Form>
        <Button block style={styles.buttonStyle}><Text>Log in</Text></Button>

        <Button block style={styles.buttonStyle} onPress={this.fbClicked}><Text>Log in with the Facebook</Text></Button>
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

export default connect(mapStateToProps, actions)(AuthScreen);

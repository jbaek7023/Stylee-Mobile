import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Form, Input, Label, Item } from 'native-base';

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Authentication'
  }

  render() {
    return (
      <Container style={styles.container}>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
        </Form>
        <Button block><Text>Log in</Text></Button>
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
});

export default AuthScreen;

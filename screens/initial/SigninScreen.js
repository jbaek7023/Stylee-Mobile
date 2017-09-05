import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { Field, reduxForm } from 'redux-form';
import { Text, Button, Form, Input, Label } from 'native-base';

class SigninScreen extends Component {
  state = {
    username: '',
    password: '',
  }

  _submitEmail = () => {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/styleeicon.png')}
          />
        </View>
        <Form style={styles.formStyle}>
          <AuthFieldInput
            placeholder="Email"
            value={this.state.username}
            onChangeText={username => this.setState({username})}
            returnKeyType="next"
          />
        </Form>
        <View style={styles.buttonContainer}>
          <Button block style={styles.buttonStyle} onPress={this._submitEmail}>
            <Text style={styles.buttonText}>Next</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formStyle: {
    paddingTop: 10
  },
  buttonContainer: {
    marginTop:10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  logoContainer: {
    alignItems: 'center'
  },
  buttonText: {
    color: 'white'
  },
  logo: {
    width: width(50),
    height: height(25)
  }
});

export default SigninScreen;

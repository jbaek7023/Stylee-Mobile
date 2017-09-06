import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { Field, reduxForm } from 'redux-form';
import { Text, Button, Form, Input, Label } from 'native-base';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignUpUsernameScreen extends Component {
  state = {
    username: this.props.newAuth.username,
    validUsername: true,
  }

  _register = () => {
    //check username (if it's not valid, button should be hided)

    // register here //save token
    this.props.registerUser()
    // invalid? login? username should be wrong.

  }

  componentWillReceiveProps(nextProps) {
    // check token
    if(token) {
      this.props.navigation.navigate('Main');
    }
  }

  render() {
    console.log(this.props.newAuth)
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
            placeholder="Username"
            value={this.state.username}
            onChangeText={username => this.setState({username})}
            returnKeyType="go"
          />
        </Form>
        <View style={styles.buttonContainer}>
          <Button block style={styles.buttonStyle} onPress={this._register}>
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

function mapStateToProps({newAuth}) {
  return { newAuth }
}

export default connect(mapStateToProps, actions)(SignUpUsernameScreen);

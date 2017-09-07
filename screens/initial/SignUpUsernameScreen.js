import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { Field, reduxForm } from 'redux-form';
import { Text, Button, Form, Input, Label } from 'native-base';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';

const ROOT_URL = 'http://10.0.2.2:8000';

class SignUpUsernameScreen extends Component {
  state = {
    username: this.props.newAuth.username,
    isValidUsername: true,
  }

  _handleChange = async (username) => {
    this.setState({username})
    let response = await axios.get(`${ROOT_URL}/profile/unamecheck/?un=${username}`)
    if (response.status === 200) {
        if(response.data.obtained) {
          this.setState({isValidUsername: false})
        } else {
          this.setState({isValidUsername: true})
        }
    } else {

    }
    console.log('isValidUsername');
    console.log(this.state.isValidUsername);
  }

  _register = () => {
    // if username == username : valid
    // if username != username : obtained

    console.log(this.props.newAuth);
    const { password, email } = this.props.newAuth;
    const { username } = this.state;
    console.log(username);
    // register here //save token
    this.props.registerUser(username, email, password);
    // invalid? login? username should be wrong.
    // email: valid, password: valid, bio: valid, username: valid


  }

  componentWillReceiveProps(nextProps) {
    // check token
    if(nextProps.token) {
      // pass first-time logged in
      nextProps.navigation.navigate('Main');
    }
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
            placeholder="Username"
            value={this.state.username}
            onChangeText={username => this._handleChange(username)}
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

function mapStateToProps({newAuth, auth: {token}}) {
  return { newAuth, token }
}

export default connect(mapStateToProps, actions)(SignUpUsernameScreen);

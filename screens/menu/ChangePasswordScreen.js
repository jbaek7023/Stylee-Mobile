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

class ChangePasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Change Passowrd`,
    tabBarVisible: false,
  });

  state = {
    currentPassword: '',
    passwordOne: '',
    passwordTwo: '',
    success: '',
  }

  _changePassword = async () => {
    const { currentPassword, passwordOne, passwordTwo } = this.state;
    const { token } = this.props;
    const headers = {
      'Authorization': `JWT ${token}`
    }

    let response = await axios.post(`${ROOT_URL}/rest-auth/password/change/`, {
      old_password:currentPassword,
      new_password1:passwordOne,
      new_password2:passwordTwo,
    }, {
      headers
    });

    if(response.status == 200) {
      this.setState({currentPassword: '', passwordOne: '', passwordTwo: ''});
      this.props.navigation.navigate('Menuo');
    } else if (response.status == 401) {
      // (Further) There should be NO BackEnd error.
      // we check password FE as possible as we can
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <View style={styles.container}>
        <Form style={styles.formStyle}>
          <AuthFieldInput
            placeholder="Current Password"
            value={this.state.currentPassword}
            onChangeText={currentPassword => this.setState({currentPassword})}
            secureTextEntry
            returnKeyType="next"
          />
          <AuthFieldInput
            placeholder="Password"
            value={this.state.passwordOne}
            onChangeText={passwordOne => this.setState({passwordOne})}
            secureTextEntry
            returnKeyType="next"
          />
          <AuthFieldInput
            placeholder="Password Confirm"
            value={this.state.passwordTwo}
            onChangeText={passwordTwo => this.setState({passwordTwo})}
            secureTextEntry
            returnKeyType="go"
          />
        </Form>
        <View style={styles.buttonContainer}>
          <Button block style={styles.buttonStyle} onPress={this._changePassword}>
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

export default connect(mapStateToProps, actions)(ChangePasswordScreen);

import React, { Component } from 'react';
import { Alert, StyleSheet, AsyncStorage, View, TouchableOpacity, Dimensions, Image, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Button, Form, Text,Input, Label, Item } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import Modal from 'react-native-modal';
// import DjangoCSRFToken from 'django-react-csrftoken';
import { width, height, totalSize } from 'react-native-dimension';

import * as actions from '../../actions';

import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { Spinner } from 'native-base';

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Authentication',
    header: null
  }

  state = {
    username: '',
    password: '',
    error: '',
    isReady: false,
    isLoading: true,
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem('stylee_token');
    if(!_.isNull(token)) {
      this.props.setToken(token, 1, () => this._navigateToMain());
    } else {
      let fbToken = await AsyncStorage.getItem('fb_token');
      if(!_.isNull(fbToken)) {
        this.props.setToken(fbToken, 2, () => this._navigateToMain());
      }
    }
    this.setState({isLoading: false});
  }

  // When we rerender,
  async componentWillReceiveProps(nextProps) {
    let token = await AsyncStorage.getItem('stylee_token');
    if(!_.isNull(token)) {
      this.props.setToken(token, 1, () => this._navigateToMain());
    } else {
      let fbToken = await AsyncStorage.getItem('fb_token');
      if(!_.isNull(fbToken)) {
        this.props.setToken(fbToken, 2, () => this._navigateToMain());
      }
    }
    this.setState({isLoading: false});
  }

  _navigateToMain = () => {
    this.setState({password: '', isLoading: false});
    this.props.navigation.navigate('Feed');
  }

  _authClicked = () => {
    this.setState({isLoading: true});
    this.props.doAuthLogin(
      this.state.username,
      this.state.password,
      () => {
        this.setState({isLoading: false});
      },
      () => {
        this.setState({isLoading: false});
        Alert.alert(
          "Can't Find Account",
          `It looks like ${this.state.username} doesn't match an existing account. If you have a Stylee account, you can create one now`,
          [
            {text: 'Create One', onPress:() => this._goSignUp()},
            {text: 'Try Again', onPress: ()=>this.setState({password:''})},
          ],
          { cancelable: true }
        )
      }
    );
  }

  _fbClicked = () => {
    // Call the FacebookAction
    this.setState({isLoading: true});
    this.props.doFacebookLogin(
      ()=>this.setState({isLoading: false}),
      ()=> {
        this.setState({isLoading: false}),
        Alert.alert(
          "Can't Login With Facebook",
          `If you have a Stylee account, you can create one now`,
          [
            {text: 'Create One', onPress:() => this._goSignUp()},
            {text: 'Try Again'},
          ],
          { cancelable: true }
        )
      }
    );
  }

  _goSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'  }}>
            <Spinner color='#6F3AB1'/>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.formAndLogoContainer}>
          <View style={styles.languageContainer}>
            <Button transparent>
              <Text>English</Text>
            </Button>
          </View>
          <View style={styles.logoContainer}>
            <Image
              fadeDuration={0}
              style={styles.logo}
              source={require('../../assets/images/logo.png')}
            />
          </View>
          <Form style={styles.formStyle}>
            <AuthFieldInput
              placeholder="Username or Email"
              value={this.state.username}
              onChangeText={username => this.setState({username})}
              returnKeyType="next"
            />
            <AuthFieldInput
              placeholder="Password"
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              secureTextEntry
              returnKeyType="go"
            />
          </Form>
          <View style={styles.buttonContainer}>
            <Button block style={styles.buttonStyle} onPress={this._authClicked}>
              <Text style={styles.buttonText}>Log in</Text>
            </Button>
            <View style={styles.hr}/>
            <Button block onPress={this._fbClicked}>
              <Text style={styles.buttonText}>Log in with the Facebook</Text>
            </Button>
          </View>
          <View style={styles.signUpContainer}>
            <Text onPress={this._goSignUp} >CREATE NEW STYLEE ACCOUNT</Text>
          </View>

        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  hr: {
    marginHorizontal: 8,
    height: 1,
    backgroundColor: '#968D8A',
    marginVertical: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  languageContainer: {
    flex: 1,
    paddingTop: 10,
  },
  languagePosition: {
    alignItems: 'center'
  },
  formStyle: {
    marginTop: 20,
    paddingTop: 10
  },
  formAndLogoContainer: {
    flex: 5,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  signUpContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
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
    height: width(18)
  }
});

function mapStateToProps({ auth: {token, hType, errorMsg} }) {
  // errorMsg != null : trueErrorMsg
  return { token, errorMsg, hType };
}
export default reduxForm({
  form: 'SignInUserForm',
  fields: ['username', 'password']
})(
  connect(mapStateToProps, actions)(AuthScreen)
)

import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, TouchableOpacity, Dimensions, Image, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Button, Form, Text,Input, Label, Item } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import Modal from 'react-native-modal';
// import DjangoCSRFToken from 'django-react-csrftoken';
import { width, height, totalSize } from 'react-native-dimension';
import Hr from 'react-native-hr';

import * as actions from '../../actions';

import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { CommonModal } from '../../components/common/CommonModal';

import { AppLoading } from 'expo';

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Authentication',
    header: null
  }

  state = {
    username: '',
    password: '',
    error: '',
    isModalVisible: false,
    isReady: false,
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => {
    // set error
    this.props.emptyErrorMsg;
    this.setState({ isModalVisible: false });
  }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('stylee_token');
    if(!_.isNull(token)) {
      this.props.setToken(token, 1);
    } else {
      let fbToken = await AsyncStorage.getItem('fb_token');
      if(!_.isNull(fbToken)) {
        this.props.setToken(fbToken, 2);
      }
    }
    this.setState({isLoading:true});
  }

  componentDidMount() {

  }

  // When we rerender,
  componentWillReceiveProps(nextProps) {
    // onAuthComplete Pass twice. so. it's
    console.log('yo');

    console.log(nextProps.errorMsg);
    if(nextProps.errorMsg) {
      this._showModal();
    }
    this.setState({isLoading:true});
    if (nextProps.hType==1 || nextProps.hType==2) {
      nextProps.navigation.navigate('Feed');
      this.setState({ password: ''})
    }
  }

  _authClicked = () => {
    this.props.doAuthLogin(this.state.username, this.state.password);
  }

  _fbClicked = () => {
    // Call the FacebookAction
    this.props.doFacebookLogin();
  }

  _goSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    if(!this.state.isLoading) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.languageContainer}>
          <Button transparent>
            <Text>English</Text>
          </Button>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.formAndLogoContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/styleeicon.png')}
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
            <Hr lineColor='#b3b3b3' text='OR'/>
            <Button block onPress={this._fbClicked}>
              <Text style={styles.buttonText}>Log in with the Facebook</Text>
            </Button>
          </View>
          <View>
            <CommonModal
              username={this.state.username}
              _hideModal={this._hideModal}
              errorMsg={this.props.errorMsg}
              isModalVisible={this.state.isModalVisible}
            />
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  languageContainer: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  languagePosition: {
    alignItems: 'center'
  },
  formStyle: {
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
    height: height(25)
  }
});

function mapStateToProps({ auth: {token, hType,errorMsg} }) {
  // errorMsg != null : trueErrorMsg
  return { token, errorMsg, hType };
}
export default reduxForm({
  form: 'SignInUserForm',
  fields: ['username', 'password']
})(
  connect(mapStateToProps, actions)(AuthScreen)
)

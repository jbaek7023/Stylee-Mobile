import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { Field, reduxForm } from 'redux-form';
import { Text, Button, Form, Input, Label, Spinner } from 'native-base';
import * as actions from '../../actions';
import { RkButton, RkText } from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';


const ROOT_URL = 'http://10.0.2.2:8000';

class SignUpUsernameScreen extends Component {
  state = {
    username: this.props.newAuth.username,
    isValidUsername: true,
    isLoading: false,
  }

  _register = () => {
    const { password, email } = this.props.newAuth;
    const { username } = this.state;
    // register here //save token
    this.setState({isLoading: true});
    this.props.registerUser(
      username,
      email,
      password,
      ()=> {
        // setTimeOut. here?
        // set token here
        this.setState({isLoading: false});
        this.props.navigation.navigate('Main');
      },
      () => {
        this.setState({isLoading: false})
        Alert.alert(
          "The username is already obtained",
          `Username can be used for login, too`,
          [
            {text: 'Try Again'},
          ],
          { cancelable: true }
        )
      }
    );
  }

  _handleTermPress = () => {
    this.props.navigation.navigate('Terms');
  }

  _handlePrivacyPress = () => {
    this.props.navigation.navigate('PrivacyOne');
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLayout}>
          <View rkCardHeader style={styles.left}>
            <RkButton
              rkType='clear'
              style={styles.menu}
              onPress={() => {
              this.props.navigation.goBack()
            }}>
              <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
            </RkButton>
          </View>
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header3'>Sign Up</RkText>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.container}>
          {this._renderHeader()}
          <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'  }}>
            <Spinner color='#6F3AB1'/>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <View style={styles.logoContainer}>
          <Image
            fadeDuration={0}
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
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
          <Button block style={styles.buttonStyle} onPress={()=>this._register()}>
            <Text style={styles.buttonText}>Done</Text>
          </Button>
        </View>
        <View style={styles.termsContainer}>
          <RkText rkType="primary4 hintColor">
            <RkText rkType="primary4 hintColor">{`By signing up, you agree to our `}</RkText>
            <RkText style={styles.underline} onPress={()=>this._handleTermPress()} rkType="primary4 hintColor">{`Terms and Conditions`}</RkText>
            <RkText rkType="primary4 hintColor">{` and `}</RkText>
            <RkText style={styles.underline} onPress={()=>this._handlePrivacyPress()} rkType="primary4 hintColor">{`Privacy Policy`}</RkText>
          </RkText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline'
  },
  termsContainer: {
    padding: 15,
  },
  header: {
    height: 55,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
    elevation: 4,
    zIndex: 5,
    overflow: 'visible'
  },
  headerLayout: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  menu: {
    width: 50,
  },
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
    alignItems: 'center',
    marginTop: 33,
  },
  buttonText: {
    color: 'white'
  },
  logo: {
    width: width(50),
    height: width(18)
  }
});

function mapStateToProps({newAuth, auth: {token}}) {
  return { newAuth, token }
}

export default connect(mapStateToProps, actions)(SignUpUsernameScreen);

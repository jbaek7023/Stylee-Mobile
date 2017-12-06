import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { Field, reduxForm } from 'redux-form';
import { Text, Button, Form, Input, Label } from 'native-base';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';

import axios from 'axios';

const ROOT_URL = 'http://10.0.2.2:8000';

class ChangePasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Change Password`,
    tabBarVisible: false,
    header: null
  });

  state = {
    currentPassword: '',
    passwordOne: '',
    passwordTwo: '',
    success: '',
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.)
    //  this.setState({currentPassword: '', passwordOne: '', passwordTwo: ''});
    //  this.props.navigation.goback();
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLayout}>
          <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
          </RkButton>
          <View rkCardHeader style={styles.left}>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <RkText rkType='header3'>Change Your Password</RkText>
              </View>
            </View>
          </View>
          <View style={styles.right}>
              <TouchableOpacity onPress={()=>{
                let { token, hType } = this.props;
                let {currentPassword, passwordOne, passwordTwo} = this.state;
                this.props.changePassword(token, hType, currentPassword, passwordOne, passwordTwo);
                this.props.navigation.goBack();
              }}>
                <RkText rkType="header3">SAVE</RkText>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
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

let styles = RkStyleSheet.create(theme => ({
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
  },
  //header
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
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
    backgroundColor: theme.colors.screen.base
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  menu: {
    width: 40,
  }
}));


function mapStateToProps({newAuth, auth: {token, hType}}) {
  return { newAuth, token }
}

export default connect(mapStateToProps, actions)(ChangePasswordScreen);

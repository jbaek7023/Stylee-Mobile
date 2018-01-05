import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { Field, reduxForm } from 'redux-form';
import { Text, Button, Form, Input, Item, Label, Spinner } from 'native-base';
import { RkButton, RkText } from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignUpUserBioScreen extends Component {
  state = {
    bio: '',
    password: '',
    isLoading: false,
  }

  _submitEmail = () => {
    this.props.addFullNameAndPassword(this.state.bio, this.state.password, () => {
      this.props.navigation.navigate('SignUpUsername');
    })
  }

  componentWillReceiveProps(nextProps) {
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
            placeholder="Full Name"
            value={this.state.bio}
            onChangeText={bio => this.setState({bio})}
            returnKeyType="next"
            onSubmitEditing={()=>{
              this.refs.passfield._root.focus();
            }}/>
          <Item>
            <Input
              ref='passfield'
              value={this.state.password}
              onChangeText={password=>this.setState({password})}
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry
              returnKeyType="go"
              onSubmitEditing={(event)=>this._submitEmail()}
            />
          </Item>
        </Form>

        <View style={styles.buttonContainer}>
          <Button block style={styles.buttonStyle} onPress={this._submitEmail}>
            <Text style={styles.buttonText}>Next</Text>
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


function mapStateToProps({newAuth}) {
  return { newAuth }
}

export default connect(mapStateToProps, actions)(SignUpUserBioScreen);

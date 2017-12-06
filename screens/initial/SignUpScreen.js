import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { Field, reduxForm } from 'redux-form';
import { Text, Button, Form, Input, Label } from 'native-base';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignUpScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ''
  });

  state = {
    email: '',
  }

  _submitEmail = () => {
    // async get
    this.props.doEmailCheck(this.state.email)

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newAuth.username) {
      nextProps.navigation.navigate('SignUpBio');
    } else if (nextProps.newAuth.obtained==0) {
      // Email is Taken CSS
      console.log('obtained');
      // don't forget to implement 404 case
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            fadeDuration={0}
            style={styles.logo}
            source={require('../../assets/images/styleeicon.png')}
          />
        </View>
        <Form style={styles.formStyle}>
          <AuthFieldInput
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            returnKeyType="go"
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

function mapStateToProps({ newAuth }) {
  // newAuth.judge.username or newAuth.judge.obtained
  return { newAuth };
}

export default connect(mapStateToProps, actions)(SignUpScreen);

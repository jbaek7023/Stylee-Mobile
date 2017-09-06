import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { AuthFieldInput } from '../../components/common/AuthFieldInput';
import { Field, reduxForm } from 'redux-form';
import { Text, Button, Form, Input, Label } from 'native-base';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignUpUserBioScreen extends Component {
  state = {
    bio: '',
    password: '',
  }

  _submitEmail = () => {
    this.props.addFullNameAndPassword(this.state.bio, this.state.password)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newAuth.bio) {
      nextProps.navigation.navigate('SignUpUsername')
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
            placeholder="Full Name"
            value={this.state.bio}
            onChangeText={bio => this.setState({bio})}
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


function mapStateToProps({newAuth}) {
  return { newAuth }
}

export default connect(mapStateToProps, actions)(SignUpUserBioScreen);

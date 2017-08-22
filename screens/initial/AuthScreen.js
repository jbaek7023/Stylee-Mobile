import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Container, Content, Button, Form, Text,Input, Label, Item } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import Modal from 'react-native-modal';
// import DjangoCSRFToken from 'django-react-csrftoken';
import { width, height, totalSize } from 'react-native-dimension';
import * as actions from '../../actions';

import { AuthFieldInput } from '../../components/common/AuthFieldInput';

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Authentication',
    header: null
  }

  state = {
    username: '',
    password: '',
    error: '',
    isModalVisible: false
  }
  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  componentWillMount() {
    // debugging purpose
    AsyncStorage.removeItem('stylee_token');
    this._onAuthComplete(this.props);
  }

  componentDidMount() {

  }

  // When we rerender,
  componentWillReceiveProps(nextProps) {
    this._onAuthComplete(nextProps);
  }

  async _onAuthComplete(props) {
    let token = await AsyncStorage.getItem('stylee_token');
    if(!_.isNull(token)) {
      this.props.setToken(token);
    }
    if(this.props.errorMsg) {
      this._showModal();
    }
    if (props.token) {
      this.props.navigation.navigate('Main');
    }
  }

  _authClicked = () => {
    this.props.doAuthLogin(this.state.username, this.state.password);
  }

  _fbClicked = () => {
    // Call the FacebookAction
    this.props.facebookLogin();
  }

  _renderModal = () => {
    return (
      <Container style={styles.modalStyle}>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={{fontWeight: 'bold'}}>{this.props.errorMsg}</Text>
            <Text style={styles.modalText}>{`It looks like ${this.state.username} doesn't match an existing account. If you don't have a Stylee account, you can create one now `}</Text>
            <View style={styles.modalButtonContainer}>
              <Button transparent style={styles.modalButtonStyle} onPress={this._hideModal}>
                <Text style={styles.modalText}>Try Agin</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.languageContainer}>
          <Button transparent>
            <Text>English</Text>
          </Button>
        </View>
        <View style={styles.formAndLogoContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/styleeicon.png')}
            />
          </View>
          <Form>
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
            <Button block style={styles.buttonStyle} onPress={this._fbClicked}>
              <Text style={styles.buttonText}>Log in with the Facebook</Text>
            </Button>
          </View>
          <View>
            {this._renderModal()}
          </View>
          <View style={styles.signUpContainer}>
            <Text>CREATE NEW STYLEE ACCOUNT</Text>
          </View>
        </View>
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
  formAndLogoContainer: {
    flex: 5,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  signUpContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
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
    width: 200,
    height: 200
  },
  modalContainer: {
    marginTop: 20
  },
  buttonStyle: {
    marginTop: 10,
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width(100),
    height: height(30),
    backgroundColor:'pink'
  },
  modalTextTitle: {
    fontSize: 16,
    flex: 1,
    justifyContent: 'center'
  },
  modalText: {
    fontSize: 12,
    flex: 1,
    justifyContent: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    backgroundColor:'blue'
  },
  modalButtonStyle: {
    alignItems: 'flex-end',
  }
});

function mapStateToProps({ auth: {token, errorMsg} }) {
  return { token, errorMsg };
}
export default reduxForm({
  form: 'SignInUserForm',
  fields: ['username', 'password']
})(
  connect(mapStateToProps, actions)(AuthScreen)
)

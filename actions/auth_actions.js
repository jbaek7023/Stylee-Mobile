import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

// AsyncStorage.setItem('fb_token', token); <- returns a promise
// AsyncStorage.getItem('fb_token');

const ROOT_URL = 'http://localhost:8000'

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // start FB login process
    doFacebookLogin(dispatch);
  }
};

// Getting dispatch as a parameter because we want to access to the dispatch from the parent function
const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('1946324505614230', {
      permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

// export const signInUser = ({ username, password }) => async dispatch => {
//     // let token = await AsyncStorage.getItem('auth_token');
//     // if (token) {
//     //   dispatch({ type: AUTH_LOGIN_SUCCESS, payload: token });
//     // } else {
//     //   // Post to API
//     // }
//     // if(username contains @) {
//     //   axios.post(`${ROOT_URL}/signin`, { username: email, password })
//     // } else {
//     //   axios.post(`${ROOT_URL}/signin`, { username, password })
//     // }
//
// }

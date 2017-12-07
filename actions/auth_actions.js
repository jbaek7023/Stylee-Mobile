import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';

import {
  FACEBOOK_LOGIN_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  SET_TOKEN,
  SOCIAL_FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGIN_CANCEL,
  SET_DEFAULT_ALL,
  FB_AUTH_LOGIN_SUCCESS,
  FB_AUTH_LOGIN_FAIL,
  EMPTY_ERROR_MSG,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from './types';

// AsyncStorage.setItem('fb_token', token); <- returns a promise
// AsyncStorage.getItem('fb_token');

// localhost -> 10.0.2.2:YOUR_PORT
const ROOT_URL = 'http://10.0.2.2:8000'


export const changePassword = ( token, hType, currentPassword, passwordOne, passwordTwo ) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.post(`${ROOT_URL}/password/change/`, {
    old_password: currentPassword,
    new_password1: passwordOne,
    new_password2: passwordTwo,
  }, {
    headers
  });

  if (response.status === 200) {
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data });
  } else {
    if(response.status === 400) {
      console.log('Not authorized. ');
    } else if (response.status === 403){
      console.log('You are not suposed to see this message. Contact Administrator');
    }
    dispatch({ type: CHANGE_PASSWORD_FAIL});
  }
};

// Getting dispatch as a parameter because we want to access to the dispatch from the parent function
export const doFacebookLogin = () => async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('1946324505614230', {
      permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_CANCEL })
  }

  if (_.isNull(token)) {
    // Facebook Network error
    // Are you Offline?
    dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  doSocialAuthLogin(dispatch, token);
};

const doSocialAuthLogin = async (dispatch, token) => {
  let response = await axios.post(`${ROOT_URL}/auth/convert-token/`, {
    grant_type: 'convert_token',
    client_id: 'jsEqE859ixa2TCXg5Fib26A9NxE1Pu6AqUbztmzm',
    backend: 'facebook',
    token
  })
  if (response.data.access_token) {
    AsyncStorage.setItem('fb_token', response.data.access_token);
    // fb is type 2
    dispatch({ type: FB_AUTH_LOGIN_SUCCESS, payload: response.data.access_token });
  } else {
    dispatch({ type: FB_AUTH_LOGIN_FAIL });
  }
}

export const doAuthLogin = ( username, password ) => async dispatch => {
  try {
    let response = await axios.post(`${ROOT_URL}/rest-auth/login/`, {
      username,
      password,
    });

    if (response.status === 200) {
      // fb is type 2
      AsyncStorage.setItem('stylee_token', response.data.token);
      dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data.token});
    }
  } catch (error) {
    console.log('fail');
    dispatch({ type: AUTH_LOGIN_FAIL});
  }
};

export const setToken = ( token, hType ) => ({
  type: SET_TOKEN,
  payload: { token, hType }
});

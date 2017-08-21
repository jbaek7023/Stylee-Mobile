import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  SET_TOKEN
} from './types';

// AsyncStorage.setItem('fb_token', token); <- returns a promise
// AsyncStorage.getItem('fb_token');

// localhost -> 10.0.2.2:YOUR_PORT
const ROOT_URL = 'http://10.0.2.2:8000'

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // dispatch an action saying FB login is done
    doSocialAuthLogin(dispatch, token);
    // dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
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
  doSocialAuthLogin(dispatch, token);
};

const doSocialAuthLogin = async (dispatch, token) => {
  await AsyncStorage.setItem('fb_token', token);

  axios.post(`${ROOT_URL}/rest-auth/facebook/`, {
    token
  }).then(response => {
    console.log('yes!')
    AsyncStorage.setItem('stylee_token', response.data.token);
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data.token });
  })
  .catch(response => {
    if(response.status === 400) {
      console.log('Not authorized. ');
    } else if (response.status === 403){
      console.log('You are not suposed to see this message. Contact Administrator');
    }
    dispatch({ type: AUTH_LOGIN_FAIL, payload: response.non_field_errors });
  });
}

// export const authLogin = () => async dispatch => {
//   let token = await AsyncStorage.getItem('fb_token');
//   if (token) {
//     // dispatch an action saying FB login is done
//     dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
//   } else {
//     // start FB login process
//     doFacebookLogin(dispatch);
//   }
// };

// headers => Authorization: Bearer eyJ0eXAiOiJKV1QiLCJh...
export const doAuthLogin = ( username, password ) => dispatch => {
  axios.post(`${ROOT_URL}/rest-auth/login/`, {
    username,
    password,
  }).then(response => {
    AsyncStorage.setItem('stylee_token', response.data.token);
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data.token });
  })
  .catch(response => {
    if(response.status === 400) {
      console.log('Not authorized. ');
    } else if (response.status === 403){
      console.log('You are not suposed to see this message. Contact Administrator');
    }
    dispatch({ type: AUTH_LOGIN_FAIL, payload: response.non_field_errors });
  });
};

export const setToken = ( token ) => ({
  type: SET_TOKEN,
  payload: token
});

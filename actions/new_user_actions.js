import { AsyncStorage } from 'react-native';
import axios from 'axios';

import {
  ADD_USER_EMAIL,
  ADD_VALID_EMAIL,
  NETWORK_ERROR,
  ADD_VALID_EMAIL_FAIL,
  ADD_VALID_USERNAME,
  ADD_BIO_AND_PASSWORD,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

// Getting dispatch as a parameter because we want to access to the dispatch from the parent function
export const doEmailCheck = (email) => async dispatch => {
  let response = await axios.get(`${ROOT_URL}/profile/echeck/?em=${email}`)

  if (response.status === 200) {
    // Return valid email and username
    response.data.email = email;
    dispatch({ type: ADD_VALID_EMAIL, payload: response.data })
  } else {
    dispatch({ type: NETWORK_ERROR })
  }
}

export const doUsernameCheck = (username) => async dispatch => {
  let response = await axios.get(`${ROOT_URL}/profile/unamecheck/?un=${username}`)
  if (response.status === 200) {
    // Return valid email and username
    dispatch({ type: ADD_VALID_USERNAME, payload: response.data })
  } else {
    dispatch({ type: NETWORK_ERROR })
  }
}

export const addFullNameAndPassword = (fullname, password) => ({
  // add fullname and password to the props
  type: ADD_BIO_AND_PASSWORD,
  payload: { fullname, password }
})


export const registerUser = ( username, email, password ) => async dispatch => {
  let response = await axios.post(`${ROOT_URL}/rest-auth/registration/`, {
    username,
    email,
    password1: password,
    password2: password
  })
  if(response.data.token) {
    // registration successful
    AsyncStorage.setItem('stylee_token', response.data.token);
    // set header type prop
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.token })
  } else {
    dispatch({ type: REGISTER_FAIL, payload: response.data })
  }
}

export const setFullName = (fullname) => async dispatch => {
  let response = await axios.post({})
}

import { AsyncStorage } from 'react-native';
import axios from 'axios';

import {
  ADD_USER_EMAIL,
  ADD_VALID_EMAIL,
  NETWORK_ERROR,
  ADD_VALID_EMAIL_FAIL,
  ADD_VALID_USERNAME,
  ADD_EMAIL,
  ADD_BIO_AND_PASSWORD
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

// Getting dispatch as a parameter because we want to access to the dispatch from the parent function
export const doEmailCheck = (email) => async dispatch => {
  let response = await axios.get(`${ROOT_URL}/profile/echeck/?em=${email}`)

  if (response.status === 200) {
    // Return valid email and username
    dispatch({ type: ADD_VALID_EMAIL, payload: response.data })
  } else {
    dispatch({ type: NETWORK_ERROR })
  }
}

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email
})

export const addFullNameAndPassword = (fullname, password) => ({
  // add fullname and password to the props
  type: ADD_BIO_AND_PASSWORD,
  payload: { fullname, password }
})


export const registerNewUser = ( username, password, email ) => async dispatch => {
  let response = await axios.post(`${ROOT_URL}/email/check`, {
    username
  })

  if (response.status === 200) {
    // Return valid email and username
    dispatch({ type: ADD_VALID_EMAIL, payload: response })
  } else {
    dispatch({ type: ADD_VALID_EMAIL_FAIL })
  }

  // get Username

}

export const setFullName = (fullname) => async dispatch => {
  let response = await axios.post({})
}

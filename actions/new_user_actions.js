import { AsyncStorage } from 'react-native';
import axios from 'axios';

import {
  ADD_USER_EMAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

// Getting dispatch as a parameter because we want to access to the dispatch from the parent function
export const addEmail = (email) => async dispatch => {
  let response = await axios.post(`${ROOT_URL}/email/check`, {
    email
  })

  if (response.status === 200) {
    // Return valid email and username
    dispatch({ type: ADD_VALID_EMAIL, payload: response })
  } else {
    dispatch({ type: ADD_VALID_EMAIL_FAIL })
  }
}

export const addFullNameAndPassword = (fullname, password) => {
  // add fullname and password to the props
}

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

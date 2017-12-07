import axios from 'axios';

import {
  RETRIEVE_CUR_USER,
  RETRIEVE_CUR_USER_FAILED,
  RETRIEVE_PROFILE_SUCCESS,
  RETRIEVE_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_IMG_SUCCESS,
  EDIT_PROFILE_IMG_FAIL
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const retrieveCurrentUser = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/profile/detail/`, { headers });

  if(response.status === 200) {
    dispatch({ type: RETRIEVE_CUR_USER, payload: response.data });
  } else {
    if(response.status === 401) {
      // Authorization Token has been expired
    } else if (response.status === 403){
      console.log('You are not suposed to see this message. Contact Administrator');
    }
    dispatch({ type: RETRIEVE_CUR_USER_FAILED });
  }
}

export const fetchEditProfile = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/profile/update/`, { headers });
  if (response.status === 200) {
    dispatch({ type: RETRIEVE_PROFILE_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: RETRIEVE_PROFILE_FAIL })
  }
}

export const editProfile = (token, hType, username, title, gender) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.put(`${ROOT_URL}/profile/update/`, {
    username,
    title,
    gender
  }, { headers });
  if (response.status === 200) {
    dispatch({ type: EDIT_PROFILE_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: EDIT_PROFILE_FAIL })
  }
}

export const editProfileImage = (token, hType, base64) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.post(`${ROOT_URL}/profile/updateimg/`, {
    base64
  }, { headers });
  if (response.status === 200) {
    dispatch({ type: EDIT_PROFILE_IMG_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: EDIT_PROFILE_IMG_FAIL })
  }
}

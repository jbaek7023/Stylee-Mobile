import axios from 'axios';

import {
  USER_PAGE_FETCH_SUCCESS,
  USER_PAGE_FETCH_FAIL,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const fetchMyProfile = (token, hType, userPk) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/profile/pageid/${userPk}`, { headers });
  if (response.status === 200) {
    dispatch({ type: USER_PAGE_FETCH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: USER_PAGE_FETCH_FAIL })
  }
}

export const follow = (token, hType, userPk) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/follows/follow/`, {
    user_id: userPk
  }, {headers});

  if (response.status === 200) {
    dispatch({ type: USER_FOLLOW_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: USER_FOLLOW_FAIL })
  }
}

export const unfollow = (token, hType, userPk) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.post(`${ROOT_URL}/follows/unfollow/`, {
    user_id: userPk
  }, {headers});

  if (response.status === 200) {
    dispatch({ type: USER_UNFOLLOW_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: USER_UNFOLLOW_FAIL })
  }
}

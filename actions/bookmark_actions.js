import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';

import {
  BOOKMARK_CLOTH_SUCCESS,
  BOOKMARK_CLOTH_FAIL,
  UNBOOKMARK_CLOTH_SUCCESS,
  UNBOOKMARK_CLOTH_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const bookmarkCloth = (token, hType, cid) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/stars/create/?type=cloth&id=${cid}`, {
  }, {headers});

  if (response.status === 201) {
    dispatch({ type: BOOKMARK_CLOTH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: BOOKMARK_CLOTH_FAIL })
  }
}

export const unbookmarkCloth = (token, hType, cid) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/stars/delete/?type=cloth&id=${cid}`, {
  }, {headers});

  if (response.status === 201) {
    dispatch({ type: UNBOOKMARK_CLOTH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: UNBOOKMARK_CLOTH_FAIL })
  }
}

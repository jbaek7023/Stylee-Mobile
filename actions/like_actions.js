import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';

import {
  LIKE_CLOTH_SUCCESS,
  LIKE_CLOTH_FAIL,
  UNLIKE_CLOTH_SUCCESS,
  UNLIKE_CLOTH_FAIL,
  LIKE_OUTFIT_SUCCESS,
  LIKE_OUTFIT_FAIL,
  UNLIKE_OUTFIT_SUCCESS,
  UNLIKE_OUTFIT_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const likeCloth = (token, hType, cid) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/likes/create/?type=cloth&id=${cid}`, {
  }, {headers});

  if (response.status === 201) {
    dispatch({ type: LIKE_CLOTH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: LIKE_CLOTH_FAIL })
  }
}

export const unlikeCloth = (token, hType, cid) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/likes/delete/?type=cloth&id=${cid}`, {
  }, {headers});

  if (response.status === 201) {
    dispatch({ type: UNLIKE_CLOTH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: UNLIKE_CLOTH_FAIL })
  }
}

export const likeOutfit = (token, hType, outfitId) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/likes/create/?type=outfit&id=${outfitId}`, {
  }, {headers});

  if (response.status === 201) {
    dispatch({ type: LIKE_OUTFIT_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: LIKE_OUTFIT_FAIL })
  }
}

export const unlikeOutfit = (token, hType, outfitId) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/likes/delete/?type=outfit&id=${outfitId}`, {
  }, {headers});

  if (response.status === 201) {
    dispatch({ type: UNLIKE_OUTFIT_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: UNLIKE_OUTFIT_FAIL })
  }
}

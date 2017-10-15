import axios from 'axios';

import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
  COMMENT_DETAIL_SUCCESS,
  COMMENT_DETAIL_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';


export const fetchComments = (token, hType, id, postType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let reaponse = null;
  if(postType==1) {
    response = await axios.get(`${ROOT_URL}/outfits/comments/${id}/`, { headers });
  } else if (postType==2) {
    response = await axios.get(`${ROOT_URL}/clothes/comments/${id}/`, { headers });
  }
  if (response.status === 200) {
    dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_COMMENTS_FAIL });
  }
}

export const fetchCommentDetail = (token, hType, id) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.get(`${ROOT_URL}/comments/detail/${id}/`, { headers });
  if (response.status === 200) {
    dispatch({ type: COMMENT_DETAIL_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: COMMENT_DETAIL_FAIL });
  }
}
